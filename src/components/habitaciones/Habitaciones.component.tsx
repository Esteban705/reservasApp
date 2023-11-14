import { HabitacionView } from "./HabitacionView";

export const HabitacionByObject = () => {
  const habitacionData = localStorage.getItem("habitacion");

  if (!habitacionData) {
    return <></>;
  }

  const parsedHabitacionData = JSON.parse(habitacionData);
  return <HabitacionView habitacionData={parsedHabitacionData} />;
};
