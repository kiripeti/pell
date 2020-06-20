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
    
    %include "&jobs_dir./Ellatasok_szamitasa.sas";

    data results;
        ELLATAS_NM = 'valami';
        ELLATAS_START_DT = today();
        ELLATAS_END_DT = today()+365;
        ELLATAS_DAYS_NUM = 365;
        ELLATAS_AMOUNT = 123456789;
        ELLATAS_DESC = 'Ez egy fasza ellátás';
    run;

%bafheader()
    %bafOutDataset(results, work, results)
%bafFooter()