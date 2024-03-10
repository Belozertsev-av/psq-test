<template>
    <div class="input">
        <label class="input__label-top">{{ label }}</label>
        <input class="input__field" type="text" v-model="inputField" @change="enterValue" @click="isActive = !isActive">
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
import { ref } from 'vue';
const props = defineProps({
    label: {
        type: String,
        required: true,
        default: "Значение"
    }
})
const isActive = ref(false)
const inputField = ref("")
const enteredValues = ref([])
const enterValue = () => {
    if (!enteredValues.value.includes(inputField.value) && inputField.value != '') {
        enteredValues.value.push(inputField.value)
        inputField.value = ""
        isActive.value = true
    }
}
const deleteValue = (value) => {
    if (enteredValues.value.includes(value)) {
        enteredValues.value.splice(enteredValues.value.indexOf(value), 1)
    }
}
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
        background-color: rgba(255, 255, 255, 0.2);
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
        max-width: 200px;
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