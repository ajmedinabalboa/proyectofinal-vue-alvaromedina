<template>
    <div class="page-container">
      <h2 class="text-primary mb-4">Gestión de Clientes</h2>
  
      <!-- Barra de búsqueda y filtro -->
      <div class="row mb-3">
        <div class="col-md-6">
          <input 
            type="text" 
            class="form-control" 
            v-model="busqueda" 
            placeholder="Buscar cliente por nombre" 
          />
        </div>
        <div class="col-md-6">
          <select class="form-control" v-model="filtroDominio">
            <option value="">Todos los dominios</option>
            <option value="@gmail.com">Gmail</option>
            <option value="@yahoo.com">Yahoo</option>
            <option value="@outlook.com">Outlook</option>
          </select>
        </div>
      </div>
  
      <button class="btn btn-primary mb-3" @click="abrirModal()">Añadir Cliente</button>
  
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientesFiltrados" :key="cliente.id">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.email }}</td>
            <td>
              <button @click="abrirModal(cliente)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="eliminarCliente(cliente.id)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal -->
      <div class="modal fade" id="modalCliente" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ cliente.id ? 'Editar Cliente' : 'Añadir Cliente' }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="guardarCliente">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input type="text" id="nombre" v-model="cliente.nombre" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" v-model="cliente.email" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-primary">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  import { Modal } from 'bootstrap';
  
  export default {
    data() {
      return {
        clientes: [],
        cliente: { id: null, nombre: '', email: '' },
        busqueda: '',
        filtroDominio: '',
      };
    },
    computed: {
      clientesFiltrados() {
        return this.clientes.filter((cliente) => {
          const coincideBusqueda = this.busqueda
            ? cliente.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
            : true;
          const coincideFiltroDominio = this.filtroDominio
            ? cliente.email.includes(this.filtroDominio)
            : true;
          return coincideBusqueda && coincideFiltroDominio;
        });
      },
    },
    methods: {
      async cargarClientes() {
        const response = await api.get('/clientes');
        this.clientes = response.data;
      },
      abrirModal(cliente = { id: null, nombre: '', email: '' }) {
        this.cliente = { ...cliente };
              
        const modalElement = document.getElementById('modalCliente'); // Reemplaza con el ID real de tu modal
        const modal = new Modal(modalElement);
        modal.show();
      },
      cerrarModal() {
        const modalElement = document.getElementById('modalCliente'); // Reemplaza con el ID de tu modal
        const modalInstance = Modal.getInstance(modalElement); // Obtén la instancia del modal        
        if (modalInstance) {
            modalInstance.hide(); // Cierra el modal
        }
      },
      async guardarCliente() {
        if (this.cliente.id) {
          await api.put(`/clientes/${this.cliente.id}`, this.cliente);
        } else {
          await api.post('/clientes', this.cliente);
        }
        this.cargarClientes();
        //bootstrap.Modal.getInstance(document.getElementById('modalCliente')).hide();
        this.cerrarModal();
      },
      async eliminarCliente(id) {
        await api.delete(`/clientes/${id}`);
        this.cargarClientes();
      },
    },
    created() {
      this.cargarClientes();
    },
  };
  </script>