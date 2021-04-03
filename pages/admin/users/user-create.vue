<template lang="pug">
  .redact-create
    h1.admin-title Создание пользователя

    el-form(
      :model="user"
      :rules="rules"
      ref="create-user"
      @submit.native.prevent="onSubmit('create-user')"
    )

      el-form-item(label="Фамилия" prop="surname")
        el-input(:value="user.surname" @input="addSurname" placeholder="Ваша фамилия" size="small")

      el-form-item(label="Имя" prop="name")
        el-input(:value="user.name" @input="addName" placeholder="Ваше имя" size="small")

      el-form-item(label="Email" prop="email")
        el-input(:value="user.email" @input="addEmail" type="email" size="small")

      el-form-item(label="Логин пользователя" prop="login")
        el-input(:value="user.login" @input="addLogin" placeholder="Необязательно" size="small")

      br

      el-form-item(label="Пароль пользователя" prop="pass")
        el-input(:value="user.pass" @input="addPass" type="password" show-password size="small")

      el-form-item(label="Повторить пароль" prop="passrep" status-icon)
        el-input(:value="user.passrep" @input="addPassrep" type="password" show-password size="small")

      br

      el-form-item(label="Номер телефона" prop="phone")
        el-input(:value="user.phone" @input="addPhone" type="phone" v-mask="'+7 (###) ###-##-##'" size="small")

      el-form-item(label="Адрес доставки" prop="adress")
        el-input(
          type="textarea"
          :rows="2"
          placeholder="Введите адрес доставки"
          :value="user.adress"
          @input="addAdress"
          size="mini"
        )

      el-form-item.birthday(label="День рождения" prop="birthday")
        el-date-picker(:value="user.birthday" @input="addBirthday" type="date" size="small" placeholder="Выбрать дату")

      el-form-item(label="Статус пользователя", prop="status")
        el-select(:value="user.status" @input="addStatus" placeholder="Выбрать статус пользователя" size="small")
          el-option(
            v-for="item in mixOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          )

      el-form-item.button-wrap.create-user
        el-button(type="primary" native-type="submit" :loading="loading")
          span.text-button Создать

</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import {validateForm} from '@/plugins/mixins/validateForm'
import {notifyWarn} from '@/plugins/mixins/functions/characteristicParams'
import {statusLabel} from "@/plugins/mixins/statusLabel"

export default {
  name: 'user-create-page',
  middleware: ['admin-auth'],
  mixins: [validateForm, statusLabel, notifyWarn],
  layout: 'admin',
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: `description-${this.$route.name}`,
          name: 'description',
          content: 'Страница параметров создания пользователя'
        }
      ]
    }
  },
  data() {
    return {
      title: 'Создание пользователя',
      loading: false
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['createUser']),
    ...mapMutations('auth', [
      'addSurname',
      'addName',
      'addEmail',
      'addLogin',
      'addPass',
      'addPassrep',
      'addPhone',
      'addAdress',
      'addBirthday',
      'addStatus',
      'cleanUserFields'
    ]),

    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            
            const message = await this.createUser(this.user)
            this.$notify.success(message)

            this.cleanUserFields()
            
          } catch (e) {} finally { this.loading = false }
        } else {
          this.mixNotifyWarn('Некорректно заполнены обязательные поля.')
        }
      });
    },
  }
}
</script>

<style lang="stylus">
  .button-wrap.create-user
    justify-content flex-end
    margin-top 20px
</style>
