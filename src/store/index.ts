import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";
import createId from "@/lib/createld";

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    recordList:[] as RecordItem[],
    tagList:[] as Tag[],
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
      store.commit('saveRecords')//如果需要在这里调用store,需要定义store,在返回
    },
    saveRecords(state) {
      window.localStorage.setItem('recodList', JSON.stringify(state.recordList));
    },

    fetchTags(state) {
      console.log(1);
      state.tagList = JSON.parse(window.localStorage.getItem('tagsList') || '[]');
    },
    createTag(state,name: string) {
      const id = createId().toString();
      const names = state.tagList.map(item => item.name);
      console.log(names);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复");
        return 'duplicated';
      }
      state.tagList.push({id: id, name: name});
      store.commit('saveTags');
      return 'success'
    },
    saveTags(state) {
      window.localStorage.setItem('tagsList', JSON.stringify(state.tagList));
    },
    removeTag(state,id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      console.log(state.tagList);
      store.commit('saveTags',state)
      return true;
    },
    updateTag(state,id: string, name: string) {
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const nameList = state.tagList.map(item => item.name);
        if (nameList.indexOf(name) >= 0) {
          return 'duplicated';
        } else {
          state.tagList.filter(item => item.id === id)[0].name = name;
          store.commit('saveTags')//如果需要在这里调用store,需要定义store,在返回
          return 'success';
        }
      }
      return "not found";
    },
  },
})

export default store
