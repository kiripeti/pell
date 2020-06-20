#!/bin/bash

SASE=/sas/decman/Lev1/SASApp/SASEnvironment
HTDOC=/sas/decman/Lev1/Web/WebServer/htdocs

curl https://codeload.github.com/kiripeti/pell/zip/master > pell-master.zip
unzip pell-master.zip

cp -Rv pell-master/SAS/SASMacro ${SASE}/SASMacro
cp -Rv pell-master/SAS/STP ${SASE}/SASCode/STP

rm -R ${HTDOC}/pell-react
cp -Rv pell-master/build ${HTDOC}/pell-react

rm -R pell-master
rm pell-master.zip
