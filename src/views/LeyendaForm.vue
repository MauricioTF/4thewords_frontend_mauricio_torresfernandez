
<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

  <div class="main-container py-5"> <div class="container bg-dark-card p-4 p-md-5 rounded-3 shadow-lg my-5">
      <h2 class="mb-4 text-center text-primary fw-bold fs-3 title-glow">
        {{ isEdit ? 'Editar Leyenda' : 'Crear Leyenda' }}
      </h2>
      <BaseAlert v-if="error" :message="error" type="danger" class="mb-3" />

      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="mb-3">
          <BaseInput
            id="nombre"
            v-model="form.nombre"
            label="Nombre"
            required
            :minlength="1"
            :maxlength="255"
            class="form-control-dark"
          />
        </div>

        <div class="mb-3">
          <BaseInput
            id="descripcion"
            v-model="form.descripcion"
            label="Descripción"
            required
            :minlength="10"
            type="textarea" rows="4" class="form-control-dark"
          />
        </div>

        <div class="mb-3">
          <BaseDatePicker
            id="fecha"
            v-model="form.fecha"
            label="Fecha"
            class="form-control-dark"
            required
          />
        </div>

        <div class="mb-3">
          <BaseSelect
            id="categoria"
            v-model="form.categoria"
            label="Categoría"
            class="form-control-dark"
            :options="categorias.map(c => ({ value: c.id, label: c.nombre }))"
            required
          />
        </div>

        <div class="mb-3">
          <BaseSelect
            id="provincia"
            v-model="form.provincia"
            label="Provincia"
            class="form-control-dark"
            :options="provincias.map(p => ({ value: p.id, label: p.nombre }))"
            required
          />
        </div>

        <div class="mb-3">
          <BaseSelect
            id="canton"
            v-model="form.canton"
            label="Cantón"
            class="form-control-dark"
            :options="cantones.map(c => ({ value: c.id, label: c.nombre }))"
            :disabled="!form.provincia"
            required
          />
        </div>

        <div class="mb-3">
          <BaseSelect
            id="distrito"
            v-model="form.distrito"
            label="Distrito"
            class="form-control-dark"
            :options="distritos.map(d => ({ value: d.id, label: d.nombre }))"
            :disabled="!form.canton"
            required
          />
        </div>

        <div class="mb-3 form-group-dark"> <label for="imagen" class="form-label">Imagen</label>
          <input class="form-control form-control-dark" type="file" id="imagen" @change="handleImage" accept="image/*" />
        </div>

        <div v-if="imagen_url_actual" class="mb-3 text-center">
          <label class="form-label d-block text-white mb-2">Imagen actual:</label>
          <img :src="`${BASE_API}${imagen_url_actual}`" class="img-fluid rounded shadow-sm current-image-preview" alt="Imagen actual de la leyenda" />
        </div>

        <BaseButton type="submit" class="btn btn-primary w-100 py-2 fw-bold text-uppercase submit-button mt-4">
          {{ isEdit ? 'Actualizar leyenda' : 'Crear leyenda' }}
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLeyendaForm } from '@/composables/useLeyendaForm'

const {
  form,
  error,
  handleImage,
  handleSubmit,
  imagen_url_actual,
  BASE_API,
  categorias,
  provincias,
  cantones,
  distritos,
  isEdit
} = useLeyendaForm()
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

h2 {
  font-family: 'Montserrat', sans-serif;
  text-shadow: 0 0 8px rgba(0, 200, 255, 0.6);
  color: #00bcd4 !important;
}

.form-control-dark {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #f8f9fa;
}
.form-control-dark::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.form-control-dark:focus {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: #00bcd4;
  box-shadow: 0 0 0 0.25rem rgba(0, 188, 212, 0.25);
  color: #fff;
}

.form-label {
    color: #c9d6de;
    margin-bottom: .5rem;
}
.form-group-dark .form-label {
    color: #c9d6de;
}

.current-image-preview {
  max-width: 250px;
  height: auto;
  border: 1px solid rgba(0, 200, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.15);
}

.submit-button {
  background-color: #00bcd4;
  border-color: #00bcd4;
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.submit-button:hover {
  background-color: #008fa3;
  border-color: #008fa3;
  box-shadow: 0 0 15px rgba(0, 188, 212, 0.4);
}

.alert-danger {
  color: #f8d7da;
  background-color: rgba(220, 53, 69, 0.2);
  border-color: rgba(220, 53, 69, 0.5);
}
</style>
