<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, i) in pokeList" :key="i" cols="3">
        <img :src="sprites[i]" width="100px" />
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
    sprites: [],
  }),
  //
  async created() {
    for (let i = 0; i < this.pokeList; i++) {
      await PokeInfoServ.fetchAllInfo(i + 1)
        .then((response) => {
          // this.pokemons[i] = response.data.name; //.data.results;
          this.pokemons.push(response.data.name);
          this.sprites.push(
            response.data.sprites.other["official-artwork"].front_default
          );
          // console.log(this.pokemons[i].name);
        })
        .catch((error) => {
          console.log("hubo un errors" + error);
        });
    }
    console.log(this.sprites);
  },
  mounted() {
    // this.names = this.pokemons;
  },
  methods: {
    setName() {},
    setImg() {},
  },
};
</script>
