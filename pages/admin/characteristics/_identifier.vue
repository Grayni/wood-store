<template lang="pug">
  .characteristics
    h1.admin-title Характеристика: #[span.notify {{characteristic.title}}]

    el-form.col-three.character(
      :model="characteristic"
      :rules="rules"
      :ref="referal"
      @keypress.enter.prevent.native
      @submit.native.prevent.capture="mixOnSubmit(referal)"
    )
      char-identify(
        :title="'Изменить свойства характеристики:'"
        :isDisable="true"
        :name-button="'Сохранить изменения'"
      )
      char-options
      char-base

</template>

<script>
  import {mapActions} from 'vuex'

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
    async created() {
      await this.fetchCharOne(this.$route.params.identifier)
    }
  }

</script>

<style lang="stylus">
</style>
