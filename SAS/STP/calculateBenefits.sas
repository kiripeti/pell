%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();

    data results;
        ELLATAS_NM = 'valami';
        ELLATAS_START_DT = today();
        ELLATAS_END_DT = today()+365;
        ELLATAS_DAYS_NUM = 365
        ELLATAS_AMOUNT = 123456789;
        ELLATAS_DESC = 'Ez egy fasza ellátás'
    run;

%bafheader()
    %bafOutDataset(alap_adatok, work, ALAP)
    %bafOutDataset(eu_adatok, work, EU)
    %bafOutDataset(ev_elemzes, work, EV_ELEMZES)
    %bafOutDataset(allstat, work, ALLSTAT)
    %bafOutDataset(jogviszony, work, JOGVISZONY)
%bafFooter()