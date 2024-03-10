<template>
    <div class="variants">
        <div class="variants__toolbar">

        </div>
        <div class="variants__main-window">
            Report
        </div>
    </div>
</template>

<script setup>
import { useVariantStore } from '../stores/variantStore';

const storeData = useVariantStore()
</script>

<style lang="scss" scoped>
.variants {
    &__toolbar {
        border-top-right-radius: $radius;
        border-top-left-radius: $radius;
        height: 70px;
        background-color: $backgroundPrimaryColor;
    }
}
</style>