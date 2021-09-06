<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, i) in pokemons" :key="i" cols="3">
        {{ item }}
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
    pokeType: [],
    names: [],
    nextURL: null,
  }),
  //
  created() {
    // for (let i = 0; i < this.pokeList; i++) {
    //   PokeInfoServ.getInfo(i + 1)
    //     .then((response) => {
    //       this.pokemons[i] = response.data.name; //.data.results;
    //       // console.log(response);
    //       console.log(this.pokemons[i]);
    //     })
    //     .catch((error) => {
    //       console.log("hubo un errors" + error);
    //     });
    // }
  },
  mounted() {
    // this.names = this.pokemons;
    // this.getPokemons();
    this.getPokeList();
  },
  methods: {
    getPokeList() {
      PokeInfoServ.getList(this.pokeList)
        .then((response) => {
          // this.pokemons.push(response.data.results);
          // this.pokemons[i] = response.data.name; //.data.results;
          // console.log(response.data.results);
          // console.log(this.pokemons[i]);
          return response;
        })
        .then((data) => {
          // console.log(data.data.results[1].url);
          // this.getPokemons(response.data.results); //pasamos data
          this.getPokemons(data.data.results);
        })
        .catch((error) => {
          console.log("hubo un errors" + error);
        });
    },
    getPokemons(pokeList) {
      // console.log(pokeList);
      let i = 1;
      pokeList.forEach((e) => {
        // console.log(e);
        PokeInfoServ.getInfo(e.url)
          .then((response) => {
            // this.pokemons.push(response.data.name);
            console.log(response);
            this.pokemons[i] = response.data.name; //.data.results;
            // console.log(response);
            // console.log(this.pokemons[i]);
          })
          .catch((error) => {
            console.log("hubo un errors" + error);
          });
        i++;
      });

      // for (let i = 0; i < this.pokeList; i++) {
      //   PokeInfoServ.getInfo(i)
      //     .then((response) => {
      //       this.pokemons.push(response.data.name);
      //       // this.pokemons[i] = response.data.name; //.data.results;
      //       // console.log(response);
      //       // console.log(this.pokemons[i]);
      //     })
      //     .catch((error) => {
      //       console.log("hubo un errors" + error);
      //     });
      // }
      // console.log(this.pokemons);
    },
  },
};
</script>
