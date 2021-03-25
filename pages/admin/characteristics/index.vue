<template lang="pug">
  .characteristics
    h1.admin-title Характеристики

    el-form.col-three.character(
      :model="characteristic"
      :rules="rules"
      :ref="referal"
      @keypress.enter.prevent.native
      @submit.native.prevent.capture="mixOnSubmit(referal)"
    )
      char-identify(
        :title="'Создание характеристики'"
        :isDisable="false"
        :name-button="'Создать характеристику'"
      )
      char-options
      char-base

</template>

<script>
  import {mapActions} from 'vuex'

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
</style>
