<template lang="pug">
  .characteristics
    h1.admin-title Характеристика: #[span.notify {{characteristic.title}}]

    el-form.col-three(
      :model="characteristic"
      :rules="rules"
      :ref="referal"
      @keypress.enter.prevent.native
      @submit.native.prevent.capture="mixOnSubmit(referal)"
    )

      char-identify(
        :title="'Изменить свойства характеристики:'"
        :loading="loading"
        :isDisable="true"
        :name-button="'Сохранить изменения'"
      )
      char-options
      char-base

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {validateForm} from '@/plugins/mixins/validateForm'
  import {characteristicParams, notifyWarn} from '~/plugins/mixins/functions/characteristicParams'

  export default {
    name: 'identifier-page',
    layout: 'admin',
    middleware: ['admin-auth'],
    mixins: [validateForm, characteristicParams, notifyWarn],
    head() {
      return {
        title: this.characteristic.title,
        meta: [
          {
            hid: `description-${this.$route.name}`,
            name: 'description',
            content: `${this.characteristic.title}: ${this.characteristic.values.join(', ')}`
          }
        ]
      }
    },
    methods: {
      ...mapActions('characteristics', ['updateCharacter', 'fetchCharOne'])
    },
    created() {
      this.fetchCharOne(this.$route.params.identifier)
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
