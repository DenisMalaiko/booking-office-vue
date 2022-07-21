import store from "@/store";
import {computed} from "vue";

const Guard = (to: any, from: any, next: any) => {
  const storeVuex: any = store;
  const token = computed(() => storeVuex.state.auth.token);

  if(!token.value) {
    next({name: 'sign-in'})
  } else {
    next()
  }
}

export default Guard;
