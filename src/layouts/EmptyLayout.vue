<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  computed: {
    // Если что-то будет менятся в геттерах, то свойство обновится
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    // Следим за получением ошибки
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так!");
    }
  }
};
</script>
