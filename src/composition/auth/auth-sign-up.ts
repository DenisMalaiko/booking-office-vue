import {ref} from "vue";

export function AuthSignUp() {
  const authSignUpForm = ref({
    name: '',
    email: '',
    role: '',
    password: '',
  })

  return {
    authSignUpForm
  }
}