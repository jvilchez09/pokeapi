<template>
  <v-card class="text-center">
    <v-toolbar dark color="primary" class="d-flex justify-center">
      <h1 class="pokemon  ">Who is that Pokémon?</h1>
      <v-btn icon @click="closeDialog()" class="ml-auto d-flex justify-center">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <br />

    <v-btn class="primary" @click="prepareGame">Reload</v-btn>
    <br /><br /><br />
    <v-row class="inline-flex">
      <v-col class="inline-flex">
        <v-img
          v-if="pokemon.image"
          :class="!dialog.show && 'img-filter'"
          :src="pokemon.image"
          width="200px"
        ></v-img>
        <h4 class="pokemon" v-else>Loading...</h4>
      </v-col>
    </v-row>

    <br /><br />
    <v-btn
      class="mx-3"
      v-for="(item, index) in pokemonList"
      :key="index"
      :color="item.type"
      @click="checkPokemon(item.number)"
    >
      {{ item.name }}
    </v-btn>
    <br /><br />
    <v-dialog v-model="dialog.show" persistent width="400">
      <v-card class="text-center pa-5 text-block ">
        {{ dialog.message }}
        <br /><br />
        <v-img
          class="inline-flex"
          :class="bgClass"
          :src="pokemon.image"
          width="200px"
        ></v-img
        ><br />
        <v-btn color="secondary terciary--text" @click="prepareGame"
          >Next One!</v-btn
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import PokeInfoServ from "@/services/PokeInfo.js";

export default {
  name: "PlayGame",
  data: () => ({
    pokemonList: [],
    pokemon: [],
    pokemonImg: "",
    correctAnswer: 0,
    bgClass: "",
    dialog: {
      show: false,
      message: "",
    },
  }),
  created() {
    this.prepareGame();
  },
  mounted() {},
  watch: {
    closeDialog() {
      return (this.toCloseDialog = false);
    },
  },
  methods: {
    async getPokemon(randomNumber) {
      let pokemon = [];

      await PokeInfoServ.fetchAllInfo(randomNumber)
        .then((response) => {
          pokemon = {
            image:
              response.data.sprites.other["official-artwork"].front_default,
            name:
              response.data.name[0].toUpperCase() + response.data.name.slice(1),
            number: randomNumber,
            type: response.data.types[0].type.name,
          };
        })
        .catch((err) => console.log(err));

      return pokemon;
    },
    async prepareGame() {
      this.dialog.show = false;

      let arr = [];
      this.pokemonList = [];

      while (arr.length < 3) {
        const r = Math.floor(Math.random() * 150) + 1;
        if (arr.indexOf(r) === -1) {
          arr.push(r);
          await this.getPokemon(r)
            .then((response) => {
              this.pokemonList.push(response);
            })
            .catch((err) => console.log(err));
        }
      }
      this.pokemon = this.pokemonList[Math.floor(Math.random() * 2)];
    },
    checkPokemon(pokemonNumber) {
      if (pokemonNumber === this.pokemon.number) {
        this.dialog.message =
          "Well done! It's Pikachu!! 😜 \n" + this.pokemon.name;
        this.dialog.show = true;
        this.bgClass = "pokemon-correct";
      } else {
        this.dialog.message = "No dude 😨, it's " + this.pokemon.name;
        this.dialog.show = true;
        this.bgClass = "pokemon-wrong";
      }
    },
    closeDialog() {
      return (this.$parent.$store.state.dialog = false);
    },
  },
};
</script>
<style scoped>
.img-filter {
  filter: brightness(0);
}
</style>
