import _ from './util.js'

export default {
  bind: function (el, binding, vnode) {
    el.addEventListener('mousedown', handleMouseDown)

    function handleMouseDown (e) {
      let pointer = e.target.dataset.pointer

      if (!pointer) {
        return
      }

      e && e.stopPropagation()

      let zone = el.parentNode
      let setting = vnode.context.setting
      let container = _.getOffset(zone.parentNode)
      let itemInfo = {
        width: _.getOffset(zone)
      }
    }
  }
}