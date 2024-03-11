import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"

export const useVariantStore = defineStore('variant', () => {
    // Выбранные для отчета варианты
    const checkedVariants = ref([])

    // Проверка, выбран ли вариант
    const isChecked = (variant) => {
        if (checkedVariants.value.includes(variant)) return true
        else return false
    }

    // Выбор варианта
    const toggleVariant= (variant) => {
        if (!isChecked(variant)) checkedVariants.value.push(variant)
        else checkedVariants.value.splice(checkedVariants.value.indexOf(variant), 1)
    }

    return { checkedVariants, isChecked, toggleVariant }
})