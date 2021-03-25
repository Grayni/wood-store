<template lang="pug">
  .char-identify
    h2.decorate {{title}}

    el-form-item(label="Название" prop="title")
      el-input(:value="characteristic.title" @input="updateLocalTitle($event)")

    el-form-item(label="Идентификатор" v-bind:prop="isDisable ? '' : 'identifier'")
      el-input(:value="characteristic.identifier" @input="updateLocalIdentifier($event)" :disabled="isDisable")

    el-form-item(label="Добавить значение")
      .values-box
        el-input.pr5(v-model="value" @keypress.enter.native="expandValues(value)")
        el-button(type="primary" @click="expandValues(value)") +

    el-form-item(label="Статус показа")
      el-switch(v-model="status" @change="changeLocalStatus(status)" active-text="Видно" inactive-text="Скрыто")

    .button-wrap
      el-button.button-active(:class="{'button-active-save': buttonActiveSave}" type="primary" native-type="submit" :loading="loading")
        span {{nameButton}}

</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import {notifyWarn} from '~/plugins/mixins/functions/characteristicParams'
  export default {
    name: 'char-identify',
    props: {
      title: String,
      warning: Object,
      isDisable: Boolean,
      nameButton: String
    },
    mixins: [notifyWarn],
    data() {
      return {
        value: '',
        loading: false,
        status: false
      }
    },
    computed: {
      buttonActiveSave () {
        if (this.$route.params.identifier) {
          return JSON.stringify(this.characteristic) !== JSON.stringify(this.backupChar)
        }
      },

      ...mapGetters('characteristics', ['characteristic', 'validate', 'backupChar'])
    },
    methods: {
      ...mapActions('characteristics', ['fetchCharOne', 'updateLocalIdentifier']),
      ...mapMutations('characteristics', ['updateLocalTitle', 'addLocalValue', 'changeLocalStatus']),

      expandValues(val) {
        this.validate(valid => {
          if (!valid) this.mixNotifyWarn('Заполните все поля')
          else if (!val.length) this.mixNotifyWarn('Добавьте значение')
          else {
            if (!this.characteristic.values.includes(val)) {

              const notify = {
                title: 'Сохранитесь!',
                dangerouslyUseHTMLString: true,
                message: `<span class="notify">${val}</span> &rArr; </span><span class="notify">${this.characteristic.title}</span>`
              }

              this.addLocalValue(val)
              this.$notify.success(notify)
              this.value = ''

            } else {
              this.mixNotifyWarn(`Значение <span class="notify">${val}</span> уже существует`)
            }

          }
        })
      }
    },
    beforeUpdate() {
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
    .button-active
      &-save
        animation: blink 2s infinite alternate

    .button-wrap
      display flex
      justify-content flex-end


  @keyframes blink
    from
      background-color #409EFF
      box-shadow 1px 1px 1px #409EFF
    to
      background-color rgba(64, 158, 255, .6)
      box-shadow 1px 1px 5px rgba(64, 158, 255, 0), inset 1px 1px 1px white
      border-color white
</style>
