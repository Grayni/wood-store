<template lang="pug">
  .admin
    h2.admin-title Admin Page
</template>

<script>
  export default {
    name: 'admin-page-main',
    middleware: ['admin-auth'],
    layout: 'admin'
  }
</script>

<style lang="stylus">
</style>
