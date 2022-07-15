<template src="./Auth-Sign-In.html"></template>

<script>
import {AuthSignIn} from "@/composition/auth/auth-sign-in";
import {Validations} from "@/composition/validations/validations";

export default {
  name: "auth-sign-in",
  setup() {

    return {
      ...AuthSignIn(),
      ...Validations(),
    }
  }
}
</script>