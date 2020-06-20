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
        data pelltmp.ALAP_ADATOK_&postfix;
            set dm.ALAP_ADATOK(where=(0=1)) ALAP_ADATOK;
        run;
    /* End of Manage ALAP_ADATOK */

    /* Manage EU_ADATOK */
        data pelltmp.EU_ADATOK_&postfix;
            set dm.EU_ADATOK(where=(0=1)) EU_ADATOK;
        run;
    /* End of Manage EU_ADATOK */

    /* Manage NEW_INCOME */
        data pelltmp.NEW_INCOME_&postfix;
            set dm.JOGISZONY_TELJES(where=(0=1)) NEW_INCOME;
        run;
    /* End of Manage NEW_INCOME */

    /* Manage FAMILY */
        data pelltmp.FAMILY_&postfix;
            set FAMILY;
        run;
    /* End of Manage FAMILY */

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