#!/bin/bash

SASE=/sas/decman/Lev1/SASApp/SASEnvironment
HTDOC=/sas/decman/Lev1/Web/WebServer/htdocs
TAG=${1}

curl https://codeload.github.com/kiripeti/pell/zip/${TAG} > pell-${TAG}.zip
unzip pell-${TAG}.zip

cp -Rv pell-${TAG}/SAS/SASMacro ${SASE}
cp -Rv pell-${TAG}/SAS/STP ${SASE}/SASCode

rm -R ${HTDOC}/pell-react
cp -Rv pell-${TAG}/build ${HTDOC}/pell-react

rm -R pell-${TAG}
rm pell-${TAG}.zip
