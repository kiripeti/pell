import React from 'react';
import ReactDatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import hu from 'date-fns/locale/hu';

import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({name, date, className, onChange}) => {
  registerLocale('hu', hu);

  return (
    <ReactDatePicker
      selected={date}
      dateFormat='yyyy.MM.dd'
      locale="hu"
      className={className ? className : ''}
      onChange={(date) => onChange({[name]: date})}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select" />
  );
};

export default DatePicker;
