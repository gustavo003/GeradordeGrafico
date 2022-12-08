<template>
  <header>
    <h1>Gerador de gráficos</h1>

    <button class="button_graficos" @click="grafico('/graficobarras')">
      Gerar gráfico de barras
    </button>
    <button class="button_graficos pizza" @click="grafico('/graficopizza')">
      Gerar gráfico de pizza
    </button>
  </header>

  <RouterView />
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
let barras = ref("");

const router = useRouter();
function grafico(path) {
  router.push({
    path,
  });
}
</script>

<style scoped>
.button_graficos {
  padding: 10px;
  background: rgba(0, 0, 200, 0.6);
  border: none;
  border-radius: 7px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-right: 20px;
}
.pizza {
  background-color: yellow;
  color: black;
}
</style>
