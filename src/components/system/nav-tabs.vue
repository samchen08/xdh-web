<template>
  <xdh-nav-tabs
    class="nav-tabs"
    :label="label"
    :name="path"
    :closable="closable"
    :store="store"></xdh-nav-tabs>
</template>

<style type="text/scss" lang="scss" scoped>
</style>

<script>
  import XdhNavTabs from '../../widgets/xdh-nav-tabs'

  export default {
    components: {
      XdhNavTabs
    },
    props: {
      label: String,
      path: String,
      closable: {
        type: Boolean,
        default: true
      },
      store: {
        type: String,
        default: 'systemTabs'
      }
    }
  }
</script>
