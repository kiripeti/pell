%macro preprocess;
    %if %symexist(postfix) eq 0 %then
        %do;
            data _null_;
            call symputx('postfix', "&_metauser", 'G');
            run;
        %end;

    %if %sysfunc(exist(pelltmp.params_&postfix)) %then %do;
        data _null_;
            set pelltmp.params_&postfix(where=(value ne ''));
            call symputx(name, value, 'G');
        run;
    %end;

    %if %sysfunc(exist(pelltmp.BENEFITS_&postfix.)) %then %do;
        data _null_;
            set pelltmp.BENEFITS_&postfix.;
            call symputx(benefit, 1, 'G');
        run;
    %end;

    %if %symexist(date) %then %do;
        data _null_;
            call symputx('LEKERDEZES_DT', &date, 'G');
            call symputx('dttm', dhms(&date, 23, 59, 59), 'G');
        run;
    %end; %else %do;
        data _null_;
            call symputx('date', &LEKERDEZES_DT, 'G');
            call symputx('dttm', dhms(&LEKERDEZES_DT, 23, 59, 59), 'G');
        run;
    %end;
%mend;
