<template>
  <div>
    <filter-panel :collapsible="true" :collapsed="true" @on-query="handleQuery" :model.sync="query">
      <template>
        <el-form-item prop="code">
          <el-input placeholder="平台代码" v-model="query.code"></el-input>
        </el-form-item>
      </template>
      <template slot="expand">
        <el-form-item prop="name">
          <el-input placeholder="平台名称" v-model="query.name"></el-input>
        </el-form-item>
      </template>


    </filter-panel>
    <list-panel ref="list" title="平台查询结果" :load="loadData" :state="demoPlatform" :size="10" :fixed="true">
      <div slot="tool">
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleOpenAdd">新增</el-button>
        <el-button size="mini" type="danger" @click="handleRemoveSelection">批量删除</el-button>
      </div>
      <template slot-scope="scope">
        <el-table :data="scope.list" @selection-change="handleSelection" stripe border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="序号" prop="order" width="80" sortable></el-table-column>
          <el-table-column label="平台名称" prop="name" width="200"></el-table-column>
          <el-table-column label="平台代码" prop="code" width="150"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column>
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
    </model-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { FETCH_DEMO_PLATFORM, ADD_DEMO_PLATFORM, UPDATE_DEMO_PLATFORM } from '../../store/types'
  import XdhPanel from '../../widgets/xdh-panel'
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
    data () {
      return {
        query: {
          code: '',
          name: ''
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
          name: [{required: true, message: '名称是必填项'}]
        },
        dialogMode: 'insert',
        editIndex: null,
        selection: []
      }
    },
    computed: {
      ...mapState(['demoPlatform']),
      dialogTitle () {
        return this.dialogMode === 'insert' ? '新增' : '编辑'
      }
    },
    methods: {
      ...mapActions({
        fetchDemoPlatform: FETCH_DEMO_PLATFORM,
        addDemoPlatform: ADD_DEMO_PLATFORM,
        updateDemoPlatform: UPDATE_DEMO_PLATFORM
      }),
      loadData (page, size) {
        this.selection = []
        return this.fetchDemoPlatform({
          data: {
            limit: size,
            page: page,
            ...this.query
          }
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
        return this.addDemoPlatform(model, 0)
      },
      handleUpdate (model) {
        return this.updateDemoPlatform(model, this.editIndex)
      },
      handleRemove (row, index) {
        this.$confirm('是否确定删除？', '提示', {type: 'warning'}).then(() => {
          this.removeDemoPlatform(row.id, null, index).then(() => {
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
      },
      handleReset () {}
    },
    created () {
    }
  }
</script>
