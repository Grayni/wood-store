<template lang="pug">
  .redact-create
    el-page-header.header-page(@back="$router.push('/admin/users')" :content="`user: ${controls.oldemail}`" :title="'Список пользователей'.toUpperCase()")
    el-form(
      :model="controls"
      :rules="rules"
      ref="user-redact"
      status-icon
      @submit.native.prevent="onSubmit('user-redact')"
    )
      el-form-item(label="Фамилия" prop="surname")
        el-input(v-model="controls.surname" placeholder="Ваша фамилия" size="small")

      el-form-item(label="Имя" prop="name")
        el-input(v-model="controls.name" placeholder="Ваше имя" size="small")

      el-form-item(label="Email" prop="oldemail")
        el-input(v-model="controls.oldemail" type="email" size="small")

      el-form-item(label="Логин пользователя" prop="oldlogin")
        el-input(v-model="controls.oldlogin" placeholder="Необязательно" size="small")

      br

      el-form-item(label="Старый пароль" prop="oldpass")
        el-input(v-model="controls.oldpass" type="password" show-password size="small")

      el-form-item(label="Новый пароль" prop="newpass" status-icon)
        el-input(v-model="controls.newpass" type="password" show-password size="small")

      br

      el-form-item(label="Номер телефона" prop="oldphone")
        el-input(v-model="controls.oldphone" type="phone" v-mask="'+7 (###) ###-##-##'" size="small")

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
          span.text-button Обновить
</template>

<script>
import { validateForm } from '@/plugins/mixins/validateForm.mixin';
import { setError } from '@/plugins/mixins/setError.mixin';
import { statusLabel } from '@/plugins/mixins/statusLabel.mixin';

export default {
  name: 'users-page',
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
        title: 'Редактировать пользователя',
        description: 'Страница для настройки параметров пользователя'
      },
      loading: false,
      controls: {
        surname: '',
        name: '',
        oldemail: '',
        oldpass: '',
        newpass: '',
        adress: '',
        birthday: '',
        status: '',
        oldlogin: '',
        oldphone: '',
      },
    }
  },
  async asyncData({ store, params }) {
    const user = await store.dispatch('users/getUserById', params.id);
    return { user };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const formData = {
              surname: this.controls.surname,
              name: this.controls.name,
              email: this.controls.oldemail,
              login: this.controls.oldlogin,
              phone: this.controls.oldphone,
              adress: this.controls.adress,
              birthday: this.controls.birthday,
              status: this.controls.status,
              id: this.user._id,
            };

            if (this.controls.newpass) {
              formData.pass = this.controls.newpass;
            }

            await this.$store.dispatch('auth/updateUser', formData);

            this.$message({
              type: 'info',
              showClose: true,
              message: 'Данные пользователя обновлены.',
              center: true,
            });

            this.controls.oldpass = '';
            this.controls.newpass = '';
          } catch (e) {
          } finally {
            this.loading = false;
          }
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: 'Некорректно заполнены обязательные поля.',
            center: true,
          });
        }
      });
    },
  },
  created() {
    this.controls.surname = this.user.surname;
    this.controls.name = this.user.name;
    this.controls.oldemail = this.user.email;
    this.controls.oldlogin = this.user.login;
    this.controls.oldphone = this.user.phone;
    this.controls.adress = this.user.adress;
    this.controls.birthday = this.user.birthday;
    this.controls.status = this.user.status;
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
