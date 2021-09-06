<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, i) in pokeList" :key="i" cols="3">
        {{ pokemons[i] }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PokeInfoServ from "@/services/PokeInfo.js";
export default {
  name: "PokeInfo",

  data: () => ({
    pokeList: 151,
    pokemons: [],
    names: [],
  }),
  //
  async created() {
    for (let i = 0; i < this.pokeList; i++) {
      await PokeInfoServ.fetchAllInfo(i + 1)
        .then((response) => {
          // this.pokemons[i] = response.data.name; //.data.results;
          this.pokemons.push(response.data.name);
          console.log(this.pokemons[i]);
        })
        .catch((error) => {
          console.log("hubo un errors" + error);
        });
    }
  },
  mounted() {
    this.names = this.pokemons;
  },
  methods: {
    setName() {},
    setImg() {},
  },
};
</script>
