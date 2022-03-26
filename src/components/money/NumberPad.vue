<template>
  <div class="numberPad">
    <div class="output"><Icon name="RMB" />{{ output }}</div>
    <div class="buts">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">完成</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  output = "0";
  inputContent(e: MouseEvent) {
    const button = e.target as HTMLButtonElement;
    const input = button.textContent as string;
    if (this.output.length === 16) {//最大16位
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    //只允许输入一个小数点
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    this.output += input;
    this.output = this.output.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
  }

  remove() {
    this.output.length === 1
      ? (this.output = "0")
      : (this.output = this.output.slice(0, -1));
  }
  clear() {
    this.output = "0";
  }

  ok() {
    this.$emit("update:value", this.output);
    this.$emit("submit", this.output);
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.numberPad {
  .output {
    @extend %clearfix;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    @extend %innerShadow;
    color: #67c1f5;
  }
  .buts {
    @extend %clearfix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        height: 64 * 2px;
        float: right;
      }
      &.zero {
        width: 25 * 2%;
      }
      $bg: #3a5b8d;
      color: #67c1f5;
      font-weight: bolder;
      font-size: 26px;
      &:nth-child(4),
      &:nth-child(8),
      &:nth-child(12){
        font-size: 18px;
      }
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 3%);

      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 3 * 2%);

      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 3 * 3%);

      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 3 * 4%);

      }
      &:nth-child(14) {
        background: darken($bg, 3 * 5%);

      }
      &:nth-child(12) {
        background: darken($bg, 3 * 6%);
      }
      box-shadow:inset 0 -2px 0 4px rgb(0 0 0 / 10%)
    }
  }
}
</style>