<template lang="pug">
  .main-page
    .content
      h1 Главная страница
      el-container
        | Сайт в разработке

</template>

<script>
export default {
  name: 'main-page',
  head() {
    return {
      title: this.meta.title,
      titleTemplate: '%s — Flex Wood',
      meta: [
        {
          hid: `description-${this.$route.name}`,
          name: 'description',
          content: this.meta.description
        }
      ]
    }
  },
  data() {
    return {
      meta: {
        title: 'Домашняя мастерская',
        description: 'Домашнаяя мастерская "Flex Wood" предлагает вашему вниманию изделия из дерева ручной работы и с применением технологий ЧПУ. Наши творения - наша репутация.'
      }

    }
  },
  async asyncData({store}) {
    const data = await store.dispatch('characteristics/getCharacterContent')
    const imprint = JSON.stringify(data)

    return {imprint}
  }
}
</script>

<style lang="stylus">

  .main-page
    display flex
    justify-content center
    align-items center
    height 100vh
  .content
    display flex
    justify-content center
    align-items center
    color #c7c7c7
    width 90%
    height 200px
    text-align center
    font normal 20px Tahoma
    text-transform uppercase

</style>
