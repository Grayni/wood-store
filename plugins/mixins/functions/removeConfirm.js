import {mapGetters} from 'vuex'

export const removeConfirm = {
  computed: {
    ...mapGetters('validate', ['deleteNotify'])
  },
  methods: {
    mixRemove(val, removeData) {
      this.$confirm('Подтверждаете удаление?', 'Предупреждение', this.deleteNotify).then(async () => {

        const message = await removeData(val)

        this.$notify({ type: 'success', title: 'Отлично!', message })
      }).catch(() => {
        this.$notify({ type: 'info', message: 'Удаление отменено' })
      })
    }
  }
}