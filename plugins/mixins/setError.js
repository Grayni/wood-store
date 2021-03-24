export const setError = {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(value) {
      if (value.response.data.message) {
        this.$message({
          type: 'error',
          showClose: true,
          message: value.response.data.message,
          center: true
        })
      }
    }
  }
}