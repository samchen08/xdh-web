<template>
  <curd ref="curd"
        :filter="true"
        :collapsible="false"
        :query.sync="query"
        name="demoPlatform"
        :model="platform"
        :rules="rules">

    <template slot="filter-items">
      <el-form-item prop="name">
        <el-input placeholder="参数名称" v-model="query.name"></el-input>
      </el-form-item>
    </template>

    <template slot="table-columns" slot-scope="scope">
      <el-table-column label="序号" prop="order" width="80" sortable></el-table-column>
      <el-table-column label="平台名称" prop="name" width="200"></el-table-column>
      <el-table-column label="平台代码" prop="code" width="150"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
    </template>

    <template slot="dialog-form-items" slot-scope="prop">
      <el-form-item label="平台名称" prop="name">
        <el-input v-model="prop.model.name"></el-input>
      </el-form-item>
      <el-form-item label="平台代码" prop="code">
        <el-input v-model="prop.model.code"></el-input>
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="prop.model.path"></el-input>
      </el-form-item>
      <el-form-item label="序号" prop="order">
        <el-input-number v-model="prop.model.order"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="prop.model.remark"></el-input>
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
          code: '',
          name: ''
        },
        platform: {
          name: '',
          code: '',
          order: 1,
          path: '',
          remark: ''
        },
        rules: {
          name: [{required: true, message: '名称是必填项'}]
        }
      }
    }
  }
</script>
