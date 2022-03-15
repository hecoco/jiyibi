<template>
  <div class="formItem">
    <span class="name">{{ this.fieldName }}</span>
    <input type="text" v-model="value" :placeholder="this.placeholder" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class FormItem extends Vue {
  value = "";

  @Prop() fieldName!: string;
  @Prop() placeholder!: string;
  @Watch("value")
  onValueChanged(value: string) {
    //ts Watch
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
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