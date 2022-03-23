<template>
  <layout>
    <div class="yyy">
      <date-picker :editable=editable type="month" :placeholder=dateX @input="di" class="dates"></date-picker>
      <Tabs :value.sync="type" :data-source="detailsList" class-prefix="details"/>
    </div>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options='chartOptions'></Chart>
    </div>
  </layout>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Chart from "@/components/Chart.vue"
import dayjs from "dayjs";
import DatePicker from "vue2-datepicker";
import _ from 'lodash'


@Component({
  components: {Chart, DatePicker}
})
export default class SummaryGraph extends Vue {
  editable = false;//设置日期是否可以输入
  dateX = '点击选择月份';//显示
  type = '-';
  get recordList() {
    return this.$store.state.recordList;
  }
  get keyValueList(){
    const today = new Date();
    const array = [];
    for (let i=0;i<=29;i++){
      const dateString = dayjs(today).subtract(i,'day')
          .format('YYYY-MM-DD');
      const found = _.find(this.recordList,{
        createdAt : dateString
      });
      array.push({
        key:dateString,value:found ? found.total : 0
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
  }

  get chartOptions() {
    const keys =this.keyValueList.map(item=>item.key)
    const values =this.keyValueList.map(item=>item.value)
    return {
      grid: {
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        axisTick:{alignWithLabel:true},
        data: keys,
        axisLabel:{
          formatter: function (value:string,index:number){
            return value.substr(5)
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbolSize:12,
        data: values,
        type: 'line'
      }],
      tooltip: {show: true,triggerOn:'click',formatter:'{c}',position:'top'}
    };
  }
  mounted() {
    (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999;
    this.$store.commit('fetchRecords');
    this.$store.commit('aaa',this.recordList);
  }
};
</script>

<style scoped lang="scss">
.yyy{
  display: flex;
  flex-direction: row;
  width: 100vw;
}
.chart {
  width: 430%;

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