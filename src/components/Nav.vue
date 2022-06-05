<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected"
      ><Icon name="jiyibi" />记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label" /> 标签
    </router-link>
    <router-link to="/SummaryGraph" class="item" active-class="selected">
      <Icon name="statistics" /> 统计
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="Details" /> 详情
    </router-link>

  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

nav {
  display: flex;
  flex-direction: row;
  > .item {
    color: #1B435E;
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2px 0;
    .icon {
      width: 24px;
      height: 32px;
    }
  }
  > .item.selected {
    color: #58A6D4;
  }
}
</style>