export const funcCollection = {
  methods: {
    async getLinks() {
      return await this.$store.dispatch('characteristics/fetchNames')
    }
  }
}