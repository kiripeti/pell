/*
GENERATE_RANDOM_DATA

Leírás:
    Előállít egy szintetikus adattáblát egy, a változókat és eloszlásukat leíró metatábla, valamint egy kulcslista alapján.

Paraméterek:
    CONTROL_TABLE: bemeneti, változókat és eloszlásokat tartalmazó tábla neve
    KEYS: bemeneti kulcslistát tartalmazó tábla neve
    DSOUT: kimeneti adattábla neve
    SEED (opc.): eredmény reprodukáláshoz szükséges seed

Bemeneti táblák elvárt struktúrája:
    CONTROL_TABLE:
        VARIABLE (*): változó neve (32-nél kevesebb karakter)
        TYPE: változó típusa (CHAR/NUM)
        LENGTH: változó hossza (csak TYPE='CHAR' esetében kerül feldolgozásra)
        DISTRIBUTION: eloszlás, értékek: RAND függvény 1. paramétere
            https://documentation.sas.com/?docsetId=lefunctionsref&docsetTarget=p0fpeei0opypg8n1b06qe4r040lv.htm&docsetVersion=9.4&locale=en
            kategória típusú változó esetén megadható a CATEGORY érték, speciális eloszlással
        DISTRIBUTION_PARAMS: eloszláshoz tartozó paraméterek, értékek RAND függvény 2.- paraméterei (eloszlástól függően)
            DISTRIBUTION='CATEGORY' esetén érték: érték_1, gyakoriság_1, érték_2, gyakoriság_2, ..., érték_n, gyakoriság_n
            törtszám gyakoriság tizedesponttal adandó meg
        NULL_RATIO: hiányzó értékek aránya (tizedesponttal megadott törtszám), kitöltés opcionális
        ROUND_DECIMALS: kerekítés szükségessége esetén a tizedesjegyek száma
    KEYS:
        {tetszőleges név} (*): kulcs

Kimeneti táblák struktúrája:
    DSOUT:
        {KEYS-ben megadott név}: kulcs
        {...a CONTROL_TABLE tábla VARIABLE mezőjében megadott változónevek...}: a megfelelő változó random generált értéke

*/

%macro _get_variable_list(control_table);

    %global variables; 

    proc sql noprint;
        select
                VARIABLE
            into
                :variables separated by '|'
        from &control_table.
        ;
    quit;

%mend _get_variable_list;


%macro _count_records(keys);

    %global n_records;

    proc sql noprint;
        select count(*) into :n_records from &keys.;
    quit;

%mend _count_records;


