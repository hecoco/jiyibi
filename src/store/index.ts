import Vue from 'vue';
import Vuex from 'vuex';
import clone from "@/lib/clone";
import createId from "@/lib/createld";
import dayjs from "dayjs"
import {toNumber} from "lodash";
import _ from 'lodash'

type Result = { title: string; total?: number; items: RecordItem[] }[];

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        recordList: [] as RecordItem[],
        tagList: [] as Tag[],
        newRecordList: [] as RecordItem[],
        Month: {zc: 0, sr: 0} as { zc: number, sr: number },//月收入/支出
        result: {} as Result,
        statisticsTags:{} as {title:string,value:number,name:string}[],
        getAmountAndTagsName:[] as {value:number,name:string}[]
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
        },
        createTag(state, {name, type}) {
            const id = createId().toString();
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert("标签名重复");
                return 'duplicated';
            }
            const svg = type === '-' ? 'income' : 'expenditure';
            state.tagList.push({id: id, name: name, svg: svg, type: type});
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
        inquireMonth(state, date) {
            state.Month = {zc: 0, sr: 0}
            for (let key in state.recordList) {
                const xxx = date === dayjs(state.recordList[key].createdAt).format('YYYY-MM')
                if (xxx) {
                    if (state.recordList[key].type === '-') {
                        state.Month.zc += toNumber(state.recordList[key].amount)//??
                    } else if (state.recordList[key].type === '+') {
                        state.Month.sr += toNumber(state.recordList[key].amount)
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
                            state.newRecordList.push(item);
                        }
                    }
                });
            }
            return state.newRecordList;
        },
        xxxx(state, type) {
            const newList = clone(state.recordList).filter((r: RecordItem) => r.type === type.type)
                .sort(
                    (a: RecordItem, b: RecordItem) =>
                        dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
                );
            if (newList.length === 0) {
                return state.result=[];
            }
            state.result = [
                {
                    title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
                    items: [newList[0]],
                },
            ];
            for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = state.result[state.result.length - 1];
                if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
                    last.items.push(current);
                } else {
                    state.result.push({
                        title: dayjs(current.createdAt).format("YYYY-MM-DD"),
                        items: [current],
                    });
                }
            }
            state.result.map((group) => {
                group.total = group.items.reduce((sum, item) => sum + toNumber(item.amount), 0);//??
            });
            return state.result;
        },
        // 获取指定月份全部的标签名和金额
        getAmount(state,type){
            const newList = clone(state.recordList).filter((r: RecordItem) => r.type === type.type);
            for(let i = 0;i<newList.length;i++){
                state.getAmountAndTagsName.push(
            {
                        value:newList[i].amount,
                        name:newList[i].tags.name
                    }
                );
            }
            return state.getAmountAndTagsName;            
        },
        statisticsTags(state,type){
            //{title:2022-03,total:171,name:'房租'}
            let newList = clone(state.recordList).filter((r: RecordItem) => r.type === type);
            if (newList.length === 0) {
                return state.result=[];
            }
            for (let i=0;i< state.tagList.length;i++){
                const a = state.tagList[i].id;

                for (let n=0;i<newList.length;n++){
                    const b = newList[n].tags.id;
                    const xx = _.find(newList,{a:b})
                }
                // console.log("newList")
                // console.log(newList[i].tags);
                // console.log("state")
                // console.log(state.tagList[i]);
            }
            return;
        }
    },
});

export default store;
