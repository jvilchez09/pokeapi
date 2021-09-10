<template>
  <v-card class="text-center">
    <v-toolbar dark color="primary" class="d-flex justify-center">
      <h1 class="pokemon  ">Who's that Pokémon?</h1>
    </v-toolbar>
    <br />

    <v-btn class="primary mx-2" @click="prepareGame"><v-icon>mdi-refresh</v-icon></v-btn>
    <v-btn class="primary mx-2" icon dark @click="decrementPts"><v-icon>mdi-minus</v-icon></v-btn>
    <v-btn text depressed><p><b>Pts:</b> {{ pts }}</p></v-btn>
    <v-btn class="primary mx-2" icon dark @click="incrementPts"><v-icon>mdi-plus</v-icon></v-btn>
    <v-btn class="primary mx-2" @click="sendPts"><v-icon>mdi-send</v-icon></v-btn>
    <br /><br /><br />
    <v-row class="inline-flex">
      <v-col class="inline-flex">
        <v-img
          v-if="pokemon.image"
          class="img-filter"
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
        ><br /><br />
        <v-btn color="secondary terciary--text mx-4" @click="prepareGame"
          >Next One!</v-btn
        >
        <v-btn class="primary mx-4" @click="sendPts">Send {{pts}} Pts</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="send.show" width="300">
      <v-card class="text-center pa-5 text-block ">
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="send.name"
                label="Name"
                filled
                :disabled="loading"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
            >
              <label>Pts: {{send.pts}}</label>
            </v-col>
            <v-col
              cols="12"
            >
              <v-btn 
                class="primary" 
                @click="addFirebase"
                :loading="loading"
                :disabled="loading"
              ><v-icon>mdi-send</v-icon></v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    
  </v-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
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
    send: {
      show: false,
      name: "",
      pts: 0
    },
    loading: false
  }),
  computed: {
    ...mapState(['pts'])
  },
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
    ...mapMutations(['incrementPts', 'decrementPts', 'restartPts']),
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
          "Well done! It's Pikachu!! 😜 Nah It's\n" + this.pokemon.name;
        this.dialog.show = true;
        this.bgClass = "pokemon-correct";
        this.incrementPts()
      } else {
        this.dialog.message = "No dude 😨, it's " + this.pokemon.name;
        this.dialog.show = true;
        this.bgClass = "pokemon-wrong";
      }
    },
    closeDialog() {
      return (this.$parent.$store.state.dialog = false);
    },
    sendPts() {
      this.send.show = true
      this.send.pts = this.pts
    },
    addFirebase() {
      this.loading = true
      setTimeout(() => {
        const prepare = {
          name: this.send.name,
          pts: parseInt(this.send.pts),
          date: new Date()
        }
        console.log('A enviar')
        console.log(prepare)
        this.loading = false
        this.send.show = false
        this.send.name = ''
        this.send.pts = 0
        this.restartPts()
      }, 2000);
    }
  },
};
</script>
<style scoped>
.img-filter {
  filter: brightness(0);
}
</style>
