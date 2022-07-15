<template src="./Auth-Sign-Up.html"></template>

<script>
import {ref} from 'vue';
import {AuthSignUp} from "@/composition/auth/auth-sign-up";
import {Validations} from "@/composition/validations/validations";
import {RolesEnum} from "@/shared/enums/Roles.enum.ts";

export default {
  name: "auth-sign-up",

  setup() {
    const Roles = ref(Object.values(RolesEnum));

    return {
      ...AuthSignUp(),
      ...Validations(),

      Roles
    }
  }
}
</script>
