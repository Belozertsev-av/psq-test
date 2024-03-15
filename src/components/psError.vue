<template>
    <div class="error">
        <div class="error__body">
            <div class="error__code title">Ошибка {{ props.error.code }}</div>
            <div class="error__message subtitle">{{ props.error.message }}</div>
            <div class="error__suggetion">Проверьте подключение к интернету и попробуйте обновить страницу, если ошибка
                сохранилась свяжитесь со службой технической поддержки</div>
            <button class="error__btn btn">Сообщить об ошибки</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
// ======================== Props, Emits ========================
const props = defineProps({
    error: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.error {

    &__body {
        margin: 0 auto;
        text-align: center;
        height: 60%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &__code {
        margin: $padding;
    }

    &__message {
        padding: calc($padding/2);
    }

    &__suggetion {
        margin: $padding $padding $paddingGrand $padding;
    }
}
</style>