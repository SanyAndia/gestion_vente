<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Modifier' : 'Ajouter' }} une Vente</h2>
        
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block font-semibold">Produit</label>
            <input v-model="vente.produit" type="text" class="w-full border p-2 rounded" required>
          </div>
  
          <div class="mb-4">
            <label class="block font-semibold">Quantité</label>
            <input v-model.number="vente.quantite" type="number" class="w-full border p-2 rounded" required min="1">
          </div>
  
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-400 text-white rounded">Annuler</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps({
    isOpen: Boolean,
    isEditing: Boolean,
    venteToEdit: Object,
  });
  
  const emit = defineEmits(['close', 'save']);
  
  const vente = ref({
    produit: '',
    quantite: 1
  });
  
  // Mise à jour des données si modification
  watch(() => props.venteToEdit, (newVente) => {
    if (newVente) {
      vente.value = { ...newVente };
    } else {
      vente.value = { produit: '', quantite: 1 };
    }
  }, { immediate: true });
  
  const submitForm = () => {
    emit('save', vente.value);
    closeModal();
  };
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  