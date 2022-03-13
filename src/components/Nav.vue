<template>
  <nav>
    <router-link to="/money" class="item"
      ><Icon name="label" />记账</router-link
    >
    <router-link to="/labels" class="item">
      <Icon name="money" /> 标签</router-link
    >
    <router-link to="/statistics" class="item">
      <Icon name="statistics" /> 统计</router-link
    >
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  box-shadow: 0 0 3px reba(0, 0, 0, 0.25);
  flex-direction: row;
  > .item {
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2px 0;
    .icon {
      widows: 32px;
      height: 32px;
    }
  }
}
</style>