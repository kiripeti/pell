(this.webpackJsonppell=this.webpackJsonppell||[]).push([[0],{144:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(30),s=a.n(r),i=(a(77),a(4)),o=a(23),c=a(17),m=a(5),u=a(6),p=a(8),d=a(7),E=a(28),g=a.n(E),h=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(e){var t=this;return l.a.createElement("div",{style:{width:"80%",margin:"auto",background:"#e1e1e1",border:"1px solid #d1d1d1",padding:0,paddingTop:5,paddingBottom:5}},l.a.createElement("div",{style:{paddingLeft:20,fontSize:"10pt"}},"Azonos\xedt\xf3 k\xf3d:\xa0",l.a.createElement("input",{value:this.props.jkod,onChange:function(e){return t.props.onChange(e.target.value)},type:"text",size:"10",style:{paddingLeft:5}}),l.a.createElement("input",{type:"button",value:" Ok ",onClick:this.props.onClick,className:"button"})))}}]),a}(n.Component),b=function(e){var t=e.message;return l.a.createElement("div",{className:"loadingpage"},l.a.createElement("div",{className:"loading"},l.a.createElement("div",{className:"loading_txt"},t)))},f=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(e){var t=this,a={CUSTOMER:{label:"\xdcgyf\xe9l",description:"Az \xfcgyf\xe9l alap- \xe9s eg\xe9szs\xe9g\xfcgyi adatok"},INCOME:{label:"Jogviszony",description:"Az \xfcgyf\xe9l jogviszony\xe1nak adatai r\xe9szletesen \xe9s \xe9ves bont\xe1sban"},BENEFIT:{label:"Ell\xe1t\xe1sok",description:"Az \xfcgyf\xe9l \xe1ltal ig\xe1nybe vett ell\xe1t\xe1sok"},FAMILY:{label:"Csal\xe1dtagok",description:"Az \xfcgyf\xe9l csal\xe1dtagjai"},RESULT:{label:"Eredm\xe9ny",description:"A lek\xe9rdezett ell\xe1t\xe1sok eredm\xe9nyei"}},r={borderLeft:0,background:"white"},s={borderLeft:"10px solid #DEB306",background:"rgba(222,179,6,0.2)"},i=Object.keys(a).map((function(e){return l.a.createElement("li",{key:e,className:"li_tab",onClick:function(){return t.props.onClick(e)}},l.a.createElement("div",{className:"fold"},l.a.createElement("h3",{className:"h3",style:t.props.selected===e?s:r},a[e].label),l.a.createElement("p",null,a[e].description)))}));return l.a.createElement(n.Fragment,null,i)}}]),a}(n.Component),A=a(35),v=a.n(A),S=a(71),y=(a(85),function(e){var t=e.name,a=e.date,n=e.className,r=e.onChange;return Object(A.registerLocale)("hu",S.a),l.a.createElement(v.a,{selected:a,dateFormat:"yyyy.MM.dd",locale:"hu",className:n||"",onChange:function(e){return r(Object(i.a)({},t,e))},peekNextMonth:!0,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:"select"})}),O=function(e){var t,a=e.name,n=e.value,r=e.type,s=e.className,i=e.onChange;return t="N"===r?function(e){if(!isNaN(e.target.value)){var t=parseFloat(e.target.value),a=isNaN(t)?"":t;i(a)}}:function(e){return i(e.target.value)},l.a.createElement("input",{type:"text",name:a,className:s,value:n,onChange:t})},_=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(m.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).changeData=function(t,a){return function(n){return e.props.updateCustomer(t,0,a,n.target.value)}},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"t1_content",style:{width:"100%",height:"100%",top:0,position:"absolute",textAlign:"center"}},l.a.createElement("div",{id:"data1",style:{margin:"0px auto",width:"100%",height:"100%",textAlign:"center",background:"white",marginTop:2}},JSON.stringify(this.props.eu),l.a.createElement("table",{style:{margin:"0 auto",width:"100%",height:"100%"}},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{valign:"middle",align:"middle"},l.a.createElement("table",null,l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{className:"cell_property"},"Sz\xfclet\xe9si id\u0151:"),l.a.createElement("td",{className:"cell_value"},l.a.createElement(y,{name:"SZUL_DT",className:"cell_input",date:this.props.base.SZUL_DT?this.props.base.SZUL_DT:"",onChange:function(t){return e.props.updateCustomer("ALAP_ADATOK",0,"SZUL_DT",t.SZUL_DT)}})),l.a.createElement("td",{className:"cell_spacer"}),l.a.createElement("td",{className:"cell_property"},"Eg\xe9szs\xe9g\xfcgyi \xe1llapot:"),l.a.createElement("td",{className:"cell_value"},l.a.createElement(O,{type:"N",name:"EU_ALLAPOT",className:"cell_input",value:null!=this.props.eu.EU_ALLAPOT?this.props.eu.EU_ALLAPOT:"",onChange:function(t){return e.props.updateCustomer("EU_ADATOK",0,"EU_ALLAPOT",t)}}),"\xa0%"),l.a.createElement("td",{className:"cell_spacer"}),l.a.createElement("td",{className:"cell_property"},"Keres\u0151 tev\xe9kenys\xe9get v\xe9gez:"),l.a.createElement("td",{className:"cell_value"},l.a.createElement("select",{id:"KER_TEV_FLG",name:"KER_TEV_FLG",className:"combobox",size:"1",value:this.props.params.KER_TEV_FLG?this.props.params.KER_TEV_FLG:"",onChange:function(t){return e.props.setParam({KER_TEV_FLG:t.target.value})}},l.a.createElement("option",{value:""}),l.a.createElement("option",{value:"1"},"Igen"),l.a.createElement("option",{value:"0"},"Nem")))),l.a.createElement("tr",null,l.a.createElement("td",{className:"cell_property"},"Nem:"),l.a.createElement("td",{className:"cell_value"},l.a.createElement("input",{type:"text",name:"NEM",className:"cell_input",value:this.props.base.NEM?this.props.base.NEM:"",onChange:this.changeData("ALAP_ADATOK","NEM")})),l.a.createElement("td",{className:"cell_spacer"}),l.a.createElement("td",{className:"cell_property"},"Rehabilit\xe1lhat\xf3 flag:"),l.a.createElement("td",{className:"cell_value"},l.a.createElement(O,{type:"N",name:"REHABILITALHATO_FL",className:"cell_input",value:null!=this.props.eu.REHABILITALHATO_FL?this.props.eu.REHABILITALHATO_FL:"",onChange:function(t){return e.props.updateCustomer("EU_ADATOK",0,"REHABILITALHATO_FL",t)}})),l.a.createElement("td",{className:"cell_spacer"}),l.a.createElement("td",{className:"cell_property"},"Rendszeres p\xe9nzell\xe1t\xe1sban r\xe9szes\xfcl:"),l.a.createElement("td",{className:"cell_value"},l.a.createElement("select",{id:"RENDSZ_PENZELL_FLG",name:"RENDSZ_PENZELL_FLG",className:"combobox",size:"1",value:this.props.params.RENDSZ_PENZELL_FLG?this.props.params.RENDSZ_PENZELL_FLG:"",onChange:function(t){return e.props.setParam({RENDSZ_PENZELL_FLG:t.target.value})}},l.a.createElement("option",null),l.a.createElement("option",{value:"1"},"Igen"),l.a.createElement("option",{value:"0"},"Nem")))),l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"3"}),l.a.createElement("td",{className:"cell_property"},"\xd6nell\xe1t\xe1sra k\xe9pes flag:"),l.a.createElement("td",{className:"cell_value"},l.a.createElement(O,{type:"N",name:"ONELLATAS_FL",className:"cell_input",value:null!=this.props.eu.ONELLATAS_FL?this.props.eu.ONELLATAS_FL:"",onChange:function(t){return e.props.updateCustomer("EU_ADATOK",0,"ONELLATAS_FL",t)}}))),l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"3"}),l.a.createElement("td",{className:"cell_property"},"Komplex min\u0151s\xedt\xe9s:"),l.a.createElement("td",{className:"cell_value"},l.a.createElement("input",{type:"text",name:"KMPX_MIN",className:"cell_input",value:this.props.eu.KMPX_MIN?this.props.eu.KMPX_MIN:"",onChange:this.changeData("EU_ADATOK","KMPX_MIN")})))))))))))}}]),a}(n.Component),L=a(19),N=function(e){var t=e.name,a=e.label,n=e.value,r=e.selectedValue,s=e.onChange;return l.a.createElement("label",null,l.a.createElement("input",{type:"radio",name:t,value:n,checked:r===n,onChange:function(e){return s(e.target.value)}})," "+a)},T=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"generateHeader",value:function(e){return e.map((function(e){return l.a.createElement("td",{key:e.name,className:"table_header"},e.label)}))}},{key:"generateRows",value:function(e,t){var a=this;return t.map((function(t,n){return a.generateRow(e,t,n)}))}},{key:"generateRow",value:function(e,t,a){return l.a.createElement("tr",{key:a,className:a%2===1?"table_row_alt":"table_row"},e.map((function(e){return l.a.createElement("td",{key:e.name+a,className:"table_cell_"+e.align},t[e.name]instanceof Date?t[e.name].toLocaleDateString("hu-HU"):t[e.name])})))}},{key:"render",value:function(e){return l.a.createElement("table",{id:this.props.id,style:{width:"100%",padding:10,overflow:"auto",marginTop:2}},l.a.createElement("tbody",null,l.a.createElement("tr",null,this.generateHeader(this.props.header)),this.generateRows(this.props.header,this.props.data)))}}]),a}(n.Component),C=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={aggregation_level:"yearly",selectedRow:0},n.headers={yearly:[{name:"EV",align:"R",label:"\xc9v"},{name:"ALKMINKOD",align:"L",label:"ALKMINKOD"},{name:"IRANYITOSZAM",align:"C",label:"IRANYITOSZAM"},{name:"SZOLG_NOK40_NAP",align:"R",label:"SZOLG_NOK40_NAP"},{name:"SZOLG_15_RESZNY",align:"R",label:"SZOLG_15_RESZNY"},{name:"SZOLG_20_TELJ",align:"R",label:"SZOLG_20_TELJ"},{name:"JARULEKALAP",align:"R",label:"JARULEKALAP"},{name:"OSZTONAP",align:"R",label:"OSZTONAP"},{name:"SZOLG_GOND_DIJ_NAP",align:"R",label:"SZOLG_GOND_DIJ_NAP"},{name:"SZOLG_GOND_SEGELY_NAP",align:"R",label:"SZOLG_GOND_SEGELY_NAP"},{name:"SZOLG_NEVEL_TAM_NAP",align:"R",label:"SZOLG_NEVEL_TAM_NAP"},{name:"SZOLG_APOLASI_DIJ_NAP",align:"R",label:"SZOLG_APOLASI_DIJ_NAP"}],detailed:[{name:"TARGYEV",align:"R",label:"TARGYEV"},{name:"FOGLALKOZTATO_AZON",align:"L",label:"FOGLALKOZTATO_AZON"},{name:"ALKMIN",align:"L",label:"ALKMIN"},{name:"ALABONTASKOD",align:"L",label:"ALABONTASKOD"},{name:"ALABONTASERTEK",align:"R",label:"ALABONTASERTEK"},{name:"KEZDESDATUM",align:"C",label:"KEZDESDATUM"},{name:"VEGEDATUM",align:"C",label:"VEGEDATUM"},{name:"OSZTONAP",align:"R",label:"OSZTONAP"},{name:"NYUGDIJBIZTOSITASIJARULEK",align:"R",label:"NYUGDIJBIZTOSITASIJARULEK"},{name:"FOJOGVISZONYNAP",align:"R",label:"FOJOGVISZONYNAP"},{name:"MINOSEG_JEL",align:"L",label:"MINOSEG_JEL"},{name:"MUNKAIDO",align:"L",label:"MUNKAIDO"},{name:"FORRAS_TABLA",align:"L",label:"FORRAS_TABLA"}],new:[{name:"SELECTED",align:"C",label:""},{name:"TARGYEV",align:"C",label:"T\xe1rgy\xe9v"},{name:"ALKMIN",align:"L",label:"ALKMIN"},{name:"KEZDESDATUM",align:"C",label:"Jogviszony kezdete"},{name:"VEGEDATUM",align:"C",label:"Jogviszony v\xe9ge"},{name:"OSZTONAP",align:"C",label:"Oszt\xf3nap"},{name:"NYUGDIJBIZTOSITASIJARULEK",align:"C",label:"J\xf6vedelem"}]},n.radioChange=n.radioChange.bind(Object(L.a)(n)),n.addIncome=n.addIncome.bind(Object(L.a)(n)),n.removeIncome=n.removeIncome.bind(Object(L.a)(n)),n}return Object(u.a)(a,[{key:"radioChange",value:function(e){this.setState({aggregation_level:e})}},{key:"updateIncome",value:function(e,t,a){var n=this.props.new.slice();n[e][t]=a,this.props.updateIncome(n)}},{key:"addIncome",value:function(){var e={};this.headers.new.forEach((function(t){"SELECTED"!==t.name&&(e[t.name]=null)})),this.props.updateIncome([e].concat(Object(o.a)(this.props.new)))}},{key:"removeIncome",value:function(){var e=this.props.new.slice(),t=this.state.selectedRow;e.splice(t,1),this.props.updateIncome(e)}},{key:"columnToInput",value:function(e,t){var a=this,n=null;switch(e.name){case"SELECTED":n=l.a.createElement(N,{name:"selector",value:t,selectedValue:this.state.selectedRow,label:"",onChange:function(e){return a.setState({selectedRow:parseInt(e)})}});break;case"KEZDESDATUM":case"VEGEDATUM":n=l.a.createElement(y,{name:e.name,date:this.props.new[t][e.name]?this.props.new[t][e.name]:"",onChange:function(n){return a.updateIncome(t,e.name,n[e.name])}});break;default:n=l.a.createElement("input",{type:"text",value:this.props.new[t][e.name]?this.props.new[t][e.name]:"",onChange:function(n){return a.updateIncome(t,e.name,parseInt(n.target.value))}})}return n}},{key:"prepareData",value:function(e){var t=this;switch(e){case"new":return this.props.new.map((function(e,a){var n={};return t.headers.new.forEach((function(e){n[e.name]=t.columnToInput(e,a)})),n}));default:return this.props[this.state.aggregation_level]}}},{key:"render",value:function(){return l.a.createElement("div",{id:"t2_content",style:{width:"100%",height:"100%",top:0,position:"absolute",textAlign:"left"}},l.a.createElement("div",{style:{padding:0,fontSize:"15pt",background:"#ece3c0",marginTop:2,width:"100%"}},l.a.createElement("table",{width:"100%",border:"0",cellSpacing:"5",cellPadding:"5"},l.a.createElement("tbody",null,l.a.createElement("tr",{style:{height:45}},l.a.createElement("td",{style:{fontSize:"11pt",whiteSpace:"nowrap"}},l.a.createElement(N,{name:"aggregation_level",value:"yearly",selectedValue:this.state.aggregation_level,label:"\xc9ves \xf6sszes\xedtett adatok",onChange:this.radioChange})),l.a.createElement("td",{className:"cell_spacer"}),l.a.createElement("td",{style:{fontSize:"11pt",whiteSpace:"nowrap"}},l.a.createElement(N,{name:"aggregation_level",value:"detailed",selectedValue:this.state.aggregation_level,label:"R\xe9szletes adatok",onChange:this.radioChange})),l.a.createElement("td",{className:"cell_spacer"}),l.a.createElement("td",{style:{fontSize:"11pt",whiteSpace:"nowrap"}},l.a.createElement(N,{name:"aggregation_level",value:"new",selectedValue:this.state.aggregation_level,label:"Jogviszony hozz\xe1ad\xe1sa",onChange:this.radioChange})),l.a.createElement("td",{style:{width:"100%"},align:"right"},"new"===this.state.aggregation_level&&l.a.createElement("div",{id:"btns",style:{paddingRight:10,paddingBottom:5}},l.a.createElement("input",{type:"button",className:"button",value:" \xdaj jogviszony ",id:"newRowBtn",onClick:this.addIncome}),l.a.createElement("input",{type:"button",className:"button_disabled",value:" Jogviszony t\xf6rl\xe9se",id:"delRowBtn",onClick:this.removeIncome}))))))),l.a.createElement("div",{id:"data2_container",style:{margin:"0px auto",width:"100%",bottom:0,top:40,position:"absolute",textAlign:"left",overflow:"auto"}},l.a.createElement("div",{style:{height:"100%",padding:0}},l.a.createElement("div",{id:"data2",style:{margin:"0px auto",height:"100%",position:"relative",width:"100%",textAlign:"center",overflow:"auto",display:"block"}},l.a.createElement(T,{header:this.headers[this.state.aggregation_level],data:this.prepareData(this.state.aggregation_level)})))))}}]),a}(n.Component),D=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(m.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).headers=[{name:"TSZ",align:"C",label:"TSZ"},{name:"OSSZK",align:"C",label:"OSSZK"},{name:"ALFTF",align:"C",label:"ALFTF"},{name:"SZUL",align:"C",label:"SZUL"},{name:"SZUN",align:"C",label:"SZUN"},{name:"NEM",align:"C",label:"NEM"},{name:"BESZID",align:"C",label:"BESZID"},{name:"NYIND",align:"C",label:"NYIND"},{name:"FKOD",align:"C",label:"FKOD"},{name:"IRSZ",align:"C",label:"IRSZ"},{name:"HELYSEG",align:"C",label:"HELYSEG"},{name:"TELAZ",align:"C",label:"TELAZ"},{name:"JARASKOD",align:"C",label:"JARASKOD"},{name:"ARVA",align:"C",label:"ARVA"},{name:"ORSZJ",align:"C",label:"ORSZJ"},{name:"KSH_MEGYE",align:"C",label:"KSH_MEGYE"},{name:"KISTERSEG",align:"C",label:"KISTERSEG"},{name:"STAT_MEGYE",align:"C",label:"STAT_MEGYE"},{name:"VONHONAP",align:"C",label:"VONHONAP"},{name:"FORRAS_TABLA",align:"C",label:"FORRAS_TABLA"},{name:"KIEGFT",align:"C",label:"KIEGFT"},{name:"KIEGDB",align:"C",label:"KIEGDB"},{name:"SZULEV",align:"C",label:"SZULEV"}],e}return Object(u.a)(a,[{key:"render",value:function(e){return l.a.createElement("div",{id:"t3_content",style:{width:"100%",height:"100%",top:0,position:"absolute",textAlign:"center"}},l.a.createElement("div",{id:"data3",style:{margin:"0px auto",width:"100%",height:"100%",textAlign:"center",overflow:"auto"}},l.a.createElement(T,{header:this.headers,data:this.props.benefits})))}}]),a}(n.Component),k=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={selectedRow:0},n.headers=[{name:"SELECTED",align:"C",label:""},{name:"JKOD",align:"C",label:"Azonos\xedt\xf3"},{name:"SZUL_DT",align:"C",label:"Sz\xfclet\xe9si d\xe1tum"},{name:"TYPE",align:"C",label:"Kapcsolat jellege"}],n.addRow=n.addRow.bind(Object(L.a)(n)),n.removeRow=n.removeRow.bind(Object(L.a)(n)),n}return Object(u.a)(a,[{key:"updateFamily",value:function(e,t,a){var n=this.props.family.slice();n[e][t]=a,this.props.updateFamily(n)}},{key:"addRow",value:function(){var e={};this.headers.forEach((function(t){"SELECTED"!==t.name&&(e[t.name]=null)})),this.props.updateFamily([e].concat(Object(o.a)(this.props.family)))}},{key:"removeRow",value:function(){var e=this.props.family.slice(),t=this.state.selectedRow;e.splice(t,1),this.props.updateFamily(e)}},{key:"columnToInput",value:function(e,t){var a=this,n=null;switch(e.name){case"SELECTED":n=l.a.createElement(N,{name:"selector",value:t,selectedValue:this.state.selectedRow,label:"",onChange:function(e){return a.setState({selectedRow:parseInt(e)})}});break;case"JKOD":n=l.a.createElement("input",{type:"text",value:this.props.family[t][e.name]?this.props.family[t][e.name]:"",onChange:function(n){return a.updateFamily(t,e.name,parseInt(n.target.value))}});break;case"SZUL_DT":n=l.a.createElement(y,{name:e.name,date:this.props.family[t][e.name]?this.props.family[t][e.name]:"",onChange:function(n){return a.updateFamily(t,e.name,n[e.name])}});break;case"TYPE":n=l.a.createElement("select",{name:e.name,className:"combobox",style:{width:168,background:"white",border:"1px black solid"},size:"1",value:this.props.family[t][e.name]?this.props.family[t][e.name]:"",onChange:function(n){return a.updateFamily(t,e.name,parseInt(n.target.value))}},l.a.createElement("option",null),l.a.createElement("option",{value:"1"},"H\xe1zast\xe1rs"),l.a.createElement("option",{value:"2"},"Gyermek"));break;default:n=null}return n}},{key:"prepareData",value:function(){var e=this;return this.props.family.map((function(t,a){var n={};return e.headers.forEach((function(t){n[t.name]=e.columnToInput(t,a)})),n}))}},{key:"render",value:function(e){return l.a.createElement("div",{id:"t2_content",style:{width:"100%",height:"100%",top:0,position:"absolute",textAlign:"left"}},l.a.createElement("div",{style:{padding:0,fontSize:"15pt",background:"#ece3c0",marginTop:2,width:"100%"}},l.a.createElement("table",{width:"100%",border:"0",cellSpacing:"5",cellPadding:"5"},l.a.createElement("tbody",null,l.a.createElement("tr",{style:{height:45}},l.a.createElement("td",{style:{width:"100%"},align:"right"},l.a.createElement("div",{id:"btns",style:{paddingRight:10,paddingBottom:5}},l.a.createElement("input",{type:"button",className:"button",value:" \xdaj csal\xe1dtag ",id:"newRowBtn",onClick:this.addRow}),l.a.createElement("input",{type:"button",className:"button_disabled",value:" Csal\xe1dtag t\xf6rl\xe9se",id:"delRowBtn",onClick:this.removeRow}))))))),l.a.createElement("div",{id:"data2_container",style:{margin:"0px auto",width:"100%",bottom:0,top:40,position:"absolute",textAlign:"left",overflow:"auto"}},l.a.createElement("div",{style:{height:"100%",padding:0}},l.a.createElement("div",{id:"data2",style:{margin:"0px auto",height:"100%",position:"relative",width:"100%",textAlign:"center",overflow:"auto",display:"block"}},l.a.createElement(T,{header:this.headers,data:this.prepareData()})))))}}]),a}(n.Component),w=function(e){var t=e.results;return l.a.createElement("div",{style:{width:"100%",height:"100%",top:0,position:"absolute",textAlign:"center"}},l.a.createElement("div",{id:"output",style:{margin:"0px auto",width:"100%",height:"100%",textAlign:"center",overflow:"auto"}},l.a.createElement(T,{header:[{name:"ELLATAS_NM",align:"C",label:"Ell\xe1t\xe1s neve"},{name:"ELLATAS_START_DT",align:"C",label:"Ell\xe1t\xe1s Kezdete"},{name:"ELLATAS_END_DT",align:"C",label:"Ell\xe1t\xe1s V\xe9ge"},{name:"ELLATAS_DAYS_NUM",align:"C",label:"Ell\xe1t\xe1s hossza"},{name:"ELLATAS_AMOUNT",align:"C",label:"Ell\xe1t\xe1s \xf6sszege"},{name:"ELLATAS_DESC",align:"C",label:"Megjegyz\xe9s"}],data:t})))},I=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(e){var t=null;switch(this.props.selected){case"CUSTOMER":var a=this.props.data.ALAP_ADATOK[0]?this.props.data.ALAP_ADATOK[0]:{},n=this.props.data.EU_ADATOK[0]?this.props.data.EU_ADATOK[0]:{};t=l.a.createElement(_,{base:a,eu:n,updateCustomer:this.props.updateCustomer,setParam:this.props.setParam,params:this.props.params});break;case"INCOME":t=l.a.createElement(C,{yearly:this.props.data.EV_ELEMZES,detailed:this.props.data.JOGVISZONY,new:this.props.newIncome,updateIncome:this.props.updateIncome});break;case"BENEFIT":t=l.a.createElement(D,{benefits:this.props.data.ALLSTAT});break;case"FAMILY":t=l.a.createElement(k,{family:this.props.family,updateFamily:this.props.updateFamily});break;case"RESULT":t=l.a.createElement(w,{results:this.props.results});break;default:t=null}return l.a.createElement("div",{className:"more",style:{height:250,verticalAlign:"top",textTransform:"none"}},t)}}]),a}(n.Component),R=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(e){return l.a.createElement("ul",{className:"tabs",id:"tab_container"},l.a.createElement(f,{selected:this.props.selectedTab,onClick:this.props.updateSelectedTab}),l.a.createElement(I,{selected:this.props.selectedTab,data:this.props.customer,newIncome:this.props.newIncome,updateIncome:this.props.updateIncome,family:this.props.family,updateFamily:this.props.updateFamily,results:this.props.results,updateCustomer:this.props.updateCustomer,setParam:this.props.setParam,params:this.props.params}))}}]),a}(n.Component),j=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(m.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).handleChange=function(t){return e.props.onChange(t.target.value)},e.renderGroup=function(t){for(var a=e.props.benefits.filter((function(e){return e.GROUP===t})),n=[],r=0;r<a.length;r+=3)n.push(l.a.createElement("tr",{key:t+r},new Array(3).fill(0).map((function(e,t){return t})).map((function(e){return r+e})).filter((function(e){return e<a.length})).map((function(n){return l.a.createElement("td",{key:t+n,className:"cell_text",style:{width:Math.round(100/3)+"%"}},l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",value:a[n].ELLATAS_KOD,checked:e.props.selectedBenefits.indexOf(a[n].ELLATAS_KOD)>-1,onChange:e.handleChange})," "+a[n].ELLATAS_NEV))}))));return l.a.createElement("div",{key:t},l.a.createElement("div",{style:{paddingLeft:20,paddingBottom:8,fontSize:13,textTransform:"uppercase",paddingTop:10}},t),l.a.createElement("div",{style:{background:"#fff",padding:5,borderTop:"1px solid #d1d1d1",margin:"0px auto",horizontalAlign:"center"}},l.a.createElement("table",{width:"100%",border:"0",cellPadding:"8"},l.a.createElement("tbody",null,n))))},e}return Object(u.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{id:"benefit_container",style:{position:"relative",top:150,width:"80%",margin:"auto",background:"#e1e1e1",border:"1px solid #d1d1d1",padding:0,paddingBottom:0}},this.props.benefits.map((function(e){return e.GROUP})).filter((function(e,t,a){return a.indexOf(e)===t})).map(this.renderGroup))}}]),a}(n.Component),M=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(m.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).renderParam=function(t){t.NAME.indexOf("_FLG")>-1&&"S"!==t.TYPE&&(t.TYPE="F");var a=null;switch(t.TYPE){case"N":a=l.a.createElement(O,{type:"N",name:t.NAME,className:"cell_input",value:null!=e.props.params[t.NAME]?e.props.params[t.NAME]:"",onChange:function(a){return e.props.setParam(Object(i.a)({},t.NAME,a))}});break;case"S":var n=t.OPTIONS.split(";");if(a=l.a.createElement("select",{name:t.NAME,className:"combobox",size:"1",value:e.props.params[t.NAME]?e.props.params[t.NAME]:"",onChange:function(a){return e.props.setParam(Object(i.a)({},t.NAME,a.target.value))}},l.a.createElement("option",null),n.map((function(e,t){return l.a.createElement("option",{key:t,value:e.split(":")[0]}," ",e.split(":")[1]," ")}))),n.length>1)break;case"C":a=l.a.createElement(O,{type:"C",name:t.NAME,className:"cell_input",value:e.props.params[t.NAME]?e.props.params[t.NAME]:"",onChange:function(a){return e.props.setParam(Object(i.a)({},t.NAME,a))}});break;case"D":a=l.a.createElement(y,{name:t.NAME,className:"cell_input",date:e.props.params[t.NAME]?e.props.params[t.NAME]:"",onChange:e.props.setParam});break;case"F":a=l.a.createElement("select",{name:t.NAME,className:"combobox",size:"1",value:e.props.params[t.NAME]?e.props.params[t.NAME]:"",onChange:function(a){return e.props.setParam(Object(i.a)({},t.NAME,a.target.value))}},l.a.createElement("option",null),l.a.createElement("option",{value:"1"},"Igen"),l.a.createElement("option",{value:"0"},"Nem"));break;default:a=null}return l.a.createElement("tr",{key:t.NAME},l.a.createElement("td",{className:"cell_property_fix"},t.LABEL,":"),l.a.createElement("td",{className:"cell_value"},a))},e}return Object(u.a)(a,[{key:"render",value:function(e){return l.a.createElement("div",{id:"rehab_container",style:{position:"relative",top:180,width:"80%",margin:"auto",background:"#e1e1e1",border:"1px solid #d1d1d1",padding:0,paddingTop:8,paddingBottom:0}},l.a.createElement("div",{style:{paddingLeft:20,paddingBottom:8,fontSize:13,textTransform:"uppercase"}},this.props.benefitDescription+" param\xe9terei"),l.a.createElement("div",{style:{background:"#fff",padding:5,borderTop:"1px solid #d1d1d1",margin:"0px auto",horizontalAlign:"center"}},l.a.createElement("table",{width:"100%",border:"0",cellSpacing:"0",cellPadding:"0"},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{align:"center"},l.a.createElement("table",{border:"0",cellPadding:"8"},l.a.createElement("tbody",null,this.props.benefitParams.map(this.renderParam)))))))))}}]),a}(n.Component),P=function(e){return e?Object(E.fromSasDateTime)(e):null},K=function(e){return e?P(24*e*60*60):null},Z=function(e){return e?Object(E.toSasDateTime)(e):null},F=function(e){return e?Math.floor(Z(e)/24/60/60):null},G=function(e,t,a){return e.map((function(e,n){var l={};if("_ALL_"===t)for(var r in e)e.hasOwnProperty(r)&&(l[r]=a(e[r],n));else t.forEach((function(t){e.hasOwnProperty(t)&&(l[t]=a(e[t],n))}));return Object(c.a)(Object(c.a)({},e),l)}))},U=function(e){for(var t in e)null!=e[t]&&""!==e[t]||delete e[t];return e},z={fromSASDate:K,fromSasDateTime:P,toSASDate:F,toSasDateTime:Z,dtFromSAS2JS:function(e,t){return G(e,t,K)},dttmFromSAS2JS:function(e,t){return G(e,t,P)},dtFromJS2SAS:function(e,t){return G(e,t,F)},dttmFromJS2SAS:function(e,t){return G(e,t,Z)},functionOnColumns:G,removeEmptyKeys:function(e){return e instanceof Array?e.map(U):U(e)}},x=function(e){Object(p.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).call=function(e,t){var a=e.program,l=e.loadingMessage,r=e.tables;n.setState((function(){return{isLoading:!0,loadingMessage:l||"K\xe9rem v\xe1rjon"}}));var s=null;if(r&&Object.keys(r).length>0){var i=Object.keys(r),o=i[0],c=z.removeEmptyKeys(r[o]);s=new g.a.SasData(c,o);for(var m=1;m<i.length;m++){var u=i[m],p=z.removeEmptyKeys(r[u]);s.addTable(p,u)}}n.sas.call(a,s,(function(e,a){n.setState((function(){return{isLoading:!1,loadingMessage:""}})),e?("notLoggedinError"===e.type&&(window.href="/pell"),console.log(e),alert("Hiba l\xe9pett fel a feldolgoz\xe1s sor\xe1n!")):t(a)}))},n.componentDidMount=function(){return n.call({program:"getBenefits",loadingMessage:"Adatok let\xf6lt\xe9se"},(function(e){return n.setState((function(){return{benefits:e.benefits.sort((function(e,t){return e.GROUP<t.GROUP||e.ELLATAS_NEV<t.ELLATAS_NEV?-1:1})),benefitParams:e.benefitParams.sort((function(e,t){return e.ORDER-t.ORDER}))}}))}))},n.jkodClick=function(){var e=n.state.jkod;""!==e&&n.call({program:"getCustomer",loadingMessage:"\xdcgyf\xe9l bet\xf6lt\xe9se",tables:{jkod:[{jkod:e}]}},(function(t){n.setState((function(a){return{isCustomerLoaded:!0,customer:{ALAP_ADATOK:z.dtFromSAS2JS(t.alap_adatok,["SZUL_DT"]),EU_ADATOK:t.eu_adatok,EV_ELEMZES:t.ev_elemzes,JOGVISZONY:z.functionOnColumns(t.jogviszony,["KEZDESDATUM","VEGEDATUM"],(function(e){return z.fromSasDateTime(e).toLocaleDateString("hu-HU")})),ALLSTAT:t.allstat},params:Object(c.a)(Object(c.a)({},a.params),{UFAZONOSITO:e,JKOD:e})}}))}))},n.calculate=function(){var e=n.state.benefitParams.filter((function(e){return"D"===e.TYPE})).map((function(e){return e.NAME})).filter((function(e,t,a){return a.indexOf(e)===t}));n.call({program:"calculateBenefits",loadingMessage:"Sz\xe1m\xedt\xe1s",tables:{params:z.dtFromJS2SAS([n.state.params],["LEKERDEZES_DT"].concat(Object(o.a)(e))),alap_adatok:z.dtFromJS2SAS(n.state.customer.ALAP_ADATOK,["SZUL_DT"]),eu_adatok:n.state.customer.EU_ADATOK,new_income:z.dttmFromJS2SAS(n.state.newIncome,["KEZDESDATUM","VEGEDATUM"]),family:z.dtFromJS2SAS(n.state.family,["SZUL_DT"]),benefits:n.state.selectedBenefits.map((function(e){return{benefit:e}}))}},(function(e){var t={},a=z.dtFromSAS2JS(e.results,["ELLATAS_START_DT","ELLATAS_END_DT"]);a=a.map((function(e){var t=e.ELLATAS_CD,a=n.state.benefits.filter((function(e){return e.ELLATAS_KOD===t}))[0].ELLATAS_NEV;return Object(c.a)(Object(c.a)({},e),Object(i.a)({},"ELLATAS_NM",a))})),n.state.selectedBenefits.forEach((function(a){e["brm_input_"+a]&&(t[a]=e["brm_input_"+a])})),window.scrollTo(0,0),n.setState({selectedTab:"RESULT",results:a,brm_inputs:t})}))},n.jkodChange=function(e){return n.setState((function(){return{jkod:e}}))},n.updateSelectedTab=function(e){return n.setState({selectedTab:e})},n.updateIncome=function(e){return n.setState((function(t){return{newIncome:e}}))},n.updateFamily=function(e){return n.setState((function(t){return{family:e}}))},n.setParam=function(e){return n.setState((function(t){return{params:Object(c.a)(Object(c.a)({},t.params),e)}}))},n.updateCustomer=function(e,t,a,l){return n.setState((function(n){var r=Object.assign({},n.customer);return r[e][t]||(r[e][t]={}),r[e][t][a]=l,{customer:r}}))},n.handleBenefitChange=function(e){n.setState((function(t){return t.selectedBenefits.indexOf(e)>-1?{selectedBenefits:t.selectedBenefits.filter((function(t){return t!==e}))}:{selectedBenefits:[].concat(Object(o.a)(t.selectedBenefits),[e]).sort()}}))},n.state={isLoading:!1,loadingMessage:"",isCustomerLoaded:!1,jkod:"",selectedJkod:"",customer:{ALAP_ADATOK:[],EU_ADATOK:[],EV_ELEMZES:[],JOGVISZONY:[],ALLSTAT:[]},params:{LEKERDEZES_DT:new Date,DONTES_KIIR:1},selectedBenefits:[],benefits:[],benefitParams:[],selectedTab:"CUSTOMER",newIncome:[],family:[],results:[],brm_inputs:{}},n.sas=new g.a({metadataRoot:"/PELL/Stored Processes/",debug:!0,maxXhrRetries:0}),n}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return this.state.isLoading?l.a.createElement(b,{message:this.state.loadingMessage}):l.a.createElement(n.Fragment,null,l.a.createElement("header",{className:"navbar navbar-expand-lg navbar-light bg-faded"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},l.a.createElement("ul",{className:"menu navbar-nav mr-auto",id:"mainmenu",style:{paddingTop:2,paddingBottom:2}},l.a.createElement("li",{className:"nav-item item-210 deeper parent"},l.a.createElement("a",{style:{color:"#deb306"}},"Egys\xe9ges \xfcgyf\xe9lk\xe9p")),l.a.createElement("li",{className:"nav-item item-207"},l.a.createElement("a",{className:"nav-link",href:"/"},"Szcen\xe1ri\xf3 elemz\xe9s")),l.a.createElement("li",{className:"nav-item item-207"},l.a.createElement("a",{className:"nav-link",href:"/"},"Keresztmetszet vizsg\xe1lat")))))),l.a.createElement("div",{className:"body"},l.a.createElement("div",{className:"content"},l.a.createElement("div",{className:"header"},l.a.createElement("h2",{style:{color:"#CEC7BA",paddingBottom:25}}," Egys\xe9ges \xfcgyf\xe9lk\xe9p "),l.a.createElement("p",{style:{fontSize:"11pt"}},"A jogosults\xe1gi t\xf6rt\xe9net alapj\xe1n milyen ellet\xe1sok vehet\u0151k ig\xe9nybe.")),l.a.createElement("div",{className:"request"},l.a.createElement(h,{jkod:this.state.jkod,onChange:this.jkodChange,onClick:this.jkodClick}),this.state.isCustomerLoaded&&l.a.createElement(n.Fragment,null,l.a.createElement(R,{selectedTab:this.state.selectedTab,customer:this.state.customer,newIncome:this.state.newIncome,family:this.state.family,results:this.state.results,params:this.state.params,updateCustomer:this.updateCustomer,updateSelectedTab:this.updateSelectedTab,updateIncome:this.updateIncome,updateFamily:this.updateFamily,setParam:this.setParam}),l.a.createElement(j,{onChange:this.handleBenefitChange,benefits:this.state.benefits,selectedBenefits:this.state.selectedBenefits})),this.state.selectedBenefits.length>0&&l.a.createElement(n.Fragment,null,this.state.selectedBenefits.map((function(t){return l.a.createElement(M,{key:t,benefit:t,benefitParams:e.state.benefitParams.filter((function(e){return e.ELLATAS_CD===t})),benefitDescription:e.state.benefits.filter((function(e){return e.ELLATAS_KOD===t}))[0].ELLATAS_NEV,params:e.state.params,setParam:e.setParam})})),l.a.createElement("div",{id:"bottom_container",style:{position:"relative",top:180,width:"80%",margin:"auto",background:"#e1e1e1",border:"1px solid #d1d1d1",padding:0,paddingTop:8,paddingBottom:10,paddingLeft:0}},l.a.createElement("table",{border:"0",cellPadding:"8",style:{marginLeft:20}},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{className:"cell_text"},"Vizsg\xe1lt id\u0151pont:"),l.a.createElement("td",{className:"cell_spacer"}),l.a.createElement("td",{className:"cell_text"},l.a.createElement(y,{name:"LEKERDEZES_DT",date:this.state.params.LEKERDEZES_DT,onChange:this.setParam}))),l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"2"}),l.a.createElement("td",null,l.a.createElement("input",{type:"button",className:"button",style:{marginLeft:0},value:" Sz\xe1mol ",onClick:this.calculate})))))))))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},72:function(e,t,a){e.exports=a(144)},77:function(e,t,a){}},[[72,1,2]]]);
//# sourceMappingURL=main.72daaf26.chunk.js.map