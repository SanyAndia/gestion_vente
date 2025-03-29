<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-gray-800">Connexion</h2>
  
        <form @submit.prevent="handleLogin" class="mt-4">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input 
              v-model="email" 
              type="email" 
              class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="Entrez votre email"
              required
            />
          </div>
  
          <!-- Mot de passe -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input 
              v-model="password" 
              type="password" 
              class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
  
          <!-- Message d'erreur -->
          <p v-if="errorMessage" class="mt-2 text-sm text-red-500">{{ errorMessage }}</p>
  
          <!-- Bouton de connexion -->
          <button 
            type="submit" 
            class="w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Se connecter
          </button>
        </form>
        
        <!-- Lien vers l'inscription -->
        <p class="mt-4 text-center text-sm text-gray-600">
          Pas encore inscrit ? <router-link to="/register" class="text-blue-500">Créer un compte</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const errorMessage = ref("");
  const router = useRouter();
  
  const handleLogin = () => {
    // Simule une connexion avec un email/mot de passe test
    if (email.value === "admin@example.com" && password.value === "password") {
      console.log("Connexion réussie !");
      router.push("/dashboard"); // Redirection après connexion
    } else {
      errorMessage.value = "Email ou mot de passe incorrect.";
    }
  };
  </script>