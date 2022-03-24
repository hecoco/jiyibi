import Vue from 'vue';
import Vuex from 'vuex';
import clone from "@/lib/clone";
import createId from "@/lib/createld";
import dayjs from "dayjs"

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
      state.Month={zc:0,sr:0}
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      for (let key in state.recordList){
        console.log(1)
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
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagsList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
       window.localStorage.setItem('tagsList','[\n' +
           '{"id":"2","name":"工资","svg":"wage","type":"+"},\n' +
           '{"id":"3","name":"转账","svg":"transfer","type":"+"},\n' +
           '{"id":"4","name":"红包","svg":"redPackets","type":"+"},\n' +
           '{"id":"5","name":"宠物","svg":"pet","type":"-"},\n' +
           '{"id":"6","name":"酒店","svg":"hotel","type":"-"},\n' +
           '{"id":"7","name":"医疗","svg":"medical","type":"-"},\n' +
           '{"id":"8","name":"理财","svg":"fund","type":"+"},\n' +
           '{"id":"9","name":"服饰","svg":"apparel","type":"-"},\n' +
           '{"id":"10","name":"娱乐","svg":"entertainment","type":"-"},\n' +
           '{"id":"11","name":"生活缴费","svg":"livingExpenses","type":"-"},\n' +
           '{"id":"12","name":"零食","svg":"snack","type":"-"},\n' +
           '{"id":"13","name":"通勤","svg":"commute","type":"-"},\n' +
           '{"id":"14","name":"水果","svg":"fruit","type":"-"},\n' +
           '{"id":"15","name":"餐饮","svg":"food","type":"-"},\n' +
           '{"id":"16","name":"还款","svg":"repayment","type":"-"},\n' +
           '{"id":"17","name":"租房","svg":"rent","type":"-"},\n' +
           '{"id":"18","name":"烟","svg":"cigarette","type":"-"},\n' +
           '{"id":"19","name":"支出","svg":"expenditure","type":"-"},\n' +
           '{"id":"20","name":"收入","svg":"income","type":"+"}\n' +
           ']')
      }
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
