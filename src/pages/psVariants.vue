<template>
  <div class="variants">
    <div class="variants__toolbar">

    </div>
    <div class="variants__body" :class="{ opened: isOpenedPopUp }">
      <div class="variants__main-window">
        <div class="variants__legends">
          <div class="variants__column">Выбор</div>
          <div class="variants__column">Имя</div>
          <div class="variants__column">Значимость</div>
          <div class="variants__column">Генотип</div>
          <div class="variants__column">HGVS</div>
          <div class="variants__column external">Внешние источники</div>
        </div>
        <div class="variants__main-window-body">
          <ps-variant-item class="variants__item" v-for="  item   in   variantsData  " :key="item.alleleName"
            :variant="item" @click="openPopUp(item)">
          </ps-variant-item>
        </div>
      </div>
      <ps-popup class="variants__main-popup" :item="currentVariant">
      </ps-popup>
    </div>
  </div>
</template>

<script setup>
import psVariantItem from '../components/psVariantItem.vue';
import psPopup from '../components/psPopup.vue';
import { useVariantStore } from '../stores/variantStore';
import { getVariants } from '../api/variants';
import { onMounted, ref } from 'vue';

const localStore = useVariantStore()
const variantsData = ref([])
const currentVariant = ref({})
const isOpenedPopUp = ref(false)

const openPopUp = (variant) => {
  if (currentVariant.value == variant) {
    currentVariant.value = {}
    isOpenedPopUp.value = false
  }
  else {
    currentVariant.value = variant
    isOpenedPopUp.value = true
  }

}

onMounted(() => {
  (async () => {
    await getVariants()
      .then((response) => {
        variantsData.value = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  })()
})

</script>

<style lang="scss" scoped>
.variants {
  box-shadow: 0px 0px 3px $shadowColor;

  &__toolbar {
    border-top-right-radius: $radius;
    height: 70px;
    background-color: $backgroundPrimaryColor;
  }

  &__body {
    display: grid;
    grid-template-columns: 1fr;
  }

  &__main-window-body {
    overflow-y: auto;
    height: 73dvh;
  }

  &__main-popup {
    opacity: 0;
    box-shadow: 0px 0px 3px $shadowColor;
    overflow-y: auto;
    height: 78dvh;
    transition: opacity 0.2s ease;
    scrollbar-width: 0;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__legends {
    display: grid;
    grid-template-columns: 2fr 3fr 5fr 5fr 9fr 6fr;
    align-items: center;
    background-color: $backgroundSecondaryColor;
    padding: calc($padding/2);
  }

  &__column {
    text-align: center;
    font-weight: 700;
    padding: $padding;
  }
}

.opened {
  display: grid;
  grid-template-columns: 6.5fr 3.5fr;

  .variants__main-popup {
    opacity: 1;

  }
}

.external {
  text-align: left;
}
</style>