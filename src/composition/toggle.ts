import {ref} from "vue";

export function useToggle() {
  const check = ref(false);
  const toggle = () => {
    check.value = !check.value
  }

  return {check, toggle}
}