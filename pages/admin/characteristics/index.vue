<template lang="pug">
  .characteristics
    h1.admin-title Характеристики

    el-form.col.col_three(
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
  import {validateForm} from '@/plugins/mixins/validateForm'
  import {characteristicParams, notifyWarn} from '~/plugins/mixins/functions/characteristicParams'

  export default {
    name: 'characteristics-page',
    layout: 'admin',
    middleware: ['admin-auth'],
    mixins: [validateForm, characteristicParams, notifyWarn],
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
    }
  }

</script>

<style lang="stylus">
</style>
