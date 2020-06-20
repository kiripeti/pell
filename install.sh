#!/bin/bash

SASE=/sas/decman/Lev1/SASApp/SASEnvironment
HTDOC=/sas/decman/Lev1/Web/WebServer/htdocs

curl https://codeload.github.com/kiripeti/pell/zip/master > pell-master.zip
unzip pell-master.zip

cp pell-master/SAS/SASMacro/init_stp.sas > ${SASE}/SASMacro/init_stp.sas
cp pell-master/SAS/SASMacro/preprocess.sas > ${SASE}/SASMacro/preprocess.sas
cp pell-master/SAS/STP/calculateBenefits.sas > ${SASE}/SASCode/STP/calculateBenefits.sas
cp pell-master/SAS/STP/getBenefits.sas > ${SASE}/SASCode/STP/getBenefits.sas
cp pell-master/SAS/STP/getCustomer.sas > ${SASE}/SASCode/STP/getCustomer.sas

rm -R ${HTDOC}/pell-react
cp -R pell-master/build ${HTDOC}/pell-react

rm -R pell-master
rm pell-master.zip
