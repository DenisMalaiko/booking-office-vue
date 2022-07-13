import {ref} from "vue";
import {useStore} from "vuex";

export function AuthSignUp() {
  const store = useStore();

  const authSignUpForm = ref({
    name: '',
    email: '',
    role: '',
    password: '',
  })

  const onAuthSignUp = () => {
    store.dispatch('authSignUp', authSignUpForm.value)
  }

  return {
    authSignUpForm,
    onAuthSignUp
  }
}