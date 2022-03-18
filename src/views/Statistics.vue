<template>
    <layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
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
import intervalList from "@/constant/intervalList";
import Vue from "vue";
import {Component} from "vue-property-decorator";
import recordTypeList from "@/constant/recordTypeList";

@Component({
  components:{Types,Tabs}
})
export default class Statistics extends Vue{
  type='-';
  interval = 'day';
  intervalList=intervalList
  recordTypeList=recordTypeList
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
  ::v-deep .interval-tabs-item{
    height: 48px;
  }
</style>