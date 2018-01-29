<template>
  <xdh-layout class="xdh-panel"
              :class="classes"
              :north="{height:headerHeight}"
              :south="{height: footerHeight}"
              :west="false"
              :east="false">
    <xdh-title v-if="title!==null"
               slot="north"
               class="xdh-panel__header"
               :title="title"
               :icon="icon"
               :theme="theme"
               :simple="simple">
      <slot name="title" slot="title"></slot>
      <slot name="tool" slot="tool"></slot>
    </xdh-title>
    <slot></slot>
    <slot slot="south" name="footer"></slot>
  </xdh-layout>

</template>

<script>
  import XdhTitle from '../xdh-title'
  import XdhLayout from '../xdh-layout'

  export default {
    name: 'XdhPanel',
    components: {
      XdhLayout,
      XdhTitle
    },
    props: {
      title: {
        type: String
      },
      icon: {
        type: String
      },
      theme: {
        type: String,
        default: 'primary'
      },
      simple: {
        type: Boolean,
        default: false
      },
      shadow: {
        type: Boolean,
        default: false
      },
      headerHeight: {
        type: String,
        default: '36px'
      },
      footerHeight: {
        type: String,
        default: '40px'
      }
    },
    computed: {
      classes () {
        return [`xdh-panel--${this.theme}`, {
          'has-shadow': this.shadow,
          'is-simple': this.simple
        }]
      }
    }
  }
</script>
