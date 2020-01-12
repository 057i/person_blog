import Vuex from 'vuex';

console.log(Vuex, 111)

let store = new Vuex.store({
    state: {
        curPage: 1,
        searchKey: "7897"
    },
    mutations: {
        updata(state) {
            state.msg = '111';
        }
    }
})
console.log(store)
export default store

