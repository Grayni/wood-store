import {mapGetters, mapActions, mapMutations} from 'vuex'

export const characteristicParams = {
  data() {
    return {
      referal: 'change-char'
    }
  },
  computed: {
    ...mapGetters('characteristics', ['characteristic', 'backupChar'])
  },
  methods: {
    ...mapActions('characteristics', ['fetchNames', 'createCharacter']),
    ...mapMutations('characteristics', ['writeValidate', 'clearChar']),

    mixOnSubmit(nameForm) {
      this.$refs[nameForm].validate(async valid => {
        if (valid) {
          if (this.characteristic.values.length) {
            if (JSON.stringify(this.characteristic) !== JSON.stringify(this.backupChar)) {

              this.loading = true
              const formData = Object.assign({}, this.characteristic)
              let message


              /* define page of characteristic */

              if (this.$route.params.identifier) {
                message = await this.updateCharacter(formData) ?? 'Что-то не так' // update backupChar
                await this.fetchCharOne(this.$route.params.identifier)
              } else {
                message = await this.createCharacter(formData) ?? 'Что-то не так'

                await this.fetchNames() // update base-char
                this.clearChar() // clear form-char
              }

              this.$message.success(message)
              this.loading = false

            } else {
              this.mixNotifyWarn('Данные не изменялись. Внесите изменения')
            }
          } else {
            this.mixNotifyWarn(`Добавьте список значений в характеристику <span class="notify">${this.characteristic.title}</span>`)
          }
        } else {
          this.mixNotifyWarn('Заполните все поля')
        }
      })
    }

  },
  mounted() {
    // send ref.validate method in child component
    this.writeValidate(this.$refs[this.referal].validate)
  }
}

export const notifyWarn = {
  methods: {
    mixNotifyWarn(message) {
      const notifyWarning = {
        title: 'Внимание!',
        dangerouslyUseHTMLString: true,
        type: 'warning',
        position: 'top-left',
        showClose: false
      }

      notifyWarning.message = message
      this.$notify(notifyWarning)
    }
  }
}