<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Types />
    <Notes />
    <Tags />
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/money/NumberPad.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
import Types from "@/components/money/Typess.vue";

export default {
  name: "Money",
  components: { NumberPad, Notes, Tags, Types },
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
</style>