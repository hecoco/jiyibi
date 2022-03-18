/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <FormItem
      fieldName="备注"
      placeholder="在这里输入标签名"
      @update:value="onUpdateFormItem"
    />
    <Tags :data-source.sync="reecordList" @update:value="onUpdateTags" />
    {{ record }}
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/money/NumberPad.vue";
import FormItem from "@/components/money/FormItem.vue";
import Tags from "@/components/money/Tags.vue";
import Types from "@/components/money/Types.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";


@Component({
  components: { NumberPad, FormItem, Tags, Types },
})
export default class Money extends Vue {
  get recordList(){
    return this.$store.state.recordList;
  }
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

  onUpdateTags(tags: string[]) {
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
</style>