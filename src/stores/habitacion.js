import axios from "axios";
import { ref, watch } from "vue";
import { defineStore } from "pinia";

const modelo = "habitacion";
const estatus = ref("");
const validacion = ref("");
const nuevaHabitacion = ref("");
const idHabitacion = ref("");
const habitacionSelecionada = ref("");
const fechaIngreso = ref();
const fechaEgreso = ref();
const habitacionesFiltradas = ref([]);

watch(fechaIngreso, (value) => {
  console.log("new fecha", value)
})

export const useStoreHabitacion = defineStore(
  modelo,
  () => {
    const habitaciones = ref([]);

    const getAll = async () => {
      try {
        const response = await axios.get(`${modelo}/all`);
        console.log(response);
        habitaciones.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const getHabitacionesPorPiso = async (idPiso) => {
      try {
        const response = await axios.get(`${modelo}/buscarPiso/${idPiso}`);
        console.log(response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const getHabitacionesPorHotel = async (idHotel) => {
      try {
        const response = await axios.get(`${modelo}/habitaciones/${idHotel}`);
        console.log(response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const getHabitacionesPorCantPerson = async (filters) => {
      try {
        const response = await axios.get(`${modelo}/habitacionPersona`, {
          params: filters,
        });
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.log(error);
        estatus.value = error.response.status;
      }
    };

    const agregar = async (data) => {
      try {
        const response = await axios.post(`${modelo}/registro`, data);
        console.log("hola soy nueva habitacion", response);
        estatus.value = response.status;
        nuevaHabitacion.value = response.data._id;
        console.log("soy nueva habitacion", nuevaHabitacion);
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

    return {
      getAll,
      getHabitacionesPorPiso,
      getHabitacionesPorHotel,
      getHabitacionesPorCantPerson,
      agregar,
      editar,
      activar,
      inactivar,
      habitaciones,
      estatus,
      validacion,
      nuevaHabitacion,
      idHabitacion,
      habitacionesFiltradas,
      habitacionSelecionada,
      fechaIngreso,
      fechaEgreso,
    };
  },
  {
    persist: true,
  }
);
