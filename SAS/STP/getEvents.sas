%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

    %init_stp(getEvents);

%bafheader()
    %bafOutDataset(events, params, events)
    %bafOutDataset(eventParams, params, event_params)
    %bafOutDataset(eventBenefits, params, event_benefit)
%bafFooter()
