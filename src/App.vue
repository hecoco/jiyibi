<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~@/assets/styles/helper.scss";
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
}
ul,
ol {
  list-style: none;
}
button,
input {
  font: inherit;
}
:focus {
  outline: none; //去除输入框的黄色边框
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #333;
  line-height: 1.5;
  font-family: $font-hei;
  font-size: 16px;
}
</style>
