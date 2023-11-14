import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import "./style.css";
import { Alert, FormControl } from "@mui/material";

registerLocale("es", es);

const CustomDatePicker: React.FC<any> = ({
  formikProps,
  dateReserva,
  setDisableButton,
}) => {
  /*  console.log([].concat(...dateReserva)); */
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  let allDate: Date[] = [];
  const handleDateChange = (date: Date | null) => {
    if (date) {
      if (!startDate || (startDate && endDate)) {
        setStartDate(date);
        setEndDate(null);
      } else if (date && startDate && date > startDate) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    }
  };

  const isDateValid = (date: Date | null): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  const dayClassNames = (date: Date) => {
    let classes = isDateValid(date) ? "" : "custom-day-invalid";
    if (startDate && date.toDateString() === startDate.toDateString()) {
      classes += " custom-day-start";
    }
    if (endDate && date.toDateString() === endDate.toDateString()) {
      classes += " custom-day-end";
    }
    if (startDate && endDate && date > startDate && date < endDate) {
      classes += " custom-day-between";
    }
    return classes;
  };

  // Crear un array de fechas para resaltar todas las fechas entre startDate y endDate
  useEffect(() => {
    const highlightedDates: Date[] = [];
    if (startDate && endDate) {
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        highlightedDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      if (startDate) {
        allDate.push(startDate);
      }
    }

    allDate = highlightedDates;
  }, [startDate && endDate]);

  useEffect(() => {
    if (allDate.length !== 0) {
      formikProps.setFieldValue("fechaDesdeHasta", allDate);
    }
  }, [allDate]);

  return (
    <FormControl fullWidth>
      <DatePicker
        selected={startDate}
        onChange={(date) => handleDateChange(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecciona fechas"
        dayClassName={dayClassNames}
        inline
        locale="es"
        isClearable={true}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        // Resaltar todas las fechas entre startDate y endDate
        highlightDates={allDate}
        excludeDates={dateReserva.fechaFormat}
      />
      {formikProps?.values?.fechaDesdeHasta === null ? (
        <>
          <Alert severity="error" style={{ fontSize: "15px" }}>
            Debe seleccionar un rango de fechas
          </Alert>
          {setDisableButton(true)}
        </>
      ) : (
        setDisableButton(false)
      )}
    </FormControl>
  );
};

export default CustomDatePicker;
