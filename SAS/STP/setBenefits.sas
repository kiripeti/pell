%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();

    %init_stp(setBenefits);

    data params.ellatasok;
        set BENEFITS;
    run;

    data params.ugyfel_inputok;
        set PARAMS;
    run;

%bafheader()
%bafFooter()
