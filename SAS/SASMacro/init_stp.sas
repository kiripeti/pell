%macro init_stp(stp_name);
    %let rc = %sysfunc(stpsrv_header(Content-type, text/plain%str(;) encoding=windows-1250));

    data _null_;
        call symputx('user', scan("&_metauser", 1, ' &;@-'), 'G');
        call symputx('jobs_dir', catx('/', 'SASEnvironment', 'SASCode', 'Jobs'), 'G');
        call symputx('stp_log', catx('/', 'StoredProcessServer', 'Logs'), 'G');
    run;

    %global postfix;
    %let postfix=&user.%sysfunc(time(), B8601TM6);

    %if %sysfunc(exist(debug)) %then %do;
        data _null_;
            set debug;
            call symputx('debug', debug, 'G');
        run;
    %end; %else %do;
        data _null_;
            call symputx('debug', 0, 'G');
        run;
    %end;

    %if &debug %then %do;
        %let postfix=&user;
    %end; %else %do;
        proc printto log="&stp_log./&stp_name.-&postfix..log" new;
        run;
    %end;
%mend;