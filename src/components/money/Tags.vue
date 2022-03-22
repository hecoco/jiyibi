<template>
  <div class="tags">
    <div class="new">
      <button @click="addTag">
        <span v-if="type==='-'">新增支出标签</span>
        <span v-else-if="type==='+'">新增收入标签</span>
      </button>
    </div>
    <ul class="current">
      <li
        v-for="tag in types"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
      >
        <Icon :name=tag.svg.trim() />
        <span>{{ tag.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import clone from "@/lib/clone";
@Component({
  // computed:{
  //   tagList(){return this.$store.state.tagList;}
  // }
})
export default class Tags extends Vue {
  selectedTags: string[] = [];
  @Prop() type!:string;

  get tagsList(){
    return this.$store.state.tagList;
  }

  get types(){
    const {tagsList} = this;
    return clone(tagsList).filter((r:Tag)=> r.type ===this.type);
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
  addTag() {
    const name = window.prompt("请输入标签名");
    if (!name){
      return;
    }else if (name === "" || name!.trim() === "") {
      window.alert("不能为空");
    } else if (name) {
      this.$store.commit('createTag', name);
    }
  }
  created(){
    this.$store.commit('fetchTags')
  }
}
</script>

<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      border-radius: ($h/2);
      line-height: $h;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      border: none;
      color: #999;
      border-bottom: 1px solid;
      background: transparent;
      padding: 0 4px;
    }
  }
}
</style>