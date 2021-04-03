<template lang="pug">
  .users-list
    h1.admin-title Список пользователей
    .table-box-wrapper
      el-table.table-box(:data="users" :default-sort="{prop: 'date', order: 'descending'}")
        el-table-column(type="index" label="№" width="50")
        el-table-column(prop="name", label="Имя" width="auto")
        el-table-column(label="Почта" prop="email" sortable width="221")
        el-table-column(label="Номер телефона" prop="phone" sortable width="183")
        el-table-column(label="Дата регистрации" prop="date" sortable width="183")
          template(v-slot:default="{row: {dateRegistration}}")
            time-table(:date="dateRegistration")

        el-table-column(label="Статус" prop="status" sortable width="183")
          template(v-slot:default="{row: {status}}")
            | {{ showStatus(mixOptions, status) }}

        el-table-column(label="Действия" width="152")
          template(slot-scope="{row}")
            el-tooltip.item(effect="dark" content="Редактировать пользователя" placement="top")
              el-button(icon="el-icon-edit" type="info" circle @click="open(row._id)"
              )
            el-tooltip(effect="dark" content="Удалить пользователя" placement="top")
              el-button(icon="el-icon-delete" type="danger" circle @click="remove(row._id, row.status)")

      add(:urls="'/admin/users/user-create'" :title="'Создать пользователя'")
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {statusLabel} from '@/plugins/mixins/statusLabel'
import {notifyWarn} from '@/plugins/mixins/functions/characteristicParams'

export default {
  name: 'users-page',
  middleware: ['admin-auth'],
  layout: 'admin',
  mixins: [statusLabel, notifyWarn],
  head() {
    return {
      title: 'Список пользователей',
      meta: [
        {
          hid: `description-${this.$route.name}`,
          name: 'description',
          content: 'Таблица пользователей и администраторов'
        }
      ]
    }
  },

  computed: {
    ...mapGetters('auth', ['users'])
  },
  methods: {
    ...mapActions('auth', ['fetchUsersList', 'removeUser']),

    open(id) {
      this.$router.push(`/admin/users/${id}`)
    },

    async remove(id, status) {
      try {
        if (status !== 'admin') {
          await this.$confirm('Удалить пользователя?', 'Внимание!', {
            comfirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
            type: 'warning'
          })
          await this.removeUser(id)

          this.$notify.success('Пользователь успешно удален!')
        } else {
          this.mixNotifyWarn('Администратора можно удалить, только напрямую из DB')
        }
      } catch(e) {}
    },

    showStatus(arr, row) {
      return  arr.filter(v => v.value === row)[0].label
    }
  },
  async created() {
    await this.fetchUsersList()
  }
}
</script>

<style lang="stylus">
</style>
