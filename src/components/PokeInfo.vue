<template>
  <v-container>
    <v-row>
      <v-container fluid>
        <v-row align="center">
          <v-col cols="6">
            <v-text-field
              v-model="filterPokemonName"
              placeholder="Search Pokémon"
              id="search-input"
              class="pt-5"
            />
          </v-col>
          <v-col cols="6" sm="6">
            <v-select
              v-model="filterPokemonTypes"
              :items="listPokemonTypes"
              close
              attach
              chips
              color="primary"
              label="Types"
              multiple
              :loading="listPokemonTypes.length==0"
            >
              <template #selection="{ item }">
                <v-chip close @click:close="close(item)" :color="item">{{
                  item
                }}</v-chip>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row>
      <v-col v-for="(item, i) in filteredPokemons" :key="i" cols="4">
        <v-card
          class="mx-auto "
          max-width="344"
          align="center"
          :color="item.types[0].type.name"
        >
          <v-img
            :src="item.sprites.other['official-artwork'].front_default"
            width="200px"
            class="pokemon-bg"
          ></v-img>
          <p class="mb-0">#{{ item.id }}</p>
          <v-card-title class="justify-center pt-0">
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle
            >Type:<span v-for="(type, j) in item.types" :key="j"> {{ type.type.name }}</span>
          </v-card-subtitle>
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
    pokeList: 251,
    id: [],
    pokemons: [],
    sprites: [],
    allInfo: [],
    filterPokemonName: "",
    filterPokemonTypes: [],
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
    listPokemonTypes: []
  }),
  computed: {
    filteredPokemons() {
      return this.allInfo.filter(pokemon => pokemon.name.toUpperCase().includes(this.filterPokemonName.toUpperCase()))
    },
  },
  async created() {
    for (let i = 0; i < this.pokeList; i++) {
      await PokeInfoServ.fetchAllInfo(i + 1)
        .then((response) => {
          //console.log(response.data)
          //console.log(response);
          //id con 3 ceros al inicio
          this.id.push(response.data.id.toString().padStart(3, "0")); //.toUpperCase()
          //nombre primera letra mayuscula
          this.pokemons.push(
            response.data.name[0].toUpperCase() + response.data.name.slice(1)
          );
          this.sprites.push(
            response.data.sprites.other["official-artwork"].front_default
          );
          this.allInfo.push(response.data);
        })
        .catch((error) => {
          console.log("hubo un errors" + error);
        });
    }
    await this.getPokemonTypes()
  },
  mounted() {
  },
  methods: {
    close(item) {
      this.filterPokemonTypes.splice(this.filterPokemonTypes.indexOf(item), 1);
    },
    getPokemonTypes() {
      const total = []
      if(this.allInfo.length > 0) {
        this.allInfo.forEach(x => {
          x.types.forEach(y => {
            total.push(y.type.name)
          })
        })
      }
      this.listPokemonTypes = [...new Set(total)];
    }
  },
};
</script>
