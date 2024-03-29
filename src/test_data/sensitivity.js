export const getParamTables = {
  "runid":
    [{ "RUNID": "sasinst105134" }],
  "param_tables":
    [{ "TABLA": "ANYASAGI_PARAMS" }, { "TABLA": "NYUGDIJMINIMUM_PARAMS" }],
  "ANYASAGI_PARAMS":
    [{ "VARGOND_TARGET_NUM": "4", "VARGOND_KORASZULOTT": 1, "ELLATAS_PCT": 225, "ELLATAS_IKER_PCT": 300, "MIN_KULFOLDI_TART": 5, "IDOABLAK": 6 }],
  "NYUGDIJMINIMUM_PARAMS":
    [{ "NYUGDIJMINIMUM": 28500 }],
  "usermessage": "blank",
  "logmessage": "blank",
  "requestingUser": "sasinst",
  "requestingPerson": "sasinst",
  "executingPid": 35813,
  "sasDatetime": 1914835894,
  "status": "success"
};

export const getSensitivityStatus = {
  "runid":
    [{ "RUNID": "sasinst105330" }],
  "sensitivityStatus":
    [{ "RUNID": "sasinst182334", "USER": "sasinst", "START_DTTM": 1914603814, "END_DTTM": null, "STATUS": "RUNNING", "BENEFIT_CODE": "GYOD", "BENEFIT_NAME": "Gyermekek otthongondozási díja" }, { "RUNID": "sasinst182616", "USER": "sasinst", "START_DTTM": 1914603976, "END_DTTM": 1914603982.8, "STATUS": "FINISHED", "BENEFIT_CODE": "GYOD", "BENEFIT_NAME": "Gyermekek otthongondozási díja" }, { "RUNID": "sasinst185040", "USER": "sasinst", "START_DTTM": 1914605440, "END_DTTM": 1914605457, "STATUS": "FINISHED", "BENEFIT_CODE": "GYOD", "BENEFIT_NAME": "Gyermekek otthongondozási díja" }],
  "usermessage": "blank",
  "logmessage": "blank",
  "requestingUser": "sasinst",
  "requestingPerson": "sasinst",
  "executingPid": 35813,
  "sasDatetime": 1914836010.2,
  "status": "success"
};

export const getSensitivityResult = {
  "runid":
    [{ "RUNID": "sasinst105418" }],
  "result":
    [{ "STATISTIC": "Minta elemszám", "ORIGINAL": "10", "MODIFIED": "10" }, { "STATISTIC": "Jogosultak száma", "ORIGINAL": "3", "MODIFIED": "5" }, { "STATISTIC": "Jogosultak aránya", "ORIGINAL": "30,00%", "MODIFIED": "50,00%" }, { "STATISTIC": "Összeg", "ORIGINAL": "300000", "MODIFIED": "500000" }, { "STATISTIC": "Jogosultak száma (különbség)", "ORIGINAL": "1", "MODIFIED": "3" }],
  "params":
    [{ "PARAMETERTABLA": "GYOD_PARAMS", "POSTFIX_FIZIKAI_NEV": "P_GYOD_&postfix." }],
  "GYOD_PARAMS_O":
    [{ "GYOD_ALAPOSSZEG": 124000, "NYUGDIJJARULEK": 10, "TOBBSZEREK_SZORZO": 1.5 }],
  "GYOD_PARAMS_M":
    [{ "GYOD_ALAPOSSZEG": 124000000, "NYUGDIJJARULEK": 10, "TOBBSZEREK_SZORZO": 1.5 }],
  "usermessage": "blank",
  "logmessage": "blank",
  "requestingUser": "sasinst",
  "requestingPerson": "sasinst",
  "executingPid": 35813,
  "sasDatetime": 1914836057.7,
  "status": "success"
};
