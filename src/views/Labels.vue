<template>
  <layout>
    <div class="tags">
      <div v-for="tag in tagsList" :key="tag.id">
        <div class="tag" @click="coll($event)">
          {{ tag.name }}
          <Icon name="right" />
        </div>
        <div class="contenta">
          <div>
            <But @click.native="updateName(tag.id, tag.name)">修改标签</But>
            <But @click.native="remove(tag.id)">删除标签</But>
          </div>
          <div>支出输入</div>
        </div>
      </div>
      <div class="addTag-wrapper">
        <But class="addTag" @click.native="addTag">新建</But>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import But from "@/components/But.vue";
import store from "@/store/index2";
@Component({
  components: { But },
})
export default class Labels extends Vue {
  tagsList = store.tagList;

  updateName(id: string, name: string) {
    const newName = window.prompt("修改标签名", name);
    if (newName === null || newName === "" || newName!.trim() === "") {
      return;
    } else if (newName) {
      store.updateTag(id, newName);
    }
  }
  addTag() {
    const name = window.prompt("请输入标签名");
    if (name === "" || name!.trim() === "") {
      window.alert("不能为空");
    } else if (name) {
      store.createTag(name);
    }
  }
  coll(event: MouseEvent) {
    const but = event.target as HTMLButtonElement;
    const content = but.nextSibling as HTMLButtonElement;
    but.classList.toggle("active");
    if (content!.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }
  remove(id: string) {
    // tagsListModel.remove(id);
    store.removeTag(id);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > div {
    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      svg {
        width: 18px;
        height: 18px;
        color: #666;
        margin-right: 16px;
      }
    }
    > .contenta {
      display: none;
      background: #767676;
      color: white;
    }
  }
}

.addTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 36px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}
</style>