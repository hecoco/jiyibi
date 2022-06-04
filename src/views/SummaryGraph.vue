<template>
  <layout>
    {{createdAt}}
    <div class="yyy">
      <date-picker :editable=editable type="month"
                   :placeholder=dateX @input="di" class="dates"></date-picker>
      <Tabs class="xxx" :value.sync="type" :data-source="recordTypeList" class-prefix="details"/>
    </div>
    <div class="chart-wrapper" ref="chartWrapper" v-if="chartOptions">
      <Chart class="chart" :options='chartOptions'></Chart>
    </div>
    <div class="kong" v-else>
      <span>暂无数据</span>
    </div>
    <div class="ss" v-if="chartOptions">
      <h2>消费排行</h2>
      <div v-for="s in getTopFiveAmount"  class="row">
        <Icon :name='s.tags.svg' class="icon"></Icon>
        <div class="asd">
          <div class="flex">
            <span>{{s.tags.name}} </span>
            <span>{{s.type==='+'?'':'-'}} {{s.amount}} </span>
          </div>
          <div class="flex ji-font">
            <span> {{s.formItem===''?null:s.formItem}} </span>
            <span> {{s.createdAt}} </span>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Chart from "@/components/Chart.vue"
import dayjs from "dayjs";
import DatePicker from "vue2-datepicker";
import _, { values } from 'lodash'
import detailsList from "@/constant/detailsList";
import recordTypeList from "@/constant/recordTypeList";
import Tabs from "@/components/Tabs.vue";
import clone from "@/lib/clone";

@Component({
  components: {Chart, DatePicker,Tabs}
})
export default class SummaryGraph extends Vue {
  editable = false;//设置日期是否可以输入
  dateX = dayjs(new Date()).format('M月');//显示
  type = '-';
  createdAt=dayjs(new Date()).format("YYYY-MM");

