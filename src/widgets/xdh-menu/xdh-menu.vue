<script>
  export default {
    name: 'XdhMenu',
    props: {
      // 菜单数据
      data: {
        type: Array,
        default () {
          return []
        }
      },
      // 数据字段名称映射
      props: {
        type: Object,
        default () {
          return {
            id: 'id',
            text: 'text',
            icon: 'icon',
            children: 'children',
            group: 'group'
          }
        }
      },
      // 模式 horizontal / vertical
      mode: String,

      // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
      collapse: Boolean,

      // 菜单的背景色（仅支持 hex 格式）
      backgroundColor: String,

      // 菜单的文字颜色（仅支持 hex 格式）
      textColor: String,

      // 当前激活菜单的文字颜色（仅支持 hex 格式）
      activeTextColor: String,

      // 当前激活菜单的 index
      defaultActive: String,

      // 当前打开的sub-menu的 key 数组
      defaultOpeneds: Array,

      // 是否只保持一个子菜单的展开
      uniqueOpened: Boolean,

      // 子菜单打开的触发方式(只在 mode 为 horizontal 时有效)
      menuTrigger: String,

      // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
      router: Boolean
    },
    methods: {
      grouping (array) {
        let groups = {
          'default': []
        }
        let props = this.props
        array.forEach(n => {
          let key = n[props.group]
          if (key) {
            groups[key] = groups[key] || []
            groups[key].push(n)
          } else {
            groups['default'].push(n)
          }
        })
        return groups
      },
      createTitle (h, item) {
        return [
          h('i', {
            'class': item[this.props.icon]
          }),
          h('span', {
            slot: 'title'
          }, item[this.props.text])
        ]
      },
      createItem (h, item) {
        return h('el-menu-item', {
          props: {
            index: item[this.props.id].toString()
          }
        }, this.createTitle(h, item))
      },
      createSubmenu (h, item) {
        return h('el-submenu', {
          props: {
            index: item[this.props.id].toString()
          },
          scopedSlots: {
            default: props => this.createNodes(h, item[this.props.children])
          }
        }, [h('template', {
          slot: 'title'
        }, this.createTitle(h, item))])
      },
      createGroup (h, title, items) {
        let nodes = []
        let props = this.props
        items.forEach(item => {
          if (item[props.children] && item[props.children].length > 0) {
            nodes.push(this.createSubmenu(h, item))
          } else {
            nodes.push(this.createItem(h, item))
          }
        })
        nodes.unshift(h('template', {
          slot: 'title'
        }, title))
        return h('el-menu-item-group', null, nodes)
      },
      createNodes (h, array) {
        let nodes = [], groups = this.grouping(array)
        let props = this.props
        for (let key in groups) {
          let items = groups[key] || []
          if (key === 'default') {
            items.forEach(item => {
              if (item[props.children] && item[props.children].length > 0) {
                nodes.push(this.createSubmenu(h, item))
              } else {
                nodes.push(this.createItem(h, item))
              }
            })
          } else {
            nodes.push(this.createGroup(h, key, items))
          }
        }
        return nodes
      },
      open (index) {
        this.$refs.menu.open(index)
      },
      close (index) {
        this.$refs.menu.close(index)
      }
    },
    render (h) {
      return h('el-menu', {
        props: {
          ...this.$props
        },
        'class': 'xdh-menu',
        on: {
          select: (index, indexPath) => this.$emit('select', index, indexPath),
          open: (index, indexPath) => this.$emit('open', index, indexPath),
          close: (index, indexPath) => this.$emit('close', index, indexPath)
        },
        ref: 'menu'
      }, this.createNodes(h, this.data))
    }
  }
</script>
