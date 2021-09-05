<template>
  <v-container>
    <div>
      <PokeInfo /></div
  ></v-container>
</template>

<script>
// import { component } from "vue/types/umd";

import PokeInfo from "@/components/PokeInfo.vue";
export default {
  name: "Pokemons",
  components: {
    PokeInfo,
  },
};
</script>
