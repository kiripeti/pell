%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();

    %init_stp(calculateScenario);

    /* Manage EVENTS */
        data pelltmp.LIFE_EVENTS_&postfix.(keep=order event);
            set events end=last;;
            retain event_count 0;
            if event_count < order then do;
                event_count = order;
            end;

            if last then call symputx('event_count', event_count, 'G');
        run;
    /* End of Manage EVENTS */

    /* Manage PARAMS */
        data pelltmp.params_&postfix;
            length
                name    $32
                value  $250;
            stop;
        run;

        proc transpose
            data=params
            out=transposed(rename=(value1=value))
            prefix=value
            name=name;
            var _all_;
        run;

        data param;
            length
                name    $32
                value  $250;
            set transposed;
            value=strip(value);
        run;

        proc append
            base=pelltmp.params_&postfix
            data=param;
        run;
    /* End of Manage PARAMS */

    /* Manage EVENT_PARAMS */
        %macro generate_event_params;
            data pelltmp.scen_params_&postfix;
                length
                    order     8
                    name    $32
                    value  $250;
                stop;
            run;

            %do i=1 %to &event_count;
                proc transpose
                    data=event_&i._params
                    out=transposed(rename=(value1=value))
                    prefix=value
                    name=name;
                    var _all_;
                run;

                data param;
                    length
                        order     8
                        name    $32
                        value  $250;
                    
                    order=&i;
                    set transposed;
                    value=strip(value);
                run;

                proc append
                    base=pelltmp.scen_params_&postfix
                    data=param;
                run;
            %end;
        %mend;
        %generate_event_params;
    /* End of Manage EVENT_PARAMS */

    /* Manage FAMILY */
        %if %sysfunc(exist(FAMILY)) %then %do;
            data pelltmp.I_FAMILY_&postfix;
                set FAMILY;
            run;
        %end; %else %do;
            data pelltmp.I_FAMILY_&postfix;
                length family_jkod szul_dt type 8 jkod $10.;
            run;
        %end;
    /* End of Manage FAMILY */
    
    /* Calculate Scenarios*/
        %include "&jobs_dir./Szcenariok_szamitasa.sas";
    /* End of Calculate Scenarios */
    
    /* Calculated JOGVISZONY*/
        data jogviszony;
            set pelltmp.JOGVISZONY_&postfix.(where=(source_method not in ('DM' 'GUI')));
        run;
    /* End of Calculated JOGVISZONY */

%bafheader()
    %bafOutDataset(runid, work, runid)
    %bafOutDataset(brm_output, pelltmp, BRM_OUT_&postfix.)
    %bafOutDataset(jogviszony, work, jogviszony)
%bafFooter()