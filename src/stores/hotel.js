import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "hotel";
const estatus = ref("");
const validacion = ref("");
const nuevoHotel = ref("");
const idHotel = ref("");
const hotelSeleccionado = ref("");
const editarHotelSelec = ref("");
const HotelHome = ref("");


export const useStoreHotel = defineStore(
  modelo,
  () => {
    const hoteles = ref([]);

    const getAll = async () => {
      try {
        const response = await axios.get(`${modelo}/all`);
        console.log(response);
        hoteles.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const getPorId = async (id) => {
      try {
        const response = await axios.get(`${modelo}/buscarId/${id}`);
        console.log(response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const getPorUsuario = async (idUsuario) => {
      try {
        const response = await axios.get(`${modelo}/buscarHotel/${idUsuario}`);
        console.log(response);
        estatus.value = response.status;
        hotelSeleccionado.value = response.data;
        idHotel.value = response.data;
        console.log("id pinia", idHotel.value);
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const agregar = async (data) => {
      try {
        const response = await axios.post(`${modelo}/registro`, data);
        console.log("hola soy nuevo hotel", response);
        estatus.value = response.status;
        nuevoHotel.value = response.data._id;
        console.log("soy nuevo hotel", nuevoHotel);
        return response.data;
      } catch (error) {
        console.log(error);
        validacion.value = error.response.data.error;
        estatus.value = error.response.status;
      }
    };

    const editar = async (id, data) => {
      try {
        const response = await axios.put(`${modelo}/editar/${id}`, data);
        estatus.value = response.status;
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const activar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/activar/${id}`);
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const inactivar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/inactivar/${id}`);
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const subirLogo = async (id, file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "logohotel");
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dep417oku/image/upload`,
          formData,
          config
        );
        console.log(response);
        const logo = response.data.secure_url;

        // Actualizar la foto de perfil del usuario
        editarHotelSelec.value.logo = logo;
      
        return  logo ;
      } catch (error) {
        console.error("Error al subir la foto:", error);
        throw error; // Re-lanzar el error para que se pueda manejar en el llamador
      }
    };

    const subirFotos = async (id, file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "fotoprincipalhotel");
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dep417oku/image/upload`,
          formData,
          config
        );
        console.log(response);
        const imagen = response.data.secure_url;

        // Actualizar la foto de perfil del usuario
        editarHotelSelec.value.imagen = imagen;

        // Guardar la foto de perfil en el servidor
        

        return  imagen ;
      } catch (error) {
        console.error("Error al subir la foto:", error);
        throw error; // Re-lanzar el error para que se pueda manejar en el llamador
      }
    };

    const subirGrupoFotos = async (id, file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "fotoshotel");
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dep417oku/image/upload`,
          formData,
          config
        );
        console.log("img", response);
        const fotos = response.data.secure_url;
        // Actualizar la foto de perfil del usuario
        editarHotelSelec.value.fotos = fotos;
        // Guardar la foto de perfil en el servidor
        return  fotos;
      } catch (error) {
        console.error("Error al subir la foto:", error);
        throw error; // Re-lanzar el error para que se pueda manejar en el llamador
      }
    };

    return {
      getAll,
      getPorId,
      getPorUsuario,
      agregar,
      editar,
      activar,
      inactivar,
      hoteles,
      estatus,
      validacion,
      nuevoHotel,
      idHotel,
      hotelSeleccionado,
      HotelHome,
      subirLogo,
      subirFotos,
      subirGrupoFotos,
      editarHotelSelec,
    };
  },
  {
    persist: true,
  }
);
