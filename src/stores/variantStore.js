import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"

export const useVariantStore = defineStore('variant', () => {
    const checkedVariants = ref([])
    // const fullName = computed(() => firstName.value + ' ' + lastName.value)
    const isChecked = (variant) => {
        if (checkedVariants.value.includes(variant)) return true
        else return false
    }
    const toggleVariant= (variant) => {
        if (!isChecked(variant)) checkedVariants.value.push(variant)
        else checkedVariants.value.splice(checkedVariants.value.indexOf(variant), 1)
    }

    return { checkedVariants, isChecked, toggleVariant }
})