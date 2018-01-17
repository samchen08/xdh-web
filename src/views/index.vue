<template>
  <div>
    <xdh-nav-tabs label="首页" name="/home" :closable="false"></xdh-nav-tabs>

  </div>
</template>

<style type="text/scss" lang="scss" scoped>

</style>


<script>
  import treeMixin from '../base/mixin/tree'
  //  import { log } from '../utils/consle'
  import XdhNavTabs from '../widgets/xdh-nav-tabs'

  export default {
    components: {
      XdhNavTabs
    },
    mixins: [treeMixin],
    directives: {},
    data () {
      return {}
    },
    computed: {},
    watch: {},
    methods: {},
    created () {
    }
  }
</script>
