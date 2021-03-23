<template lang="pug">
  .char-identify
    h2.decorate {{title}}

    el-form-item(label="Название" prop="title" ref="test")
      el-input(:value="characteristic.title" @input="updateLocalTitle($event)")

    el-form-item(label="Идентификатор")
      el-input( v-model="characteristic.identifier" disabled)

    el-form-item(label="Добавить значение")
      .values-box
        el-input.pr5(v-model="value" @keypress.enter.native="expandValues(value)")
        el-button(type="primary" @click="expandValues(value)") +

    el-form-item(label="Статус показа")
      el-switch(v-model="status" @change="changeLocalStatus(status)" active-text="Видно" inactive-text="Скрыто")

    .button-wrap
      el-button(type="primary" native-type="submit" :loading="loading")
        span Cохранить изменения

</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  export default {
    name: 'char-identify',
    props: {
      title: { type: String },
      loading: { type: Boolean },
      warning: { type: Object}
    },
    data() {
      return {
        value: '',
        status: false,
        isCheck: {
          title: true,
          value: true
        }
      }
    },
    computed: {
      ...mapGetters('characteristics', ['characteristic', 'validate'])
    },
    methods: {
      ...mapActions('characteristics', ['fetchCharOne', 'updateLocalTitle', 'addValue', 'changeLocalStatus']),

      notifyRedact(message) {
        this.warning.message = message
        this.$notify(this.warning)
      },

      expandValues(val) {
        this.validate(async valid => {
          if (!valid) {
            this.notifyRedact('Заполните все поля')
          } else if (!val.length) {
            this.notifyRedact('Добавьте значение')
          } else {
            val = val.toLowerCase()
            if (!this.characteristic.values.includes(val)) {

              const notify = {
                title: 'Добавлено!',
                dangerouslyUseHTMLString: true,
                message: `<span class="notify">${val}</span> &rArr; </span><span class="notify">${this.characteristic.title}</span>`
              }

              const formData = {
                value: val, identifier: this.$route.params.identifier
              }

              this.addLocalValue(formData)
              this.$notify.success(notify)
              this.value = ''

            } else {
              this.notifyRedact(`Значение <span class="notify">${val}</span> уже существует`)
            }

          }
        })
      }
    },
    created() {
      this.status = this.characteristic.status
    }
  }
</script>

<style lang="stylus">
  .char-identify
    border-right 1px solid #DCDFE6
    padding-right 20px
    .values-box
      display grid
      grid-template-columns 6fr 1fr
</style>
