// Директива обработки нажатия вне элемента
const clickOutside = {
    beforeMount(el, binding) {
        el.__ClickOutsideHandler__ = (e) => {
            if (!(el === e.target || el.contains(e.target))) {
                binding.value(e)
            }
        }
        document.body.addEventListener('click', el.__ClickOutsideHandler__)
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.__ClickOutsideHandler__)
    }
};

export default clickOutside