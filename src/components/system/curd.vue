<template>
  <div class="curd">
    <filter-panel v-if="filter"
                  :title="filterTitle"
                  :icon="filterIcon"
                  :collapsible="collapsible"
                  :collapsed="collapsed"
                  :filterHeaderHeight="filterHeaderHeight"
                  :filterFooterHeight="filterFooterHeight"
                  :model.sync="filterModel"
                  @on-query="handleQuery"
                  @toggle="handleToggle">
      <slot name="filter-tool" slot="tool"></slot>
      <slot name="filter-items"></slot>
      <slot name="filter-items-expand" slot="expand"></slot>
      <slot name="filter-footer" slot="footer"></slot>
    </filter-panel>
    <list-panel ref="list"
                :icon="listIcon"
                :title="listTitle"
                :load="fetch"
                :state="state"
                :size="pageSize"
                :fixed="true">
      <div slot="tool">
        <el-button v-if="addable" type="primary" size="mini" icon="el-icon-plus" @click="handleOpenAdd">新增</el-button>
        <slot name="table-tool"></slot>
      </div>
      <template slot-scope="scope">
        <el-table :data="scope.list" @selection-change="handleSelection" stripe border>
          <slot name="table-columns" :state="state"></slot>
          <el-table-column label="操作" :width="handleColumnWidth" v-if="hasHandleColumn">
            <template slot-scope="prop">
              <slot name="table-handle-column" :row="prop.row" :$index="prop.$index"></slot>
              <el-button v-if="editable" size="mini" @click="handleEdit(prop.row, prop.$index)">编辑</el-button>
              <el-button v-if="removable" size="mini" type="warning" @click="handleRemove(prop.row, prop.$index)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </list-panel>
    <model-dialog :visible.sync="dialogVisible"
                  :model="currentModel"
                  :rules="rules"
                  :mode="dialogMode"
                  :title="dialogTitle"
                  width="500px"
                  :on-insert="handleInsert"
                  :on-update="handleUpdate">
      <template slot-scope="prop">
        <slot name="dialog-form-items" :model="prop.model" :rules="prop.rules"></slot>
      </template>
    </model-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import camelCase from 'lodash/camelCase'
  import snakeCase from 'lodash/snakeCase'
  import FilterPanel from './filter-panel.vue'
  import ListPanel from './list-panel.vue'
  import ModelDialog from './model-dialog.vue'

  const toMethodName = function (type, name) {
    return camelCase(`${type}_${snakeCase(name)}`)
  }
  const toTypeName = function (type, name) {
    return `${type}_${snakeCase(name)}`.toUpperCase()
  }
  export default {
    components: {
      FilterPanel,
      ListPanel,
      ModelDialog
    },
    props: {
      // 是否显示查询条件面板
      filter: {
        type: Boolean,
        default: true
      },
      // 查询面板标题文字
      filterTitle: {
        type: String,
        default: '查询条件'
      },
      // 查询面板标题文字前的icon
      filterIcon: {
        type: String
      },
      // 能否折叠
      collapsible: {
        type: Boolean,
        default: false
      },
      // 是否折叠
      collapsed: {
        type: Boolean,
        default: true
      },
      // 头部标题栏目的高度
      filterHeaderHeight: {
        type: String,
        default: '36px'
      },
      // 底部的高度
      filterFooterHeight: {
        type: String,
        default: '40px'
      },
      // 查询参数对象
      query: {
        type: Object,
        default () {
          return {}
        }
      },
      // 实体对象名称
      name: {
        type: String
      },
      mixin: {
        type: Object
      },
      // 表单验证规则
      rules: {
        type: Object
      },
      // 新增或修改实体的字段集合
      model: {
        type: Object,
        default () {
          return {}
        }
      },
      // 实体的主键字段名称
      modelKey: {
        type: String,
        default: 'id'
      },
      // 显示增加按钮
      addable: {
        type: Boolean,
        default: true
      },
      // 显示编辑按钮
      editable: {
        type: Boolean,
        default: true
      },
      // 显示删除按钮
      removable: {
        type: Boolean,
        default: true
      },
      // 操作列的宽度
      handleColumnWidth: {
        type: Number,
        default: 150
      },
      // 列表标题文字
      listTitle: {
        type: String,
        default: '列表'
      },
      // 列表标题文字前的icon
      listIcon: {
        type: String,
        default: 'el-icon-tickets'
      },
      // 分页页大小
      pageSize: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        filterModel: {...this.query},
        vm: null,
        dialogVisible: false,
        dialogMode: 'insert',
        editIndex: null,
        selection: [],
        currentModel: {...this.model}
      }
    },
    computed: {
      fetchName () {
        return this.mixin ? toMethodName('fetch', this.name) : toTypeName('fetch', this.name)
      },
      addName () {
        return this.mixin ? toMethodName('add', this.name) : toTypeName('add', this.name)
      },
      updateName () {
        return this.mixin ? toMethodName('update', this.name) : toTypeName('update', this.name)
      },
      removeName () {
        return this.mixin ? toMethodName('remove', this.name) : toTypeName('remove', this.name)
      },
      state () {
        if (this.vm) {
          return this.vm[this.name]
        } else {
          return this.$store.state[this.name]
        }
      },
      dialogTitle () {
        return this.dialogMode === 'insert' ? '新增' : '编辑'
      },
      hasHandleColumn () {
        return this.editable || this.removable || this.$scopedSlots['table-handle-column']
      }
    },
    watch: {
      query: {
        deep: true,
        handler (val) {
          this.filterModel = {...val}
        }
      }
    },
    methods: {
      handleToggle () {
        this.$emit('update:query', this.filterModel)
      },
      fetch (page = 1, size = 10) {
        this.selection = []
        if (this.vm) {
          return this.vm[this.fetchName]({
            limit: size,
            page: page,
            ...this.filterModel
          })
        } else {
          return this.$store.dispatch(this.fetchName, {
            data: {
              limit: size,
              page: page,
              ...this.filterModel
            }
          })
        }
      },
      add (model) {
        if (this.vm) {
          return this.vm[this.addName](model, 0)
        } else {
          return this.$store.dispatch(this.addName, {
            data: model,
            index: 0
          })
        }
      },
      update (model) {
        if (this.vm) {
          return this.vm[this.updateName](model, this.editIndex)
        } else {
          return this.$store.dispatch(this.updateName, {
            data: model,
            index: this.editIndex
          })
        }
      },
      remove (model, index) {
        if (this.vm) {
          return this.vm[this.removeName](model[this.modelKey], null, index)
        } else {
          return this.$store.dispatch(this.removeName, {
            [this.modelKey]: model[this.modelKey],
            data: null,
            index: index
          })
        }
      },
      handleQuery () {
        this.reload()
      },
      reload () {
        this.$refs.list.reload()
      },
      handleOpenAdd () {
        this.dialogMode = 'insert'
        this.currentModel = {...this.model}
        this.dialogVisible = true
      },
      handleSelection (selection) {
        this.selection = selection
      },
      handleInsert (model) {
        return this.add(model)
      },
      handleUpdate (model) {
        return this.update(model).then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
      },
      handleRemove (row, index) {
        this.$confirm('是否确定删除？', '提示', {type: 'warning'}).then(() => {
          this.remove(row, null, index).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
        }).catch(e => {
        })
      },
      handleEdit (row, index) {
        this.currentModel = {...row}
        this.editIndex = index
        this.dialogMode = 'update'
        this.dialogVisible = true
      }
    },
    created () {
      if (this.mixin) {
        this.vm = new Vue(this.mixin)
      }
    }
  }
</script>
