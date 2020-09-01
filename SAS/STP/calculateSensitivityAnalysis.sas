%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';


%bafgetdatasets();
    %init_stp(sensitivityAnalysis);

    /* TESZT */
    
    %if %sysfunc(exist(work.benefit)) eq 0 %then %do;
        data work.benefit;
            BENEFIT = 'GYOD';
        run;

        data work.GYOD_PARAMS;
            set params.GYOD_PARAMS;
            GYOD_ALAPOSSZEG=124000000;
        run;
    %end;
    

    %global postfix;
    %let postfix = &user.%sysfunc(time(), B8601TM6);

    %let now = %sysfunc(datetime(), 12.);
    %let today = %sysfunc(today(), 12.);
    
    /* Init PARAMS */
        data pelltmp.params_&postfix;
            length
                name $32
                value $250;
            
            name='LEKERDEZES_DT';
            value=strip("&today.");
            output;
            
            name='keresztmetszet';
            value='1';
            output;
        run;
    /* End of Init PARAMS */

    /* Manage BENEFITS */
        data pelltmp.BENEFITS_&postfix.;
            set BENEFIT;
            call symputx("benefit", BENEFIT, 'G');
        run;

        data _null_;
            set PARAMS.ELLATASOK (where=(ELLATAS_KOD="&benefit."));
            call symputx("benefit_nm", ELLATAS_NEV, 'G');
        run;
    /* End of Manage BENEFITS */

    /* Insert Run Record into KERESZT Status Table */
        proc sql noprint;
            insert into kereszt.SENSITIVITY_STATUS
                (runid, user, start_dttm, status, benefit_code, benefit_name)
            values
                ("&postfix.", "&user.", &now., 'RUNNING', "&benefit.", "&benefit_nm.")
            ;
        quit;
    /* End of Insert Run Record into KERESZT Status Table */

    /* Write Parameter Table List to Macros */
        proc sql noprint;
            select
                PARAMETERTABLA,
                POSTFIX_FIZIKAI_NEV
                    into
                        :ptables separated by '|',
                        :ptables_postfix separated by '|'
            from PARAMS.ELLATAS_PARAMS
            where ELLATAS = "&benefit."
            ;
        quit;

        %let ptable_count = %eval(%sysfunc(count(&ptables., |)) + 1);
    /* End of Write Parameter Tables to Macro */

    /* Calculate Benefits and Save Results*/
        %include "&jobs_dir./Ellatasok_szamitasa.sas";

        data kereszt.&benefit._&postfix._O;
            set pelltmp.&benefit._&postfix. (where=(ELLATAS_NM is not null));
        run;

    /* End of Calculate Benefits and Save Results */

    /* Save Parameter Table List and Parameter Tables to KERESZT */
        proc sql noprint;
            create table KERESZT.PTABLA_&postfix. as
                select PARAMETERTABLA, POSTFIX_FIZIKAI_NEV
                from PARAMS.ELLATAS_PARAMS
                where ELLATAS = "&benefit."
            ;
        quit;

        %macro _save_parameter_tables;
            %do i=1 %to &ptable_count.;
                %let ptable = %scan(&ptables., &i., |);
                %let ptable_postfix = %scan(&ptables_postfix., &i., |);
                data KERESZT.&ptable_postfix._O;
                    set PELLTMP.&ptable_postfix.;
                run;

                data KERESZT.&ptable_postfix._M;
                    set WORK.&ptable.;
                run;
            %end;
        %mend;
        %_save_parameter_tables;
    /* End of Save Parameter Tables to KERESZT */


    /* Modify parameters according to user input */
        %macro _modify_parameter_tables;
            %do i=1 %to &ptable_count.;
                %let ptable = %scan(&ptables., &i., |);
                %let ptable_postfix = %scan(&ptables_postfix., &i., |);
                data PELLTMP.&ptable_postfix.;
                    set WORK.&ptable.;
                run;
            %end;
        %mend;
        %_modify_parameter_tables;
    /* End of Modify Parameters According to User Input */

    /* Calculate Benefits and Save Results */
        %include "&jobs_dir./&benefit..sas";

        data kereszt.&benefit._&postfix._M;
            set pelltmp.&benefit._&postfix. (where=(ELLATAS_NM is not null));
        run;
    /* End of Calculate Benefits and Save Results */

    /* Cleanup */
        proc datasets lib=pelltmp nolist;
            delete ALAPADATOK_&postfix. CHILDREN_&postfix. EU_ADATOK_&postfix. EV_ELEMZES_&postfix. JOGVISZONY_&postfix.;
        run;
    /* End of Cleanup */

    /* Calculate Difference */
        data _null_;
            set PARAMS.UGYFEL_INPUT_GENERATED nobs=cnt;
            call symputx("n_sample", cnt, 'G');
            stop;
        run;

        proc sql;
            create table work.results_pre as
                select
                    put(&n_sample., nlnum32. -L) 
                        label='Minta elemszám' as MINTA_ELEMSZAM,
                        
                    put(count(distinct o.ELLATAS_JKOD), nlnum32. -L)
                        label="Jogosultak száma" as O_JOGOSULTAK_SZAMA,
                    put(count(distinct o.ELLATAS_JKOD) / &n_sample., nlpct32.2 -L)
                        label="Jogosultak aránya" as O_JOGOSULTAK_ARANYA,
                    put(sum(max(0, o.ELLATAS_AMOUNT)), nlnum32. -L)
                        label="Összeg" as O_SUM_OSSZEG,
                    put(count(distinct case when m.ELLATAS_JKOD is null then o.ELLATAS_JKOD end), nlnum32. -L)
                        label="Jogosultak száma (különbség)" as O_JOGOSULTAK_KUL,

                    put(count(distinct m.ELLATAS_JKOD), nlnum32. -L)
                        label="Jogosultak száma" as M_JOGOSULTAK_SZAMA,
                    put(count(distinct m.ELLATAS_JKOD) / &n_sample., nlpct32.2 -L)
                        label="Jogosultak aránya" as M_JOGOSULTAK_ARANYA,
                    put(sum(max(0, m.ELLATAS_AMOUNT)), nlnum32. -L)
                        label="Összeg" as M_SUM_OSSZEG,
                    put(count(distinct case when o.ELLATAS_JKOD is null then m.ELLATAS_JKOD end), nlnum32. -L)
                        label="Jogosultak száma (különbség)" as M_JOGOSULTAK_KUL

                from KERESZT.&benefit._&postfix._O o
                    full join KERESZT.&benefit._&postfix._M m on (
                        o.ELLATAS_JKOD = m.ELLATAS_JKOD
                    )
        ;
        quit;

        data work.results_pre;
            length PARAMETER_KESZLET PARAMETER_KESZLET_LBL $32;

            _dummy = 1;

            PARAMETER_KESZLET = 'ORIGINAL';
            PARAMETER_KESZLET_LBL = 'Eredeti';

            set work.results_pre (rename=(
                O_JOGOSULTAK_SZAMA = JOGOSULTAK_SZAMA
                O_JOGOSULTAK_ARANYA = JOGOSULTAK_ARANYA
                O_SUM_OSSZEG = SUM_OSSZEG
                O_JOGOSULTAK_KUL = JOGOSULTAK_KUL
            ));
            output;

            PARAMETER_KESZLET = 'MODIFIED';
            PARAMETER_KESZLET_LBL = 'Módosított';

            JOGOSULTAK_SZAMA = M_JOGOSULTAK_SZAMA;
            JOGOSULTAK_ARANYA = M_JOGOSULTAK_ARANYA;
            SUM_OSSZEG = M_SUM_OSSZEG;
            JOGOSULTAK_KUL = M_JOGOSULTAK_KUL;
            output;

        run;

        proc transpose data=work.results_pre out=kereszt.RES_&postfix. (drop=STATNAME)
            name=STATNAME
            label=STATISTIC
        ;
            id PARAMETER_KESZLET;
            idlabel PARAMETER_KESZLET_LBL;
            var MINTA_ELEMSZAM JOGOSULTAK_SZAMA JOGOSULTAK_ARANYA SUM_OSSZEG JOGOSULTAK_KUL;
        run;
    /* End of Calculate Difference */

    /* Insert Run Record into KERESZT Status Table */
        proc sql noprint;
            update kereszt.SENSITIVITY_STATUS
                set
                    end_dttm=int(datetime()),
                    status='FINISHED'
                where
                    runid = "&postfix."
            ;
        quit;
    /* End of Insert Run Record into KERESZT Status Table */

%bafheader()
    
%bafFooter()
