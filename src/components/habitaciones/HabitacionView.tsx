import {
  Box,
  CircularProgress,
  Modal,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import ImageCarousel from "../../templates/Carrousel";
import { habInterface, obtenerReservasByID } from "./querys";
import Formulario from "../form/FormBuy";
import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingContext";
import { parseISO } from "date-fns";
interface HabitacionView {
  habitacionData: habInterface | undefined;
}

interface IReservas {
  email: string;
  fechaDesdeHasta: any[];
  habitacionID: string;
  nombre: string;
}

export const HabitacionView: React.FC<HabitacionView> = ({
  habitacionData,
}) => {
  const { toggleLoading } = useLoading();
  const [dateReserva, setDateReserva] = useState<any | null>(null);

  const customTheme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "16px", // Ajusta el tamaño de fuente según tus necesidades
          },
        },
      },
    },
  });

  if (!habitacionData)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );

  useEffect(() => {
    async function fetchData() {
      try {
        toggleLoading(true);
        if (habitacionData?.habId) {
          const getReservas: IReservas[] = await obtenerReservasByID(
            habitacionData.habId
          );
          console.log({ getReservas });
          let fechaFormat: any = [];
          getReservas.map((fecha: any) => {
            fecha.data.fechaDesdeHasta.forEach((fecha: any) => {
              const timestampInSeconds = fecha.seconds;
              // Tu marca de tiempo en segundos

              // Crea un objeto Date a partir de la marca de tiempo
              const date = new Date(timestampInSeconds * 1000); // Multiplica por 1000 para convertir a milisegundos
              // Formatea la fecha en un formato legible para un DatePicker
              const formattedDate = `${date.getFullYear()}-${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")}`;

              const fechaIso: any = parseISO(formattedDate);
              fechaFormat = [...fechaFormat, fechaIso];
            });
            return fechaFormat;
          });

          setDateReserva({ ...dateReserva, fechaFormat });
        }
        toggleLoading(false);
      } catch (error) {
        console.log({ error });
      }
    }
    fetchData();
  }, []);

  const { data } = habitacionData;

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <h1 className="fw-300 text-center font-thin text-4xl mb-6 mt-8">
          {data.ubicacion}
        </h1>
        <div>
          <ImageCarousel images={data.imagenes} />
        </div>

        <main className="contenedor seccion contenido-centrado">
          <div className="resumen-propiedad mb-10">
            <ul className="icono-caracteristica">
              <li>
                <Tooltip
                  title={"Cantidad de Baños"}
                  className="text-7xl"
                  placement="top"
                >
                  <img src="img/icono_wc.svg" alt="Icono wc" />
                </Tooltip>
                <p>{data.banoCantidad}</p>
              </li>
              <li>
                <Tooltip
                  title={"Con Estacionamiento Privado"}
                  className="text-7xl"
                  placement="top"
                >
                  <img
                    src="img/icono_estacionamiento.svg"
                    alt="Icono estacionamiento"
                  />
                </Tooltip>
                <p>{data.estacionamiento ? "Si" : "No"}</p>
              </li>
              <li>
                <Tooltip
                  title={"Cantidad de Camas"}
                  className="text-7xl"
                  placement="top"
                >
                  <img src="img/icono_dormitorio.svg" alt="Icono dormitorio" />
                </Tooltip>
                <p>{data.camaCantidad}</p>
              </li>
            </ul>
          </div>
          <p className="precio text-xl mb-7">${data.precio} ARS</p>
          <p className="text-xl text-center">{data.descripcion}</p>
          <Modal
            open={modalOpen}
            style={{ borderRadius: "4%" }}
            onClose={handleCloseModal}
          >
            <Box
              style={{ borderRadius: "4%" }}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                minWidth: 400,
              }}
            >
              <Formulario
                habitacionID={habitacionData.habId}
                dateReserva={dateReserva}
                handleCloseModal={handleCloseModal}
              />
            </Box>
          </Modal>
          <div className="mt-9">
            <button
              onClick={() => {
                handleOpenModal();
              }}
              className="boton bg-lime-900 d-block m-auto text-xl"
            >
              Reservar habitacion
            </button>
          </div>
        </main>
      </ThemeProvider>
    </div>
  );
};
