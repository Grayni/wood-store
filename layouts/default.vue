<template lang="pug">
  .default-layout
    Navigation
    .content-default
      Nuxt
    Futter
</template>
<script>
export default {
  name: 'default-layout',
}
</script>

<style lang="stylus">
  @import '~assets/styles/variables.styl'
  .default-layout
    min-height "calc(100vh - %s)" % $futter

    .content-default
      display flex
      min-height "calc(100vh - %s)" % $futter
</style>
