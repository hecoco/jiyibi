<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    {{ record }}
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/money/NumberPad.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
import Types from "@/components/money/Typess.vue";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

// const;
// const version = window.localStorage.getItem("version");
// if (version === "0.0.1") {
//   recordList.forEach((record) => {
//     record.createdAt = new Date(2022, 0, 1);
//   });
// }
// window.localStorage.setItem("version", "0.0.2");

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt: Date | undefined;
};

@Component({
  components: { NumberPad, Notes, Tags, Types },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  recordList: Record[] = JSON.parse(
    window.localStorage.getItem("recordList") || "[]"
  );
  record: Record = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date(),
  };

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }
  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }
  onUpdateType(type: string) {
    this.record.type = type;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch("recordList")
  onRecordListChanged() {
    localStorage.setItem("recordList", JSON.stringify(this.recordList));
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