<template>
    <div class="meta">
        <div class="meta__link">СРТКНб</div>
        <div class="meta__date">23.11.2020</div>
        <div class="meta__sample">Test sample 01</div>
        <div class="meta__type">S1</div>
        <div class="meta__cftr">CFTR v1 (SP 1.1.1)</div>
        <div class="meta__status">1210-0</div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.meta {
    display: flex;
    justify-content: flex-start;
    padding: 0 $padding;

    div {
        padding: 0 $padding;
    }

    &__link {
        color: $selectedColor;
        text-decoration: underline;
    }

    &__date {}

    &__sample {
        font-weight: 700;
    }

    &__type {}

    &__cftr {}

    &__status {
        color: $primaryColor;
        border-radius: $radius;
        border: 2px solid $primaryColor;
    }
}
</style>