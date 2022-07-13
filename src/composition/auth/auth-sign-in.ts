import {ref} from "vue";
import {useStore} from "vuex";

export function AuthSignIn() {
  const store = useStore();

  const authSignInForm = ref({
    email: '',
    password: ''
  });

  const onAuthSignIn = () => {
    store.dispatch('authSignIn', authSignInForm.value)
  }

  return {
    authSignInForm,
    onAuthSignIn,
  }
}