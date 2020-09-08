%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();
    %init_stp(getSensitivityStatus);

    proc sort
        data=kereszt.sensitivity_status
        out=work.sensitivity_status;
        by descending START_DTTM;
    run;    

%bafheader()
    %bafOutDataset(runid, work, runid)
    %bafOutDataset(sensitivityStatus, work, sensitivity_status)
%bafFooter()
