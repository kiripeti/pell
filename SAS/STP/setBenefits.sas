%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();

    %init_stp(setBenefits);

    data params.ellatasok_tst;
        set BENEFITS;
    run;

    data params.ugyfel_inputok_tst;
        set PARAMS;
    run;

%bafheader()
%bafFooter()
