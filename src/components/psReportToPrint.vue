<template>
    <Teleport to="#app">
        <div class="report">
            <div class="report__main-window">
                <div class="report__comment">
                    <div class="report__delimeter">
                        <div class="report__label">Комментарий</div>
                    </div>
                    <div class="report__input-body">
                        {{ localStore.comment }}
                    </div>

                </div>
                <div class="report__variants">
                    <div class="report__delimeter">
                        <div class="report__label">Генетические варианты</div>
                    </div>
                    <div class="report__items-list">
                        <ps-report-item class="report__item" v-for="item in localStore.checkedVariants"
                            :key="item.alleleName" :item="item" :showCross="false">
                            <div class="item__column">
                                <div class="report__cross" @click="uncheckItem(item)">
                                    <div></div>
                                </div>
                            </div>
                            <div class="item__column">
                                <div class="item__alleleName">Имя: <span class="item__value">{{ item.alleleName
                                        }}</span>
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
                        </ps-report-item>
                    </div>
                </div>
                <div class="report__others">
                    <div class="report__delimeter">
                        <div class="report__label">Другие иследованния</div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>

</template>

<script setup>
import { onMounted } from 'vue';
import router from '../router';
import { useVariantStore } from '../stores/variantStore';
import psReportItem from './psReportItem.vue';

const localStore = useVariantStore()

const props = defineProps({
    variants: {
        type: Array,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})
onMounted(() => {
    document.getElementById('wrapper').style.display = 'none'
    window.print()
    document.getElementById('wrapper').style.display = 'flex'
    router.push({ name: 'report' })
})

</script>

<style lang="scss" scoped>
.report {
    font-size: 10px;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 10fr;

    &__arrow {
        cursor: pointer;
        transition: 0.2s;
        margin-top: 3px;
        border: 5px solid transparent;
        border-top: 5px solid #00000090;
    }

    &__btn {
        background-color: $headerColor;
        display: flex;
        user-select: none;
        align-items: center;
    }

    &__toolbar {
        border-top-right-radius: $radius;
        border-top-left-radius: $radius;
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        background-color: $backgroundPrimaryColor;
        @include adaptive-value('padding', 16, 4, 0);
    }

    &__main-window {
        height: 100%;
        scrollbar-width: 10px;
        scrollbar-color: $backgroundSecondaryColor;

        &::-webkit-scrollbar {
            width: 10px;
            background-color: $backgroundSecondaryColor;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #fff;
        }
    }

    &__input-body {
        display: flex;
        position: relative;
        width: max-content;
    }

    &__input {
        box-shadow: 0 0 4px $shadowColor;
        padding: $padding $paddingGrand $padding $paddingMedium;
        @include adaptive-value('width', 500, 300, 0);
        border-radius: $radius;
        margin: $padding;
    }

    &__cross {
        cursor: pointer;
        margin-right: $paddingMedium;
        width: 15px;
        height: 15px;
        position: absolute;
        right: 0;
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

    &__label {
        font-weight: 700;
    }

    &__variants {
        display: flex;
        flex-direction: column;
    }

    &__delimeter {
        user-select: none;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: calc($padding/2) $padding;
        margin: $padding;
        border-radius: $radius;
        background-color: $backgroundSecondaryColor;
    }

    &__items-list {
        display: flex;
        flex-direction: column;
    }

    &__item {
        transition: all 0.2s;
        display: flex;
        justify-content: space-around;
        margin: $padding;
        border-radius: $radius;
        background-color: #EEEEEE60;
    }
}

.item {
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

        .report__cross {
            top: calc(50% - 7.5px);
            left: 0;
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
        align-self: center;
    }

    &__right-cord {
        align-self: center;
    }

    &__genotype {
        align-self: center;
    }

    &__left-anchor-contig {
        align-self: center;
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
        color: #000;
        margin: calc($padding/2);
        padding: calc($padding/2);
    }
}

.rotate {
    transform: rotate(180deg) translateY(3px);
}
</style>