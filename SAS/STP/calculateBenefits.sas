%include '/sas/decman/Lev1/SASApp/SASEnvironment/SASCode/H54S/h54s.sas';

%bafgetdatasets();

    %init_stp(calculateBenefits);

    /* Manage BENEFITS */
        data pelltmp.BENEFITS_&postfix.;
            set BENEFITS;
        run;
    /* End of Manage BENEFITS */

    /* Manage PARAMS */
        data _null_;
            length vars $32767;

            i=1;
            do while (scan("&params", i, '|') ne '');
                vars = catx(' ', vars, scan(scan("&params", i, '|'), 1, ','));
                i=i+1;
            end;
            
            call symputx('vars', vars, 'G');
        run;

        proc transpose
            data=params
            out=pelltmp.params_&postfix(rename=(value1=value))
            prefix=value
            name=name;
            var &vars;
        run;
    /* End of Manage PARAMS */

    /* Manage ALAP_ADATOK */
        data pelltmp.I_ALAP_ADATOK_&postfix;
            set dm.UGYFEL_ALAPADATOK(where=(0=1)) %if %sysfunc(exist(ALAP_ADATOK)) %then %do; ALAP_ADATOK; %end;;
        run;
    /* End of Manage ALAP_ADATOK */

    /* Manage EU_ADATOK */
        data pelltmp.I_EU_ADATOK_&postfix;
            set dm.UGYFEL_EU_ADATOK(where=(0=1)) %if %sysfunc(exist(EU_ADATOK)) %then %do; EU_ADATOK; %end;;
        run;
    /* End of Manage EU_ADATOK */

    /* Manage NEW_INCOME */
        data pelltmp.I_NEW_INCOME_&postfix;
            set dm.JOGVISZONY_TELJES(where=(0=1)) %if %sysfunc(exist(NEW_INCOME)) %then %do; NEW_INCOME; %end;;
        run;
    /* End of Manage NEW_INCOME */

    /* Manage FAMILY */
        %if %sysfunc(exist(FAMILY)) %then %do;
            data pelltmp.I_FAMILY_&postfix;
                set FAMILY;
            run;
        %end; %else %do;
            data pelltmp.I_FAMILY_&postfix;
                length jkod szul_dt type 8;
            run;
        %end;
    /* End of Manage FAMILY */
    
    /* Calculate Banefits*/
        %include "&jobs_dir./Ellatasok_szamitasa.sas";
    /* End of Calculate Benefits */

    /* Create Outputs */
        data runid;
            runid="&postfix";
        run;

        proc sql noprint;
            select
                benefit,
                cats(benefit, '_input_', "&postfix") as brm_input_tables,
                cats('pelltmp.', benefit, '_', "&postfix") as brm_output_tables
            into 
                :benefit_codes separated by '|',
                :brm_input_tables separated by '|',
                :brm_output_tables separated by '|'
            from
                BENEFITS;
        quit;

        %macro append_results;
            data results;
                ellatas_cd="%qscan(&benefit_codes,1,|)";
                set %qscan(&brm_output_tables,1,|);
            run;

            %let benefit_count=%sysfunc(countw(&benefit_codes,|));

            %do i=2 %to &benefit_count;
                %let table=%qscan(&brm_output_tables,&i,|);
                %let benefit_code=%qscan(&benefit_codes,&i,|);

                data res_&benefit_code;
                    ellatas_cd="&benefit_code";
                    set &table;
                run;

                proc append
                    base=results
                    data=res_&benefit_code;
                run;
            %end;
        %mend;
        %append_results;

        %macro add_inputs;
            %let benefit_count=%sysfunc(countw(&benefit_codes,|));
            %do i=1 %to &benefit_count;
                %let table=%qscan(&brm_input_tables,&i,|);
                %let benefit_code=%qscan(&benefit_codes,&i,|);
                %bafOutDataset(brm_input_&benefit_code, pelltmp, &table)
            %end;
        %mend;
    /* End of Create Outputs */

%bafheader()
    %bafOutDataset(runid, work, runid)
    %bafOutDataset(params, work, params)
    %bafOutDataset(results, work, results)
    %add_inputs
%bafFooter()