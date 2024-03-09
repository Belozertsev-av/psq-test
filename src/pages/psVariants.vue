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
          <div class="variants__item" v-for="  item   in   variantsData  " :key="item.alleleName">
            <div class="variants__check" @click="checkItem(item)">
              <input class="variants__input" type="checkbox" name="report" :id="item.alleleName">
              <div class="variants__checkmark"></div>
            </div>
            <ps-variant-item :variant="item" @click="openPopUp(item)">
            </ps-variant-item>
          </div>
        </div>
      </div>
      <ps-popup class="variants__main-popup" :item="currentVariant" v-if="isOpenedPopUp">
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


const checkItem = (item) => {
  localStore.toggleVariant(item)
}

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
    scrollbar-width: 10px;
    scrollbar-color: $backgroundSecondaryColor;

    &::-webkit-scrollbar {
      width: 10px;
      background-color: $backgroundSecondaryColor;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #fff;
    }
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

  &__item {
    display: grid;
    grid-template-columns: 2fr 28fr;
  }

  &__check {
    transition: 0.2s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 3;

    &:hover {
      .variants__input~.variants__checkmark {
        background-color: #EEEEEE;
      }
    }

    .variants__input:checked~.variants__checkmark {
      transform: scale(0.9);
      background-color: $primaryColor;
    }
  }

  &__input {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
  }

  &__checkmark {
    z-index: -1;
    transition: 0.2s;
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    width: 20px;
    height: 20px;
    border: 2px solid $shadowColor;
    border-radius: $radius;
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