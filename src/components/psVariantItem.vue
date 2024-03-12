<template>
    <div class="item">
        <div class="item__body">
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
import { computed } from 'vue';
import psSignificanceIndicator from './psSignificanceIndicator.vue';
// ======================== Props ========================
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
// ======================== Вычисляемые значения ========================
const genotype = computed(() => {
    if (props.variant.genotype == "HETEROZYGOTE") return "Гетерозигота"
    else if (props.variant.genotype == "HOMOZYGOTE") return "Гомозигота"
})
// ======================== Функции ========================
// Определяет есть ли ссылка на источник
const aliasColor = (link) => {
    if (link == null) return "#b7b3b396"
}
</script>

<style lang="scss" scoped>
.item {
    width: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &__body {
        cursor: pointer;
        width: 100%;
        display: grid;
        grid-template-columns: 4fr 5fr 5fr 3fr 3fr 3fr 5fr;
        padding: $padding;
        transition: 0.2s ease;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            transition: 0.2s ease;
            z-index: -1;
            position: absolute;
            top: 0;
            left: -150px;
            height: 100%;
            width: 300px;
            background-color: #f7f7f7;
            opacity: 0;
        }

        &:hover {

            &::before {
                content: "";
                opacity: 1;
            }

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
        font-size: 8px;
        color: #fff;
        width: 15px;
        height: 15px;
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
    word-wrap: break-word;
}

@media screen and (max-width: 1100px) {
    .opened {
        .item {
            &__body {
                grid-template-columns: 3fr 7fr 5fr 2fr 3fr 2fr 5fr;
            }
        }
    }

    .item {
        &__body {
            grid-template-columns: 3fr 7fr 5fr 2fr 3fr 2fr 5fr;
        }
    }
}
</style>