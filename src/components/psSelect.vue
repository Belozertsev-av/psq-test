<template>
    <div class="select" v-click-outside="() => isActive = false">
        <label class="select__label-top">{{ props.type }}</label>
        <button class="select__button" @click="isActive = !isActive">
            <span class="select__value">{{ labelToDisplay }}</span>
            <span class="select__arrow"></span>
        </button>
        <ul class="select__dropdown" :class="{ active: isActive }">
            <li class="select__li" v-for=" value  in  props.values " :key="props.values.indexOf(value)"
                @click="selectValue(value)">
                <input class="select__input" type="checkbox" :value="value" name="select-item" />
                <label class="select__label">{{ value }}</label>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const emits = defineEmits(['pushFilter', 'deleteFilter'])
const props = defineProps({
    type: {
        type: String,
        required: true,
        default: "Поле"
    },
    values: {
        type: Array,
        required: true,
        default: ["Value"]
    }
})
const isActive = ref(false)
const selectedValues = ref([])
const selectValue = (value) => {
    if (selectedValues.value.includes(value)) {
        selectedValues.value.splice(selectedValues.value.indexOf(value), 1)
        emits('deleteFilter', value)
    }
    else {
        selectedValues.value.push(value)
        emits('pushFilter', value)
    }
}
const labelToDisplay = computed(() => {
    if (selectedValues.value.length == 0) return `Выберите ${props.type}`
    else {
        return `Выбрано ${selectedValues.value.length} элементов`
    }
})
</script>

<style lang="scss" scoped>
.select {
    margin: 0 calc($padding/2);
    display: flex;
    flex-direction: column;
    position: relative;

    &__label-top {
        position: absolute;
        font-size: 10px;
        top: 2px;
        left: $paddingMedium;
    }

    &__button {
        @include adaptive-value('width', 240, 180, 0);
        background-color: rgba(255, 255, 255, 0.6);
        border-bottom: 2px solid #00000090;
        border-top-left-radius: $radius;
        border-top-right-radius: $radius;
        padding: calc($paddingMedium + 2px) $paddingMedium $padding $paddingMedium;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__value {
        display: flex;
        overflow-x: hidden;
    }

    &__arrow {
        margin-top: 2.5px;
        border: 5px solid transparent;
        border-top: 5px solid #00000090;
    }

    &__dropdown {
        opacity: 0;
        position: absolute;
        width: 100%;
        top: 100%;
        left: 0;
        pointer-events: none;
        transition: 0.2s;
        background-color: rgba(255, 255, 255);
        box-shadow: 0px 0px 4px $shadowColor;
        display: flex;
        flex-direction: column;
        z-index: 4;

        li {
            display: flex;
            align-items: center;
            position: relative;
            height: 30px;
            width: 100%;

            &:hover {
                background-color: $backgroundSecondaryColor;
            }
        }
    }

    &__input {
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0;
        z-index: 3;

        &:checked~.select__label {
            background-color: $headerColor;
            color: #fff;
        }
    }

    &__label {
        transition: 0.2s;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        padding-left: $paddingMedium;
    }
}

.active {
    opacity: 1;
    margin-top: 0;
    pointer-events: all;

}
</style>