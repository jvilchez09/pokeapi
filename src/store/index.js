import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialog: false,
    pts: 0
  },
  getters: {
    pts: state => state.pts
  },
  mutations: {
    incrementPts: state => state.pts++,
    decrementPts: state => state.pts--,
    restartPts: state => state.pts = 0
  },
  actions: {},
  modules: {},
});
