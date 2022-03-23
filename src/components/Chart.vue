<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import {Component, Vue,Prop} from "vue-property-decorator";
import echarts, {EChartOption} from 'echarts';

@Component
export default class Chart extends Vue{
  @Prop() options?:EChartOption;

  //钩子
  mounted(){
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
    chart.setOption(this.options!)
  }
};
</script>

<style lang="scss" scoped>
.wrapper{
  height: 400px;
}
</style>