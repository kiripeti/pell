%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();
    %init_stp(getSensitivityStatus);

%bafheader()
    %bafOutDataset(runid, work, runid)
    %bafOutDataset(sensitivityStatus, kereszt, sensitivity_status)
%bafFooter()
