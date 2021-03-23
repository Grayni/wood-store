<template lang="pug">
  el-row.futter(type="flex" justify="space-between")
    el-col.privacy(:span="6")
      a(href="/privacy") Политика конфиденциальности
    el-col.name-company(:span="6")
      p Мастерская "Гибкая древесина"
    el-col.author-site(:span="6")
      span © Grayni, 
      span.date {{ new Date().getFullYear() }}
</template>

<script>
export default {
  name: 'Futter'
}
</script>

<style lang="stylus" scoped>

  .futter
    border-top 1px dashed #e6e6e6
    padding 15px 40px
    font 15px Circe
    color #949494
    height $futter
    .privacy
      a
        color #c39292
        text-align left
  .name-company
    text-align center
  .date
    font-size 14px
  .author-site
    text-align right

</style>
