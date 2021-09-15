<template>
  <v-card class="text-center">
    <v-toolbar dark color="primary" class="d-flex justify-center">
      <h1 class="pokemon  ">Who's that Pokémon?</h1>
    </v-toolbar>
    <v-row class="inline-flex">
      <v-col class="inline-flex">
        <v-img
          v-if="pokemon.image"
          class="img-filter my-5"
          :src="pokemon.image"
          width="240px"
        ></v-img>
        <h4 class="pokemon" v-else>Loading...</h4>
      </v-col>
    </v-row>

    <br />
    <v-btn
      class="mx-3 my-5"
      v-for="(item, index) in pokemonList"
      :key="index"
      :color="item.type"
      @click="checkPokemon(item.number)"
    >
      {{ item.name }}
    </v-btn>
    <br /><br />
    <v-dialog v-model="dialog.show" persistent width="50%">
      <v-card class="text-center pa-5 text-block ">
        <v-container>
          <v-row>
            <v-col cols="8">
              {{ dialog.message }}
              <br /><br />
              <v-img
                class="inline-flex"
                :src="pokemon.image"
                width="200px"
              ></v-img
              ><br /><br />
                <v-row v-if="!correctAnswer">
                  <v-col
                    cols="12"
                    v-if="pts > 0"
                  >
                    <v-text-field
                      v-model="playerName"
                      label="Enter your name?"
                      :disabled="loading"
                      color="pink"
                      autofocus
                    ></v-text-field>
                    <label>{{pts}} Pts</label>
                    <br><br>
                    <v-btn 
                      class="primary" 
                      @click="addScore"
                      :loading="loading"
                      :disabled="loading || playerName.length === 0 || pts <= 0"
                    ><v-icon>mdi-send</v-icon></v-btn>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-btn color="white primary--text mx-4" @click="prepareGame">Restart!</v-btn>
                  </v-col>
                </v-row>
                <v-row v-if="correctAnswer">
                  <v-col cols="12">
                    <v-btn color="white primary--text mx-4" @click="prepareGame">👍 Next One!!</v-btn>
                  </v-col>
                </v-row>
            </v-col>
            <v-col cols="4">
                <v-simple-table dense height="320">
                <thead class="red">
                  <tr>
                    <th class="text-left pokemon yellow--text">
                      Name
                    </th>
                    <th class="text-center pokemon yellow--text">
                      Pts
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in scoreList"
                    :key="index"
                  >
                    <td class="text-left">{{index+1}}. {{item.name}}</td>
                    <td>{{item.pts}}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>    
  </v-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import PokeInfoServ from "@/services/PokeInfo.js";
import { db } from "../main";

export default {
  name: "PlayGame",
  data: () => ({
    pokemonList: [],
    pokemon: [],
    pokemonImg: "",
    correctAnswer: false,
    playerList: [],
    dialog: {
      show: false,
      message: "",
    },
    playerName: '',
    loading: false
  }),
  computed: {
    ...mapState(['pts']),
    scoreList() {
      return this.playerList.slice(0, 10).sort((a,b)=> (a.pts < b.pts ? 1 : -1))
    }
  },
  created() {
    this.prepareGame();
  },
  mounted() {
    this.getScore();
  },
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
      !this.correctAnswer ? this.restartPts() : null;

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
      this.dialog.show = true;
      if (pokemonNumber === this.pokemon.number) {
        this.dialog.message =
          "Well done! It's Pikachu!! 😜 Nah It's\n" + this.pokemon.name;
        this.correctAnswer = true
        this.incrementPts()
      } else {
        this.dialog.message = "No dude 😨, it's " + this.pokemon.name;
        this.correctAnswer = false
      }
    },
    closeDialog() {
      return (this.$parent.$store.state.dialog = false);
    },
    async getScore() {
      this.playerList = []
      const querySnapshot = await getDocs(collection(db, "game"));
      querySnapshot.forEach((doc) => {
        this.playerList.push({
          id: doc.id,
          name: doc.data().name,
          pts: doc.data().pts,
          date: doc.data().date,
        })
      })
    },
    async addScore() {
      this.loading = true
      try {
        console.log(this.send)
        const docRef = addDoc(collection(db, "game"), {
          name: this.playerName,
          pts: parseInt(this.pts),
          date: new Date()
        });
        docRef.then(() => {
          this.loading = false
          this.playerName = ''
          this.restartPts()
          this.getScore()
          console.log("Document written with ID: ", docRef.id);
        })
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async cleanTable() {
      
      for await (const item of this.playerList) {
        console.log(item);
        await deleteDoc(doc(db, "game", item.id));
      }
      await this.getScore()
    }
  },
};
</script>
<style scoped>
.img-filter {
  filter: brightness(0);
}
</style>
