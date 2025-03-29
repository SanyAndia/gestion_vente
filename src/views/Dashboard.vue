<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <h1 class="text-3xl font-bold mb-6">Tableau de Bord</h1>

    <!-- Statistiques -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="p-4 bg-white shadow rounded-lg">
        <h2 class="text-lg font-semibold">Total Produits</h2>
        <p class="text-2xl">{{ totalProduits }}</p>
      </div>
      <div class="p-4 bg-white shadow rounded-lg">
        <h2 class="text-lg font-semibold">Produits Vendus</h2>
        <p class="text-2xl">{{ produitsVendus }}</p>
      </div>
      <div class="p-4 bg-white shadow rounded-lg">
        <h2 class="text-lg font-semibold">Stock Restant</h2>
        <p class="text-2xl">{{ stockRestant }}</p>
      </div>
      <div class="p-4 bg-white shadow rounded-lg">
        <h2 class="text-lg font-semibold">Ventes Totales</h2>
        <p class="text-2xl">{{ totalVentes }}</p>
      </div>
    </div>

    <!-- Actions Stats -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="p-4 bg-blue-100 shadow rounded-lg">
        <h2 class="text-lg font-semibold">Insertions</h2>
        <p class="text-2xl">{{ actions.insertions }}</p>
      </div>
      <div class="p-4 bg-yellow-100 shadow rounded-lg">
        <h2 class="text-lg font-semibold">Modifications</h2>
        <p class="text-2xl">{{ actions.modifications }}</p>
      </div>
      <div class="p-4 bg-red-100 shadow rounded-lg">
        <h2 class="text-lg font-semibold">Suppressions</h2>
        <p class="text-2xl">{{ actions.suppressions }}</p>
      </div>
    </div>

    <!-- Table des ventes -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Liste des Ventes</h2>
      <button
        @click="ouvrirModalAjout"
        class="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Ajouter Vente
      </button>
      <table class="w-full border">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 border">Produit</th>
            <th class="p-2 border">Quantité</th>
            <th class="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(vente, index) in ventes" :key="index">
            <td class="p-2 border text-center">{{ vente.produit }}</td>
            <td class="p-2 border text-center">{{ vente.quantite }}</td>
            <td class="p-2 border text-center">
              <button
                @click="ouvrirModalModification(index)"
                class="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                Modifier
              </button>
              <button
                @click="supprimerVente(index)"
                class="ml-2 px-2 py-1 bg-red-500 text-white rounded"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <VenteModal
      :isOpen="isModalOpen"
      :isEditing="isEditing"
      :venteToEdit="venteSelectionnee"
      @close="fermerModal"
      @save="sauvegarderVente"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useVentesStore } from "../stores/VenteStores";
import VenteModal from "../components/VenteModal.vue";

const store = useVentesStore();

const ventes = computed(() => store.ventes);
const totalVentes = computed(() => store.totalVentes);
const totalProduits = computed(() => store.totalProduits);
const produitsVendus = computed(() => store.produitsVendus);
const stockRestant = computed(() => store.stockRestant);
const actions = computed(() => store.actions);
const isModalOpen = ref(false);
const isEditing = ref(false);
const venteSelectionnee = ref(null);
let indexEdition = null;

const ouvrirModalAjout = () => {
  isEditing.value = false;
  venteSelectionnee.value = null;
  isModalOpen.value = true;
};

const ouvrirModalModification = (index) => {
  isEditing.value = true;
  indexEdition = index;
  venteSelectionnee.value = { ...ventes.value[index] };
  isModalOpen.value = true;
};

const fermerModal = () => {
  isModalOpen.value = false;
};

const sauvegarderVente = (vente) => {
  if (isEditing.value) {
    store.modifierVente(indexEdition, vente.quantite);
  } else {
    store.ajouterVente(vente.produit, vente.quantite);
  }
  fermerModal();
};


const supprimerVente = (index) => {
  store.supprimerVente(index);
};
</script>
