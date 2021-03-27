<template lang="pug">
  .section-title
    h1.admin-title {{section}}: #[span.notify {{title}}]
</template>

<script>
  export default {
    props: {
      section: {
        type: String
      },
      title: {
        type: String
      }
    },
    name: 'section-title'
  }
</script>

<style lang="stylus">
  .section-title
    .notify
      color: #409eff
      text-transform uppercase
</style>
