<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
    <loading></loading>
    <tips></tips>
  </div>
</template>

<script>
import loading from "@/components/common/loading";
import tips from "@/components/common/tips";
export default {
  name: "App",
  components: { tips, loading }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
