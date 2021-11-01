import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/compat/app'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    juguetes: [],
  },
  mutations: {
    setJuguetes(state, juguetes) {
      state.juguetes = juguetes
      state.loading = false;
    },

    loadingTable(state) {
      state.loading = true;
    },
  },
  actions: {
    agregarJuguete(context, juguete) {
      context.commit('loadingTable');
      firebase
        .firestore()
        .collection("juguetes")
        .add(juguete)
        .then(context.commit('loadingTable'));
    },

    getJuguetes(context) {
      context.commit('loadingTable');
      firebase
        .firestore()
        .collection('juguetes')
        .onSnapshot((snapShot) => {
          const juguetes = [];
          snapShot.forEach((doc) => {
            juguetes.push({ id: doc.id, data: doc.data() });
          });
          context.commit('setJuguetes', juguetes);
        });
    },

    actualizarJuguete(context, { juguete, id }) {
      context.commit('loadingTable');
      firebase
        .firestore()
        .collection('juguetes')
        .doc(id)
        .set(juguete)
        .then(context.commit('loadingTable'));
    },

    eliminarJuguete(context, jugueteID) {
      context.commit('loadingTable');
      firebase
        .firestore()
        .collection('juguetes')
        .doc(jugueteID)
        .delete()
        .then(context.commit('loadingTable'));
    },
  },

  getters: {
    juguetesConStock(state) {
      return state.juguetes.filter((juguete) => juguete.data.stock > 0);
    },
  },
  modules: {
  }
})
