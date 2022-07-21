import {reactive, ref, watch} from "vue";
import store from "@/store";
import router from "@/router";

export function AuthSignIn() {
  const storeVuex: any = store;
  const token = reactive(() => storeVuex.state.auth.token);

  const authSignInForm = ref({
    valid: false,
    data: {
      email: '',
      password: ''
    }
  });

  const onAuthSignIn = (ref: any) => {
    if(authSignInForm.value.valid) {
      storeVuex.commit('startLoading');
      storeVuex.dispatch('authSignIn', authSignInForm.value.data);
      watch(token, (token) => {
        if(token) {
          router.push({ name: 'developers-office' })
        }
      })
    }
  }

  const clearError = () => {
    storeVuex.commit('clearError');
  }

  return {
    authSignInForm,
    onAuthSignIn,
    clearError
  }
}