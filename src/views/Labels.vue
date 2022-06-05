<template>
  <layout>
    <div class="tags">
      <div v-for="tag in tagList" :key="tag.id">
        <div class="tag" >
          <div>
            <span>{{ tag.name }}</span>
          </div>
          <div>
            <Icon name="deleteTag" @click.native="remove(tag.id)"/>
            &nbsp&nbsp
            <Icon name="updateTag" @click.native="updateName(tag.id, tag.name)"/>
          </div>
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
    let isDelete = confirm("您确定要删除吗？");
    if (isDelete){
      this.$store.commit('removeTag', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  color: #67c1f5;
  background: #67c1f51A;
  > div {
    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 3px solid #16202D;
      svg {
        width: 18px;
        height: 18px;
        color: white;
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