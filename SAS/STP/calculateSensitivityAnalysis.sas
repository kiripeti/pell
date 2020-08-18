%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';


%bafgetdatasets(); /*--> work.param tablak (tartalom a getparamshoz képest lehet más), work.benefit*/

    %init_stp(sensitivityAnalysis);

    data pelltmp.params_&postfix;
        length
            name $32
            value $250;
        
        name='date';
        value=strip(put(today(), 8.));
        output;
        
        name='keresztmetszet';
        value='1';
        output;
    run;

    %if %sysfunc(exist(work.benefit)) eq 0 %then %do;
        data work.benefit;
            BENEFIT = 'GYOD';
        run;

        data work.GYOD_PARAMS;
            set params.GYOD_PARAMS;
            GYOD_ALAPOSSZEG=124000000;
        run;
    %end;

    /* Manage BENEFITS */
        data pelltmp.BENEFITS_&postfix.;
            set BENEFIT;
            call symputx("benefit", BENEFIT, 'G');
        run;
    /* End of Manage BENEFITS */

    /* Calculate Benefits and Save Results*/
        %include "&jobs_dir./Ellatasok_szamitasa.sas";

        data pelltmp.&benefit._ORIG_&postfix.;
            set pelltmp.&benefit._&postfix.;
        run;
    /* End of Calculate Benefits and Save Results */

    /* Modify parameters according to user input */
        proc sql noprint;
            select
                PARAMETERTABLA, POSTFIX_FIZIKAI_NEV
                    into :ptables separated by '|', :ptables_postfix separated by '|'
            from WORK.BENEFIT b
                inner join PARAMS.ELLATAS_PARAMS e on (b.BENEFIT = e.ELLATAS);
        quit;

        %let ptable_count = %eval(%sysfunc(count(&ptables., |)) + 1);

        %macro create_tables;
            %do i=1 %to &ptable_count.;
                %let ptable = %scan(&ptables., &i., |);
                %let ptable_postfix = %scan(&ptables_postfix., &i., |);
                data WORK.&ptable_postfix.;
                    set WORK.&ptable.;
                run;
            %end;
        %mend;

        %create_tables;

    /* Calculate Benefits*/
        %include "&jobs_dir./&benefit..sas";
    /* End of Calculate Benefits */

    /* Calculate Difference */
        data _null_;
            set PARAMS.UGYFEL_INPUT_GENERATED nobs=cnt;
            call symputx("n_sample", cnt, 'G');
            stop;
        run;

        %macro _calculate_formatted_stats();
                    put(&n_sample., nlnum32. -L) 
                        label='Minta elemszám' as MINTA_ELEMSZAM,
                    put(count(distinct ELLATAS_JKOD), nlnum32. -L)
                        label="Jogosultak száma" as JOGOSULTAK_SZAMA,
                    put(count(distinct case when ELLATAS_START_DT is not null then ELLATAS_JKOD end) / &n_sample., nlpct32.2 -L)
                        label="Jogosultak aránya" as JOGOSULTAK_ARANYA,
                    put(coalesce(sum(ELLATAS_AMOUNT), 0), nlnum32. -L)
                        label="Összeg" as SUM_OSSZEG,
        %mend;

        proc sql;
            create table work.results_pre as
            (
                select
                    'ORIGINAL' as PARAMETER_KESZLET,
                    'Eredeti' as PARAMETER_KESZLET_LBL,
                    %_calculate_formatted_stats()
                    1 as dummy
                from 
                    pelltmp.&benefit._ORIG_&postfix.
            ) union corr (
                select
                    'MODIFIED' as PARAMETER_KESZLET,
                    'Módosított' as PARAMETER_KESZLET_LBL,
                    %_calculate_formatted_stats()
                    1 as dummy
                from 
                    pelltmp.&benefit._&postfix.
            );
        quit;

        proc transpose data=work.results_pre out=work.results (drop=STATNAME)
            name=STATNAME
            label=STATISTIC
        ;
            id PARAMETER_KESZLET;
            idlabel PARAMETER_KESZLET_LBL;
            var MINTA_ELEMSZAM JOGOSULTAK_SZAMA JOGOSULTAK_ARANYA SUM_OSSZEG;
        run;
    /* End of Calculate Difference */

%bafheader()
    %bafOutDataset(runid, work, runid)
    %bafOutDataset(sensitivity_results, work, results)
        /* oszlopok: STATISTIC, ORIGINAL, MODIFIED */
%bafFooter()
