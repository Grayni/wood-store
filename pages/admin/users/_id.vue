<template lang="pug">
  .redact-create
    section-title(:section="'Пользователь'" :title="user.email")
    el-form(
      :model="user"
      :rules="rules"
      ref="user-redact"
      status-icon
      @submit.native.prevent="onSubmit('user-redact')"
    )
      el-form-item(label="Фамилия" prop="surname")
        el-input(:value="user.surname" @input="changeSurname" placeholder="Ваша фамилия" size="small")

      el-form-item(label="Имя" prop="name")
        el-input(:value="user.name" @input="changeName" placeholder="Ваше имя" size="small")

      el-form-item(label="Email" prop="email")
        el-input(:value="user.email" @input="changeEmail" type="email" size="small")

      el-form-item(label="Логин" prop="login")
        el-input(:value="user.login" @input="changeLogin" placeholder="Необязательно" size="small")

      br

      el-form-item(label="Изменить пароль" prop="pass" status-icon)
        el-input(:value="user.pass" @input="changePass" type="password" show-password size="small")

      br

      el-form-item(label="Номер телефона" prop="oldphone")
        el-input(:value="user.phone" @input="changePhone" type="phone" v-mask="'+7 (###) ###-##-##'" size="small")

      el-form-item(label="Адрес доставки" prop="adress")
        el-input(
          type="textarea"
          :rows="2"
          placeholder="Введите адрес доставки"
          :value="user.adress"
          @input="changeAdress"
          size="mini"
        )

      el-form-item.birthday(label="День рождения" prop="birthday")
        el-date-picker(:value="user.birthday" @input="changeBirthday" type="date" size="small" placeholder="Выбрать дату")

      el-form-item(label="Статус пользователя", prop="status")
        el-select(:value="user.status" @input="changeStatus" placeholder="Выбрать статус пользователя" size="small")
          el-option(
            v-for="item in mixOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          )

      el-form-item.button-wrap.button-right
        el-button(type="primary" native-type="submit" :loading="loading")
          span.text-button Обновить

</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import { validateForm } from '@/plugins/mixins/validateForm'
import { statusLabel } from '@/plugins/mixins/statusLabel'
import {notifyWarn} from '@/plugins/mixins/functions/characteristicParams'

export default {
  name: 'users-page',
  middleware: ['admin-auth'],
  layout: 'admin',
  head() {
    return {
      title: 'Редактировать пользователя',
      meta: [
        {
          hid: `description-${this.$route.name}`,
          name: 'description',
          content: 'Страница для настройки параметров пользователя'
        }
      ]
    }
  },
  mixins: [validateForm, statusLabel, notifyWarn],
  data() {
    const uniqueValueOthers = async (rule, value, callback) => {
      const formData = { field: rule.fieldKey, id: rule.userId, value }
      const found = await this.$store.dispatch('validate/checkValue', formData)

      found ? callback(new Error(rule.message)) : callback()
    }

    return {
      rules: {
        email: [
          {
            required: true,
            type: 'email',
            min: 3,
            message: 'Пожалуйста, введите корректный Email',
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            trigger: 'blur'
          }, {
            required: true, 
            validator: uniqueValueOthers,
            fieldKey: 'email',
            userId: this.$route.params.id,
            message: 'Почта уже используется. Введите другой Email',
            trigger: 'blur'
          }
        ],
        login: [
          {
            type: 'string',
            message: 'Введите логин',
            trigger: 'blur'
          }, {
            pattern: /^[aA-zZ]+$/gi,
            message: 'Login должен состоять только из латинских букв',
            trigger: 'blur'
          }, {
            validator: uniqueValueOthers,
            fieldKey: 'login',
            userId: this.$route.params.id,
            message: 'Login занят. Используйте другой Login',
            trigger: 'blur'
          }
        ],
        pass: {
          min: 6, message: 'Длина пароля должна быть не меньше 6 символов', trigger: 'blur'
        }
      },
      loading: false,
      userInit: null
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['fetchUserById', 'updateUser']),
    ...mapMutations('auth', [
      'changeSurname',
      'changeName',
      'changeEmail',
      'changeLogin',
      'changePass',
      'changePhone',
      'changeAdress',
      'changeBirthday',
      'changeaddStatus',
      'cleanUserFields',
      'changeStatus',
      'addPassFields'
    ]),

    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            const message = await this.updateUser(this.user)

            this.$notify.success(message)

          } catch (e) {
          } finally {
            this.loading = false
          }
        } else {
          this.mixNotifyWarn('Некорректно заполнены обязательные поля.')
        }
      });
    },
  },
  async created() {
    await this.fetchUserById(this.$route.params.id)
  },
};
</script>

<style lang="stylus">
.el-form-item
  .el-select
    width 100%
  &:before, &:after
    display table
    content ''
  &:after
    clear both
  &__label
    float left
    width 160px
    text-align right
    vertical-align middle
  &__content
    position relative
    margin-left 160px
    &:before, &:after
      display table
      content ''
.header-users
  font-size 22px
  margin-bottom 20px
.create-users
  max-width 600px
.header-users
  text-align left
.button-wrap
  margin-top 20px
</style>
