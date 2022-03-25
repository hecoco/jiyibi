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
    Month: {zc:0,sr:0} as {zc:number,sr:number},//月收入/支出
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveTags(state) {
      window.localStorage.setItem('tagsList', JSON.stringify(state.tagList));
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
           '{"id":"1","name":"支出","svg":"expenditure","type":"-"},\n' +
           '{"id":"2","name":"收入","svg":"income","type":"+"},\n' +
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
           '{"id":"19","name":"工资","svg":"wage","type":"+"}\n' +
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
    inquireMonth(state,date){
      state.Month={zc:0,sr:0}
      for (let key in state.recordList){
        const xxx = date === dayjs(state.recordList[key].createdAt).format('YYYY-MM')
        if (xxx){
          if (state.recordList[key].type==='-'){
            console.log(1)
            state.Month.zc += parseInt(state.recordList[key].amount.toString())//??
          }else if (state.recordList[key].type==='+'){
            state.Month.sr += parseInt(state.recordList[key].amount.toString())
          }
        }
      }
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
    },
    xxxx(state, {type,createdAt}){
      const { recordList } = state;
      let newList = clone(recordList);
      if (type === "all") {
        newList = clone(recordList)
            .filter((r: RecordItem) =>
                createdAt === "a"
                    ? createdAt === createdAt
                    : dayjs(createdAt).format("YYYY-MM") ===
                    dayjs(r.createdAt).format("YYYY-MM")
            )
            .sort(
                (a: RecordItem, b: RecordItem) =>
                    dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
            );
      } else {
        newList = clone(recordList)
            .filter((r: RecordItem) => r.type === type)
            .filter((r: RecordItem) =>
                createdAt === "a"
                    ? this.createdAt === this.createdAt
                    : dayjs(createdAt).format("YYYY-MM") ===
                    dayjs(r.createdAt).format("YYYY-MM")
            )
            .sort(
                (a: RecordItem, b: RecordItem) =>
                    dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
            );
      }
      console.log(newList);
      if (newList.length === 0) {
        return [];
      }
      type Result = { title: string; total?: number; items: RecordItem[] }[];
      const result: Result = [
        {
          title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
          items: [newList[0]],
        },
      ];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
          last.items.push(current);
        } else {
          result.push({
            title: dayjs(current.createdAt).format("YYYY-MM-DD"),
            items: [current],
          });
        }
      }
      result.map((group) => {
        group.total = group.items.reduce((sum, item) => sum + parseInt(item.amount.toString()), 0);//??
      });
      return result;
    }
  },
});

export default store;
