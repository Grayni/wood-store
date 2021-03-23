<template lang="pug">
  .characteristics
    h1.admin-title Характеристики
    .main-duble
      .container-1
        h2.decorate Создание характеристики
        el-form(
          :model="controls"
          :rules="rules"
          ref="create-characteristic"
          @keypress.enter.prevent.native
          @submit.native.prevent.capture="onSubmit('create-characteristic')"
        )
          el-form-item(label="Название" prop="title")
            el-input(v-model="controls.title")

          el-form-item(label="Идентификатор" prop="identifier")
            el-input( v-model="controls.identifier")

          el-form-item(label="Добавить значение" prop="value")
            .values-box
              el-input.pr5(v-model="controls.value" @keypress.enter.native="expandValues(controls.value, 'create-characteristic')")
              el-button(type="primary" @click="expandValues(controls.value, 'create-characteristic')") +

          el-form-item.name-service(
            label="Статус показа"
          )
            el-switch(
              v-model="controls.status"
              active-text="Видно"
              inactive-text="Скрыто"
            )

          .button-wrap
            el-button(
              type="primary"
              native-type="submit"
              :loading="loading"
            )
              span.text-button Создать характеристику




      .container-2
        .container-1-duble(v-if="controls.title.length")
          h2.decorate
            span Набор
            span {{controls.title}}:

          transition-group.list-values(name="list" tag="ul")
            li.list-value(v-for="(value, i) in values" :key="value")
              span {{value}}
              el-button.times(type="text" @click="deleteValue(i, values)") &times;

        .container-1-duble(v-else)
          h2 Список свойств:
        .container-2-duble
          h2.decorate База характеристик:
          ul
            li.link-item(v-for="link in names" :key="link.identifier")
              nuxt-link.link(:to="`/admin/characteristics/${link.identifier}`") {{link.title}} [ {{link.identifier}} ]
              el-button.delete-char(type="text" @click="deleteCharacter(link)") &times;
</template>

<script>
// characteristics => chars
// characteristic  => char

  import {mapGetters, mapActions} from 'vuex'

  import {validateForm} from '@/plugins/mixins/validateForm.mixin'
  import {transliter} from '@/plugins/mixins/transliter.mixin'
  import {funcCollection} from '@/plugins/mixins/functions/character.mixins'

  export default {
    name: 'characteristics-page',
    middleware: ['admin-auth'],
    mixins: [validateForm, transliter, funcCollection],
    layout: 'admin',
    head() {
      return {
        title: this.meta.title,
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
          title: 'Характеристики',
          description: 'Страница для взаимодействия со списками и свойствами характеристик.'
        },
        controls: {
          title: '',
          identifier: '',
          status: false,
          value: ''
        },
        loading: false,
        values: [],
        notifyWarning: {
          title: 'Внимание!',
          dangerouslyUseHTMLString: true,
          type: 'warning',
          position: 'top-left',
          showClose: false
        }
      }
    },
    // async asyncData({store}) {
      // let links = await store.dispatch('characteristics/fetchChars')
      // return {links}
    // },
    watch: {
      'controls.title'() {
        this.controls.identifier = this.translit(this.controls.title) 
      }
    },
    computed: {
      ...mapGetters('characteristics', ['names'])
    },
    methods: {
      ...mapActions('characteristics', ['fetchNames']),

      onSubmit(nameForm) {
        this.$refs[nameForm].validate(async valid => {
          if (valid) {
            if (this.values.length) {
              this.loading = true
              const formData = {
                title: this.controls.title.toLowerCase(),
                identifier: this.controls.identifier,
                status: this.controls.status,
                values: this.values
              }

              const message = await this.$store.dispatch('characteristics/createCharacter', formData)

              let cleaner = setInterval(async function(){
                this.values.splice(this.values.length-1, 1)
                if (!this.values.length) {
                  clearInterval(cleaner)
                  
                  this.controls = {
                    title: '',
                    identifier: '',
                    status: false,
                    value: ''
                  }

                  this.$message.success(message)
                  this.links = await this.getLinks()

                  this.loading = false
                }
              }.bind(this), 50)

              
            } else {
              this.notifyWarning.message = `Добавьте список значений в характеристику <span class="notify">${this.controls.title}</span>`
              this.$notify(this.notifyWarning)
            }
          } else {
            this.notifyWarning.message = 'Заполните все поля'
            this.$notify(this.notifyWarning)
          }
        })
      },
      expandValues(val, nameForm) {
        this.$refs[nameForm].validate(async valid => {
          if (val.length && valid) {
            val = val.toLowerCase()
            if (!this.values.includes(val)) {
              this.values.push(val)
              this.controls.value = ''
              this.$notify.success({
                title: 'Добавлено!',
                dangerouslyUseHTMLString: true,
                message: `<span class="notify">${val}</span> &rArr; </span><span class="notify">${this.controls.title}</span>`,
                position: 'bottom-right',
                showClose: false
              })
            } else {
              this.notifyWarning.message = `Значение <span class="notify">${val}</span> уже существует`
              this.$notify(this.notifyWarning)
            }

          } else {
            this.notifyWarning.message = 'Заполните все поля'
            this.$notify(this.notifyWarning)
          }
        })
      },
      deleteCharacter(val) {
        this.$confirm('Характеристика будет удалена. Продолжить?', 'Предупреждение', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Отмена',
          type: 'warning',
          center: true
        }).then(async () => {
          this.links = this.links.filter(link => link.title !== val.title)

          const message = await this.$store.dispatch('characteristics/deleteCharacter', val.identifier)

          this.$notify({ type: 'success', title: 'Отлично!', message })
        }).catch(() => {
          this.$notify({ type: 'info', message: 'Удаление отменено' })
        })
      }
    },
    created() {
      this.fetchNames()
    }
  }
</script>

<style lang="stylus">
.notify
  color: #409eff;
  text-transform uppercase
.main-duble
  margin-top 40px
  display grid
  grid-template-areas "container-1 container-2"
  grid-template-columns 5fr 7fr
  .decorate
    margin-bottom 20px
    display flex
    align-items flex-start
    flex-direction column
    span
      text-transform lowercase
      color #409EFF
  .button-wrap
    display flex
    justify-content flex-end
  .values-box
    display grid
    grid-template-columns 6fr 1fr
  .container-1
    border-right 1px solid #DCDFE6
    padding-right 20px
    &-duble
      border-right 1px solid #DCDFE6

  .container-2
    padding-left 20px
    display grid
    grid-template-columns 7fr 8fr
    &-duble
      padding-left 20px
    .list
      &-values
        display flex
        flex-direction column
      &-value
        display inline-block
        span
          font-size 14px
        span:first-letter
            text-transform uppercase
    .times
      padding 0
      span
        font-size 25px
        margin 0 0 0 3px
        top 5px
        padding 0
        position relative

  .delete-char
    font-size 25px
    line-height 0
    position relative
    padding 0
    top 5px
    color #fde2e2
    &:hover
      color #F56C6C
</style>
