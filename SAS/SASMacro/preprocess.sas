%macro preprocess;
    %if %symexist(postfix) eq 0 %then
        %do;
            data _null_;
            call symputx('postfix', "&_metauser", 'G');
            run;
        %end;

    %if %sysfunc(exist(pelltmp.params_&postfix)) %then %do;
        data _null_;
            set pelltmp.params_&postfix;
            call symputx(name, value, 'G');
        run;

        %if %symexist(LEKERDEZES_DT) eq 0 %then %do;
            %global LEKERDEZES_DT;
            %let LEKERDEZES_DT=today();
        %end;

        data _null_;
            call symputx('date', &LEKERDEZES_DT, 'G');
        run;

        data _null_;
            call symputx('dttm', dhms(&date, 23, 59, 59), 'G');
        run;
    %end;

    %if %sysfunc(exist(pelltmp.BENEFITS_&postfix.)) %then %do;
        data _null_;
            set pelltmp.BENEFITS_&postfix.;
            call symputx(benefit, 1, 'G');
        run;
    %end;
%mend;
