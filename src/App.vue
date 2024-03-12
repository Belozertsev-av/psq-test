<template>
  <div class="wrapper" id="wrapper">
    <header>
      <ps-header></ps-header>
    </header>
    <ps-results></ps-results>
  </div>

</template>

<script setup>
import psHeader from './components/psHeader.vue';
import psResults from './components/psResults.vue';


</script>

<style lang="scss" scoped>
header {
  height: 7dvh;
}

main {
  height: 93dvh;
}
</style>
