let timer;

export default {
  state() {
    return {
      token: null,
      userId: null,
      tokenExpiration: null,
      didAutoLogout: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    },
  },
  actions: {
    signup({ dispatch }, payload) {
      return dispatch("auth", {
        ...payload,
        mode: "signup",
      });
    },
    login({ dispatch }, payload) {
      return dispatch("auth", {
        ...payload,
        mode: "login",
      });
    },
    auth({ commit, rootGetters, dispatch }, payload) {
      const mode = payload.mode;
      const apiKey = rootGetters.apiKey;
      const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:${
        mode == "login" ? "signInWithPassword" : "signUp"
      }?key=${apiKey}`;

      return fetch(authUrl, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              return Promise.reject(
                err.error || "Failed to authenticate. Check your login data."
              );
            });
          } else return res.json();
        })
        .then((resData) => {
          const expiresIn = Number(resData.expiresIn) * 1000;
          // const expiresIn = 10000;

          const expirationDate = new Date().getTime() + expiresIn;
          commit("setUser", {
            token: resData.idToken,
            userId: resData.localId,
            tokenExpiration: expirationDate,
          });
          localStorage.setItem("token", resData.idToken);
          localStorage.setItem("userId", resData.localId);
          localStorage.setItem("tokenExpiration", expirationDate);
          timer = setTimeout(() => {
            dispatch("autoLogout");
          }, expiresIn);
        });
    },
    tryLogin({ commit, dispatch }) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const expirationDate = localStorage.getItem("tokenExpiration");
      if (token && userId && expirationDate) {
        const expiresIn = Number(expirationDate) - new Date().getTime();
        if (expiresIn < 0) {
          return;
        }
        timer = setTimeout(() => {
          dispatch("autoLogout");
        }, expiresIn);
        commit("setUser", {
          token,
          userId,
        });
      }

      if (token && userId) {
        commit("setUser", {
          token,
          userId,
        });
      }
    },
    logout({ commit }) {
      commit("setUser", {
        token: null,
        userId: null,
        tokenExpiration: null,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      clearTimeout(timer);
    },

    autoLogout({ commit, dispatch }) {
      dispatch("logout");
      commit("setAutoLogout");
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
};
