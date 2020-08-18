%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();

    %init_stp(getParamTables); /* => work.benefit */

    proc sql;
        create tables as
        select
            table
        from work.benefit inner join params.paramtebales
    quit;

    /*
        TABLE
        -----
        GYOD_PARAMS 
    */

    /* =>  %bafOutDataset(GYOD_PARAMS, work, GYOD_PARAMS) (drop = MTE-s oszlopok)*/

%bafheader()
    %bafOutDataset(runid, work, runid)
    %bafOutDataset(param_tables, work, tables)
%bafFooter()