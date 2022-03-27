<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <FormItem
        fieldName="备注"
        placeholder="在这里输入标备注"
        :value.sync="record.formItem"
    />
    <Tags :type="type" :data-source.sync="recordList" :selectedTags.sync="record.tags"/>
    <date-picker :editable=editable title-format="MM"
                 :placeholder=dateX @input="di" class="dates"></date-picker>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" @update:value="onUpdateTabs"/>
  </Layout>
</template>
<!--  暗黑模式加 50度灰在最上面  -->

<script lang="ts">
import NumberPad from "@/components/money/NumberPad.vue";
import FormItem from "@/components/money/FormItem.vue";
import Tags from "@/components/money/Tags.vue";
import Tabs from "@/components/Tabs.vue";

import Vue from "vue";
import {Component} from "vue-property-decorator";
import recordTypeList from "@/constant/recordTypeList";
import dayjs from "dayjs";

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/zh-cn';

@Component({
  components: {NumberPad, FormItem, Tags, Tabs, DatePicker},
})
export default class Money extends Vue {
  editable = false;//设置日期是否可以输入
  type = '-';
  dateX = dayjs(new Date(+new Date() + 8 * 3600 * 1000).toISOString()).format('M月D日');//显示
  record: RecordItem = {
    tags: {"id": "1", "name": "支出", "svg": "expenditure", "type": "-"},
    formItem: "",
    type: "-",
    amount: 0,
    createdAt: new Date(+new Date() + 8 * 3600 * 1000).toISOString(),//设置当前时区
  }

  di(date: Date) {
    let hour = date.getHours() + 8;
    date.setHours(hour);//设置当前时区
    const x = dayjs(date.toISOString()).format('YYYY') === dayjs(new Date(+new Date() + 8 * 3600 * 1000)).format('YYYY')
    x ? this.dateX = dayjs(date.toISOString()).format('M月D日') : this.dateX = dayjs(date.toISOString()).format('YYYY年M月D日')
    this.record.createdAt = date.toISOString();
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
    this.record.formItem = "";
  }

  recordTypeList = recordTypeList;

  created() {
    this.$store.commit('fetchRecords')
  }

  onUpdateTabs(type:string){
    this.record.type = type
  }
  get recordList() {
    return this.$store.state.recordList;
  }
  beforeCreate(){
    const tagList = JSON.parse(window.localStorage.getItem('tagsList') || '[]');
    if (tagList || tagList.length === 0) {
      window.localStorage.setItem('tagsList','[\n' +
          '{"id":"1","name":"支出","svg":"expenditure","type":"-"},\n' +
          '{"id":"2","name":"收入","svg":"income","type":"+"},\n' +
          '{"id":"3","name":"转账","svg":"transfer","type":"+"},\n' +
          '{"id":"4","name":"红包","svg":"redPackets","type":"+"},\n' +
          '{"id":"5","name":"宠物","svg":"pet","type":"-"},\n' +
          '{"id":"6","name":"酒店","svg":"hotel","type":"-"},\n' +
          '{"id":"7","name":"医疗","svg":"medical","type":"-"},\n' +
          '{"id":"8","name":"理财","svg":"fund","type":"+"},\n' +
          '{"id":"9","name":"服饰","svg":"apparel","type":"-"},\n' +
          '{"id":"10","name":"娱乐","svg":"entertainment","type":"-"},\n' +
          '{"id":"11","name":"生活缴费","svg":"livingExpenses","type":"-"},\n' +
          '{"id":"12","name":"零食","svg":"snack","type":"-"},\n' +
          '{"id":"13","name":"通勤","svg":"commute","type":"-"},\n' +
          '{"id":"14","name":"水果","svg":"fruit","type":"-"},\n' +
          '{"id":"15","name":"餐饮","svg":"food","type":"-"},\n' +
          '{"id":"16","name":"还款","svg":"repayment","type":"-"},\n' +
          '{"id":"17","name":"租房","svg":"rent","type":"-"},\n' +
          '{"id":"18","name":"烟","svg":"cigarette","type":"-"},\n' +
          '{"id":"19","name":"工资","svg":"wage","type":"+"}\n' +
          ']')
    }
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
.dates {
  width: 150px;
  margin: 0 auto;
  top: 12px;
}

::v-deep .type-tabs-item {
  background:#1b2838;
  color: #4f94bc;
  &.selected {
    background: #42b983;
    color: white;
    &::after {
      display: none;
    }
  }
}
</style>