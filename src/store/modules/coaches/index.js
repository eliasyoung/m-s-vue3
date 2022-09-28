export default {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: "c1",
          firstName: "Joe",
          lastName: "Trump",
          areas: ["frontend", "backend", "career"],
          description: "MAGA!!!!!",
          hourlyRate: 30,
        },
        {
          id: "c2",
          firstName: "Donald",
          lastName: "Biden",
          areas: ["frontend", "career"],
          description: "I'm full of cards!",
          hourlyRate: 30,
        },
      ],
    };
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
  },
  actions: {
    registerCoach({ commit, rootGetters }, payload) {
      const coach = {
        id: rootGetters.userId,
        firstName: payload.first,
        lastName: payload.last,
        areas: payload.areas,
        description: payload.desc,
        hourlyRate: payload.rate,
      };
      commit("registerCoach", coach);
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, __, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some((coach) => coach.id === userId);
    },
  },
};