  get recordList() {
    return this.$store.state.recordList;
  }
  get Result(){
    const {recordList} = this;
    const  newList = clone(recordList).filter( (r: RecordItem) => r.type===this.type)
          .filter((r: RecordItem) => this.createdAt==='' ? this.createdAt===this.createdAt : (dayjs(this.createdAt).format('YYYY-MM')===dayjs( r.createdAt).format('YYYY-MM')))
          .sort((a: RecordItem, b:RecordItem ) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
    if (newList.length===0){return []}
    for (let key in newList){
     newList[key].createdAt = dayjs(newList[key].createdAt).format('YYYY-MM-DD');
    }
    return newList;
  }
  get resultList(){
    return this.$store.state.result;
  }
  get keyValueList(){
    const today = dayjs(this.createdAt===''?new Date():this.createdAt).format('YYYY-MM');
    const array = [];
    for (let i=0;i<dayjs(today).daysInMonth();i++){//循环每月的天数
      const dateString = i+1
      const found = _.find(
        this.resultList,
        {
          title : dayjs(today).add(i,'day').format('YYYY-MM-DD')
        }
      );
      array.push({
        key: dateString,
        value: found ? found.total : 0
      })
    }
    array.sort((a,b)=>{
      if (a.key>b.key){
        return 1;
      }else if (a.key === b.key){
        return 0;
      }else {
        return -1;
      }
    })
    return array;
  }
  di(date:Date){
    let hour = date.getHours()+8;
    date.setHours(hour);//设置当前时区
    const x = dayjs(date.toISOString()).format('YYYY') === dayjs(new Date(+new Date()+8*3600*1000)).format('YYYY')
    x ? this.dateX = dayjs(date.toISOString()).format('M月') : this.dateX = dayjs(date.toISOString()).format('YYYY年M月')
    this.createdAt = dayjs(date.toISOString()).format('YYYY-MM');
    this.$store.commit('getAmount',this.createdAt);
  }
  //圆盘
  get chartOptions(){
    const getAmountAndTagsName =  this.$store.state.getAmountAndTagsName.filter((r: RecordItem) => r.type === this.type);
    if(getAmountAndTagsName.length>0){
      return {
        series: [{
          type: "pie",
          data: getAmountAndTagsName,
          width:'80%',
          left:'10%',
          right:'10%',
          label:{
            formatter:'{b}: '+'{d}'+'%'+'\n'+'{c}元',
            overflow:'breakAll'
          }
        }]
      }
    }
    return null;
  }
  //获取指定月份支出/消费前5
  get getTopFiveAmount(){
    const recordList = clone(this.recordList).filter( (r: RecordItem) => r.type===this.type).filter((r: RecordItem) =>
                  dayjs(this.createdAt).format("YYYY-MM") ===
                  dayjs(r.createdAt).format("YYYY-MM")
          ).filter((r: RecordItem) =>
                  r.createdAt = dayjs(r.createdAt).format("YYYY年MM月DD日")
          ).sort(
          (a: RecordItem, b: RecordItem) =>
                  b.amount- a.amount
          ).slice(0,5)
    return recordList;
  }
  //条形统计图
  // get chartOptions() {
  //   const keys =this.keyValueList.map(item=>item.key)
  //   const values =this.keyValueList.map(item=>item.value)
  //   console.log("==")
  //   console.log(this.recordList)
  //   console.log("==")

  //   return {
  //     grid: {
  //       left: 0,
  //       right: 0,
  //     },
  //     backgroundColor:"rgba(42, 71, 94,1)",
  //     xAxis: {
  //       type: 'category',
  //       axisTick:{alignWithLabel:true},
  //       data: keys,
  //       axisLabel:{
  //         // formatter: function (value:string,index:number){
  //         //   return value.substr(9)
  //         // },
  //         color:"rgba(98, 185, 236,1)",
  //         // lineHeight: 24,
  //         interval: 0,
  //         fontSize: 10
  //       },
  //     },
  //     yAxis: {
  //       type: 'value',
  //       show: false
  //     },
  //     series: [{
  //       // symbolSize:12,
  //       data: values,
  //       type: 'bar',
  //       markPoint:{
  //         symbol:"pin",
  //         symbolSize:'8'
  //       },
  //       itemStyle:{
  //         normal:{
  //         color:"rgba(102, 192, 244,1)",
  //           label:{
  //             show:true,//在统计图上显示全部数值
  //             position:'top',
  //             textStyle:{
  //               color:"rgba(102, 192, 244,1)",
  //               fontSize:8
  //             }
  //           }
  //         }
  //       },
  //       barWidth:4,
  //     }],
  //   };
  // }
  mounted() {
    this.$store.commit('fetchRecords');
    this.$store.commit('getAmount',this.createdAt);
    this.$store.commit('xxxx', {type:this.type,createdAt:this.createdAt});

  }
  detailsList=detailsList
  recordTypeList=recordTypeList
  }
</script>

<style lang="scss" scoped>
.ji-font{
  color: #647580;
  font-size: 0.9em;
}
.row{
  display: flex;
  flex-direction:row;
  padding: 6px;
  margin-top: 6px;
  background: #0E151D;
}
.asd{
  width: 100%;
}
.flex{
  display: flex;
  justify-content: space-between;
}
.icon{
  width: 2.5em !important;
  height: 2.5em !important;
  margin-right:10px
}
.ss{
  color: #67c1f5;
  margin:1.3em
}
.kong{
  color: #67c1f5;
}
.title{
  color: #67c1f5;
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  background: #2A475E;
  border-bottom: 2px solid #121A24;
  span{
    font-size: 28px;
    font-weight: bold;
  }
}
::v-deep .details-tabs {
  height: 34px;
  font-size: 14px;
  margin:6px 16px;
}
::v-deep .details-tabs-item{
  height: 34px !important;
  padding: 0 16px;
  &.selected {
    background: #42b983;
    color: white;
    &::after {
      display: none;
    }
  }
}
.yyy{
  display: flex;
  flex-direction: row;
}

.chart {
  //width: 360%;
  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.dates {
  width: 136px;
  margin: 6px 16px;
}
</style>