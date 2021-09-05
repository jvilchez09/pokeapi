<template>
  <v-container> </v-container>
</template>

<script>
import PokeInfoServ from "@/services/PokeInfo.js";
export default {
  name: "PokeInfo",

  data: () => ({
    items: false,
  }),
  created() {
    PokeInfoServ.getInfo()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("hubo un errors" + error);
      });
  },
};
</script>
