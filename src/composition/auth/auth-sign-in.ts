import {ref} from "vue";

export function AuthSignIn() {
  const authSignInForm = ref({
    email: '',
    password: ''
  });

  const onAuthSignIn = () => {
    console.log(authSignInForm.value.email)
  }

  return {
    authSignInForm,
    onAuthSignIn
  }
}