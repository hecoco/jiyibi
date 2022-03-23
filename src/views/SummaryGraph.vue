<template>
  <layout>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options=x></Chart>
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
  get y(){
    const today = new Date();
    const array = [];
    for (let i=0;i<=29;i++){
      const dateString = dayjs(today).subtract(i,'day').format('YYYY-MM-DD');
      const found = _.find(this.recordList,{
        createAt : dateString
      });
      array.push({
        date:dateString,value:found ? found.amount : 0
      })
    }
    array.sort((a,b)=>{
      if (a.date>b.date){
        return 1;
      }else if (a.date === b.date){
        return 0;
      }else {
        return -1;
      }
    })
    return array;
  }

  get x() {
    const keys =this.y.map(item=>item.date)
    const values =this.y.map(item=>item.value)
    return {
      grid: {
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        axisTick:{alignWithLabel:true},
        data: keys
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
  }
};
</script>

<style scoped lang="scss">
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