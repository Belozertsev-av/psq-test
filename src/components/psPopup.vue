<template>
    <div class="popup">
        <div class="popup__body">
            <div class="popup__topside">
                <div class="popup__title title">{{ item.alleleName }}</div>
                <ps-significance-indicator class="popup__significance"
                    :significance="item.significance"></ps-significance-indicator>
            </div>
            <div class="popup__hgvs">
                <div class="hgvs__top">
                    <div class="hgvs__title">Запись варианта в номенклатуре HGVS</div>
                </div>
                <div class="hgvs__row legends">
                    <div class="hgvs__column">Геномная ДНК</div>
                    <div class="hgvs__column">Комплементарная ДНК
                    </div>
                    <div class="hgvs__column">Протеины</div>
                </div>
                <div class="hgvs__row">
                    <div class="hgvs__column">{{ item.hgvs }}</div>
                    <div class="hgvs__column">{{ item.hgvs }}</div>
                    <div class="hgvs__column">{{ item.hgvs }}</div>
                </div>
            </div>
            <div class="popup__table">
                <div class="popup__column">
                    <div class="popup__key">Генотип:</div>
                    <div class="popup__key">Хромосома варианта:</div>
                    <div class="popup__key">Левая координата:</div>
                    <div class="popup__key">Правая координата:</div>
                    <div class="popup__key">Последовательность варината:</div>
                    <div class="popup__key">Последовательность в референсном геноме:</div>

                </div>
                <div class="popup__column">
                    <div class="popup__value">{{ item.genotype }}</div>
                    <div class="popup__value">{{ item.leftAnchorContig }}</div>
                    <div class="popup__value">{{ item.leftAnchorPosition }}</div>
                    <div class="popup__value">{{ item.rightAnchorPosition }}</div>
                    <div class="popup__value">{{ item.alleleSequence }}</div>
                    <div class="popup__value">{{ item.referenceSequence }}</div>
                </div>
            </div>
            <div class="popup__external-libraries">
                <div class="popup__external-title title">Внешние источники</div>
                <div class="popup__elems">
                    <div class="popup__el" v-for="el in   item.externalSourceEntries  " :key="el.id">
                        <div class="el__name">{{ el.database.name }}</div>
                        <div class="el__version">{{ el.database.version }}</div>
                        <div class="el__id">{{ el.id }}</div>
                        <ps-significance-indicator class="el__significance"
                            :significance="el.significance ?? 'Не указано'">
                        </ps-significance-indicator>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import psSignificanceIndicator from './psSignificanceIndicator.vue';
import { useVariantStore } from '../stores/variantStore';
import { computed } from 'vue';

const localStore = useVariantStore()
const props = defineProps({
    item: {
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

</script>

<style lang="scss" scoped>
.popup {
    &__body {

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__title {
        margin-right: $padding;
    }

    &__topside {
        display: flex;
        padding: $padding;
    }

    &__hgvs {
        padding: $padding;
        display: flex;
        flex-direction: column;
    }

    &__table {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 1fr;
        padding: $padding;
    }

    &__column {
        padding: $padding;
        display: grid;
        grid-template-rows: repeat(1fr, 6);
        gap: $padding;
    }

    &__key {
        font-weight: 700;
    }

    &__external-libraries {
        width: 100%;
        padding: $padding;
    }

    &__external-title {
        text-align: center;
    }

    &__elems {
        padding-top: $padding;
        display: flex;
        flex-direction: column;
    }

    &__el {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        padding: calc($padding/2) $padding;
    }
}

.el {

    &__id {}

    &__significance {}

    &__name {}

    &__version {}

    &__category {}
}

.hgvs {
    &__top {
        width: 100%;
        padding: $padding;
        border-top-left-radius: $radius;
        border-top-right-radius: $radius;
        background-color: $backgroundPrimaryColor;
        text-align: center;
        font-weight: 700;
    }

    &__row {
        border-bottom: 1px solid $backgroundSecondaryColor;
        border-left: 1px solid $backgroundSecondaryColor;
        border-right: 1px solid $backgroundSecondaryColor;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        text-align: center;
        align-items: center;
    }

    &__column {
        height: 100%;
        padding: $padding;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.legends {
    background-color: $backgroundSecondaryColor;
    font-weight: 700;
}
</style>