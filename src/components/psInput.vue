<template>
    <div class="input" v-click-outside="() => isActive = false">
        <label class="input__label-top">{{ props.type }}</label>
        <input class="input__field" type="text" :placeholder="labelToDisplay" v-model="inputField" @change="enterValue"
            @click="isActive = !isActive">
        </input>
        <ul class="input__dropdown" :class="{ active: isActive }">
            <li class="input__li" v-for="value in enteredValues" :key="enteredValues.indexOf(value)">
                <div class="input__label">{{ value }}</div>
                <button class="input__button" @click="deleteValue(value)">
                    <div></div>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// ======================== Props, Emits ========================
const emits = defineEmits(['pushFilter', 'deleteFilter'])
const props = defineProps({
    type: {
        type: String,
        required: true,
        default: "Значение"
    }
})
// ======================== Переменные ========================
const isActive = ref(false)
const inputField = ref("")
const enteredValues = ref([])
// ======================== Функции ========================
const enterValue = () => {
    if (!enteredValues.value.includes(inputField.value) && inputField.value != '') {
        enteredValues.value.push(inputField.value)
        isActive.value = true
        emits('pushFilter', inputField.value)
        inputField.value = ""
    }
}
const deleteValue = (value) => {
    if (enteredValues.value.includes(value)) {
        enteredValues.value.splice(enteredValues.value.indexOf(value), 1)
        emits('deleteFilter', value)
    }
}
// ======================== Вычисляемые значения ========================
const labelToDisplay = computed(() => {
    if (enteredValues.value.length == 0) return `Введите ${props.type}`
    else {
        return `Введено ${enteredValues.value.length} значений`
    }
})
</script>

<style lang="scss" scoped>
.input {
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

    &__field {
        @include adaptive-value('width', 240, 140, 0);
        background-color: rgba(255, 255, 255, 0.6);
        border-bottom: 2px solid #00000090;
        border-top-left-radius: $radius;
        border-top-right-radius: $radius;
        padding: calc($paddingMedium + 2px) $paddingMedium $padding $paddingMedium;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &::placeholder {
            color: #000;
        }
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
            justify-content: space-between;
            align-items: center;
            height: 30px;
            width: 100%;

            &:hover {
                background-color: $backgroundSecondaryColor;
            }
        }
    }

    &__label {
        padding-left: $paddingMedium;
    }

    &__button {
        margin-right: $paddingMedium;
        width: 15px;
        height: 15px;
        position: relative;
        background: none;

        div {
            background-color: $headerColor;
            width: 2px;
            height: 100%;
            position: absolute;
            top: 0;
            left: calc(50% - 2px);
            transform: rotate(45deg);

            &::before {
                content: "";
                background-color: $headerColor;
                position: absolute;
                top: 0;
                left: 0;
                width: 2px;
                height: 100%;
                transform: rotate(-90deg);
            }
        }
    }
}

.active {
    opacity: 1;
    margin-top: 0;
    pointer-events: all;

}
</style>