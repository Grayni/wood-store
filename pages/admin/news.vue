<template lang="pug">
  .news
    h2.admin-title News
</template>

<script>
  export default {
    name: 'news-page',
    middleware: ['admin-auth'],
    layout: 'admin'
  }
</script>

<style lang="stylus">
</style>
