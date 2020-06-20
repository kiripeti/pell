%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

    %init_stp(getBenefits);

    data benefits;
        set params.ellatasok;
    run;

    data benefit_params;
        set params.ugyfel_inputok;
    run;

%bafheader()
    %bafOutDataset(benefits, work, benefits)
    %bafOutDataset(benefitParams, work, benefit_params)
%bafFooter()
