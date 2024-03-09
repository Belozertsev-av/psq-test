<template>
    <div class="item">
        <div class="item__body">
            <div class="item__check column" @click="checkItem">
                <input type="checkbox" :checked="isChecked" name="report" :id="variant.alleleName">
            </div>
            <div class="item__name column">{{ variant.alleleName }}</div>
            <ps-significance-indicator class="item__significance column"
                :significance="variant.significance"></ps-significance-indicator>
            <div class="item__genotype column">{{ genotype }}</div>
            <div class="item__g column">{{ variant.hgvs.g }}</div>
            <div class="item__c column">{{ variant.hgvs.c }}</div>
            <div class="item__p column">{{ variant.hgvs.p }}</div>
            <div class="item__external-sources">
                <div class="item__source-alias" :style="`background-color: ${aliasColor(item.link)};`"
                    v-for="item in variant.externalSourceEntries  " :key="item.id">
                    {{ item.database.alias }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useVariantStore } from '../stores/variantStore';
import psSignificanceIndicator from './psSignificanceIndicator.vue';

const localStore = useVariantStore()
const props = defineProps({
    variant: {
        type: Object,
        required: true,
        default: {
            "alleleName": "",
            "hgvs": {
                "g": "",
                "c": "",
                "p": ""
            },
            "alleleSequence": "-",
            "externalSourceEntries": [
                {
                    "id": "",
                    "link": null,
                    "database": {
                        "name": "",
                        "alias": "",
                        "version": "",
                        "category": ""
                    },
                    "significance": ""
                }
            ],
            "genotype": "",
            "leftAnchorContig": "",
            "leftAnchorPosition": 0,
            "referenceSequence": "",
            "rightAnchorPosition": 0,
            "significance": ""
        }
    }
})

const isChecked = ref(false)
const checkItem = () => {
    localStore.toggleVariant(props.variant)
    isChecked.value = !isChecked.value
}

const genotype = computed(() => {
    if (props.variant.genotype == "HETEROZYGOTE") return "Гетерозигота"
    else if (props.variant.genotype == "HOMOZYGOTE") return "Гомозигота"
})
const aliasColor = (item) => {
    if (item == null) return "#b7b3b396"
}
</script>

<style lang="scss" scoped>
.item {
    width: 100%;

    &__body {
        cursor: pointer;
        width: 100%;
        display: grid;
        grid-template-columns: 2fr 3fr 5fr 5fr 3fr 3fr 3fr 6fr;
        padding: $padding;
        transition: 0.2s ease;

        &:hover {
            background-color: #f7f7f7;
        }
    }

    &__external-sources {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
    }

    &__source-alias {
        cursor: pointer;
        background-color: $primaryColor;
        border-radius: $radius;
        font-size: 10px;
        color: #fff;
        width: 20px;
        height: 20px;
        margin: calc($padding/2);
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.hgvs {
    padding: calc($padding/2) $padding;
    margin: calc($padding/2) auto;
    text-align: center;
    width: 40%;
    color: white;
}

.column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 $padding;
}
</style>