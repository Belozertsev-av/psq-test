<template>
  <div class="others">
    <div class="others__toolbar">

    </div>
    <div class="others__main-window">
      <div>
        Others
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.others {
  &__toolbar {
    border-top-right-radius: $radius;
    border-top-left-radius: $radius;
    height: 70px;
    background-color: $backgroundPrimaryColor;
  }

  &__main-window {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
}
</style>