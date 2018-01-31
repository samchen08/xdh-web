<template>
  <el-dialog :title="title"
             :visible.sync="dialogVisible"
             :close-on-click-modal="false"
             :append-to-body="true"
             @open="handleDialogOpen"
             @close="handleDialogClose"
             :width="width">

    <el-form
      label-position="right"
      label-width="80px"
      :size="size"
      :rules="rules"
      ref="form"
      :model="currentModel">
      <slot :model="currentModel" :rules="rules"></slot>
    </el-form>
    <div slot="footer">
      <el-button :size="size" @click="handleCancel">取消</el-button>
      <el-button :loading="loading"
                 :disabled="loading"
                 type="primary"
                 :size="size"
                 @click="handleSubmit">{{okBtnText}}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { clone } from '@/utils/convert'

  const noop = function () {
    return Promise.resolve()
  }
  export default {
    props: {
      // 操作模式，新增还是修改
      mode: {
        type: String,
        default: 'insert',
        validator (val) {
          return ['insert', 'update'].includes(val)
        }
      },
      // 对话框标题
      title: {
        type: String,
        default: ''
      },
      // 是否显示，支持双向绑定修饰符
      visible: {
        type: Boolean,
        default: false
      },
      // 对话框宽度
      width: {
        type: String,
        default: '50%'
      },
      // 模型数据
      model: {
        type: Object,
        default () {
          return {}
        }
      },
      // 表单验证规则
      rules: {
        type: Object
      },
      // 表单字段名称对齐方式
      labelPosition: {
        type: String,
        default: 'right'
      },
      // 表单字段名称的宽度
      labelWidth: {
        type: String,
        default: '80px'
      },
      // 表单项的尺寸
      size: {
        type: String
      },
      // 增加动作回调函数，需要返回Promise
      onInsert: {
        type: Function,
        default: noop
      },
      // 更新动作回调函数，需要返回Promise
      onUpdate: {
        type: Function,
        default: noop
      }
    },
    data () {
      return {
        dialogVisible: this.visible,
        currentModel: clone(this.model),
        loading: false
      }
    },
    computed: {
      okBtnText () {
        return this.loading ? '正在处理...' : '确定'
      }
    },
    watch: {
      dialogVisible (val) {
        this.$emit('update:visible', val)
        if (!val) {
          this.loading = false
        }
      },
      visible (val) {
        this.dialogVisible = val
      },
      model (val) {
        this.currentModel = clone(val)
      }
    },
    methods: {
      handleCancel () {
        this.dialogVisible = false
      },
      handleSubmit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            switch (this.mode) {
              case 'insert':
                this.onInsert(clone(this.currentModel)).then(() => {
                  this.dialogVisible = false
                })
                break
              case 'update':
                this.onUpdate(clone(this.currentModel)).then(() => {
                  this.dialogVisible = false
                })
                break
            }
          }
        })
      },
      handleDialogOpen () {
        this.$emit('open')
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      },
      handleDialogClose () {
        this.$emit('close')
        this.$refs.form.resetFields()
      }
    }
  }
</script>
