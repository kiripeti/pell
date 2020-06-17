%macro init_stp(stp_name);
    data _null_;
        call symputx('user', scan("&_metauser", 1, ' &;@-'), 'G');
        call symputx('jobs_dir', catx('/', 'SASEnvironment', 'SASCode', 'Jobs'), 'G');
        call symputx('stp_log', catx('/', 'StoredProcessServer', 'Logs'), 'G');
    run;

    %let postfix=&postfix.%sysfunc(time(), B8601TM8.2);

    proc printto log="&stp_log./&stp_name.-&postfix..log" new;
    run;
%mend;