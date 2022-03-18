<template>
    <layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <div>
        {{type}}
        <br />
        {{interval}}
      </div>
    </layout>
</template>

<script lang="ts">
import Types from "@/components/money/Types.vue";
import Tabs from "@/components/Tabs.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component({
  components:{Types,Tabs}
})
export default class Statistics extends Vue{
  type='-';
  interval = 'day'
  intervalList=[
    {text:'按天',value:'day'},
    {text:'按月',value:'week'},
    {text:'按年',value:'month'}
  ]
  typeList=[
    {text:'支出',value:'-'},
    {text:'收入',value:'+'},
  ]
};
</script>

<style lang="scss" scoped>
  ::v-deep .type-tabs-item{
     &.selected{
        background: white;
       &::after{
         display: none;
       }
     }
  }
</style>