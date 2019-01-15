<template>
  <button
    class='h__btn'
    @click='handleClick'
    :style="{backgrundColor: bgColor, color: color,'border-color':borderColor}"
    :class="[
      'h__btn--'+type,
      {
        'is-round': round,
        'is-plain': plain,
        'no-radius': noRadius,
        'is-long': long
      }
    ]"
    :disabled='disabled'
  >
    <i :class="icon" v-if="icon"></i>
    <i class="h__icon--loading" v-if="loading && !icon"></i>
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'h-button',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    bgColor: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    round: Boolean,
    plain: Boolean,
    noRadius: Boolean,
    long: Boolean,
    disabled: Boolean

  },
  data () {
    return {

    }
  },
  methods: {
    handleClick (event) {
      if (this.disabled) return
      this.$emit('click', event)
    }
  }
}
</script>
