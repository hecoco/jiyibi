<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot />
      <!-- 找调用的有没有内容  有就传过来 -->
    </div>
    <Nav />
  </div>
</template>

<style lang="scss" scoped>
.nav-wrapper {
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  border: 1px solid blue;
  overflow: auto;
  flex-grow: 1;
}
</style>