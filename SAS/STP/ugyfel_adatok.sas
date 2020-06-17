%global JKOD;

%macro ugyfel_adatok();
    %let rc = %sysfunc(stpsrv_header(Content-type, application/json%str(;) encoding=windows-1250));
    %let rc = %sysfunc(stpsrv_header(Cache-control, no-cache));

    data _null_;
        call symputx('postfix', compress("&_metauser",' &;@-'), 'G');
        call symputx('jobs_dir', 'SASEnvironment', 'SASCode', 'Jobs'), 'G');
        call symputx('stp_log', 'StoredProcessServer', 'Logs'), 'G');
    run;

    %let postfix=&postfix.%sysfunc(time(), B8601TM8.2);

    proc printto log="&stp_log./ugyfel_atadok-&postfix..log" new;
    run;

    %include "&jobs_dir./Ugyfel_adatok.sas";

    proc json out=_webout pretty nosastags;
        write open object;
            write values "JKOD" &jkod;
            write values "ALAP_ADATOK";
                write open array;
                    export work.alap;
                write close;
            write values "EU_ADATOK";
                write open array;
                    export work.eu;
                write close;
            write values "EV_ELEMZES";
                write open array;
                    export work.ev_elemzes;
                write close;
            write values "ALLSTAT";
                write open array;
                    export work.allstat;
                write close;
            write values "JOGVISZONY";
                write open array;
                    export work.jogviszony;
                write close;
        write close;
    run;
%mend;

%ugyfel_adatok;
