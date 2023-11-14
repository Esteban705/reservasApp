import {
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  editarHabitacion,
  guardarHabitacion,
  guardarReserva,
} from "../habitaciones/querys";

export const handleSubmit = async (values: any) => {
  const mapValues = {
    email: values.email,
    fechaDesde: values.fechaDesde.toString(),
    fechaHasta: values.fechaHasta.toString(),
    habitacionID: values.habitacionID,
    nombre: values.nombre,
  };

  guardarReserva(mapValues);
};

export const handleSubmitNewDepartamento = async (
  values: any,
  toggleLoading: any,
  imageDataList: any,
  editData: any
) => {
  // Sube las imágenes antes de enviar los datos del formulario
  if (editData.length === 0) {
  }
  const imageURLs = await uploadImages(imageDataList);
  // Actualiza los valores del formulario con las URL de las imágenes
  values.imagenes = imageURLs;

  // Envía el formulario
  if (editData.length === 0) {
    guardarHabitacion(values, toggleLoading);

    return;
  }
  editarHabitacion(editData.habId, values, toggleLoading);
};

export const uploadImages = async (
  images: { name: string; base64: string }[]
) => {
  const storage = getStorage();
  const imageURLs = [];

  for (const image of images) {
    const storageRef = ref(storage, `imagenes/${image.name}`);

    try {
      // Verifica si el archivo ya existe en el almacenamiento
      await getMetadata(storageRef);

      // Si no se produce una excepción, el archivo existe, así que obtén la URL de descarga
      const downloadURL = await getDownloadURL(storageRef);
      imageURLs.push({ downloadURL, name: image.name });
    } catch (error: any) {
      if (error.code === "storage/object-not-found") {
        // El archivo no existe en el almacenamiento, así que procede a subirlo
        const imageBlob = await fetch(image.base64).then((res) => res.blob());
        await uploadBytes(storageRef, imageBlob);

        // Obtiene la URL de descarga de la imagen subida
        const downloadURL = await getDownloadURL(storageRef);
        imageURLs.push({ downloadURL, name: image.name });
      } else {
        // Manejar otros errores si es necesario
        console.error("Error al verificar el archivo:", error);
      }
    }
  }

  return imageURLs;
};
