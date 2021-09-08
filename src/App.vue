<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-main>
      <v-flex xs8 offset-xs2>
        <h1 class="mt-2 text-center">
          PokeDex
        </h1>
        <label
          @click="dialog=!dialog" 
          class="mt-2 text-rigth pokemon"
          >
          Click here to play: Who's that Pokémon!!
        </label>
        <v-dialog
          v-model="dialog"
          width="80%"
          >
          <PlayGame/>
        </v-dialog>
        <router-view />
      </v-flex>
    </v-main>
    <v-card class="mt-5 pa-3 d-flex justify-center">
      <v-card-title class="text-center pb-0" align-self="center">
        <small> © 2021 - Por: <a href="https://jotajota.io">José V.</a></small>
      </v-card-title>
    </v-card>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import PlayGame from "./components/PlayGame";

export default {
  name: "App",

  components: {
    PlayGame
  },

  data: () => ({
    dialog: false
  }),
  mounted() {
    console.log("¡Atrápalos ya! (atrápalos ya) ¡POKEMÓN!🎯🤾🏽‍♀️🚵🏽‍♂️");
  },
};
</script>

<style>
.pokemon {
  color: #f1c43a;
  cursor: pointer;
  font-family: 'Pokemon Solid', sans-serif;
  letter-spacing: 0.82px;
  text-shadow: 2px 0 0 #3a57a1, -2px 0 0 #3a57a1, 0 2px 0 #3a57a1, 0 -2px 0 #3a57a1, 1px 1px #3a57a1, -1px -1px 0 #3a57a1, 1px -1px 0 #3a57a1, -1px 1px 0 #3a57a1;
  user-select: none;
}
</style>