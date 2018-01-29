<template>
  <div>
    <filter-panel @on-query="handleQuery">
      <template>
        <el-form-item>
          <el-input placeholder="参数名" v-model="query.name"></el-input>
        </el-form-item>
      </template>
    </filter-panel>
    <list-panel ref="list" title="参数列表" :load="loadData" :state="demoParam" :size="10" :fixed="true">
      <div slot="tool">
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleOpenAdd">新增</el-button>
        <el-button size="mini" type="danger" @click="handleRemoveSelection">批量删除</el-button>
      </div>
      <template slot-scope="scope">
        <el-table :data="scope.list" @selection-change="handleSelection" stripe border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="参数名" prop="name" width="200"></el-table-column>
          <el-table-column label="参数值" prop="value" width="150"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="props">
              <el-button size="mini" @click="handleEdit(props.row, props.$index)">编辑</el-button>
              <el-button size="mini" type="warning" @click="handleRemove(props.row, props.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </list-panel>

    <model-dialog :visible.sync="dialogVisible"
                  :model="platform"
                  :rules="rules"
                  :mode="dialogMode"
                  :title="dialogTitle"
                  width="500px"
                  :on-insert="handleInsert"
                  :on-update="handleUpdate">
      <template slot-scope="prop">
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
    </model-dialog>
  </div>
</template>

<script>
  import XdhPanel from '../../widgets/xdh-panel'
  import DemoParam from '../../base/mixin/demo-param'
  import ListPanel from '../../components/system/list-panel.vue'
  import FilterPanel from '../../components/system/filter-panel.vue'
  import ModelDialog from '../../components/system/model-dialog.vue'

  export default {
    components: {
      XdhPanel,
      ListPanel,
      FilterPanel,
      ModelDialog
    },
    mixins: [DemoParam],
    data () {
      return {
        query: {
          code: ''
        },
        dialogVisible: false,
        platform: {
          name: '',
          code: '',
          order: 1,
          path: '',
          remark: ''
        },
        rules: {
          name: [{required: true, message: '名称是必填项'}],
          value: [{required: true, message: '值是必填项'}]
        },
        dialogMode: 'insert',
        editIndex: null,
        selection: []
      }
    },
    computed: {
      dialogTitle () {
        return this.dialogMode === 'insert' ? '新增' : '编辑'
      }
    },
    methods: {
      loadData (page, size) {
        this.selection = []
        return this.fetchDemoParam({
          limit: size,
          page: page,
          ...this.query
        })
      },
      handleQuery () {
        this.$refs.list.reload()
      },
      handleOpenAdd () {
        this.dialogMode = 'insert'
        this.dialogVisible = true
      },
      handleEdit (row, index) {
        this.platform = {...row}
        this.editIndex = index
        this.dialogMode = 'update'
        this.dialogVisible = true
      },
      handleInsert (model) {
        return this.addDemoParam(model, 0)
      },
      handleUpdate (model) {
        return this.updateDemoParam(model, this.editIndex)
      },
      handleRemove (row, index) {
        this.$confirm('是否确定删除？', '提示', {type: 'warning'}).then(() => {
          this.removeDemoParam(row.id, null, index).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
        })
      },
      handleSelection (selection) {
        this.selection = selection
      },
      handleRemoveSelection () {
        if (this.selection.length > 0) {
          this.$confirm('是否确定删除？', '提示', {type: 'warning'}).then(() => {
            this.handleQuery()
          })
        } else {
          this.$message({
            message: '请勾选需要删除的记录',
            type: 'warning'
          })
        }
      }
    }
  }
</script>
