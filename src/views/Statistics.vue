<template>
    <layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <ol v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}} <span>{{group.total}}</span></h3>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.formItem}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        暂无记录<br/>
        <But @click.native="">去记账</But>
      </div>
    </layout>
</template>

<script lang="ts">
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constant/intervalList";
import Vue from "vue";
import {Component} from "vue-property-decorator";
import recordTypeList from "@/constant/recordTypeList";
import dayjs from 'dayjs'
import clone from "@/lib/clone";
import But from "@/components/But.vue";
//date
@Component({
  components:{Tabs,But}
})
export default class Statistics extends Vue{
  tagString(tags:Tag[]){
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }
   get recordList(){
     return this.$store.state.recordList;
   }
   get groupedList(){
    const {recordList} = this;
    if (recordList.length===0){return []}

    const newList = clone(recordList)
        .filter( (r: RecordItem) => r.type===this.type)
        .sort((a: RecordItem, b:RecordItem ) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result:Result = [{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}];
    for (let i=1;i<newList.length;i++){
      const current = newList[i];
      const last = result[result.length-1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
        last.items.push(current)
      }else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'),items: [current]});
      }
    }
    result.map(group=>{
      group.total = group.items.reduce((sum,item)=>sum+item.amount,0)
    })
   return result;
   }
   beautify(string:string){
      const day = dayjs(string)
      const now =dayjs();
      if (day.isSame(now,'day')){
        return '今天';
      }else if (day.isSame(now.subtract(1,'day'),'day')){
        return '昨天';
      }else if (day.isSame(now.subtract(2,'day'),'day')){
        return '前天';
      }else if (day.isSame(now,'year')){
        return day.format('M月D日');
      }else{
        return day.format('YYYY年M月D日');
      }
   }
   beforeCreate(){
     this.$store.commit('fetchRecords')
   }
   mounted(){
     this.$store.commit('fetchRecords')
   }
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
};
</script>

<style lang="scss" scoped>
.noResult{
  padding: 16px;
  text-align: center;
}
  %item{
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title{
    @extend  %item;
  }
  .record{
    @extend  %item;
    background: white;
  }
  .notes{
    margin-right: auto;
    margin-left: 16px;
    color: #999999;
    width: 38vw;
    overflow: hidden;//??
  }


  ::v-deep .type-tabs-item{
     &.selected{
        background: white;
       &::after{
         display: none;
       }
     }
  }
  ::v-deep .interval-tabs-item{
    height: 48px;
  }
</style>