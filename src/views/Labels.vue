<template>
  <layout>
    <!-- <div class="tags">
      <router-link
        class="tag"
        :to="`/labels/edit/${tag.id}`"
        v-for="tag in tagsList"
        :key="tag.id"
      >
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div> -->
    <div class="tags">
      <div v-for="tag in tagsList" :key="tag.id">
        <div class="tag" @click="coll($event)">
          {{ tag.name }} <Icon name="right" />
        </div>
        <div class="contenta"><span>内容</span></div>
      </div>
      <div class="addTag-wrapper">
        <button class="addTag" @click="addTag">新建</button>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { tagsListModel } from "@/models/tagsListModel";
import { Component } from "vue-property-decorator";
tagsListModel.fetch();
@Component
export default class Labels extends Vue {
  tagsList = tagsListModel.data;
  addTag() {
    const name = window.prompt("请输入标签名");
    if (name === "" || name!.trim() === "") {
      window.alert("不能为空");
    } else {
      const message = tagsListModel.create(name!);
      if (message === "duplicated") {
        window.alert("标签名重复");
      }
    }
  }
  coll(event: MouseEvent) {
    const but = event.target as HTMLButtonElement;
    console.log(event);
    const content = but.nextSibling as HTMLButtonElement;
    but.classList.toggle("active");
    if (content!.style.display === "block") {
      content.style.display = "none";
      console.log(1);
    } else {
      content.style.display = "block";
      console.log(2);
    }
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