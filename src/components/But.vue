<template>
  <button class="button"><slot /></button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class But extends Vue {}
</script>

<style lang='scss' scoped>
.button {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 36px;
  padding: 0 16px;
  cursor:pointer;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}
</style>