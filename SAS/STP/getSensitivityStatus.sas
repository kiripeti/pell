%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();
    %init_stp(getSensitivityResult);

%bafheader()
    %bafOutDataset(runid, work, runid)
    %bafOutDataset(status, kereszt, sensitivity_status)
%bafFooter()
