import { useEffect, useState } from "react";
import { Reservas } from "../components/reservas/Reservas";
import { useLoading } from "../context/LoadingContext";
import { obtenerTodasLasReservas } from "../components/habitaciones/querys";
import { CircularProgress } from "@mui/material";

export const ReservasPage = () => {
  const { toggleLoading, isLoading } = useLoading();
  const [setReservas, setSetReservas] = useState<any | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        toggleLoading(true);
        const getData = await obtenerTodasLasReservas();
        setSetReservas(getData);
        toggleLoading(false);
      } catch (error) {
        console.log({ error });
      }
    }

    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );

  return <Reservas reservas={setReservas} />;
};
