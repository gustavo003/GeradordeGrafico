<template>
  <div>
    <label for="xvalue">
      Digite os valores separados por vírgula (Ex: azul, preto, vermelho)):
      <input v-model="xvalues" type="text" id="xvalue" @input="metodoX" />
    </label>

    <br />

    <label for="yvalue">
      Digite os valores numéricos correspondentes aos digitados acima (Ex: 50,
      20,30):
      <input v-model="yvalues" type="text" id="yvalue" @input="metodoY" />
    </label>
    <br />
    <button class="gerar" @click="gerar">Gerar gráfico</button>
    <br />

    <apexchart
      v-if="show"
      type="pie"
      width="380"
      :options="chartOptions"
      :series="series"
      key="key"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ApexCharts from "apexcharts";

let xvalues = ref(null);
let yvalues = ref(null);
let xformated = ref(null);
let yformated = ref(null);
let show = ref(false);
let chartOptions = null;
let series = null;

let key = ref(0);

function metodoX() {
  xformated.value = xvalues.value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}
function metodoY() {
  yformated.value = yvalues.value
    .split(",")
    .map((v) => {
      let x = v.trim();

      return Number(x);
    })
    .filter(Boolean);
}

function gerar() {
  if (!xformated.value || !yformated.value) {
    alert("Os valores não podem ser nulos.");
    return;
  }

  if (xformated.value.length != yformated.value.length) {
    alert("As quantidades de valores devem ser iguais.");
    return;
  }

  series = [...yformated.value];
  chartOptions = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: [...xformated.value],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  if (!show.value) show.value = true;
  key.value++;
}
</script>
