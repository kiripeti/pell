%macro genOutput();
    %let rc = %sysfunc(stpsrv_header(Content-type, text/plain%str(;) encoding=windows-1250));
    %let rc = %sysfunc(stpsrv_header(Cache-control, no-cache));

	data _null_;
		file _webout;
		put "hellowordld";
	run;

%mend;
%genOutput();
