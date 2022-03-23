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
import clone from "@/lib/clone";


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

  get x() {
    return {
      grid: {
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        axisTick:{alignWithLabel:true},
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',]
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbolSize:12,
        data: [820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320, 1, 2],
        type: 'line'
      }],
      tooltip: {show: true,triggerOn:'click',formatter:'{c}',position:'top'}
    };
  }

  mounted() {
    (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999;
    this.$store.commit('fetchRecords')
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