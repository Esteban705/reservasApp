import React, { useState } from "react";
import { Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { Button, FormControl, TextField } from "@mui/material";
import CustomDatePicker from "./DatePicker";
import { guardarReserva } from "../habitaciones/querys";

const Formulario: React.FC<any> = ({
  habitacionID,
  dateReserva,
  handleCloseModal,
}) => {
  const [disableButton, setDisableButton] = useState(true);
  const submitPersona = async (value: any) => {
    debugger;
    await guardarReserva(value);
    handleCloseModal();
    window.location.reload();
  };

  const initialValues = {
    nombre: "",
    telefono: "",
    fechaDesdeHasta: null,
    habitacionID: habitacionID,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      /* validate={SignupSchema} */
      onSubmit={(values) => {
        submitPersona(values);
      }}
    >
      {(formikProps) => (
        <form noValidate autoComplete="off" onSubmit={formikProps.handleSubmit}>
          <div className="w-full text-center">
            <h1 className="mb-7 text-4xl">Reservar Habitacion</h1>
            <FormControl fullWidth style={{ marginTop: "10px" }}></FormControl>
            <TextField
              type="text"
              name="nombre"
              label="nombre"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "10px" }}
              onChange={formikProps.handleChange}
              /*  value={formikProps.values.banoCantidad} */
              InputLabelProps={{
                style: {
                  fontSize: "1.2rem", // Tamaño de fuente del label
                },
              }}
              InputProps={{
                style: {
                  fontSize: "1.2rem",
                },
              }}
              // @ts-ignore
              helperText={
                formikProps.values.nombre === "" ? (
                  <>
                    <span style={{ color: "red" }}>
                      {"Este campo es obligatorio *"}
                    </span>
                    {setDisableButton(true)}
                  </>
                ) : (
                  setDisableButton(false)
                )
              }
            />
            <TextField
              type="text"
              name="telefono"
              label="telefono"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "10px" }}
              onChange={formikProps.handleChange}
              /*  value={formikProps.values.banoCantidad} */
              InputLabelProps={{
                style: {
                  fontSize: "1.2rem", // Tamaño de fuente del label
                },
              }}
              InputProps={{
                style: {
                  fontSize: "1.2rem",
                },
              }}
              // @ts-ignore
              helperText={
                formikProps.values.telefono === "" ? (
                  <>
                    <span style={{ color: "red" }}>
                      {"Este campo es obligatorio *"}
                    </span>
                    {setDisableButton(true)}
                  </>
                ) : (
                  setDisableButton(false)
                )
              }
            />

            <div>
              <CustomDatePicker
                formikProps={formikProps}
                dateReserva={dateReserva}
                setDisableButton={setDisableButton}
              />
            </div>

            <Button
              //size="large"
              disabled={disableButton}
              component="label"
              style={{
                marginTop: "20px",
                textAlign: "center",
                fontSize: "1rem",
              }}
              variant="contained"
            >
              <input hidden type="submit"></input>
              Guardar
            </Button>
            {/*  <button type="submit">Submit</button> */}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Formulario;
