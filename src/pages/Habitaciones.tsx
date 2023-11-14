import { obtenerHabitaciones } from "../components/habitaciones/querys";
import { Habitaciones } from "../components/habitaciones/Habitacion";

export const HabitacionesPage = () => {
  const getHabitaciones = async () => {
    const department: any = await obtenerHabitaciones();
    return department;
  };

  /*  useEffect(() => {}, []); */

  return <Habitaciones getHabitaciones={getHabitaciones} />;
};
