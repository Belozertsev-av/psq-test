<template>
  <div class="header">
    <div class="header__body">
      <div class="header__block">
        <div class="header__logo">
          <img src="../assets/img/logo.svg" alt="logo">
        </div>
        <div class="header__menu">
          <ul class="menu__body">
            <li class="menu__item">Запуски</li>
            <li class="menu__item">Анализы</li>
          </ul>
        </div>
      </div>
      <div class="header__block">
        <div class="header__btn btn">Загрузить данные</div>
        <div class="header__account">
          <div class="account__logo">
            <img src="../assets/img/account.png" alt="account">
          </div>
          <div class="account__username">aslepchenkov</div>
          <div class="account__arrow-down">
            <img src="../assets/img/down-arrow.png" alt="arrow">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.header {
  width: 100%;
  height: 100%;
  background-color: $headerColor;
  color: #fff;

  &__body {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc($padding/2) $padding;
  }

  &__block {
    display: flex;
    align-items: center;
  }

  &__logo {
    margin-right: $paddingGrand;

    img {
      height: 45px;
    }
  }

  &__btn {
    margin-right: $paddingMedium;
  }

  &__account {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0 $paddingMedium;
  }
}

.menu {

  &__body {
    display: flex;
  }

  &__item {
    margin: $padding;
    text-transform: uppercase;
    text-decoration: underline;
    cursor: pointer;
  }
}

.account {

  &__logo {
    margin-right: $padding;

    img {
      height: 18px;
    }

  }

  &__arrow-down {
    margin-left: $padding;

    img {
      height: 14px;
    }
  }
}
</style>