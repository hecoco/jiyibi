<template>
  <div class="notes">
    <span class="name">备注</span>
    <input type="text" v-model="value" placeholder="在这里输入备注" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  value = "";
  @Watch("value")
  onValueChanged(value: string) {
    //ts Watch
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  background: #f5f5f5;
  font-size: 14px;
  display: flex;
  padding-left: 16px;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    padding: 16px 0;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>