<template src="./Dialog.html"></template>
<style lang="scss" src="./Dialog.scss" scoped></style>

<script>
import {computed, ref} from "vue";
import store from "@/store";
import LoaderComponent from "@/shared/components/loader/Loader";

export default {
  name: "BookingDialog",
  components: {
    LoaderComponent
  },
  setup() {
    const dialog = ref(false);
    const storeVuex = store;
    const loading = computed(() => store.state.helper.loading);

    const bookingData = ref({
      user_id: '',
      booking_id: '',
      floor_id: ''
    });

    const bookingForm = ref({
      valid: false,
      data: {
        name: '',
        table_id: null,
        time: {
          start: new Date(),
          end: null,
        }
      }
    });

    const open = (booking) => {
      dialog.value = true;

      bookingForm.value.data.name = booking.data.name;
      bookingForm.value.data.table_id = booking.data.table_id;
      bookingForm.value.data.time = [booking.data.time_start, booking.data.time_end];

      bookingData.value.user_id = booking.data.user_id;
      bookingData.value.booking_id = booking.data.booking_id;
      bookingData.value.floor_id = booking.data.floor_id;
    }

    const close = () => {
      dialog.value = false;
    }

    const onBooking = () => {
      if(bookingForm.value.valid) {
        const bookingDate = bookingForm.value.data.time;
        const booking = {
          time_start: bookingDate[0],
          time_end: bookingDate[1] ? bookingDate[1] : bookingDate[0],
          ...bookingForm.value.data,
          ...bookingData.value
        }

        delete booking.name;
        delete booking.time;
        delete booking.booking_id;

        storeVuex.dispatch('addBooking', booking).then(() => {
          close();
        })
      }
    }

    const onDelete = (booking_id) => {
      storeVuex.dispatch('deleteBooking', booking_id).then(() => {
        close();
      });
    }

    const onUpdate = (booking_id) => {
      storeVuex.dispatch('updateBooking', {
        ...bookingForm.value.data,
        booking_id: booking_id
      }).then(() => {
        close();
      })
    }

    return {
      dialog,
      loading,
      bookingForm,
      bookingData,
      open,
      close,
      onBooking,
      onDelete,
      onUpdate
    }
  }
}
</script>