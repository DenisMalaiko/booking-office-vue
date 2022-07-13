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
  addDoc,
  doc,
  setDoc
} from "firebase/firestore";


const store = createStore({
  state() {
    return {
      token: null,
      user: null,
      error: '',
      count: 5
    }
  },
  mutations: {
    increment (state: any) {
      state.count++
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    }
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
      })
    },

    async getCurrentUser({commit}, email) {
      const users = collection(db, "users");
      const user = query(users, where("email", "==", email));
      const querySnapshot = await getDocs(user);

      querySnapshot.forEach((doc) => {
        commit('setUser', {
          id: doc.id,
          ...doc.data()
        })
      });
    }
  }
})

export default store;