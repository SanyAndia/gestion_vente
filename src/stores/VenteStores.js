import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useVentesStore = defineStore('ventes', () => {
  const ventes = ref([]);
  const actions = ref({ insertions: 0, modifications: 0, suppressions: 0 });

  const totalVentes = computed(() => ventes.value.length);
  const totalProduits = computed(() => {
    const produits = new Set(ventes.value.map(v => v.produit));
    return produits.size;
  });

  const produitsVendus = computed(() => {
    return ventes.value.reduce((sum, v) => sum + v.quantite, 0);
  });

  const stockRestant = computed(() => {
    return 1000 - produitsVendus.value; // Supposons un stock initial de 100
  });

  function ajouterVente(produit, quantite) {
    ventes.value.push({ produit, quantite });
    actions.value.insertions++;
  }

  function modifierVente(index, quantite) {
    ventes.value[index].quantite = quantite;
    actions.value.modifications++;
  }

  function supprimerVente(index) {
    ventes.value.splice(index, 1);
    actions.value.suppressions++;
  }

  return { ventes, actions, totalVentes, totalProduits, produitsVendus, stockRestant, ajouterVente, modifierVente, supprimerVente };
});
