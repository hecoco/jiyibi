<template>
  <layout>
    <div class="tags">
      <div v-for="tag in tagList" :key="tag.id" >
        <div class="tag" @click="coll($event,tag)">
          {{ tag.name }}
          <Icon name="right" />
        </div>
        <div class="contenta">
          <div>
            <But class="updateBut" @click.native="updateName(tag.id, tag.name)">修改标签</But>
            <But class="deleteBut" @click.native="remove(tag.id)">删除标签</But>
          </div>
          <div>
<!--            {{recordList}}-->
<!--            <span v-if="record.type === `-`">支出</span>-->
<!--            <span v-else-if="record.type === `+`">收入</span>-->
<!--            <span>标签{{record.tags}}</span>-->
<!--            <span>备注{{record.formItem ? record.formItem:'kong'}}</span>-->
<!--            <span>金额{{record.amount}}</span>-->
<!--            <span>时间{{record.createdAt}}</span>-->
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
import { Component } from "vue-property-decorator";
import But from "@/components/But.vue";
@Component({
  components: { But },
  computed:{
    tagList(){return this.$store.state.tagList;}
  }
})
export default class Labels extends Vue {
  created(){
    this.$store.commit('fetchTags')
  }
  // tagsList = store.tagList;
  // recordList = store.recordList;

  //获取到选中的ID
  //返回recordList[]数组
  //展示
  recordC(id:string){

  }

  updateName(id: string, name: string) {
    const newName = window.prompt("修改标签名", name);
    if (newName === null || newName === "" || newName!.trim() === "") {
      return;
    } else if (newName) {
      // store.updateTag(id, newName);
    }
  }
  addTag() {
    const name = window.prompt("请输入标签名");
    if (name === "" || name!.trim() === "") {
      window.alert("不能为空");
    } else if (name) {
      this.$store.commit('createTag',name);
    }
  }
  coll(event: MouseEvent,tag:String[]) {
    const but = event.target as HTMLButtonElement;
    const content = but.nextSibling as HTMLButtonElement;
    but.classList.toggle("active");
    if (content!.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
    // const z = store.inquireRecord(tag);
  }
  remove(id: string) {
    this.$store.commit('removeTag',id)
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
.deleteBut{
  background: darkred;
}
.updateBut{
  background: cornflowerblue;
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