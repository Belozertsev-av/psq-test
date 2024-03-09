<template>
    <div class="item">
        <div class="item__invicator" :style="`background-color: ${significance.color};`">
            {{ significance.name }}
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    significance: {
        type: String,
        required: true,
        default: "Не указано"
    }
})

const significance = computed(() => {
    if (props.significance == "PATHOGENIC") return { name: "Патогенный", color: "#e32d00" }
    else if (props.significance == "LIKELY_PATHOGENIC") return { name: "Скорее патогенный", color: "#ff9100" }
    else if (props.significance == "BENIGN") return { name: "Доброкачественный", color: "#00bf8d" }
    else if (props.significance == "LIKELY_BENIGN") return { name: "Скорее доброкачественный", color: "#ffdd00" }
    else if (props.significance == "UNDEFINED") return { name: "Не определен", color: "#b7b3b396" }
    else if (props.significance == "UNCERTAIN") return { name: "Не определен", color: "#b7b3b396" }
    else return { name: props.significance, color: "#b7b3b396" }
})

</script>

<style lang="scss">
.item {
    &__invicator {
        background-color: $primaryColor;
        border-radius: $radius;
        padding: calc($padding/1.5) $padding;
        width: 100%;
        text-align: center;
        color: #fff;
    }
}
</style>