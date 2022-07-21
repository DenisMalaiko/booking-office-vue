<template src="./Booking.html"></template>

<script>
import {Booking} from "@/composition/booking/booking";
import BookingNav from "./components/booking-nav/Booking-nav";
import BookingTop from "./components/booking-top/Booking-top";

export default {
  name: "booking-page",
  components: {
    BookingNav,
    BookingTop
  },
  setup() {

    return {
      ...Booking()
    }
  }
}
</script>

<style scoped>

</style>