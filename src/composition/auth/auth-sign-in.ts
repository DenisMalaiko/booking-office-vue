import {reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import router from "@/router";

export function AuthSignIn() {
  const store = useStore();
  const token = reactive(() => store.state.token);

  const authSignInForm = ref({
    valid: false,
    data: {
      email: '',
      password: ''
    }
  });

  const onAuthSignIn = (ref: any) => {
    if(authSignInForm.value.valid) {
      store.commit('startLoading');
      store.dispatch('authSignIn', authSignInForm.value.data);
      watch(token, (token) => {
        if(token) {
          ref.formSignIn.reset();
          ref.formSignIn.resetValidation;
          router.push({ name: 'booking' })
        }
      })
    }
  }

  const clearError = () => {
    store.commit('clearError');
  }

  return {
    authSignInForm,
    onAuthSignIn,
    clearError
  }
}