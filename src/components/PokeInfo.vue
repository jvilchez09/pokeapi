<template>
  <v-container>
    <v-row>
      <input
        type="text"
        v-model="searchValue"
        placeholder="Search Pokémon"
        id="search-input"
        v-on:click.capture="filteredPokemons()"
      />
      {{ searchValue }}
    </v-row>
    <v-row>
      <v-col v-for="(item, i) in pokeList" :key="i" cols="4">
        <v-card
          class="mx-auto "
          max-width="344"
          align="center"
          :color="type0[i]"
        >
          <v-img :src="sprites[i]" width="200px" class="pokemon-bg"></v-img>
          <p class="mb-0">#{{ id[i] }}</p>
          <v-card-title class="justify-center pt-0">
            {{ pokemons[i] }}
          </v-card-title>
          <v-card-subtitle>Type: {{ type0[i] }} </v-card-subtitle>
        </v-card>
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
    id: [],
    pokemons: [],
    sprites: [],
    allInfo: [],
    type0: [],
    type1: [],
    searchValue: "",
    colors: {
      fire: "#fda5a570",
      grass: "#a3da8870",
      electric: "#f8df3070",
      water: "#a9bff370",
      ground: "#e0c06870",
      rock: "#b8a03870",
      fairy: "#efa8ef70",
      poison: "#9458ad70",
      bug: "#a8b82070",
      dragon: "#7038f870",
      psychic: "#f8588870",
      flying: "#a890f070",
      fighting: "#c0302870",
      ice: "#98d8d870",
      ghost: "#70589870",
      normal: "#bfbfa270",
    },
  }),
  // computed: {
  //   filteredRecipes() {
  //     let tempInfo = this.allInfo;

  //     // Process search input
  //     if (this.searchValue != "" && this.searchValue) {
  //       tempInfo = tempInfo.filter((item) => {
  //         return item;
  //         // .toUpperCase()
  //         // .includes(this.searchValue.toUpperCase());
  //         console.log(item);
  //         return 1;
  //       });
  //     }
  //   },
  // },
  //
  async created() {
    for (let i = 0; i < this.pokeList; i++) {
      await PokeInfoServ.fetchAllInfo(i + 1)
        .then((response) => {
          //console.log(response);
          //id con 3 ceros al inicio
          this.id.push(response.data.id.toString().padStart(3, "0")); //.toUpperCase()
          //nombre primera letra mayuscula
          this.pokemons.push(
            response.data.name[0].toUpperCase() + response.data.name.slice(1)
          ); //.toUpperCase()
          this.sprites.push(
            response.data.sprites.other["official-artwork"].front_default
          );
          this.allInfo.push(response.data);
          // console.log(this.pokemons[i].name);

          /**
           * Agregar los tipos, por ahora solo mostraremos el principal
           */
          this.type0.push(response.data.types[0].type.name);

          // if (response.data.types[1].type.name) {
          //   this.type1.push(response.data.types[1].type.name);
          // } else {
          //   this.type1.push(0);
          // }
        })
        .catch((error) => {
          console.log("hubo un errors" + error);
        });
    }
    // console.log(this.allInfo);
  },
  mounted() {
    // this.names = this.pokemons;
  },
  methods: {
    filteredPokemons() {
      console.log(this.searchValue);
      var tempInfo = this.allInfo;
      console.log(tempInfo);

      // Process search input
      if (this.searchValue != "" && this.searchValue) {
        console.log("Here");
        tempInfo = tempInfo.filter((item) => {
          // console.log(item.name);
          return (this.pokemons.push = item.name
            .toUpperCase()
            .includes(this.searchValue.toUpperCase()));
        });
      }
    },
    // setName() {},
    // setImg() {},
  },
};
</script>
