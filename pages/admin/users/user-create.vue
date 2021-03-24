<template lang="pug">
  .redact-create
    el-page-header.header-page(@back="$router.push('/admin/users')" :content="meta.title" :title="'Список пользователей'.toUpperCase()")
    el-form(
      :model="controls"
      :rules="rules"
      ref="create-user"
      @submit.native.prevent="onSubmit('create-user')"
    )

      el-form-item(label="Фамилия" prop="surname")
        el-input(v-model="controls.surname" placeholder="Ваша фамилия" size="small")

      el-form-item(label="Имя" prop="name")
        el-input(v-model="controls.name" placeholder="Ваше имя" size="small")

      el-form-item(label="Email" prop="email")
        el-input(v-model="controls.email" type="email" size="small")

      el-form-item(label="Логин пользователя" prop="login")
        el-input(v-model="controls.login" placeholder="Необязательно" size="small")

      br

      el-form-item(label="Пароль пользователя" prop="pass")
        el-input(v-model="controls.pass" type="password" show-password size="small")

      el-form-item(label="Повторить пароль" prop="passrep" status-icon)
        el-input(v-model="controls.passrep" type="password" show-password size="small")

      br

      el-form-item(label="Номер телефона" prop="phone")
        el-input(v-model="controls.phone" type="phone" v-mask="'+7 (###) ###-##-##'" size="small")

      el-form-item(label="Адрес доставки" prop="adress")
        el-input(
          type="textarea"
          :rows="2"
          placeholder="Введите адрес доставки"
          v-model="controls.adress"
          size="mini"
        )

      el-form-item.birthday(label="День рождения" prop="birthday")
        el-date-picker(v-model="controls.birthday" type="date" size="small" placeholder="Выбрать дату")

      el-form-item(label="Статус пользователя", prop="status")
        el-select(v-model="controls.status" placeholder="Выбрать статус пользователя" size="small")
          el-option(
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          )
      el-form-item()
      el-form-item.button-wrap
        el-button(
          type="primary"
          native-type="submit"
          :loading="loading"
        )
          span.text-button Создать
</template>

<script>
import {validateForm} from "@/plugins/mixins/validateForm"
import {setError} from "@/plugins/mixins/setError"
import {statusLabel} from "@/plugins/mixins/statusLabel"

export default {
  name: 'user-create-page',
  middleware: ['admin-auth'],
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
  mixins: [validateForm, setError, statusLabel],
  data() {
    return {
      meta: {
        title: 'Создание пользователя',
        description: 'Страница параметров создания пользователя'
      },
      loading: false,
      controls: {
        surname: '',
        name: '',
        email: '',
        login: '',
        pass: '',
        passrep: '',
        phone: '',
        adress: '',
        birthday: '',
        status: '',
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            const formData = {
              surname: this.controls.surname,
              name: this.controls.name,
              email: this.controls.email,
              login: this.controls.login,
              pass: this.controls.pass,
              phone: this.controls.phone,
              adress: this.controls.adress,
              birthday: this.controls.birthday,
              status: this.controls.status,
              isVerified: true
            }
            
            await this.$store.dispatch('auth/createUser', formData)

            this.$message({
              type: 'info',
              showClose: true,
              message: 'Пользователь создан.',
              center: true,
            })

            this.controls.surname = ''
            this.controls.name = ''
            this.controls.email = ''
            this.controls.login = ''
            this.controls.pass = ''
            this.controls.phone = ''
            this.controls.adress = ''
            this.controls.birthday = ''
            this.controls.status = 'admin'
            
          } catch (e) {} finally {
            this.loading = false
          }
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: 'Некорректно заполнены обязательные поля.',
            center: true,
          })
        }
      });
    },
  }
}
</script>

<style lang="stylus">
  .create-users
    max-width 600px
  .header-users
    text-align left
  .button-wrap
    margin-top 20px
</style>
