import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import { handleSubmitNewDepartamento } from "./handleSubmitForm";
// Importa las funciones necesarias de Firebase Storage
import { useLoading } from "../../context/LoadingContext";

interface Props {
  handleCloseModal: () => void;
  dataHab: null | any;
}

export const FormNewDepartament: React.FC<Props> = ({
  handleCloseModal,
  dataHab,
}) => {
  const { toggleLoading } = useLoading();

  const [imageDataList, setImageDataList] = useState<
    { name: string; base64: string; downloadURL?: string }[]
  >([]);

  const [desableButton, setDesableButton] = useState(false);
  const [editData, setEditData] = useState<any>([]);
  const submitPersona = async (values: any) => {
    handleSubmitNewDepartamento(values, toggleLoading, imageDataList, editData);
    handleCloseModal();
  };

  useEffect(() => {
    if (dataHab) {
      setImageDataList(dataHab.data.imagenes);
      setEditData(dataHab);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImageDataList = Array.from(files).map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<{ name: string; base64: string }>((resolve) => {
          reader.onload = (e) => {
            resolve({ name: file.name, base64: e.target?.result as string });
          };
        });
      });

      Promise.all(newImageDataList).then((results) => {
        setImageDataList((prevDataList) => [
          ...prevDataList,
          ...results.slice(0, 5 - prevDataList.length),
        ]);
      });
    }
  };

  const handleDelete = (imageBase64: any) => {
    const getImg = imageDataList.filter((img) => img.name !== imageBase64.name);
    setImageDataList(getImg);
  };
  const initialValues = {
    banoCantidad: editData?.data?.banoCantidad ?? "",
    camaCantidad: editData?.data?.camaCantidad ?? "",
    descripcion: editData?.data?.descripcion ?? "",
    estacionamiento: editData?.data?.estacionamiento ?? 0,
    imagenes: [],
    precio: editData?.data?.precio ?? "",
    ubicacion: editData?.data?.ubicacion ?? "",
    nombre: editData?.data?.nombre ?? "",
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
            <h1 className="mb-1 text-4xl">Crear/Editar Habitacion</h1>
            <FormControl fullWidth style={{ marginTop: "10px" }}></FormControl>
            <TextField
              type="number"
              name="banoCantidad"
              label="Cantidad de baños"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "10px" }}
              onChange={formikProps.handleChange}
              value={formikProps.values.banoCantidad}
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
                formikProps.values.banoCantidad === "" ? (
                  <>
                    <span style={{ color: "red" }}>
                      {"Este campo es obligatorio *"}
                    </span>
                    {setDesableButton(true)}
                  </>
                ) : (
                  setDesableButton(false)
                )
              }
            />
            <TextField
              type="text"
              name="nombre"
              label="Pequeña descripcion (opcional)"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "10px" }}
              onChange={formikProps.handleChange}
              value={formikProps.values.nombre}
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
              /*  helperText={
                formikProps.values.nombre === "" && (
                  <span style={{ color: "red" }}>
                    {"Este campo es obligatorio *"}
                  </span>
                )
              } */
            />
            <TextField
              type="number"
              name="camaCantidad"
              label="Cantidad de camas"
              variant="outlined"
              fullWidth
              onChange={formikProps.handleChange}
              value={formikProps.values.camaCantidad}
              style={{ marginBottom: "10px" }}
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
                formikProps.values.camaCantidad === "" ? (
                  <>
                    <span style={{ color: "red" }}>
                      {"Este campo es obligatorio *"}
                    </span>
                    {setDesableButton(true)}
                  </>
                ) : (
                  setDesableButton(false)
                )
              }
            />
            <TextField
              type="text"
              name="descripcion"
              label="Descripcion"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "10px" }}
              onChange={formikProps.handleChange}
              value={formikProps.values.descripcion}
              multiline // Habilitar entrada de varias líneas
              rows={3}
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
                formikProps.values.descripcion === "" ? (
                  <>
                    <span style={{ color: "red" }}>
                      {"Este campo es obligatorio *"}
                    </span>
                    {setDesableButton(true)}
                  </>
                ) : (
                  setDesableButton(false)
                )
              }
            />

            <TextField
              type="number"
              name="precio"
              label="Precio"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "10px" }}
              onChange={formikProps.handleChange}
              value={formikProps.values.precio}
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
                formikProps.values.precio === "" ? (
                  <>
                    <span style={{ color: "red" }}>
                      {"Este campo es obligatorio *"}
                    </span>
                    {setDesableButton(true)}
                  </>
                ) : (
                  setDesableButton(false)
                )
              }
            />
            <TextField
              type="text"
              name="ubicacion"
              label="Ubicacion"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "10px" }}
              onChange={formikProps.handleChange}
              value={formikProps.values.ubicacion}
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
                formikProps.values.ubicacion === "" ? (
                  <>
                    <span style={{ color: "red" }}>
                      {"Este campo es obligatorio *"}
                    </span>
                    {setDesableButton(true)}
                  </>
                ) : (
                  setDesableButton(false)
                )
              }
            />
            <FormControl fullWidth style={{ marginTop: "10px" }}>
              <InputLabel
                id="proyecto-select-label"
                style={{ fontSize: "1.2rem" }}
              >
                ¿Tiene Estacionamiento?
              </InputLabel>
              <Select
                fullWidth
                style={{ marginBottom: "10px", fontSize: "1.2rem" }}
                labelId="tipoDocumento-select-label"
                id="estacionamiento"
                label="estacionamiento"
                name="estacionamiento"
                onChange={formikProps.handleChange}
                required
                value={formikProps.values.estacionamiento}
              >
                <MenuItem key={0} value={0} style={{ fontSize: "1.2rem" }}>
                  Si
                </MenuItem>
                <MenuItem key={1} value={1} style={{ fontSize: "1.2rem" }}>
                  No
                </MenuItem>
              </Select>
            </FormControl>
            <InputLabel
              id="proyecto-select-label"
              style={{ fontSize: "1.2rem" }}
            >
              Subir imagenes(maximo 5)
            </InputLabel>

            {imageDataList.length < 5 && (
              <TextField
                type="file"
                name="imagenes"
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
                InputLabelProps={{
                  style: {
                    fontSize: "1.2rem",
                  },
                }}
                InputProps={{
                  style: {
                    fontSize: "1.2rem",
                  },
                }}
                onChange={handleFileChange}
                // @ts-ignore
                helperText={
                  imageDataList.length === 0 ? (
                    <>
                      <span style={{ color: "red" }}>
                        {"Este campo es obligatorio *"}
                      </span>
                      {setDesableButton(true)}
                    </>
                  ) : (
                    setDesableButton(false)
                  )
                }
              />
            )}
            <div className="flex justify-center space-x-5 mt-3 mb-3">
              {imageDataList.map((imageBase64, index) => (
                <div key={index}>
                  <img
                    src={imageBase64.base64 ?? imageBase64.downloadURL}
                    alt={`Imagen ${index + 1}`}
                    width="200"
                  />
                  <Chip
                    style={{ fontSize: "1.5rem" }}
                    label={imageBase64.name}
                    variant="outlined"
                    onDelete={() => handleDelete(imageBase64)}
                  />
                </div>
              ))}
            </div>
            <Button
              disabled={desableButton}
              //size="large"
              component="label"
              style={{
                marginTop: "20px",
                textAlign: "center",
                fontSize: "1.2rem",
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