%macro _generate_random_var(n_records, variable, control_table, seed, dsvar);

    %local _type _length _dist _dparms;

    proc sql noprint;
        select
                case when upcase(TYPE) = 'CHAR' then '$' else '' end as T,
                case when upcase(TYPE) = 'CHAR' then LENGTH else 8 end as L,
                upcase(DISTRIBUTION) as D,
                case when DISTRIBUTION = 'CATEGORY' then ktranslate(DISTRIBUTION_PARAMS, '|', ',') else DISTRIBUTION_PARAMS end as P,
                NULL_RATIO as NR,
                ROUND_DECIMALS as RD,
                COMMENT as C
            into
                :_type trimmed,
                :_length trimmed,
                :_dist trimmed,
                :_dparms trimmed,
                :_nullrat trimmed,
                :_rounddec trimmed,
                :_comment trimmed
        from &control_table.
        where VARIABLE = "&variable."
        ;
    quit;

    %if &_dist.=CATEGORY %then %do;

        %local _n_categs _freqs _rfreqs _i;
        %let _n_categs = %sysevalf((%sysfunc(count(&_dparms., |))+1)/2, INTEGER);
        
        %do _i=1 %to &_n_categs.;
            %local _categ_&_i. _freq_&_i.;

            %let _categ_&_i. = %scan(&_dparms., %eval(((&_i.-1) * 2)+1), |);

            %if %qupcase(&&_categ_&_i..) = _NULL_ %then %do;
                %let _categ_&_i.=;
            %end;

            %let _freq_&_i. = %scan(&_dparms., %eval(((&_i.-1) * 2)+1+1), |);
            %if &_i. = 1 %then %do;
                %let _freqs = &&_freq_&_i..;
            %end;
            %else %do;
                %let _freqs = &_freqs. + &&_freq_&_i..;
            %end;
        %end;

        %do _i=1 %to &_n_categs.;
            %local _rfreq_&_i.;

            %let _rfreq_&_i. = %sysevalf(&&_freq_&_i.. / (&_freqs.));
            %if &_i. = 1 %then %do;
                %let _rfreqs = &&_rfreq_&_i..;
            %end;
            %else %do;
                %let _rfreqs = &_rfreqs., &&_rfreq_&_i..;
            %end;
        %end;

        %let _dist=TABLE;
        %if %length(&_rfreqs.) ne 0 %then %do;
           %let _dparms=, &_rfreqs.;
        %end;

        data &dsvar. (keep=&variable.);
            length &variable. &_type. &_length.;
            call streaminit(&seed.);
            do _i=1 to &n_records.;
                %if &_nullrat. ne %then %do;
                    if rand('BERNOULLI', &_nullrat.) then do;
                        call missing(&variable.);
                    end;
                    else do;
                        variable_code = rand("&_dist." &_dparms.);
                    %if &_type.=$ %then %do;
                        &variable. = symget(cats("_categ_", variable_code));
                    %end;
                    %else %do;
                        &variable. = input(symget(cats("_categ_", variable_code)), 32.);
                    %end;
                    end;
                %end;
                %else %do;
                    variable_code = rand("&_dist." &_dparms.);
                    %if &_type.=$ %then %do;
                        &variable. = symget(cats("_categ_", variable_code));
                    %end;
                    %else %do;
                        &variable. = input(symget(cats("_categ_", variable_code)), 32.);
                    %end;
                %end;

                output;
            end;
        run;
    %end;

    %else %do;

        %if %length(&_dparms.) ne 0 %then %do;
           %let _dparms=, &_dparms.;
        %end;

        data &dsvar. (keep=&variable.);
            length &variable. &_type. &_length.;
            call streaminit(&seed.);
            do _i = 1 to &n_records.;
                %if &_nullrat. ne %then %do;
                    if rand('BERNOULLI', &_nullrat.) then do;
                        call missing(&variable.);
                    end;
                    else do;
                        &variable. = rand("&_dist." &_dparms.);
                    end;
                %end;
                %else %do;
                    &variable. = rand("&_dist." &_dparms.);
                %end;
                %if %length(&_rounddec.) ne 0 and &_rounddec. ne . %then %do;
                    &variable. = round(&variable., 1e-&_rounddec.);
                %end;
                output;
            end;
        run;

    %end;

%mend _generate_random_var;


%macro _init_result_table(keys, dsout);

    data &dsout.;
        set &keys.;
    run;

%mend _init_result_table;


%macro _merge_variable_to_results(dsvar, dsall);

    data &dsall.;
        merge &dsall. (in=_k) &dsvar.;
        if _k;
    run;

    proc sql noprint;
        drop table &dsvar.;
    quit;

%mend _merge_variable_to_results;


%macro generate_random_data(control_table, keys, dsout, seed=42);

    %global variables n_records;

    %local _i _variable _dsvar;

    %_get_variable_list(&control_table.);
    %_count_records(&keys.);

    %_init_result_table(
        keys=&keys.,
        dsout=&dsout.
    );

    %let _n_vars = %eval(%sysfunc(count(&variables., |)) + 1);

    %do _i=1 %to &_n_vars.;

        
        %let _variable = %scan(&variables., &_i., |);
        %let _dsvar = work._tmp;

        %_generate_random_var(
            n_records=&n_records.,
            variable=&_variable.,
            control_table=&control_table.,
            seed=%eval(&seed. + &_i.),
            dsvar=&_dsvar.
        );

        
        %_merge_variable_to_results(
            dsvar=&_dsvar.,
            dsall=&dsout.
        );
        
        
    %end;

%mend generate_random_data;
