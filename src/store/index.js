import Vue from "vue";
import Vuex from "vuex";

import coachesModules from "@/store/modules/coaches";

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      userId: "c3",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    coaches: coachesModules,
  },
});
