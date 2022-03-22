/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <FormItem
      fieldName="备注"
      placeholder="在这里输入标签名"
      :value="record.formItem"
      @update:value="onUpdateFormItem"
    />
    <Tags :type="type" :data-source.sync="recordList" @update:value="onUpdateTags" />
    <input type="month" v-model="dateAt" class="dates" >
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

@Component({
  components: { NumberPad, FormItem, Tags ,Tabs},
})
export default class Money extends Vue {

  type='-';
  dateAt=dayjs(new Date().toISOString()).format('YYYY-MM')
  get recordList(){
    return this.$store.state.recordList;
  }
  recordTypeList=recordTypeList;
  record: RecordItem = {
    tags: [],
    formItem: "",
    type: "-",
    amount: 0,
    createdAt: new Date(+new Date() + 8 * 3600 * 1000)
      .toJSON()
      .substr(0, 19)
      .replace("T", " "),
  };
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
}
</style>