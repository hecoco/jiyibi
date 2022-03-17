import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    recordList:[] as RecordItem[]
  },
  mutations: {
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recodList') || '[]') as RecordItem[];
    },
    createRecord(state,record){
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date(+new Date() + 8 * 3600 * 1000)
          .toJSON()
          .substr(0, 19)
          .replace("T", " ");
      state.recordList.push(record2);
      // recordStore.saveRecords();
      store.commit('saveRecords')//如果需要在这里调用store,需要定义store,在返回
    },
    saveRecords(state) {
      window.localStorage.setItem('recodList', JSON.stringify(state.recordList));
    }
  }
})

export default store
