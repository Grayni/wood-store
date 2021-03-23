<template lang="pug">
  div Очистка данных
</template>

<script>
export default {
  name: 'logout-page',
  layout: 'admin',
  middleware: ['admin-auth'],
  beforeCreate() {
    this.$store.dispatch('auth/logout')
    this.$router.push('/admin/login?message=logout')
  },
  head() {
    return {
      title: 'Выход',
      meta: [
        {
          hid: `noindex-${this.$route.name}`,
          name: 'robots',
          content: 'noindex'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
