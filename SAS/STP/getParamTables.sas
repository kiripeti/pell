%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();

    %init_stp(getParamTables); /* => work.benefit */

    %if %sysfunc(exist(benefit)) eq 0 %then %do;
        data benefit;
            BENEFIT = 'AT';
        run;
    %end;

    proc sql noprint;
        create table WORK.TABLES as
        select
            PARAMETERTABLA AS TABLA
        from WORK.BENEFIT b
            inner join PARAMS.ELLATAS_PARAMS e on (b.BENEFIT = e.ELLATAS);
    quit;

    proc sql noprint;
        select
            PARAMETERTABLA into :ptables separated by '|'
        from WORK.BENEFIT b
            inner join PARAMS.ELLATAS_PARAMS e on (b.BENEFIT = e.ELLATAS);
    quit;

    %let ptable_count = %eval(%sysfunc(count(&ptables., |)) + 1);

    %macro create_tables;
        %do i=1 %to &ptable_count.;
            %let ptable_name = %scan(&ptables., &i., |);
            data WORK.&ptable_name.;
                set PARAMS.&ptable_name.;
                where MODIFICATIONSTATUS_CD = 'Y';
                drop RULE_RK VERSION_RK MODIFICATIONSTATUS_CD DELETION_DTTM MODIFICATION_DTTM VALID_FROM_DTTM VALID_TO_DTTM MODIFIEDBY_NM DELETEDBY_NM APPROVEDBY_NM;
            run;
        %end;
    %mend;

    %create_tables;

    %macro add_inputs;
        %do i=1 %to &ptable_count.;
            %let ptable_name = %scan(&ptables., &i., |);
            %bafOutDataset(&ptable_name., work, &ptable_name.)
        %end;
    %mend;

%bafheader()
    %bafOutDataset(runid, work, runid)
    %bafOutDataset(param_tables, work, tables)
    %add_inputs
%bafFooter()