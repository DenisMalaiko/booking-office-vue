<template src="./Error.html"></template>
<style src="./Error.scss" lang="scss"></style>

<script>
import store from "@/store";
import {computed} from "vue";

export default {
  name: "ErrorComponent",
  setup() {
    const storeVuex = store;
    const error = computed(() => storeVuex.state.error)

    return {
      error
    }
  }
}
</script>