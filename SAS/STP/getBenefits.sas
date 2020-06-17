%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

    init_stp(getBenefits);

    data benefits;
        set dm.ellatasok;
    run;

    data benefit_params;
        set params.ugyfel_inputok;
        if options=. then options='';
    run;

%bafheader()
    %bafOutDataset(benefits, work, benefits)
    %bafOutDataset(benefitParams, work, benefit_params)
%bafFooter()
