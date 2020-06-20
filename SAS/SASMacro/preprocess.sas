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

        data _null_;
            call symputx('dttm', dhms(&date, 23, 59, 59), 'G');
        run;
    %end;
%mend;
