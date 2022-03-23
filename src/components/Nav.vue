<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected"
      ><Icon name="label" />记账
    </router-link>
    <router-link to="/SummaryGraph" class="item" active-class="selected">
      <Icon name="money" /> 统计
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" /> 统计
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
  > .item.selected {
    color: $color-highlight;
  }
}
</style>