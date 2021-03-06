import Vue from 'vue';
import Vuex from 'vuex';
import clone from "@/lib/clone";
import createId from "@/lib/createld";
import dayjs from "dayjs"
import {round, toNumber} from "lodash";
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
        getAmountAndTagsName:[] as {value:number,name:string,type:string}[]
    },
    mutations: {
        //获取记账 localStorage
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        //保存标签 localStorage
        saveTags(state) {
            window.localStorage.setItem('tagsList', JSON.stringify(state.tagList));
        },
        createRecord(state, record) {
            const record2: RecordItem = clone(record);
            state.recordList.push(record2);
            store.commit('saveRecords');//如果需要在这里调用store,需要定义store,在返回
        },
        //保存记账 localStorage
        saveRecords(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },
        //获取标签 localStorage
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
        //删除标签
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
        //修改标签
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
            state.Month.zc = _.floor(state.Month.zc,2)
            state.Month.sr = _.floor(state.Month.sr,2)
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
        getAmount(state,date){
            console.log(date)
            const newList = clone(state.recordList).filter((r: RecordItem) =>
            date ===
            dayjs(r.createdAt).format("YYYY-MM")
    );
            state.getAmountAndTagsName=[];
            for(let i = 0;i<newList.length;i++){
                state.getAmountAndTagsName.push(
            {
                        value:newList[i].amount,
                        name:newList[i].tags.name,
                        type:newList[i].type
                    }
                );
            }
            console.log(state.getAmountAndTagsName)
            for(let i=0; i<state.getAmountAndTagsName.length; i++){
                for(let j=i+1; j<state.getAmountAndTagsName.length; j++){
                    if(state.getAmountAndTagsName[i].name===state.getAmountAndTagsName[j].name){        //第一个等同于第二个，splice方法删除第二个
                        state.getAmountAndTagsName[i].value = toNumber(state.getAmountAndTagsName[i].value)+toNumber(state.getAmountAndTagsName[j].value)
                        state.getAmountAndTagsName[i].value = _.floor(state.getAmountAndTagsName[i].value,2)//四舍五入
                        state.getAmountAndTagsName.splice(j,1);
                        j--;
                    }
                }
            }
            return state.getAmountAndTagsName;
        },
        statisticsTags(state,type){
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
            }
            return;
        }
    },
});

export default store;
