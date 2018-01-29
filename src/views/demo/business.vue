<template>
  <curd :filter="true"
        filter-title="33"
        :collapsible="true"
        :collapsed="true"
        :query.sync="query">
    <template slot="filter-items">
      <el-form-item prop="name">
        <el-input placeholder="名称" v-model="query.name"></el-input>
      </el-form-item>
    </template>
    <template slot="filter-items-expand">
      <el-form-item prop="code">
        <el-input placeholder="代码" v-model="query.code"></el-input>
      </el-form-item>
    </template>

  </curd>
</template>


<script>
  import Curd from '../../components/system/curd.vue'

  export default {
    components: {
      Curd
    },
    data () {
      return {
        query: {
          name: '',
          code: ''
        }
      }
    },
    methods: {}
  }
</script>
