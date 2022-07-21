<template src="./Booking-top.html"></template>
<style src="./Booking-top.scss" lang="scss" scoped></style>

<script>
import router from "@/router";
import store from "@/store";
import {toRef, computed} from "vue";

export default {
  name: "Booking-top",
  props: ["user"],
  setup(props) {
    const userProp = toRef(props, "user");
    const currentdDate = computed(() => store.state.booking.currentDate);

    const onLogout = () => {
      store.commit("logout");
      router.push({ name: "sign-in" });
    }

    const onSelectDate = (modelData) => {
      store.dispatch("getBooking", modelData)
      store.commit("setCurrentDate", modelData)
    }

    return {
      onLogout,
      onSelectDate,
      userProp,
      currentdDate
    }
  }
}
</script>
