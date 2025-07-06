<template>
  <div class="main-container py-5">
    <div class="container bg-dark-card p-4 p-md-5 rounded-3 shadow-lg my-5">
      <h2 class="mb-4 text-center text-primary fw-bold fs-3 title-glow">Lista de Leyendas</h2>

      <form @submit.prevent="fetch" class="mb-5 p-4 rounded-3 border border-secondary filter-form">
        <div class="row g-3 mb-3">
          <div class="col-md-4">
            <BaseInput id="nombre" v-model="filtros.nombre" label="Nombre de leyenda" class="form-control-dark" />
          </div>

          <div class="col-md-4">
            <BaseSelect
              id="categoria"
              v-model="filtros.categoria"
              label="Categoría"
              :options="categorias.map(c => ({ value: c.id, label: c.nombre }))"
              class="form-control-dark"
            />
          </div>

          <div class="col-md-4">
            <BaseDatePicker id="fecha" v-model="filtros.fecha" label="Fecha" class="form-control-dark" />
          </div>
        </div>

        <div class="row g-3 mb-4">
          <div class="col-md-4">
            <BaseSelect
              id="provincia"
              v-model="filtros.provincia"
              label="Provincia"
              :options="provincias.map(p => ({ value: p.id, label: p.nombre }))"
              class="form-control-dark"
            />
          </div>
          <div class="col-md-4">
            <BaseSelect
              id="canton"
              v-model="filtros.canton"
              label="Cantón"
              :options="cantones.map(c => ({ value: c.id, label: c.nombre }))"
              class="form-control-dark"
            />
          </div>
          <div class="col-md-4">
            <BaseSelect
              id="distrito"
              v-model="filtros.distrito"
              label="Distrito"
              :options="distritos.map(d => ({ value: d.id, label: d.nombre }))"
              class="form-control-dark"
            />
          </div>
        </div>

        <BaseButton type="submit" class="btn btn-primary w-100 py-2 fw-bold text-uppercase search-button">Buscar</BaseButton>
      </form>

      <div v-if="loading" class="text-center text-white my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando leyendas...</span>
        </div>
        <p class="mt-3">Cargando leyendas...</p>
      </div>
      <BaseAlert v-else-if="error" :message="error" type="danger" class="mb-4" />
      <div v-else>
        <div v-for="leyenda in leyendas" :key="leyenda.id" class="card mb-4 bg-dark-card text-white border-secondary legend-card">
          <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center justify-content-center p-3">
              <img :src="`${BASE_API}${leyenda.imagen_url}`" :alt="leyenda.nombre" class="img-fluid rounded legend-image" />
            </div>
            <div class="col-md-8">
              <div class="card-body d-flex flex-column h-100">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h5 class="card-title text-primary fw-bold mb-0">{{ leyenda.nombre }}</h5>
                  <div class="btn-group" role="group">
                    <BaseButton class="btn btn-sm btn-outline-primary me-2" @click="editarLeyenda(leyenda.id)">Editar</BaseButton>
                    <button class="btn btn-sm btn-outline-danger" @click="confirmarEliminacion(leyenda.id)">Eliminar</button>
                  </div>
                </div>
                <p class="card-text text-light-secondary flex-grow-1">{{ leyenda.descripcion }}</p>
                <p class="card-text small text-muted mt-auto">
                  <span class="badge bg-secondary me-1">{{ leyenda.categoria_nombre }}</span>
                  <span class="badge bg-info me-1">{{ leyenda.provincia_nombre }}</span>
                  <span class="badge bg-info me-1">{{ leyenda.canton_nombre }}</span>
                  <span class="badge bg-info me-1">{{ leyenda.distrito_nombre }}</span>
                  <br class="d-md-none" /> <i class="bi bi-calendar-event me-1"></i>{{ leyenda.fecha_leyenda }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="leyendas.length === 0" class="text-center text-white-50 p-4">
            No se encontraron leyendas con los filtros aplicados.
        </div>
      </div>
    </div>

    <div class="modal fade" id="eliminarModal" tabindex="-1" aria-labelledby="eliminarModalLabel" aria-hidden="true" ref="eliminarModalRef">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark-card text-white border-secondary">
          <div class="modal-header border-bottom border-secondary">
            <h5 class="modal-title text-warning" id="eliminarModalLabel">Confirmar Eliminación</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">¿Estás seguro de que deseas eliminar esta leyenda? Esta acción no se puede deshacer.</div>
          <div class="modal-footer border-top border-secondary">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="eliminarLeyendaConfirmada">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <div
      ref="toastRef"
      class="toast align-items-center text-white"
      :class="successMessage ? 'bg-success' : 'bg-danger'"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style="z-index: 9999; position: fixed; bottom: 1rem; right: 1rem; min-width: 250px;"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ successMessage || errorMessage }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLeyendasList } from '@/composables/useLeyendasList'

