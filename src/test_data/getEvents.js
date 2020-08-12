export const events = {
    "events": [
        {
            "EVENT_CD": "GY_SZUL",
            "EVENT_DESC": "Gyermek születése"
        },
        {
            "EVENT_CD": "BETEG",
            "EVENT_DESC": "Betegség"
        },
        {
            "EVENT_CD": "MM",
            "EVENT_DESC": "Megváltozott munkaképesség"
        },
        {
            "EVENT_CD": "TBSF",
            "EVENT_DESC": "Gyermek vagy hozzátartozó fogyatékossága/tartós betegsége"
        },
        {
            "EVENT_CD": "ARVA",
            "EVENT_DESC": "Szülő halála"
        },
        {
            "EVENT_CD": "OZV",
            "EVENT_DESC": "Házastárs halála"
        },
        {
            "EVENT_CD": "JOGSZ",
            "EVENT_DESC": "Jogszerzés"
        }
    ],
    "eventParams": [
        {
            "EVENT_CD": "GY_SZUL",
            "ORDER": 1,
            "NAME": "GY_SZUL_DT",
            "TYPE": "D",
            "LABEL": "Gyermek (várható) születési dátuma",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "GY_SZUL",
            "ORDER": 2,
            "NAME": "AT_OPERATE_FLG",
            "TYPE": "N",
            "LABEL": "Anyasági támogatást igénybe veszi?",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "GY_SZUL",
            "ORDER": 3,
            "NAME": "CSP_OPERATE_FLG",
            "TYPE": "N",
            "LABEL": "Családi pótlékot igénybe veszi?",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "GY_SZUL",
            "ORDER": 4,
            "NAME": "CSED_OPERATE_FLG",
            "TYPE": "N",
            "LABEL": "Csecsemőgondozási díjat igénybe veszi?",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "GY_SZUL",
            "ORDER": 5,
            "NAME": "GYED_OPERATE_FLG",
            "TYPE": "N",
            "LABEL": "Gyermekgondozási díjat igénybe veszi?",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "GY_SZUL",
            "ORDER": 6,
            "NAME": "GYES_OPERATE_FLG",
            "TYPE": "N",
            "LABEL": "Gyermekgondozást segítő ellátást igénybe veszi?",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "GY_SZUL",
            "ORDER": 7,
            "NAME": "GYET_OPERATE_FLG",
            "TYPE": "N",
            "LABEL": "Gyermeknevelési támogatást igénybe veszi?",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "GY_SZUL",
            "ORDER": 8,
            "NAME": "WORK_RESTART",
            "TYPE": "D",
            "LABEL": "Tervezett (újbóli) munkábaallás időpontja",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "GY_SZUL",
            "ORDER": 13,
            "NAME": "UTOLSO_BER_FLG",
            "TYPE": "N",
            "LABEL": "Utolsó bérről indul?",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "JOGSZ",
            "ORDER": 1,
            "NAME": "START_AMT",
            "TYPE": "N",
            "LABEL": "Kiinduló összeg",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "JOGSZ",
            "ORDER": 2,
            "NAME": "DINAMIKA",
            "TYPE": "S",
            "LABEL": "A jövedelemszerzés hogyan folytatódik?",
            "OPTIONS": "0:Jövedelemszerzés nominálértékben folytatódik;1:Jövedelemszerzés a bérdinamikának megfelelően folytatódik;0.5:Jövedelemszerzés a bérdinamika felében folytatódik;2:Jövedelemszerzés a bérdinamika kétszeresében folytatódik;-1:A jövedelemszerzés megszűnése"
        },
        {
            "EVENT_CD": "JOGSZ",
            "ORDER": 3,
            "NAME": "START_DT",
            "TYPE": "D",
            "LABEL": "Jövedelemszerzés kezdetének időpontja",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "JOGSZ",
            "ORDER": 4,
            "NAME": "END_DT",
            "TYPE": "D",
            "LABEL": "Jövedelemszerzés végének időpontja",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "JOGSZ",
            "ORDER": 5,
            "NAME": "ONAP",
            "TYPE": "N",
            "LABEL": "Osztónapok száma",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "JOGSZ",
            "ORDER": 6,
            "NAME": "ALKMIN",
            "TYPE": "C",
            "LABEL": "Jövedelemszerzéshez tartozó alkmin kód",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "BETEG",
            "ORDER": 1,
            "NAME": "TP_HOSSZ",
            "TYPE": "N",
            "LABEL": "Előreláthatóán hány napig lesz táppénzen? ( max két év)",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "MM",
            "ORDER": 1,
            "NAME": "UTOLSO_BER_FLG",
            "TYPE": "N",
            "LABEL": "Ha rehabilitálható, utolsó bérről indul?",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "TBSF",
            "ORDER": 1,
            "NAME": "VARHATO_GYOGYULAS",
            "TYPE": "S",
            "LABEL": "Várhatóan mikor gyógyul?",
            "OPTIONS": "0:Rövidtáv (1 év); 1:Középtáv (3 év); 2:Hosszútáv (5 év);"
        },
        {
            "EVENT_CD": "TBSF",
            "ORDER": 2,
            "NAME": "UTOLSO_BER_FLG",
            "TYPE": "N",
            "LABEL": "Utolsó bérről indul?",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "ARVA",
            "ORDER": 1,
            "NAME": "ARVA_WORK_FLG",
            "TYPE": "N",
            "LABEL": "Dolgozik árvaellátás közben?",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "ARVA",
            "ORDER": 2,
            "NAME": "ARVA_WORK_AMT",
            "TYPE": "N",
            "LABEL": "Árvaellátás alatt szerzett jövedelem",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "ARVA",
            "ORDER": 3,
            "NAME": "UTOLSO_BER_FLG",
            "TYPE": "N",
            "LABEL": "Utolsó bérről indul?",
            "OPTIONS": ""
        },
        {
            "EVENT_CD": "OZV",
            "ORDER": 1,
            "NAME": "UTOLSO_BER_FLG",
            "TYPE": "N",
            "LABEL": "Utolsó bérről indul, ha tartós özvegyi nyugdíjra még nem jogosult?",
            "OPTIONS": ""
        }
    ],
    "eventBenefits": [
        {
            "EVENT_CD": "GY_SZUL",
            "BENEFIT_CD": "AT",
            "ORDER": null
        },
        {
            "EVENT_CD": "GY_SZUL",
            "BENEFIT_CD": "CSP",
            "ORDER": null
        },
        {
            "EVENT_CD": "GY_SZUL",
            "BENEFIT_CD": "CSED",
            "ORDER": 1
        },
        {
            "EVENT_CD": "GY_SZUL",
            "BENEFIT_CD": "GYED",
            "ORDER": 2
        },
        {
            "EVENT_CD": "GY_SZUL",
            "BENEFIT_CD": "GYES",
            "ORDER": 3
        },
        {
            "EVENT_CD": "GY_SZUL",
            "BENEFIT_CD": "GYET",
            "ORDER": 4
        },
        {
            "EVENT_CD": "BETEG",
            "BENEFIT_CD": "TP",
            "ORDER": 1
        },
        {
            "EVENT_CD": "MM",
            "BENEFIT_CD": "ROKKANT",
            "ORDER": 1
        },
        {
            "EVENT_CD": "MM",
            "BENEFIT_CD": "REHAB",
            "ORDER": 1
        },
        {
            "EVENT_CD": "MM",
            "BENEFIT_CD": "AKE",
            "ORDER": 2
        },
        {
            "EVENT_CD": "MM",
            "BENEFIT_CD": "AKGY",
            "ORDER": 3
        },
        {
            "EVENT_CD": "MM",
            "BENEFIT_CD": "NKGY",
            "ORDER": null
        },
        {
            "EVENT_CD": "TBSF",
            "BENEFIT_CD": "GYOD",
            "ORDER": null
        },
        {
            "EVENT_CD": "TBSF",
            "BENEFIT_CD": "AD",
            "ORDER": null
        },
        {
            "EVENT_CD": "ARVA",
            "BENEFIT_CD": "ARVA",
            "ORDER": 1
        },
        {
            "EVENT_CD": "OZV",
            "BENEFIT_CD": "OZV",
            "ORDER": 1
        }
    ],
    "usermessage": "blank",
    "logmessage": "blank",
    "requestingUser": "sasinst",
    "requestingPerson": "sasinst",
    "executingPid": 78681,
    "sasDatetime": 1912845591.4,
    "status": "success"
};