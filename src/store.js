import {createStore} from "vuex";
import persistedState from 'vuex-persistedstate';

const store = createStore({
    state(){
        return {
            user: {}
        }
    },
    mutations: {
        user(state, data) {
            state.user = data;
        }
    },
    plugins: [
        persistedState({
            paths: ['user']
        })
    ]

});

export default store;