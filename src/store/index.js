import Vue from "vue";
import Vuex from "vuex";

import coachesModules from "@/store/modules/coaches";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: 1,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    coaches: coachesModules,
  },
});
