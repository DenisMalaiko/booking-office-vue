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
  setDoc,
  orderBy,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import moment from "moment";


const store = createStore({
});

store.registerModule('helper', {
  state: () => ({
    error: '',
    loading: false
  }),
  mutations: {
    setError(state: any, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = "";
    },
    startLoading(state) {
      state.loading = true;
    },
    endLoading(state) {
      state.loading = false;
    },
  },
})

store.registerModule('auth', {
  state: () => ({
    token: null,
    user: null,
    error: '',
    loading: false
  }),
  mutations: {
    setUser(state: any, payload) {
      state.user = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
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
      }).finally(() => {
        commit('endLoading');
      });
    },

    authSignUp ({commit}, user) {
      commit('startLoading');
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
    },
  }
})

store.registerModule('booking', {
  state: () => ({
    office: [],
    bookings: [],
    currentDate: new Date(),
  }),
  mutations: {
    setOffice(state, payload) {
      state.office = payload;
    },
    setBookings(state, payload) {
      state.bookings = payload;
    },
    setCurrentDate(state, payload) {
      state.currentDate = payload;
    }
  },
  actions: {
    async getOffice({commit}) {
      const office = collection(db, "office");
      const floor = query(office, where("floor_id", "==", 1), orderBy("number"));
      const querySnapshot = await getDocs(floor);
      const tables: any = [];

      await querySnapshot.forEach((doc) => {
        tables.push({
          id: doc.id,
          ...doc.data()
        });
      });

      commit('setOffice', tables);
    },

    async getBooking({commit}, date) {
      const dateCurrent = moment(date).format('L');
      const bookings = collection(db, "booking");
      const bookingsCurrent = query(bookings, where("floor_id", "==", 1))
      const querySnapshot = await getDocs(bookingsCurrent);
      const res: any = [];

      await querySnapshot.forEach((doc) => {
        const book: any = doc.data()
        const start = moment(book.time_start?.seconds * 1000).format('L');
        const end = moment(book.time_end?.seconds * 1000).format('L');

        if(start <= dateCurrent && end >= dateCurrent) {
          res.push({
            ...doc.data(),
            id: doc.id,
            time_start: moment(doc.data().time_start.seconds * 1000).toDate(),
            time_end: moment(doc.data().time_end.seconds * 1000).toDate(),
          });
        }
      });

      commit("setBookings", res);
    },

    async addBooking({commit, dispatch}, bookingData) {
      commit('startLoading');
      const bookings = doc(collection(db, "booking"));
      setDoc(bookings, bookingData).then(res => {
        console.log("addBooking")
        dispatch('getBooking', bookingData.time_start);
      }).catch(error => {
        commit('setError', error)
      }).finally(() => {
        commit('endLoading');
      });
    },

    async deleteBooking({commit, dispatch, state}, booking_id) {
      deleteDoc(doc(db, "booking", booking_id)).then(() => {
        dispatch("getBooking", state.currentDate)
      });
    },

    async updateBooking({dispatch, state}, bookingForm) {
      const bookings = doc(db, "booking", bookingForm.booking_id);
      await updateDoc(bookings, {
        time_start: bookingForm.time[0],
        time_end: bookingForm.time[1],
      }).then(() => {
        dispatch("getBooking", state.currentDate)
      })
    }
  }
})

export default store;