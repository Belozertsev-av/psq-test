<template>
    <main class="results">
        <div class="results__body">
            <div class="results__navbar">
                <div class="navbar__list">
                    <router-link to="/" class="navbar__item">Ген. варианты</router-link>
                    <router-link to="/others" class="navbar__item">Дргуая вкладка</router-link>
                    <router-link to="/report" class="navbar__item">Отчёт</router-link>
                </div>
                <div class="navbar__meta">
                    <ps-meta></ps-meta>
                </div>
            </div>
            <div class="results__main-window">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is=" Component " />
                    </keep-alive>
                </router-view>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import psMeta from '../components/psMeta.vue';
</script>

<style lang="scss">
.results {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    &__body {
        @include adaptive-value('padding', 8, 4, 0);
        width: 100%;
        height: 100%;
    }

    &__navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__main-window {
        height: 100%;
    }
}

.navbar {

    &__list {
        display: flex;
    }

    &__item {
        transition: all 0.2s ease;
        border-top-left-radius: $radius;
        border-top-right-radius: $radius;
        @include adaptive-value('padding-top', 8, 4, 0);
        @include adaptive-value('padding-bottom', 8, 4, 0);
        @include adaptive-value('padding-left', 16, 8, 0);
        @include adaptive-value('padding-right', 16, 8, 0);
        color: #000;
        text-decoration: none;
    }
}

.router-link-active {
    background-color: $backgroundPrimaryColor;
    color: #fff;
    font-weight: 700;
    text-decoration: none;
}

.v-enter-active,
.v-leave-active {
    transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {}
</style>