%macro init_stp(stp_name);
    %let rc = %sysfunc(stpsrv_header(Content-type, text/plain%str(;) encoding=windows-1250));

    data _null_;
        call symputx('user', scan("&_metauser", 1, ' &;@-'), 'G');
        call symputx('jobs_dir', catx('/', 'SASEnvironment', 'SASCode', 'Jobs'), 'G');
        call symputx('stp_log', catx('/', 'StoredProcessServer', 'Logs'), 'G');
    run;

    %let postfix=&user.%sysfunc(time(), B8601TM6);

    proc printto log="&stp_log./&stp_name.-&postfix..log" new;
    run;
%mend;