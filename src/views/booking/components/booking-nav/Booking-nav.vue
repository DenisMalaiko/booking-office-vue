<template src="./Booking-nav.html"></template>
<style lang="scss" src="./Booking-nav.scss" scoped></style>

<script>
import moment from 'moment'
export default {
  name: "booking-nav",
  setup() {
    const today = moment(new Date()).format('D.MM.yyyy');

    return {
      today
    }
  }
}
</script>
