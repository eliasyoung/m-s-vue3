export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    contactCoach({ commit, rootGetters }, payload) {
      const newRequest = {
        userEmail: payload.email,
        message: payload.message,
      };
      const projectUrl = rootGetters.projectUrl;

      return fetch(`${projectUrl}/requests/${payload.coachId}.json`, {
        method: "POST",
        body: JSON.stringify(newRequest),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((res) => {
              return Promise.reject(res.error || "Failed to send request.");
            });
          } else return res.json();
        })
        .then((resData) => {
          newRequest.id = resData.name;
          newRequest.coachId = payload.coachId;
          commit("addRequest", newRequest);
        });
    },
    fetchRequest({ commit, rootGetters }) {
      const coachId = rootGetters.userId;
      const token = rootGetters.token;
      const projectUrl = rootGetters.projectUrl;

      return fetch(`${projectUrl}/requests/${coachId}.json?auth=${token}`)
        .then((res) => {
          if (!res.ok) {
            return res.json().then((res) => {
              return Promise.reject(
                res.error ||
                  "something went wrong when trying to fetch requests."
              );
            });
          } else return res.json();
        })
        .then((resData) => {
          const requests = [];
          for (const key in resData) {
            const req = {
              id: key,
              coachId,
              ...resData[key],
            };
            requests.push(req);
          }
          commit("setRequests", requests);
        });
    },
  },
  getters: {
    requests(state, _, __, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter((req) => req.coachId === coachId);
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
};
