<template src="./Booking.html"></template>

<script>
import {Booking} from "@/composition/booking/booking";

export default {
  name: "booking-page",
  setup() {

    return {
      ...Booking()
    }
  }
}
</script>

<style scoped>

</style>