export default {
  namespaced: true,
  state() {
    return {
      coaches: [],
      lastFetch: null,
    };
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setFetchTimeStamp(state) {
      state.lastFetch = new Date().getTime();
    },
  },
  actions: {
    async registerCoach({ commit, rootGetters }, payload) {
      const userId = rootGetters.userId;
      const token = rootGetters.token;
      const projectUrl = rootGetters.projectUrl;

      const coach = {
        firstName: payload.first,
        lastName: payload.last,
        areas: payload.areas,
        description: payload.desc,
        hourlyRate: payload.rate,
      };

      const response = await fetch(
        `${projectUrl}/coaches/${userId}.json?auth=${token}`,
        { method: "PUT", body: JSON.stringify(coach) }
      );

      // const responseData = await response.json();

      if (!response.ok) {
        console.log(response);
      } else {
        commit("registerCoach", {
          ...coach,
          id: userId,
        });
      }
    },
    loadCoaches({ commit, getters, rootGetters }, payload) {
      if (!payload.forceRefresh && !getters.shouldUpdate) {
        return;
      } else {
        const projectUrl = rootGetters.projectUrl;
        const coaches = [];

        return fetch(`${projectUrl}/coaches.json`)
          .then((res) => {
            if (!res.ok) {
              return res.json().then((res) => {
                return Promise.reject(res.error);
              });
            } else return res.json();
          })
          .then((resData) => {
            // console.log(resData);
            for (const key in resData) {
              // console.log(key);
              const coach = {
                ...resData[key],
                id: key,
              };
              coaches.push(coach);
            }
            commit("setCoaches", coaches);
            commit("setFetchTimeStamp");
          });
      }
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
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) return true;
      else {
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;
      }
    },
  },
};
