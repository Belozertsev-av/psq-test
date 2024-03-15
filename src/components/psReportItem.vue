<template>
    <div class="item">
        <div class="item__column" v-if="showCross">
            <div class="item__cross" @click="uncheckItem(item)">
                <div></div>
            </div>
        </div>
        <div class="item__column">
            <div class="item__alleleName">Имя: <span class="item__value">{{ item.alleleName }}</span>
            </div>
            <div class="item__significance">Знач: <span class="item__value">{{ item.significance
                    }}</span>
            </div>
        </div>
        <div class="item__column">
            <div class="item__hgvs">HGVS:</div>
            <div class="item__value">{{ item.hgvs.g }}</div>
            <div class="item__value">{{ item.hgvs.c }}</div>
            <div class="item__value">{{ item.hgvs.p }}</div>

        </div>
        <div class="item__column">
            <div class="item__left-cord">Лев. коорд:</div>
            <div class="item__value">{{ item.leftAnchorPosition }}</div>
        </div>
        <div class="item__column">
            <div class="item__right-cord">Прав. коорд:</div>
            <div class="item__value">{{ item.rightAnchorPosition }}</div>
        </div>
        <div class="item__column">
            <div class="item__genotype">Генотип:</div>
            <div class="item__value">{{ item.genotype }}</div>
        </div>
        <div class="item__column">
            <div class="item__left-anchor-contig">Хромосома:</div>
            <div class="item__value">{{ item.leftAnchorContig }}</div>
        </div>
        <div class="item__column">
            <div class="item__allele-sequence">Послед. варианта:
                <span class="item__value">{{ item.alleleSequence }}</span>
            </div>
            <div class="item__reference-sequence">Послед. в реф. геноме:
                <span class="item__value">{{ item.referenceSequence }}</span>
            </div>
        </div>
        <div class="item__column">
            <div class="item__external-sources">
                <div class="item__source" v-for="source in item.externalSourceEntries">
                    {{ (source.database.alias != null) ? source.database.alias : '?' }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useVariantStore } from '../stores/variantStore';
// ======================== Props, Emits ========================
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    showCross: {
        type: Boolean,
        required: true
    }
})
// ======================== Переменные ========================
const localStore = useVariantStore()
// ======================== Функции ========================
const uncheckItem = (item) => {
    localStore.toggleVariant(item)
}
</script>

<style lang="scss" scoped>
.item {
    transition: all 0.2s;
    display: grid;
    grid-template-columns: 1fr 5fr 4fr 4fr 4fr 5fr 2fr 4fr 3fr;
    margin: $padding;
    border-radius: $radius;
    background-color: #EEEEEE60;

    &__value {
        font-weight: 700;
        padding: calc($padding/2);
    }

    &__column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        position: relative;

        &:first-child {
            margin: $padding;
        }

        .report__cross {
            top: calc(50% - 7.5px);
            left: 0;
        }
    }

    &__cross {
        cursor: pointer;
        margin-right: $paddingMedium;
        width: 15px;
        height: 15px;
        position: absolute;
        top: calc(50% - 7.5px);
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

    &__alleleName {
        padding: calc($padding/2);
    }

    &__significance {
        padding: calc($padding/2);
    }

    &__hgvs {
        padding: calc($padding/2);
    }

    &__left-cord {
        padding: calc($padding/2);
    }

    &__right-cord {
        padding: calc($padding/2);
    }

    &__genotype {
        padding: calc($padding/2);
    }

    &__left-anchor-contig {
        padding: calc($padding/2);
    }

    &__allele-sequence {
        padding: calc($padding/2);
    }

    &__reference-sequence {
        padding: calc($padding/2);
    }

    &__external-sources {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1 1 auto;
    }

    &__source {
        background-color: $primaryColor;
        border-radius: $radius;
        font-size: 8px;
        color: #fff;
        margin: calc($padding/2);
        padding: calc($padding/2);
    }
}

@media screen and (max-width: 1200px) {

    .item {
        &__external-sources {
            width: 50px;
            flex-wrap: wrap;
        }

        &__source {
            flex-wrap: wrap;
            font-size: 8px;
            margin: 2px;
        }
    }
}
</style>