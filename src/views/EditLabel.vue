<template>
  <Layout>
    <div class="navBar">
      <Icon class="icon leftIcon" name="right" />
      <span>返回</span>
    </div>
    <FormItem
      fieldName="备注"
      placeholder="请输入标签名"
      @update:value="onUpdateFormItem"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/money/FormItem.vue";

@Component({
  components: { FormItem },
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
  }
}
</script>

<style lang='scss' scoped>
.icon {
  transform: rotate(180deg);
}
</style>