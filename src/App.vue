<template>
  <div class="wrapper">
    <header>
      <ps-header></ps-header>
    </header>
    <ps-results>
      <router-view></router-view>
    </ps-results>
  </div>

</template>

<script setup>
import psHeader from './components/psHeader.vue';
import psResults from './components/psResults.vue';
import { RouterView } from 'vue-router';


</script>

<style lang="scss" scoped>
header {
  height: 7dvh;
}

main {
  height: 93dvh;
}
</style>
