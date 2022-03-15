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
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    {{ record }}
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/money/NumberPad.vue";
import FormItem from "@/components/money/FormItem.vue";
import Tags from "@/components/money/Tags.vue";
import Types from "@/components/money/Types.vue";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { recordListModel } from "@/models/recordListModel";
import { tagsListModel } from "@/models/tagsListModel";

// const;
// const version = window.localStorage.getItem("version");
// if (version === "0.0.1") {
//   recordList.forEach((record) => {
//     record.createdAt = new Date(2022, 0, 1);
//   });
// }
// window.localStorage.setItem("version", "0.0.2");
const recordList = recordListModel.fetch();
const tagsList = tagsListModel.fetch();

@Component({
  components: { NumberPad, FormItem, Tags, Types },
})
export default class Money extends Vue {
  tags = tagsList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {
    tags: [],
    formItem: "",
    type: "-",
    amount: 0,
    createdAt: new Date(),
  };

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
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch("recordList")
  onRecordListChanged() {
    recordListModel.save(this.recordList);
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