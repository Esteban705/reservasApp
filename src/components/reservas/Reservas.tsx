import { ThemeProvider } from "@emotion/react";
import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  createTheme,
} from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import { useLoading } from "../../context/LoadingContext";
import { eliminarReserva } from "../habitaciones/querys";

export const Reservas: React.FC<any> = ({ reservas }) => {
  console.log("🚀 ~ file: Reservas.tsx:21 ~ reservas:", reservas);
  const { isLoading, toggleLoading } = useLoading();
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

  const handleDelete = (row: any) => {
    toggleLoading(true);
    eliminarReserva(row.reservaId);
    toggleLoading(false);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  const getIsAdmin = localStorage.getItem("isAdmin");
  if (!getIsAdmin) return;
  const isAdminData: any = JSON.parse(getIsAdmin);

  return (
    <>
      {isAdminData && (
        <div>
          <ThemeProvider theme={customTheme}>
            <h1 className="fw-300 text-center font-thin text-4xl mb-6 mt-8">
              Reservas
            </h1>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fechas</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Ubicacion</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservas?.map((reserva: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>
                        {reserva.data.fechaDesdeHasta.map(
                          (timestamp: any, index: any) => (
                            <div key={index}>
                              {format(
                                new Date(timestamp.seconds * 1000),
                                "eeee, dd 'de' MMMM 'de' yyyy",
                                {
                                  locale: es,
                                }
                              )}
                            </div>
                          )
                        )}
                      </TableCell>
                      <TableCell>{reserva.data.nombre}</TableCell>
                      <TableCell>{reserva.data.ubicacion}</TableCell>
                      <TableCell>{reserva.data.telefono}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDelete(reserva)}>
                          <DeleteIcon /> {/* Icono de basurero */}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <main className="contenedor seccion contenido-centrado">
              <div className="resumen-propiedad mb-10"></div>
            </main>
          </ThemeProvider>
        </div>
      )}
    </>
  );
};
