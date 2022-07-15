<template src="./Auth.html"></template>

<style lang="scss" src="./Auth.scss"></style>

<script>
import AuthSignIn from "@/views/auth/components/auth-sign-in/Auth-Sign-In";
import LoaderComponent from "@/shared/components/loader/Loader";
import ErrorComponent from "@/shared/components/error/Error";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "auth-page",
  components: {
    AuthSignIn,
    LoaderComponent,
    ErrorComponent
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);

    return {
      loading
    }
  }
}
</script>
