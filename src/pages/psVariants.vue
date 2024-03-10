<template>
  <div class="variants">
    <div class="variants__toolbar" ref="toolbar">
      <div class="variants__filters">
        <psInput :label="'Имя варианта'"></psInput>
        <ps-select :label="'Значимость'" :values="['PATHOGENIC', 'LIKELY_PATHOGENIC', 'BENIGN', 'UNDEFINED'
          , 'UNCERTAIN', 'LIKELY_BENIGN']" @selected-values="filterBy"></ps-select>
        <ps-select :label="'Генотип'" :values="['HETEROZYGOTE', 'HOMOZYGOTE']" @selected-values="filterBy"></ps-select>
        <psInput :label="'NGVS имя'"></psInput>
      </div>
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
          <div class="variants__item" v-for="     item    in    variantsData   " :key="item.alleleName">
            <div class="variants__check" @click="checkItem(item)">
              <input class="variants__input" type="checkbox" name="report" :id="item.alleleName">
              <div class="variants__checkmark"></div>
            </div>
            <ps-variant-item :variant="item" @click="openPopUp(item)" :class="{ selected: currentVariant === item }">
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
import psSelect from '../components/psSelect.vue';
import psInput from '../components/psInput.vue';
import { useVariantStore } from '../stores/variantStore';
import { getVariants } from '../api/variants';
import { onMounted, ref, computed } from 'vue';

const localStore = useVariantStore()
const variantsData = ref([])
const currentVariant = ref({})
const isOpenedPopUp = ref(false)
const toolbar = ref(null)
const toolbarHeight = ref(0)

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

<style lang="scss">
.variants {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;

  &__toolbar {
    border-top-right-radius: $radius;
    width: 100%;
    display: flex;
    background-color: $backgroundPrimaryColor;
    @include adaptive-value('padding', 16, 4, 0);
  }

  &__filters {
    width: 100%;
    display: flex;
    align-items: flex-start;
  }

  &__body {
    display: grid;
    grid-template-columns: 1fr;

  }

  &__main-window {}

  &__main-window-body {
    display: flex;
    flex-direction: column;
    max-height: 79svh;
    overflow-y: auto;
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
    box-shadow: 0 0 3px $shadowColor;
    overflow-y: auto;
    max-height: 79svh;
    transition: opacity 0.2s ease;
    scrollbar-width: 0;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__legends {
    display: grid;
    grid-template-columns: 2fr 4fr 4fr 5fr 9fr 4fr;
    align-items: center;
    background-color: $backgroundSecondaryColor;
  }

  &__column {
    text-align: center;
    font-weight: 700;
    @include adaptive-value('padding', 8, 4, 0);
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

  .variants__legends {
    grid-template-columns: 2fr 4fr 7fr 4fr 8fr 3fr;
  }

  .variants__main-popup {
    opacity: 1;

  }
}

.selected {
  background-color: $secondaryColor;
  border-top-left-radius: $radius;
  border-bottom-left-radius: $radius;
}

.external {
  text-align: left;
}

@media screen and (max-width: 1100px) {
  .opened {
    display: flex;
    flex-direction: column;

    .variants__main-window-body {
      height: calc(79svh / 2);
    }

    .variants__legends {
      grid-template-columns: 2fr 4fr 5fr 5fr 8fr 4fr;
    }
  }

  .variants {

    &__legends {
      grid-template-columns: 2fr 4fr 5fr 5fr 8fr 4fr;
    }

    &__main-popup {
      background-color: #fff;
      z-index: 4;
      height: calc(79svh / 2);
    }
  }
}
</style>