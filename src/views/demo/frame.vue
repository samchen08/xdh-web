<template>
  <iframe :src="$route.params.url" frameborder="0"></iframe>
</template>

<style type="text/scss" lang="scss" scoped>
  iframe {
    width: 100%;
    height: 100%;
  }
</style>

<script>
  export default {
    data () {
      return {}
    },
    mounted () {
    }
  }
</script>
