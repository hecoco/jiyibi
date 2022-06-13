<template>
  <layout>
    <div class="yyy">
      <date-picker
          :editable="editable"
          type="month"
          :placeholder="dateX"
          @input="di"
          class="dates"
      ></date-picker>
      <Tabs
          :value.sync="type"
          :data-source="detailsList"
          class-prefix="details"
      />
    </div>
    <div class="moon">
      <div>
        <span>{{ dateX }}支出:</span>
        <span>￥{{ Month.zc }}</span>
      </div>
      <div>
        <span>{{ dateX }}收入:</span>
        <span style="color:#f37773">￥{{ Month.sr }}</span>
      </div>
    </div>
    <div class="di" v-html="diWidth">
      <!--  -->
    </div>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index" class="day">
        <h3 class="title">
          {{ beautify(group.title) }} <span v-if="type!=='all'">总计：{{ group.total }}</span>
        </h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span><Icon :name="item.tags.svg"/>&nbsp&nbsp{{ item.tags.name }}</span>
            <p class="notes">{{ item.formItem }}</p>
            <span>
              <span v-if="item.type === '-'">-</span>
              {{ item.amount }}</span
            >
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      暂无记录<br/>
      <!--        <But @click.native="">去记账</But>-->
    </div>
  </layout>
</template>

<script lang="ts">
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constant/intervalList";
import Vue from "vue";
import {Component} from "vue-property-decorator";
import recordTypeList from "@/constant/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import But from "@/components/But.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/zh-cn";
import Details from "@/components/Details.vue";
import detailsList from "@/constant/detailsList";

@Component({
  components: {Details, Tabs, But, DatePicker},
})
export default class Statistics extends Vue {
  type = "all";
  month = "0";
  editable = false; //设置日期是否可以输入
  dateX = dayjs(new Date()).format("M月"); //显示
  createdAt = "a";

  get Month() {
    return this.$store.state.Month;
  }

  //收入支出比
  get diWidth(){
    const style = "height: .3em; border-radius:4px;"
    const srPercentages = Math.round(this.Month.zc / this.Month.sr ) * this.Month.sr;
    const zcPercentages = Math.round(this.Month.sr / this.Month.zc ) * this.Month.zc;
    const zc = "<div style='background:#67C1F5;"+style+"width: calc( 100vw - "+zcPercentages+"vw )'></div>";
    const sr = "<div style='background:#f37773;"+style+"width: calc( 100vw - "+srPercentages+"vw )'></div>";
    return zc+sr;
  }

  di(date: Date) {
    let hour = date.getHours() + 8;
    date.setHours(hour); //设置当前时区
    const x = dayjs(date.toISOString()).format("YYYY") === dayjs(new Date()).format("YYYY");
    x ? (this.dateX = dayjs(date.toISOString()).format("M月")) : (this.dateX = dayjs(date.toISOString()).format("YYYY年M月"));
    this.createdAt = dayjs(date.toISOString()).format("YYYY-MM");
    this.$store.commit("inquireMonth", dayjs(date.toISOString()).format("YYYY-MM"));
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  get xx() {
    return this.$store.commit('xxxx', recordTypeList)
  }

  get groupedList() {
    const {recordList} = this;
    let newList;
    if (this.type === "all") {
      newList = clone(recordList)
          .filter((r: RecordItem) =>
              this.createdAt === "a"
                  ? this.createdAt === this.createdAt
                  : dayjs(this.createdAt).format("YYYY-MM") ===
                  dayjs(r.createdAt).format("YYYY-MM")
          )
          .sort(
              (a: RecordItem, b: RecordItem) =>
                  dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
          );
    } else {
      newList = clone(recordList)
          .filter((r: RecordItem) => r.type === this.type)
          .filter((r: RecordItem) =>
              this.createdAt === "a"
                  ? this.createdAt === this.createdAt
                  : dayjs(this.createdAt).format("YYYY-MM") ===
                  dayjs(r.createdAt).format("YYYY-MM")
          )
          .sort(
              (a: RecordItem, b: RecordItem) =>
                  dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
          );
    }
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format('YYYY-MM-DD'),//会对current.createdAt以ISO 8601 格式解析
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + parseInt(item.amount.toString()), 0);//??
    });
    return result;
  }
  // 格式化
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    const week = [
      "星期天",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    if (day.isSame(now, "date")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else 
    if (day.isSame(now, "year")) {
      return day.format("M月D日") + " " + week[parseInt(day.format("d"))];
    } else {
      return day.format("YYYY年M月D日");
    }
  }

  //初始化
  mounted() {
    this.$store.commit("fetchRecords");
    this.$store.commit("inquireMonth", dayjs(new Date()).format("YYYY-MM"));
  }

  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
  detailsList = detailsList;
}
</script>

<style lang="scss" scoped>
.di{
  margin: 0 16px;
  display: flex;
  flex-direction: row;
}
.day {
  margin: 16px 20px;
}

.moon {
  display: flex;
  flex-direction: row;
  background: #1B2838;
  color: #66C0F4;

  div {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    width: 50vw;

    > span:first-child {
      //color: #a0a09e;
      color: #8A97A0;
      font-size: 0.8em;
      margin-left:4px;
    }

    > span:last-child {
      font-size: 20px;
    }
  }
}

.xxx {
  display: flex;
  flex-direction: row;
  width: 100vw;

  > div {
    margin-left: 16px;
    width: 50vw;

    > span {
      display: flex;
      flex-direction: column;
    }
  }
}

::v-deep .details-tabs {
  height: 34px;
  font-size: 14px;
  margin: 6px 16px;
}

::v-deep .details-tabs-item {
  height: 34px !important;
  padding: 0 10px;
  background: #1B2838;
  color: #4f94bc;

  &.selected {
    background: #42b983;
    color: white;

    &::after {
      display: none;
    }
  }
}

.yyy {
  display: flex;
  flex-direction: row;
  width: 100vw;
}

.dates {
  width: 136px;
  margin: 6px 16px;
}

.noResult {
  padding: 16px;
  text-align: center;
  color: #8A97A0  ;
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
  background: #1B2838;
  color: white;
}

.record {
  @extend %item;
  background: #0E151D;
  color: #c1dbf4;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  //color: #999999;
  color: #647580;
  width: 38vw;
  overflow: hidden; //??
  text-overflow: ellipsis;
}

::v-deep .type-tabs-item {
  &.selected {
    background: white;

    &::after {
      display: none;
    }
  }
}

::v-deep .interval-tabs-item {
  height: 48px;
}
</style>