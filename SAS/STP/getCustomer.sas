%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();

    %init_stp(getCustomer);

    data _null_;
        set jkod;
        call symputx('jkod', jkod, 'G');
    run;

    %include "&jobs_dir./Ugyfel_adatok.sas";

%bafheader()
    %bafOutDataset(alap_adatok, work, ALAP)
    %bafOutDataset(eu_adatok, work, EU)
    %bafOutDataset(ev_elemzes, work, EV_ELEMZES)
    %bafOutDataset(allstat, work, ALLSTAT)
    %bafOutDataset(jogviszony, work, JOGVISZONY)
%bafFooter()
