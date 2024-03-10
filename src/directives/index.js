import clickOutside from './clickOutside'

export default {
  install (Vue) {
    Vue.directive('click-outside', clickOutside)
  }
}