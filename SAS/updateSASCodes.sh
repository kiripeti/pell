#!/bin/bash

SASENVIRONMENT=$1
curl https://raw.githubusercontent.com/kiripeti/pell/master/SAS/SASMacro/init_stp.sas > ${SASENVIRONMENT}/SASMacro/init_stp.sas
curl https://raw.githubusercontent.com/kiripeti/pell/master/SAS/SASMacro/preprocess.sas > ${SASENVIRONMENT}/SASMacro/preprocess.sas
curl https://raw.githubusercontent.com/kiripeti/pell/master/SAS/STP/calculateBenefits.sas > ${SASENVIRONMENT}/SASCode/STP/calculateBenefits.sas
curl https://raw.githubusercontent.com/kiripeti/pell/master/SAS/STP/getBenefits.sas > ${SASENVIRONMENT}/SASCode/STP/getBenefits.sas
curl https://raw.githubusercontent.com/kiripeti/pell/master/SAS/STP/getCustomer.sas > ${SASENVIRONMENT}/SASCode/STP/getCustomer.sas
