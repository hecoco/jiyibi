<template>
  <Layout>
    <div>
      <Icon class="icon" name="right" />
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
import { tagsListModel } from "@/models/tagsListModel";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/money/FormItem.vue";

@Component({
  components: { FormItem },
})
export default class EditLabel extends Vue {
  // props: [FormItem] | undefined;
  created() {
    const id = this.$route.params.id;
    tagsListModel.fetch();
    const tags = tagsListModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang='scss' scoped>
.icon {
  transform: rotate(180deg);
}
</style>