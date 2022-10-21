import Vue from "vue";
import Vuex from "vuex";

import coachesModules from "@/store/modules/coaches";
import requestsModules from "@/store/modules/requests";
import authModules from "@/store/modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    coaches: coachesModules,
    requests: requestsModules,
    auth: authModules,
  },
  state() {
    return {
      apiKey: null,
      projectUrl: null,
    };
  },
  getters: {
    apiKey(state) {
      return state.apiKey;
    },
    projectUrl(state) {
      return state.projectUrl;
    },
  },
});
