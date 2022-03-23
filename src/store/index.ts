import Vue from 'vue';
import Vuex from 'vuex';
import clone from "@/lib/clone";
import createId from "@/lib/createld";
import dayjs from "dayjs";

type he= {sr:number,zc:number}

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    newRecordList: [] as RecordItem[],
    Month: {zc:0,sr:0} as {zc:number,sr:number},
  },

  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recodList') || '[]') as RecordItem[];
      for (let key in state.recordList){
        if (state.recordList[key].type==='-'){
          state.Month.zc += state.recordList[key].amount
        }else if (state.recordList[key].type==='+'){
          state.Month.sr += state.recordList[key].amount
        }
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagsList', JSON.stringify(state.tagList));
    },
    initMonth(state){
      console.log(1)
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      state.recordList.push(record2);
      store.commit('saveRecords');//如果需要在这里调用store,需要定义store,在返回
    },
    saveRecords(state) {
      window.localStorage.setItem('recodList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagsList') || '[]');
    },
    createTag(state, {name,type}) {
      const id = createId().toString();
      const names = state.tagList.map(item => item.name);
      console.log(names);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复");
        return 'duplicated';
      }
      const svg = type==='-'? 'income': 'expenditure';
      state.tagList.push({ id: id, name: name,svg:svg,type:type});
      store.commit('saveTags');
      return 'success';
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      console.log(state.tagList);
      store.commit('saveTags');
      return true;
    },
    updateTag(state, tag) {
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(tag.id) >= 0) {
        const nameList = state.tagList.map(item => item.name);
        console.log(nameList.indexOf(tag.newName));
        if (nameList.indexOf(tag.newName) >= 0) {
          return 'duplicated';
        } else {
          state.tagList.filter(item => item.id === tag.id)[0].name = tag.newName;
          store.commit('saveTags');//如果需要在这里调用store,需要定义store,在返回
          return 'success';
        }
      }
      return "not found";
    },
    //月份
    inquireMonth(state,date:string){
      console.log(dayjs(date).format('YYYY-MM'));
      let x = 0;
      let xx = 0;
      for (let key in state.recordList){
        const a = state.recordList[key].type== '-'
        const aa = state.recordList[key].type== '+'
        const b = dayjs(state.recordList[key].createdAt).format("YYYY-MM") === dayjs(date).format('YYYY-MM')
        const y = a && b;
        if (y){
          x += state.recordList[key].amount;
        }
        if (aa && b){
          xx += state.recordList[key].amount;
        }
      }
      state.Month.zc= x;
      state.Month.sr= xx;
      return state.Month;
    },
    inquireRecord(state, ids: string) {
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(ids) >= 0) {
        state.recordList.map(item => {
          for (let n in item.tags) {
            // @ts-ignore
            if (item.tags[n].id === ids) {
              console.log(item);
              state.newRecordList.push(item);
            }
          }
        });
      }
      return state.newRecordList;
    }
  },
});

export default store;
