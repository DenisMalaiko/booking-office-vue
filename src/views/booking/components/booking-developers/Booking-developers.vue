<template src="./Booking-developers.html"></template>
<style lang="scss" src="./Booking-developers.scss" scoped></style>

<script>
import store from "@/store";
import {Booking} from "@/composition/booking/booking";
import {computed, onMounted, ref, watch} from "vue";
import BookingDialog from "../../../../shared/components/dialog/Dialog";

export default {
  name: "Booking-developers",
  data() {
    return {
      dialog: false,
    }
  },
  components: {
    BookingDialog
  },
  setup() {
    const tables = ref();
    const office = computed(() => store.state.booking.office);
    const bookings = computed(() => store.state.booking.bookings);
    const user = computed(() => store.state.auth.user)
    const currentDate = computed(() => store.state.booking.currentDate);
    const bookingDialog = ref(null);

    const addBooking = (bookingData) => {
      bookingDialog.value.open({
        data: {
          user_id: user.value.id,
          table_id: bookingData.number,
          time_start: bookingData.time_start ? bookingData.time_start : currentDate.value,
          time_end: bookingData.time_end ? bookingData.time_end : "",
          name: user.value.name,
          booking_id: bookingData.booking_id ? bookingData.booking_id : "",
          floor_id: 1,
        }
      })
    }

    const showBookings = () => {
      const officeCopy = [];
      office.value.forEach((table) => {
        const tableCopy = {...table};
        if (bookings.value.find((book) => book.table_id === table.number)) {
          tableCopy.status = true;
          let indexBooking = bookings.value.findIndex((book) => book.table_id === table.number);
          if (bookings.value[indexBooking].user_id === user.value.id) {
            tableCopy.myBooking = true;
            tableCopy.status = false;
            tableCopy.booking_id = bookings.value[indexBooking].id;
            tableCopy.time_start = bookings.value[indexBooking].time_start;
            tableCopy.time_end = bookings.value[indexBooking].time_end;
          }
        } else {
          tableCopy.status = false;
        }

        if (!tableCopy.isMeetingRoom) {
          officeCopy.push(tableCopy)
        }
      })
      tables.value = officeCopy;
    }

    watch(bookings, () => {
      showBookings();
    })

    onMounted(() => {
      const getOffice = store.dispatch('getOffice');
      const getBookings = store.dispatch('getBooking', currentDate.value);

      Promise.all([getOffice, getBookings]).then(() => {
        showBookings();
      })
    });

    return{
      ...Booking,
      addBooking,
      showBookings,
      bookingDialog,
      tables,
    }
  }
}
</script>