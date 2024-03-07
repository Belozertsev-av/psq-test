import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useVariantStore = defineStore('variant', () => {
    const firstName = ref('Eduardo')
    const lastName = ref('Rodrigez')
    const fullName = computed(() => firstName.value + ' ' + lastName.value)

    return { firstName, lastName, fullName }
})