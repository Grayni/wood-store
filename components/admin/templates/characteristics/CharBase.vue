<template lang="pug">
  .char-base
    h2.decorate База характеристик:
    ul
      li.link-item(v-for="link in nameFilter" :key="link.identifier")
        nuxt-link.link(:to="`/admin/characteristics/${link.identifier}`") {{link.title}} [ {{link.identifier}} ]
        el-button.delete-times(type="text" @click="mixRemove(link.identifier, deleteCharacter)") &times;
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {removeConfirm} from '@/plugins/mixins/functions/removeConfirm'
  export default {
    name: 'char-base',
    mixins: [removeConfirm],
    computed: {
      ...mapGetters('characteristics', ['names']),

      nameFilter() {
        return this.names.filter(x => x.identifier !== this.$route.params.identifier)
      }
    },
    methods: {
      ...mapActions('characteristics', ['fetchNames', 'deleteCharacter']),
    },
    async created() {
      await this.fetchNames()
    }
  }
</script>

<style lang="stylus">
  .char-base
    padding-left 20px
    .link-item
      margin-bottom 18px
      font-size 14px
</style>
