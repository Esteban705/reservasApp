import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { format } from "date-fns";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

export interface depInterface {
  data: DocumentData;
  depId: string;
}

export interface IHabitacionData {
  banoID: string;
  camaID: string;
  departamentoID: string;
  habitacionID: string;
  imagenes: string[];
  banoCantidad: number;
  camaCantidad: number;
  estacionamiento: boolean;
  ubicacion: string;
  precio: number;
  description: string;
}

export interface IHabitacion {
  data: IHabitacionData;
  habId: string;
}

export interface habInterface {
  data: DocumentData;
  habId: string;
}

export const obtenerDepartamentos = async () => {
  try {
    let data: depInterface[] = [];
    const querySnapshot = await getDocs(collection(db, "departamento"));
    querySnapshot.forEach((doc) => {
      const allData = doc.data();

      data.push(...data, { depId: doc.id, data: allData });
    });
    return data;
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    return [];
  }
};

export const obtenerHabitaciones = async () => {
  try {
    let data: habInterface[] = [];
    /*  const q = query(
      collection(db, "habitaciones"),
      where("departamentoID", "==", id)
    ); */

    const querySnapshot = await getDocs(collection(db, "habitaciones"));
    querySnapshot.forEach((doc) => {
      const allData = doc.data();

      data.push(...data, { habId: doc.id, data: allData });
    });
    return data;
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    return [];
  }
};

export const obtenerReservasByID = async (idHabitacion: string) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, "reservas"),
        where("habitacionID", "==", idHabitacion)
      )
    );

    const reservasEncontradas: any = [];

    querySnapshot.forEach((doc) => {
      const reservaData = doc.data();
      reservasEncontradas.push({ reservaId: doc.id, data: reservaData });
    });

    return reservasEncontradas;
  } catch (error) {
    console.error("Error al buscar reservas por ID de habitación:", error);
    return [];
  }
};

export const obtenerTodasLasReservas = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "reservas"));

    const reservasEncontradas: any = [];

    querySnapshot.forEach((doc) => {
      const reservaData = doc.data();
      reservasEncontradas.push({ reservaId: doc.id, data: reservaData });
    });

    return reservasEncontradas;
  } catch (error) {
    console.error("Error al buscar todas las reservas:", error);
    return [];
  }
};

export const obtenerLogin = async () => {
  try {
    let data: any = [];

    const querySnapshot = await getDocs(collection(db, "admin"));
    querySnapshot.forEach((doc) => {
      const allData = doc.data();

      data.push(...data, allData);
    });
    return data;
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    return [];
  }
};

export const guardarReserva = async (reservaData: any) => {
  registerLocale("es", es);

  try {
    const habitacionData: any = localStorage.getItem("habitacion");
    const parsedHabitacionData = JSON.parse(habitacionData);
    const newReserva = {
      ...reservaData,
      habitacionID: parsedHabitacionData.habId,
      ubicacion: parsedHabitacionData.data.ubicacion,
    };

    const docRef = await addDoc(collection(db, "reservas"), newReserva);

    let telefono = "5493834250139";

    let url = `https://api.whatsapp.com/send?phone=${telefono}&text=
          *Reserva Habitacion* Quiero reservar la habitacion Ubicada en: ${
            parsedHabitacionData.data.ubicacion
          }  las fechas: ${reservaData.fechaDesdeHasta.map((fecha: any) => {
      const formattedDate = format(fecha, "eeee, dd 'de' MMMM 'de' yyyy", {
        locale: es,
      });

      // Convierte la cadena formateada en un objeto Date
      return formattedDate;
    })}`;

    window.open(url);

    return docRef.id;
  } catch (error) {
    console.error("Error al guardar la habitación:", error);
    return null;
  }
};

export const guardarHabitacion = async (
  habitacionData: any,
  toggleLoading: any
) => {
  try {
    toggleLoading(true);
    const docRef = await addDoc(collection(db, "habitaciones"), habitacionData);
    toggleLoading(false);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar la habitación:", error);
    toggleLoading(false);
    return null;
  }
};

export const editarHabitacion = async (
  habitacionId: string,
  habitacionData: any,
  toggleLoading: any
) => {
  try {
    toggleLoading(true);

    const habitacionRef = doc(db, "habitaciones", habitacionId);
    await updateDoc(habitacionRef, habitacionData);

    toggleLoading(false);
    return habitacionId;
  } catch (error) {
    console.error("Error al editar la habitación:", error);
    toggleLoading(false);
    return null;
  }
};

export const eliminarHabitacion = async (habitacionId: habInterface) => {
  try {
    const habitacionDocRef = doc(db, "habitaciones", habitacionId.habId);
    habitacionId.data.imagenes.forEach((element: any) => {
      eliminarImagen(element.name);
    });
    await deleteDoc(habitacionDocRef);
    console.log("Habitación eliminada con éxito.");
    return true; // Indicar que la eliminación fue exitosa
  } catch (error) {
    console.error("Error al eliminar la habitación:", error);
    return false; // Indicar que hubo un error al eliminar
  }
};

export const eliminarReserva = async (reservaID: any) => {
  try {
    const reservasRef = doc(db, "reservas", reservaID);

    await deleteDoc(reservasRef);
    console.log("Habitación eliminada con éxito.");
    window.location.reload();
    return true; // Indicar que la eliminación fue exitosa
  } catch (error) {
    console.error("Error al eliminar la habitación:", error);
    return false; // Indicar que hubo un error al eliminar
  }
};

export const eliminarImagen = async (nombreImagen: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, `imagenes/${nombreImagen}`);

  // Borra la imagen del Firebase Storage
  await deleteObject(storageRef);
  console.log(`Imagen "${nombreImagen}" eliminada correctamente.`);

  try {
    // Borra la imagen del Firebase Storage
    await deleteObject(storageRef);
    console.log(`Imagen "${nombreImagen}" eliminada correctamente.`);
  } catch (error) {
    console.error(`Error al eliminar la imagen "${nombreImagen}":`, error);
  }
};
