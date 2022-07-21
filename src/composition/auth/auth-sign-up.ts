import {ref} from "vue";
import {useStore} from "vuex";

export function AuthSignUp() {
  const store = useStore();

  const authSignUpForm = ref({
    valid: false,
    data: {
      name: '',
      email: '',
      role: '',
      password: '',
    }
  })

  const onAuthSignUp = (ref: any) => {
    if(authSignUpForm.value.valid) {
      store.dispatch('authSignUp', authSignUpForm.value.data)
        .then(() => {
          ref.formSignUp.reset();
          ref.formSignUp.resetValidation;
        })
    }
  }

  const clearError = () => {
    store.commit('clearError');
  }

  return {
    authSignUpForm,
    onAuthSignUp,
    clearError
  }
}