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
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>