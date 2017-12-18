<template>
  <el-popover placement="bottom" width="326" trigger="click">
    <div style="height: 250px;">
      <el-scrollbar style="height: 200px;">
        <el-tree :data="data" show-checkbox></el-tree>
      </el-scrollbar>
      <div class="xdh-tree-select__btns">
        <el-button type="text">清空</el-button>
        <el-button size="mini">确定</el-button>
      </div>
    </div>
    <el-input slot="reference" style="width: 350px;"></el-input>
  </el-popover>
</template>


<script>
  const treeData = [{
    label: '一级 1',
    children: [{
      label: '二级 1-1',
      children: [{
        label: '三级 1-1-1'
      }]
    }]
  }, {
    label: '一级 2',
    children: [{
      label: '二级 2-1',
      children: [{
        label: '三级 2-1-1'
      }]
    }, {
      label: '二级 2-2',
      children: [{
        label: '三级 2-2-1'
      }]
    }]
  }, {
    label: '一级 3',
    children: [{
      label: '二级 3-1',
      children: [{
        label: '三级 3-1-1'
      }]
    }, {
      label: '二级 3-2',
      children: [{
        label: '三级 3-2-1'
      }]
    }]
  }]

  export default {
    name: 'XdhTreeSelect',
    props: {},
    data () {
      return {
        data: treeData
      }
    }
  }
</script>