const {
  BASE_API,
  leyendas,
  loading,
  error,
  successMessage,
  errorMessage,
  filtros,
  provincias,
  cantones,
  distritos,
  categorias,
  eliminarModalRef,
  toastRef,
  fetch,
  editarLeyenda,
  confirmarEliminacion,
  eliminarLeyendaConfirmada
} = useLeyendasList()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Roboto:wght@400;500&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

.main-container {
  background-color: #212529;

  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-dark-card {
  background-color: rgba(33, 37, 41, 0.9);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 0 25px rgba(0, 200, 255, 0.2);
  border: 1px solid rgba(0, 200, 255, 0.3);
}

.title-glow {
  font-family: 'Montserrat', sans-serif;
  text-shadow: 0 0 8px rgba(0, 200, 255, 0.6);
  color: #00bcd4 !important;
}

.filter-form {
  background-color: rgba(45, 50, 56, 0.9);
  border-color: rgba(0, 200, 255, 0.2) !important;
}

.form-control-dark {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #f8f9fa;
}
.form-control-dark::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.form-control-dark:focus{
  background-color: rgba(255, 255, 255, 0.15);
  border-color: #00bcd4;
  box-shadow: 0 0 0 0.25rem rgba(0, 188, 212, 0.25);
  color: #fff;
}

.search-button {
  background-color: #00bcd4;
  border-color: #00bcd4;
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.search-button:hover {
  background-color: #008fa3;
  border-color: #008fa3;
  box-shadow: 0 0 15px rgba(0, 188, 212, 0.4);
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.3em;
}

.legend-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.1);
}

.legend-image {
  max-height: 200px;
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
}

.card-title {
  font-family: 'Montserrat', sans-serif;
  text-shadow: 0 0 5px rgba(0, 200, 255, 0.4);
  color: #00bcd4 !important;
}

.card-text.text-light-secondary {
  color: #c9d6de !important;
}

.btn-outline-primary {
  color: #00bcd4;
  border-color: #00bcd4;
}
.btn-outline-primary:hover {
  background-color: #00bcd4;
  color: #fff;
}
.btn-outline-danger {
  color: #dc3545;
  border-color: #dc3545;
}
.btn-outline-danger:hover {
  background-color: #dc3545;
  color: #fff;
}

.badge.bg-secondary {
  background-color: #6c757d !important;

  color: #f8f9fa;
}
.badge.bg-info {
  background-color: #17a2b8 !important;
  color: #f8f9fa;
}

.modal-content {
  background-color: rgba(33, 37, 41, 0.95) !important;
  color: #f8f9fa;
  border-color: rgba(0, 200, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.3);
}
.modal-header, .modal-footer {
  border-color: rgba(255, 255, 255, 0.1) !important;
}
.modal-title {
  color: #ffc107 !important;
}
.btn-close-white {
  filter: invert(1);
}
.modal-body {
  color: #c9d6de;
}

.toast.bg-success {
  background-color: rgba(40, 167, 69, 0.9) !important;
}
.toast.bg-danger {
  background-color: rgba(220, 53, 69, 0.9) !important;
}
.toast-body {
  color: #f8f9fa;
}
.btn-close-white {
  filter: brightness(0) invert(1);
}

.text-muted {
  color: #adb5bd !important;
}

.bi-calendar-event {
  color: #adb5bd;
}
</style>

