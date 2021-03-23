<template lang="pug">
  .characteristics
    h1.admin-title Характеристика: #[span.notify {{characteristic.title}}]

    el-form.col-three(
      :model="characteristic"
      :rules="rules"
      :ref="referal"
      @keypress.enter.prevent.native
      @submit.native.prevent.capture="onSubmit(referal)"
    )

      char-identify(:title="'Изменить свойства характеристики:'" :loading="loading" :warning="notifyWarning")
      char-options
      char-base

</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'

  import {validateForm} from '@/plugins/mixins/validateForm.mixin'
  import {funcCollection} from '@/plugins/mixins/functions/character.mixins'

  export default {
    name: 'identifier-page',
    layout: 'admin',
    middleware: ['admin-auth'],
    mixins: [validateForm, funcCollection],
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
    data() {
      return {
        loading: false,
        controls: {},
        print: {},
        referal: 'change-char',
        form: {},
        notifyWarning: {
          title: 'Внимание!',
          type: 'warning',
          dangerouslyUseHTMLString: true,
          position: 'top-left'
        }
      }
    },

    computed: {
      ...mapGetters('characteristics', ['characteristic', 'backupChar']),
    },
    methods: {
      ...mapActions('characteristics', ['writeValidate', 'updateCharacter', 'fetchCharOne']),

      onSubmit(nameForm) {
        this.$refs[nameForm].validate(async valid => {
          if (valid) {
            if (this.characteristic.values.length) {
              // console.log(JSON.stringify(this.characteristic))
              // console.log(JSON.stringify(this.backupChar))
              if (JSON.stringify(this.characteristic) !== JSON.stringify(this.backupChar)) {
                this.loading = true

                const formData = {
                  title: this.characteristic.title.toLowerCase(),
                  identifier: this.characteristic.identifier,
                  status: this.characteristic.status,
                  values: this.characteristic.values
                }

                const message = await this.updateCharacter(formData) ?? 'Что-то не так'

                this.$message.success(message)
                this.loading = false

                // this.getLinks(this.links)
              } else {
                this.notifyWarning.message = 'Данные не изменялись. Внесите изменения'
                this.$notify(this.notifyWarning)
              }
            } else {
              this.notifyWarning.message = `Добавьте список значений в характеристику <span class="notify">${this.controls.title}</span>`
              this.$notify(this.notifyWarning)
            }
          } else {
            this.notifyWarning.message = 'Заполните все поля'
            this.$notify(this.notifyWarning)
          }
        })
      }
    },
    created() {
      this.fetchCharOne(this.$route.params.identifier)
    },
    mounted() {
      // send ref.validate method in child component
      this.writeValidate(this.$refs[this.referal].validate)
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
