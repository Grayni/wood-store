<template lang="pug">
  el-form-item
    el-checkbox(v-model="checked")
    label.el-form-item__label(:class="{'active-label': !checked}") Вес
    .weight-container
      el-input-number.number(
        :disabled="!checked"
        v-model="weight"
        :min="0"
        :controls="false"
        @change="$emit('weight', weight)"
      )

      el-select(
        :disabled="!checked"
        v-model="unit"
        placeholder="unit"
        @change="$emit('unit', unit)"
      )
        el-option(
          v-for="item in units"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        )
</template>

<script>
  export default {
    name: 'sizer-constructor',
    data() {
      return {
        weight: 0,
        units: [
          {label: 'кг', value: 'кг'},
          {label: 'г', value: 'г'}
        ],
        unit: 'кг',
        checked: false
      }
    }
  }
</script>

<style lang="stylus">
  .weight-container
    display grid
    grid-template-columns 8fr 3fr 2fr
    .number
      padding-right 5px
</style>
