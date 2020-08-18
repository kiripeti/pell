%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';


%bafgetdatasets(); /*--> work.param tablak (tartalom a getparamshoz képest lehet más), work.benefit*/

    %init_stp(sensitivityAnalysis);

    /* Manage BENEFITS */
        data pelltmp.BENEFITS_&postfix.;
            set BENEFIT;
            call symputx("benefit", BENEFIT, 'G');
        run;
    /* End of Manage BENEFITS */

    /* Manage ALAP_ADATOK */
        data pelltmp.I_ALAP_ADATOK_&postfix;
            set dm.UGYFEL_ALAPADATOK(where=(0=1)) %if %sysfunc(exist(ALAP_ADATOK)) %then %do; ALAP_ADATOK; %end;;
        run;
    /* End of Manage ALAP_ADATOK */

    /* Manage EU_ADATOK */
        data pelltmp.I_EU_ADATOK_&postfix;
            set dm.UGYFEL_EU_ADATOK(where=(0=1)) %if %sysfunc(exist(EU_ADATOK)) %then %do; EU_ADATOK; %end;;
        run;
    /* End of Manage EU_ADATOK */

    /* Manage NEW_INCOME */
        data pelltmp.I_NEW_INCOME_&postfix;
            set dm.JOGVISZONY_TELJES(where=(0=1)) %if %sysfunc(exist(NEW_INCOME)) %then %do; NEW_INCOME; %end;;
        run;
    /* End of Manage NEW_INCOME */

    /* Manage FAMILY */
        %if %sysfunc(exist(FAMILY)) %then %do;
            data pelltmp.I_FAMILY_&postfix;
                set FAMILY;
            run;
        %end; %else %do;
            data pelltmp.I_FAMILY_&postfix;
                length family_jkod szul_dt type 8 jkod $10.;
            run;
        %end;
    /* End of Manage FAMILY */

    /* Calculate Benefits and Save Results*/
        %include "&jobs_dir./Ellatasok_szamitasa.sas";

        data pelltmp.&benefit._ORIG_&postfix.
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

    /* Calculate Banefits*/
        %include "&jobs_dir./&benefit..sas";
    /* End of Calculate Benefits */

/*osszevetes*/

    /*A és B összevetése*/

%bafheader()
    %bafOutDataset(runid, work, runid)
%bafFooter()