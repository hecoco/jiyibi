<template>
  <layout>
    <div class="tags">
      <div v-for="tag in tagList" :key="tag.id">
        <div class="tag" @click="coll($event)">
          {{ tag.name }}
          <Icon name="right"/>
        </div>
        <div class="contenta">
          <div>
            <But class="updateBut" @click.native="updateName(tag.id, tag.name)">修改标签</But>
            <But class="deleteBut" @click.native="remove(tag.id)">删除标签</But>
          </div>
          <div v-for="record in tagList">
            {{ record }}
          </div>
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
import {Component} from "vue-property-decorator";
import But from "@/components/But.vue";

@Component({
  components: {But},
})
export default class Labels extends Vue {

  get tagList() {
    return this.$store.state.tagList;
  }

  get newRecordList() {
    return this.$store.state.newRecordList;
  }

  created() {
    this.$store.commit('fetchTags');
    this.$store.commit('fetchRecords');
  }

  updateName(id: string, name: string) {
    const newName = window.prompt("修改标签名", name);
    if (newName === null || newName === "" || newName!.trim() === "") {
      return;
    } else if (newName) {
      this.$store.commit('updateTag', {id, newName})
    }
  }

  addTag() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return;
    } else if (name === "" || name!.trim() === "") {
      window.alert("不能为空");
    } else if (name) {
      this.$store.commit('createTag', name);
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
    this.$store.commit('removeTag', id)
  }
}
</script>

<style lang="scss" scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
}

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

.deleteBut {
  background: darkred;
  min-width: 30vw;
}

.updateBut {
  background: cornflowerblue;
  min-width: 30vw;
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