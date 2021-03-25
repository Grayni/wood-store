<template lang="pug">
  .char-base
    h2.decorate База характеристик:
    ul
      li.link-item(v-for="link in nameFilter" :key="link.identifier")
        nuxt-link.link(:to="`/admin/characteristics/${link.identifier}`") {{link.title}} [ {{link.identifier}} ]
        el-button.delete-char(type="text" @click="remove(link.identifier)") &times;
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'char-base',
    data() {
      return {
        deleteNotify: {
          confirmButtonText: 'OK',
          cancelButtonText: 'Отмена',
          type: 'warning',
          center: true
        }
      }
    },
    computed: {
      ...mapGetters('characteristics', ['names']),
      nameFilter() {
        return this.names.filter(x => x.identifier !== this.$route.params.identifier)
      }
    },
    methods: {
      ...mapActions('characteristics', ['fetchNames', 'deleteCharacter']),

      remove(val) {
        this.$confirm('Подтверждаете удаление?', 'Предупреждение', this.deleteNotify).then(async () => {

          const message = await this.deleteCharacter(val)

          this.$notify({ type: 'success', title: 'Отлично!', message })
        }).catch(() => {
          this.$notify({ type: 'info', message: 'Удаление отменено' })
        })
      }
    },
    async created() {
      await this.fetchNames()
    }
  }
</script>

<style lang="stylus">
  .char-base
    padding-left 20px
    .decorate
      margin-bottom 20px
      span
        text-transform uppercase
        color #409EFF
    .link-item
      margin-bottom 18px
      font-size 14px
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
