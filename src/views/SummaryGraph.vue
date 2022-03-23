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

@Component({
  components:{Chart}
})
export default class SummaryGraph extends Vue{
  get x() {
    return {
      grid:{
        left:0,
        right:0
      },
      xAxis: {
        type: 'category',
        data: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        ]
      },
      yAxis: {
        type: 'value',
        show:false
      },
      series: [{
        data: [
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320, 13, 23
        ],
        type: 'line'
      }],
      tooltip: {show: true}
    };
  }
  mounted(){
    (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999;
  }
};
</script>

<style scoped lang="scss">
  .chart{
    width: 430%;
    &-wrapper{
      overflow: auto;
    }
  }
</style>