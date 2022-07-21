import {useStore} from "vuex";
import {computed } from "vue";

export function Booking() {
  const store = useStore();
  const user = computed(() => store.state.auth.user);

  return {
    user,
  }
}