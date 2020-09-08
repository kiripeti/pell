%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();
    %init_stp(getSensitivityResults);

    /* TESZT */
    
    %if %sysfunc(exist(work.sensitivity_id)) eq 0 %then %do;
        data work.sensitivity_id;
            runid = 'sasinst185040';
        run;
    %end;

    /* Get KERESZT Run ID */
        proc sql noprint;
            select runid
                    into :postfix_kereszt
                from work.sensitivity_id
            ;
        quit;
    /* End of Get KERESZT Run ID */

    /* Get Parameter Table Names */
        proc sql noprint;
            select
                PARAMETERTABLA,
                tranwrd(POSTFIX_FIZIKAI_NEV, '&postfix.', '&postfix_kereszt.')
                    into
                        :ptables separated by '|',
                        :ptables_postfix separated by '|'
                from KERESZT.PTABLA_&postfix_kereszt.
            ;
        quit;
        %let ptable_count = %eval(%sysfunc(count(&ptables., |)) + 1);
    /* End of Get Parameter Table Names */

    /* Add Parameter Table Names to Output */
        %macro _add_params;
            %do i=1 %to &ptable_count.;
                %let ptable = %scan(&ptables., &i., |);
                %let ptable_postfix = %scan(&ptables_postfix., &i., |);
                %bafOutDataset(&ptable._O, kereszt, &ptable_postfix._o)
                %bafOutDataset(&ptable._M, kereszt, &ptable_postfix._m)
            %end;
        %mend;
    /* Add Parameter Table Names to Output */
    
%bafheader()
    %bafOutDataset(runid, work, runid)
    %bafOutDataset(result, kereszt, res_&postfix_kereszt.)
    %bafOutDataset(params, kereszt, PTABLA_&postfix_kereszt.)
    %_add_params
%bafFooter()
