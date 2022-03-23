/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <FormItem
      fieldName="备注"
      placeholder="在这里输入标备注"
      :value="record.formItem"
      @update:value="onUpdateFormItem"
    />
    <Tags :type="type" :data-source.sync="recordList" @update:value="onUpdateTags" />
    <date-picker :editable=editable title-format="MM" :placeholder=dateX @input="di" class="dates"></date-picker>
    {{ record }}
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" @update:value="onUpdateType"/>
  </Layout>
</template>
<!--  暗黑模式加 50度灰在最上面  -->

<script lang="ts">
import NumberPad from "@/components/money/NumberPad.vue";
import FormItem from "@/components/money/FormItem.vue";
import Tags from "@/components/money/Tags.vue";
import Tabs from "@/components/Tabs.vue";

import Vue from "vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constant/recordTypeList";
import dayjs from "dayjs";

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/zh-cn';

@Component({
  components: { NumberPad, FormItem, Tags ,Tabs,DatePicker},
})
export default class Money extends Vue {
  editable=false;//设置日期是否可以输入
  type='-';
  dateX=dayjs(new Date(+new Date()+8*3600*1000).toISOString()).format('M月D日');//显示
  get recordList(){
    return this.$store.state.recordList;
  }
  recordTypeList=recordTypeList;
  record: RecordItem = {
    tags: [],
    formItem: "",
    type: "-",
    amount: 0,
    createdAt: new Date(+new Date()+8*3600*1000).toISOString(),//设置当前时区
  };
  di(date:Date){
    let hour = date.getHours()+8;
    date.setHours(hour);//设置当前时区
    const x = dayjs(date.toISOString()).format('YYYY') === dayjs(new Date(+new Date()+8*3600*1000)).format('YYYY')
    x ? this.dateX = dayjs(date.toISOString()).format('M月D日') : this.dateX = dayjs(date.toISOString()).format('YYYY年M月D日')
    this.record.createdAt = date.toISOString();
  }
  created(){
    this.$store.commit('fetchRecords')
  }

  onUpdateTags(tags: Tag[]) {
    this.record.tags = tags;
  }
  onUpdateFormItem(formItem: string) {
    this.record.formItem = formItem;
  }
  onUpdateType(type: string) {
    this.record.type = type;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    this.$store.commit('createRecord',this.record);
    this.record.formItem = "";
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
.dates{
  width: 150px;
  margin: 0 auto;
}
</style>