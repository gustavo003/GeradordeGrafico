<template>
  <div class="barras">
    <label for="xvalue">
      Digite os valores de X separados por vírgula (Ex: 2,1,5,2):
      <input v-model="xvalues" type="text" id="xvalue" @input="metodoX" />
    </label>

    <br />
    <br />
    <label for="yvalue">
      Digite os valores de Y separados por vírgula (Ex: 2,1,5,2):
      <input v-model="yvalues" type="text" id="yvalue" @input="metodoY" />
    </label>
    <br />
    <button class="gerar" @click="gerar">Gerar gráfico</button>
    <br />
    <div class="types">
      <span
        @click="changetype('Horizontal')"
        :class="{ type: true, selected: ishorizontal }"
      >
        Horizontal
      </span>

      <span
        :class="{ type: true, selected: !ishorizontal }"
        @click="changetype('Vertical')"
      >
        Vertical
      </span>
    </div>
    <br />
    <p>Tipo de gráfico: {{ type }}</p>
    <apexchart
      key="key"
      v-if="show && showhorizontal"
      width="500"
      type="bar"
      :options="options"
      :series="options.series"
    ></apexchart>

    <apexchart
      key="key"
      v-if="show && !showhorizontal"
      width="500"
      type="bar"
      :options="options"
      :series="options.series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "@vue/runtime-core";
import ApexCharts from "apexcharts";

let xvalues = ref(null);
let yvalues = ref(null);
let xformated = ref(null);
let yformated = ref(null);

let type = ref("Horizontal");

let key = ref(0);

let show = ref(false);

let showhorizontal = ref(true);

let ishorizontal = computed(() => {
  return type.value == "Horizontal";
});

let options = null;

function changetype(value) {
  type.value = value;
  if (xformated.value && yformated.value && show) {
    gerar();
  }
}

function metodoX() {
  xformated.value = xvalues.value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}
function metodoY() {
  yformated.value = yvalues.value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function gerar() {
  if (!xformated.value || !yformated.value) {
    alert("Os valores não podem ser nulos.");
    return;
  }

  if (xformated.value.length != yformated.value.length) {
    alert("As quantidades de valores nos dois eixos devem ser iguais.");
    return;
  }
  options = {
    chart: {
      type: "bar",
    },

    series: [
      {
        data: xformated.value.map((v, index) => {
          return {
            x: v,
            y: yformated.value[index],
          };
        }),
      },
    ],
  };

  if (ishorizontal.value) {
    options["plotOptions"] = {
      bar: {
        horizontal: true,
      },
    };
    showhorizontal.value = true;
  } else {
    showhorizontal.value = false;
  }

  if (!show.value) show.value = true;
}
</script>

<style>
.types {
  margin-top: 20px;
  display: inline-block;
}

.type {
  background-color: rgb(158, 158, 158);
  padding: 5px;
  border: 1px solid black;
  cursor: pointer;
  display: inline-block;
  width: 100px;
  text-align: center;
}

.selected {
  background-color: rgba(158, 158, 158, 0.5);
}
.barras {
  margin-top: 20px;
}

.barras input {
  width: auto;
}

.gerar {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: blueviolet;
  border: none;
  border-radius: 7px;
  color: white;
  cursor: pointer;
}
</style>
