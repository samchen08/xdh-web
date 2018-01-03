<template>
  <el-tabs v-if="tabs"
           type="card"
           :active-name="tabs.selected"
           @tab-remove="handleTabRemove"
           @tab-click="handleTabClick">
    <el-tab-pane v-for="item in tabs.list" :key="item.name"
                 :label="item.label"
                 :closable="item.closable"
                 :name="item.name"></el-tab-pane>
  </el-tabs>
</template>

<script>
  import createStoreModule from './store'

  export default {
    name: 'XdhNavTabs',
    props: {
      label: {
        type: String
      },
      name: {
        type: String
      },
      closable: {
        type: Boolean,
        default: true
      },
      store: {
        type: String,
        default: 'xdhNavTab'
      }
    },
    computed: {
      tabs () {
        const store = this.$store.state[this.store]
        if (store) {
          return store
        } else {
          return {
            list: [],
            selected: ''
          }
        }
      }
    },
    methods: {
      handleTabRemove (name) {
        this.$store.commit(`${this.store}/remove`, {name: name})
        setTimeout(() => {
          this.$router.push(this.tabs.selected)
        }, 0)
      },
      handleTabClick (tab) {
        // 由于el-tabs组件有自己的逻辑要处理
        this.$nextTick(() => {
          this.$router.push(tab.name)
        })
      }
    },
    created () {
      if (!this.$store.state[this.store]) {
        this.$store.registerModule(this.store, createStoreModule())
      }
      this.$store.commit(`${this.store}/pushTab`, {
        tab: {
          label: this.label,
          name: this.name,
          closable: this.closable
        }
      })
    }
  }
</script>
