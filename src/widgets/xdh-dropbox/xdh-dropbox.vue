<template>
  <div class="xdh-dropbox" v-droppable="droppable">
    <slot></slot>
  </div>
</template>

<script>
  import Sortable from 'sortablejs'
  import droppable from '../../utils/directives/droppable'

  export default {
    name: 'XdhDropbox',
    directives: {
      droppable
    },
    props: {
      accept: {
        type: [String, Array]
      },
      put: {
        type: [Boolean, Array],
        default: false
      },
      enterClass: {
        type: String,
        default: 'xdh-dropbox--enter'
      }
    },
    computed: {
      droppable () {
        if (this.accept) {
          return Object.assign({
            accept: this.accept,
            enterClass: this.enterClass
          }, {
            onDragEnter: (e) => {
              this.$emit('on-enter', e)
            },
            onDragLeave: (e) => {
              this.$emit('on-leave', e)
            },
            onDrop: (e) => {
              this.$emit('on-drop', e)
            }
          })
        } else {
          return false
        }
      },
      sortable () {
        return Object.assign({
          animation: 150,
          group: {put: this.put},
          sort: false
        }, {
          onAdd: (e) => {
            e.item.parentNode.removeChild(e.item)
            this.$emit('on-drop', e)
          }
        })
      }
    },
    mounted () {
      if (this.put) {
        this.sortInstance = new Sortable(this.$el, this.sortable)
      }
    },
    beforeDestroy () {
      this.sortInstance && this.sortInstance.destroy()
    }
  }
</script>
