#!/bin/bash

SASE=/sas/decman/Lev1/SASApp/SASEnvironment
HTDOC=/sas/decman/Lev1/Web/WebServer/htdocs
TAG=${1}

if [ -z "${2}" ] 
then
    WEBAPP_TARGET=${HTDOC}/pell-react
else
    WEBAPP_TARGET=${HTDOC}/${2}
fi

curl https://codeload.github.com/kiripeti/pell/zip/${TAG} > pell-${TAG}.zip
unzip pell-${TAG}.zip

cp -Rv pell-${TAG}/SAS/SASMacro ${SASE}
cp -Rv pell-${TAG}/SAS/STP ${SASE}/SASCode

rm -R ${WEBAPP_TARGET}
cp -Rv pell-${TAG}/build ${WEBAPP_TARGET}

cp -Rv pell-${TAG}/redirect/pell ${HTDOC}
cp -Rv pell-${TAG}/redirect/pell-tst ${HTDOC}

rm -R pell-${TAG}
rm pell-${TAG}.zip
