<template>
  <curd ref="curd"
        :filter="true"
        filter-title="查询条件"
        :collapsible="false"
        :query.sync="query"
        name="demoParam"
        :model="model"
        :rules="rules"
        :mixin="mixin">

    <template slot="filter-items">
      <el-form-item prop="name">
        <el-input placeholder="参数名称" v-model="query.name"></el-input>
      </el-form-item>
    </template>


    <template slot="table-columns" slot-scope="scope">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="参数名称"></el-table-column>
      <el-table-column prop="value" label="参数值"></el-table-column>
    </template>

    <template slot="table-tool">
      <el-button size="mini" type="danger" @click="handleRemoveSelection">批量删除</el-button>
    </template>

    <template slot="dialog-form-items" slot-scope="prop">
      <el-form-item label="平台名称" prop="name">
        <el-input v-model="prop.model.name"></el-input>
      </el-form-item>
      <el-form-item label="平台代码" prop="value">
        <el-input v-model="prop.model.value"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="prop.model.remark"></el-input>
      </el-form-item>
    </template>


  </curd>
</template>


<script>
  import Curd from '../../components/system/curd.vue'
  import DemoParam from '../../base/mixin/demo-param'

  export default {
    components: {
      Curd
    },
    mixins: [DemoParam],
    data () {
      return {
        query: {
          name: '',
          code: ''
        },
        mixin: DemoParam,
        model: {
          name: '',
          value: '',
          remark: ''
        },
        rules: {
          name: [{required: true, message: '名称是必填项'}],
          value: [{required: true, message: '值是必填项'}]
        }
      }
    },
    methods: {
      handleRemoveSelection () {
        const selection = this.$refs.curd.selection
        if (selection.length > 0) {
          this.removeParams({
            ids: selection.map(n => n.id).join(',')
          }).then(() => {
            this.$refs.curd.reload()
          })
        }
      }
    }
  }
</script>
