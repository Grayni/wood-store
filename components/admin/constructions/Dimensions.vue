<template lang="pug">
  el-form-item.dimensions-wrap
    el-checkbox(v-model="checked")
    label.el-form-item__label(:class="{'active-label': !checked}") {{labelName}}
    .dimensions-container
      el-input-number.number(
        :disabled="!checked"
        v-model="axis.length"
        :min="0"
        :controls="false"
        @change="$emit('length', axis.length)"
      )

      el-input-number.number(
        :disabled="!checked"
        v-model="axis.width"
        :min="0"
        :controls="false"
        @change="$emit('width', axis.width)"
      )

      el-input-number.number(
        :disabled="!checked"
        v-model="axis.height"
        :min="0"
        :controls="false"
        @change="$emit('height', axis.height)"
      )

      el-select(
        :disabled="!checked"
        v-model="axis.unit"
        placeholder="unit"
        @change="$emit('unit', axis.unit)"
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
    name: 'dimensions-constructor',
    props: {
      'label-name': {
        type: String,
        default: 'Длина х Ширина х Высота'
      }
    },
    data() {
      return {
        checked: false,
        units: [{
          label: 'мм',
          value: 'мм'
        }, {
          label: 'см',
          value: 'см'
        }, {
          label: 'м',
          value: 'м'
        }],
        axis: {
          length: 0,
          width: 0,
          height: 0,
          unit: 'см'
        }
      }
    },
  }
</script>

<style lang="stylus">
  .dimensions-container
    display grid
    grid-template-columns 4fr 4fr 4fr 3fr
    .number
      padding-right 5px
</style>
