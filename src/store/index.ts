import {createStore} from "vuex";
import {auth, db} from "../firebase/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc
} from "firebase/firestore";

const store = createStore({
  state() {
    return {
      token: null,
      user: null,
      error: '',
      loading: false
    }
  },
  mutations: {
    setError(state: any, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = "";
    },
    setUser(state, payload) {
      state.user = payload;
    },
    startLoading(state) {
      state.loading = true;
    },
    endLoading(state) {
      state.loading = false;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    authSignIn ({commit, dispatch}, user) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((firebaseUser) => {
          firebaseUser.user.getIdTokenResult().then((token) => {
            dispatch('getCurrentUser', user.email)
            commit('setToken', token);
          }).catch(error => {
            commit('setError', error);
          });
        }).catch(error => {
        commit('setError', error);
      }).finally(() => {
        commit('endLoading');
      });
    },

    authSignUp ({commit}, user) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(() => {
          const users = doc(collection(db, "users"));
          setDoc(users, user).then(res => {
            commit('setUser', user);
          }).catch(error => {
            commit('setError', error);
          });
        }).catch(error => {
        commit('setError', error);
      }).finally(() => {
        commit('endLoading');
      });
    },

    async getCurrentUser({commit}, email) {
      const users = collection(db, "users");
      const user = query(users, where("email", "==", email));
      const querySnapshot = await getDocs(user);
      let userCurrent;

      await querySnapshot.forEach((doc) => {
        userCurrent = {
          id: doc.id,
          ...doc.data()
        }
      });

      commit('setUser', userCurrent)
    }
  }
})

export default store;