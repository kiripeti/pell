%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();
    %init_stp(getSensitivityResults);

    /* TESZT */
    
    %if %sysfunc(exist(work.runid)) eq 0 %then %do;
    
        data work.runid;
            runid = 'TST1234';
        run;

        data kereszt.ptabla_TST1234;
            PARAMETERTABLA = 'TST_PT1'; output;
            PARAMETERTABLA = 'TST_PT2'; output;
        run;

        data kereszt.TST_PT1_TST1234_O;
            content = '1o';
        run;

        data kereszt.TST_PT2_TST1234_O;
            content = '2o';
        run
        
        data kereszt.TST_PT1_TST1234_M;
            content = '1m';
        run

        data kereszt.TST_PT2_TST1234_M;
            content = '2m';
        run

        data kereszt.RES_TST1234;
        
            PARAMETER_KESZLET = 'ORIGINAL';
            PARAMETER_KESZLET_LBL = 'Eredeti';

            JOGOSULTAK_SZAMA = '0';
            JOGOSULTAK_ARANYA = '1';
            SUM_OSSZEG = '3';
            JOGOSULTAK_KUL = '4';
            output;
            
            PARAMETER_KESZLET = 'MODIFIED';
            PARAMETER_KESZLET_LBL = 'Módosított';

            JOGOSULTAK_SZAMA = '4';
            JOGOSULTAK_ARANYA = '3';
            SUM_OSSZEG = '2';
            JOGOSULTAK_KUL = '1';
            output;
        run;

    %end;

    

    /* Get KERESZT Run ID */
        proc sql noprint;
            select runid
                    into :postfix.
                from work.runid
            ;
        quit;
    /* End of Get KERESZT Run ID */

    /* Get Parameter Table Names */
        proc sql noprint;
            select PARAMETERTABLA
                    into :ptables separated by '|'
                from KERESZT.PTABLA_&postfix.
            ;
        quit;
        %let ptable_count = %eval(%sysfunc(count(&ptables., |)) + 1);
    /* End of Get Parameter Table Names */

    /* Add Parameter Table Names to Output */
        %macro _add_params;
            %do i=1 %to &ptable_count.;
                %let ptable = %scan(&ptables., &i., |);
                %bafOutDataset(&ptable._o, kereszt, &ptable._&postfix._o)
                %bafOutDataset(&ptable._m, kereszt, &ptable._&postfix._m)
            %end;
        %mend;
    /* Add Parameter Table Names to Output */
    
%bafheader()
    %bafOutDataset(runid, work, runid)
    %bafOutDataset(result, kereszt, res_&postfix.)
    %_add_params
%bafFooter()
