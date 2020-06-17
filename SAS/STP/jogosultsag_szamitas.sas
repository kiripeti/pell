%global
    JKOD DONTES_KIIR EG_ALLAPOT_PCT ELVART_JOGV_VAN_FLG HAVI_ATLAGJOV
    JOGSZERZESI_ADAT_FLG KER_TEV_FLG KMPX_MIN MUNK_KEP_VAL_AGE
    NYUG_KORHATARIG_AGE_NUM RENDSZ_PENZELL_FLG UF_ELETKOR DATE postfix;

%macro jogosultsag_szamitas();
    %let rc = %sysfunc(stpsrv_header(Content-type, application/json%str(;) encoding=windows-1250));
    %let rc = %sysfunc(stpsrv_header(Cache-control, no-cache));

    %let debug=1;

    data _null_;
        call symputx('user', compress("&_metauser",' &;@-'), 'G');
        call symputx('jobs_dir', catx('/', 'SASEnvironment', 'SASCode', 'Jobs'), 'G');
        call symputx('stp_log', catx('/', 'StoredProcessServer', 'Logs'), 'G');
    run;

    %let now=%sysfunc(time(), B8601TM8.2);
    %let postfix=&user.&now;

    %if &debug eq 1 %then %do;
        %let postfix=&user;
    %end;

    proc printto log="&stp_log./jog-&postfix..log" new;
    run;

    options mprint;

    %if "&DATE" eq "" %then %let DATE = %sysfunc(today());
    %else %let DATE = %unquote(%nrstr(%')&DATE.%nrstr(%')d);

    data _null_;
        set dm.ellatasok(where= (ellatas_kod not in ('CSP' 'GYES' 'XY')));
        call symputx(ellatas_kod,0);
    run;

    %if &ellatasok_count eq 1 %then
        %do;
            %let ellatasok1=&ellatasok;
        %end;

    data _null_;
        %do i=1 %to &ellatasok_count;
            call symputx("&&ellatasok&i",1);
        %end;
    run;

    data pelltmp.params_&postfix(keep=name value);
        set sashelp.vmacro(where=(
            name ne 'I' &
            name ne 'RC' &
            scope ne 'AUTOMATIC' &
            substr(name, 1, 1) ne '_' &
            lowcase(substr(name, 1, 3)) ne 'sys' &
            lowcase(scan(name, -1, '_')) ne 'label' &
            lowcase(scan(name, -1, '_')) ne 'rel' &
            name not contains 'ELLATASOK'
        ));
        if lowcase(scan(name, -1, '_')) eq 'dt' and value ne '' then value=cats("'", value, "'d");
    run;

    data _null_;
        set pelltmp.params_&postfix(where= (value is not missing));
        put "NOTE: " name "= " value;
    run;

    proc transpose
        data=pelltmp.params_&postfix
        out=pelltmp.client_input_&postfix(drop= _name_ _label_);
        id name;
        var value;
    run;

    %include "&jobs_dir./Ellatasok_szamitasa.sas";

    %if &debug ne 1 %then %do;
        proc transpose
            data=pelltmp.params_&postfix(where= (value is not missing))
            out=pelltmp.client_input_&postfix(drop=_name_ _label_);
            id name;
            var value;
        run;
    %end;

    %let drop_vars=entity_primary_key transaction_dttm ELLATAS_JKOD;

    proc json out=_webout pretty nosastags;
        write open object;
            write values "RUNID" "&postfix";
            write values "JKOD" &jkod;
            write values "PARAMS";
                write open array;
                    export pelltmp.client_input_&postfix;
                write close;
            %do i=1 %to &ellatasok_count;
                write values "&&ellatasok&i";
                    write open object;
                        write values "BRM_INPUT";
                            write open array;
                                export pelltmp.&&ellatasok&i.._input_&postfix(drop=UFAZONOSITO);
                            write close;
                        write values "BRM_OUTPUT";
                            write open array;
                                export pelltmp.&&ellatasok&i.._&postfix(drop=&drop_vars);
                            write close;
                    write close;
            %end;
        write close;
    run;

    proc delete
        data =
            %if &debug eq 0 %then %do;
                pelltmp.params_&postfix
                pelltmp.eu_adatok_&postfix
                pelltmp.alapadatok_&postfix
                pelltmp.ev_elemzes_&postfix
                pelltmp.jogviszony_&postfix
                pelltmp.client_input_&postfix
            %end;
            %do i=1 %to &ellatasok_count;
                pelltmp.&&ellatasok&i.._input_&postfix
                pelltmp.&&ellatasok&i.._&postfix
            %end;
            ;
    run;
%mend;

%jogosultsag_szamitas;
