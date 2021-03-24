<template lang="pug">
  .characteristics
    h1.admin-title Характеристики

    el-form.col-three(
      :model="characteristic"
      :rules="rules"
      :ref="referal"
      @keypress.enter.prevent.native
      @submit.native.prevent.capture="mixOnSubmit(referal)"
    )
      char-identify(
        :title="'Создание характеристики'"
        :loading="loading"
        :isDisable="false"
        :name-button="'Создать характеристику'"
      )
      char-options
      char-base
</template>

<script>
// characteristics => chars
// characteristic  => char

  import {validateForm} from '@/plugins/mixins/validateForm'
  import {transliter} from '@/plugins/mixins/transliter'
  import {characteristicParams, notifyWarn} from '~/plugins/mixins/functions/characteristicParams'

  export default {
    name: 'characteristics-page',
    layout: 'admin',
    middleware: ['admin-auth'],
    mixins: [validateForm, transliter, characteristicParams, notifyWarn],
    head() {
      return {
        title: 'Характеристики',
        meta: [
          {
            hid: `description-${this.$route.name}`,
            name: 'description',
            content: 'Страница для взаимодействия со списками и свойствами характеристик.'
          }
        ]
      }
    },
    methods: {
      ...mapActions('characteristics', ['updateLocalIdentifier'])
    },
    watch: {
      'characteristic.title'() {
        this.updateLocalIdentifier(this.translit(this.characteristic.title))
      }
    }
  }
</script>

<style lang="stylus">
  .notify
    color: #409eff
    text-transform uppercase
  .col-three
    margin-top 40px
    display grid
    grid-template-columns 10fr 5fr 7fr
    .decorate
      margin-bottom 20px
      span
        text-transform uppercase
        color #409EFF
    .button-wrap
      display flex
      justify-content flex-end

    .list-enter-active, .list-leave-active
      max-height 20px
      transition all .4s

    .list-enter, .list-leave-to
      opacity 0
      max-height 0px
      transform translateX(30px)
      transition all .4s
    .link-item
      margin-bottom 5px
  .characteristics
    .admin-title
      span
        color #409eff
</style>
