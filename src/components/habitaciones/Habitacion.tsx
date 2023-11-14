import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Tooltip from "@mui/material/Tooltip";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { IHabitacion, eliminarHabitacion, habInterface } from "./querys";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormNewDepartament } from "../form/FormNewDepartament";
import { useLoading } from "../../context/LoadingContext";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  getHabitaciones: () => Promise<habInterface[]>;
}

export const Habitaciones: React.FC<Props> = ({ getHabitaciones }) => {
  const { isLoading, toggleLoading } = useLoading();

  const [dataHab, setDataHab] = useState<null | any>(null);
  const [habitaciones, setHabitaciones] = useState<habInterface[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const deleteHab = async (habitacion: habInterface) => {
    toggleLoading(true);
    await eliminarHabitacion(habitacion);
    toggleLoading(false);
  };

  /* 
  const isAdmin = isAdmin.jsonparse */

  useEffect(() => {
    async function fetchData() {
      try {
        toggleLoading(true);
        const getData: habInterface[] = await getHabitaciones();
        const uniqueArray = [...new Set(getData)];
        setHabitaciones(uniqueArray as IHabitacion[]);
        toggleLoading(false);
      } catch (error) {
        console.log({ error });
      }
    }

    fetchData();

    const getIsAdmin = localStorage.getItem("isAdmin");
    if (!getIsAdmin) return;
    const isAdminData: any = JSON.parse(getIsAdmin);
    setIsAdmin(isAdminData.isAdmin);
  }, []);

  useEffect(() => {
    if (isLoading) {
      async function fetchData() {
        try {
          const getData: habInterface[] = await getHabitaciones();
          const uniqueArray = [...new Set(getData)];
          setHabitaciones(uniqueArray as IHabitacion[]);
        } catch (error) {
          console.log({ error });
        }
      }
      fetchData();
    }
  }, [isLoading]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const customTheme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "16px",
          },
        },
      },
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  return (
    <>
      <section className="contenedor seccion">
        <h2 className="fw-300 text-3xl mb-6 font-serif font-semibold text-center">
          Mas Sobre Nosotros
        </h2>

        <div className="Iconos-Nosotros md:flex">
          <div className="Iconos">
            <img
              src="img/icono2.svg"
              className="m-auto"
              alt="Logo El Mejor Precio"
            />
            <h3 className="font-bold mt-5 mb-5">El Mejor Precio</h3>
            <p className="text-lg mt-5 mb-5 md:mb-0">
              Nos enorgullece ofrecerte el mejor precio en el mercado. Sabemos
              lo importante que es para ti obtener un alojamiento de calidad a
              un costo accesible. Por eso, nos esforzamos por brindarte tarifas
              competitivas que se ajusten a tu presupuesto.
            </p>
          </div>
          <div className="Iconos">
            <img src="img/icono3.svg" className="m-auto" alt="Logo A Tiempo" />
            <h3 className="font-bold mt-5 mb-5">A Tiempo</h3>
            <p className="text-lg mt-5 text-center mb-5 md:mb-0">
              Entendemos la importancia de brindarte servicios a tiempo. Sabemos
              que tu comodidad y conveniencia son fundamentales, y nos
              comprometemos a proporcionarte un servicio eficiente y puntual en
              todo momento. Nuestro equipo está dedicado a garantizar que cada
              aspecto de tu experiencia de alquiler se realice sin demoras.
            </p>
          </div>
          <div className="Iconos">
            <img src="img/icono1.svg" className="m-auto" alt="Logo Seguridad" />
            <h3 className="font-bold mt-5 mb-5">Seguridad</h3>
            <p className="text-lg mt-5 mb-5 md:mb-0">
              La seguridad es nuestra máxima prioridad. Sabemos que tu
              tranquilidad y bienestar son esenciales durante tu estancia con
              nosotros, y nos comprometemos a brindarte un entorno seguro y
              protegido.
            </p>
          </div>
        </div>
      </section>
      <div>
        <main className="seccion contenedor">
          <h2 className="fw-300 text-4xl mb-5 font-serif font-semibold text-center">
            Habitaciones
          </h2>
          {isAdmin && (
            <div className="flex justify-end mb-5">
              <button
                onClick={() => {
                  setDataHab(null);
                  handleOpenModal();
                }}
                className="boton bg-lime-700 d-block"
              >
                Agregar Departamento
              </button>
            </div>
          )}
          {
            <div
              className="contenedor-anuncio"
              style={habitaciones.length === 0 ? { height: "30rem" } : {}}
            >
              {habitaciones.length === 0 && (
                <h1>No Hay Habitaciones Disponibles</h1>
              )}
              {habitaciones.map((habitacion, index) => (
                <div className="anuncio" key={index}>
                  {isAdmin && (
                    <div>
                      <IconButton
                        style={{
                          position: "relative",
                          top: 0,
                          right: 0,
                          color: "red",
                        }}
                        onClick={() => {
                          deleteHab(habitacion);
                        }}
                      >
                        <CloseIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        style={{
                          position: "relative",
                          top: 0,
                          right: 0,
                          color: "green",
                        }}
                        onClick={() => {
                          setDataHab(habitacion);
                          handleOpenModal();
                        }}
                      >
                        <EditIcon fontSize="large" />
                      </IconButton>
                    </div>
                  )}

                  <img
                    style={{
                      height: "26rem",
                      width: "35rem",
                      margin: "auto",
                    }}
                    src={habitacion.data?.imagenes[0]?.downloadURL}
                    alt="Imagen Anuncio"
                  />

                  <ThemeProvider theme={customTheme}>
                    <div className="contenido-anuncio">
                      <h1 className="text-2xl font-bold mb-5 mt-5">
                        {habitacion.data.nombre ? habitacion.data.nombre : ""}
                      </h1>
                      <p className="text-black text-xl">
                        <LocationOnIcon
                          fontSize="inherit"
                          style={{ fontSize: "2rem", color: "blue" }}
                        />{" "}
                        {habitacion.data.ubicacion}
                      </p>
                      <p className="precio pl-3 pt-3 text-lg">
                        {" "}
                        ${habitacion.data.precio}
                      </p>

                      <ul className="icono-caracteristica mb-7 mt-7">
                        <li>
                          <Tooltip
                            title={"Cantidad de Baños"}
                            className="text-4xl"
                            placement="top"
                          >
                            <img src="/img/icono_wc.svg" alt="icono wc" />
                          </Tooltip>
                          <p>{habitacion.data.banoCantidad}</p>
                        </li>
                        <li>
                          <Tooltip
                            title={"Estacionamiento Privado"}
                            className="text-7xl"
                            placement="top"
                          >
                            <img
                              className="w-full"
                              src="/img/icono_estacionamiento.svg"
                              alt="icono estacionamiento"
                            />
                          </Tooltip>
                          <p>{habitacion.data.estacionamiento ? "Si" : "No"}</p>
                        </li>
                        <li>
                          <Tooltip
                            title={"Cantidad de Camas"}
                            className="text-7xl"
                            placement="top"
                          >
                            <img
                              src="img/icono_dormitorio.svg"
                              alt="Icono dormitorio"
                            />
                          </Tooltip>
                          <p>{habitacion.data.camaCantidad}</p>
                        </li>
                      </ul>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          localStorage.setItem(
                            "habitacion",
                            JSON.stringify(habitacion)
                          );
                          navigate("/habitacionInfo");
                        }}
                        className="boton boton-amarillo text-xl d-block m-auto"
                      >
                        Ver Habitaciones
                      </button>
                    </div>
                  </ThemeProvider>
                </div>
              ))}
            </div>
          }
        </main>
      </div>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            // Ajusta el ancho del modal aquí (ejemplo: maxWidth: '50%')

            maxHeight: "90%",
            overflowY: "auto",
          }}
        >
          <FormNewDepartament
            handleCloseModal={handleCloseModal}
            dataHab={dataHab}
          />
        </Box>
      </Modal>
    </>
  );
};
