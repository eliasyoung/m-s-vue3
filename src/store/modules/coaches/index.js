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
  mutations: {},
  actions: {},
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
  },
};
