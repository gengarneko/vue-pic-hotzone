import _ from './util.js'

export default {
  bind: function (el, binding, vnode) {
    const MIN_LIMIT = _.MIN_LIMIT

    el.addEventListenser('mousedown', handleMouseDown)

    function handleMouseDown (e) {
      e && e.preventDefault()

      let itemInfo = {
        top: _.getDistanceY(e, el),
        left: _.getDistanceY(e, el),
        width: 0,
        height: 0
      }
      let container = _.getOffset(el)

      // 距离转化为百分比，只在初始化时调用一次
      let setting = {
        topPer: _.decimalPoint(itemInfo.top / container.height),
        leftPer: _.decimalPoint(itemInfo.left / container.width),
        widthPer: 0,
        heightPer: 0
      }
      let preX = _.getPageX(e)
      let preY = _.getPageY(e)

      vnode.context.addItem(setting)

      window.addEventListener('mousemove', handleChange)
      window.addEventListener('mouseup', handleMouseUp)

      function handleChange (e) {
        e && e.preventDefault()

        let moveX = _.getPageX(e) - preX
        let moveY = _.getPageY(e) - preY
        preX = _.getPageX(e)
        preY = _.getPageY(e)

        // 不考虑移动方向，只考虑右下角
        let minLimit = 0
        let styleInfo = _.dealBR(itemInfo, moveX, moveY, minLimit)

        // 处理边界值
        itemInfo = _.dealEdgeValue(itemInfo, styleInfo, container)

        Object.assign(el.lastElementChild.style, {
          top: `${itemInfo.top}px`,
          left: `${itemInfo.left}px`,
          width: `${itemInfo.width}px`,
          height: `${itemInfo.height}px`
        })
      }

      function handleMouseUp () {
        let perInfo = {
          topPer: _.decimalPoint(itemInfo.top / container.height),
          leftPer: _.decimalPoint(itemInfo.left / container.width),
          widthPer: _.decimalPoint(itemInfo.width / container.width),
          heightPer: _.decimalPoint(itemInfo.height / container.height)
        }

        // 通过当前鼠标松开的位置
        // 判断图片容器和热区框越界问题
        if (vnode.context.isOverRange()) {
          vnode.context.overRange()
        } else if (container.height < MIN_LIMIT && itemInfo.width > MIN_LIMIT) {
          vnode.context.changeItem(Object.assign(perInfo, {
            topPer: 0,
            heightPer: 1
          }))
        } else if (container.width < MIN_LIMIT && itemInfo.height > MIN_LIMIT) {
          vnode.context.changeItem(Object.assign(perInfo, {
            leftper: 0,
            widthPer: 1
          }))
        } else if (itemInfo.width > MIN_LIMIT && itemInfo.height > MIN_LIMIT) {
          vnode.context.changeItem(perInfo)
        } else {
          vnode.context.eraseItem()
        }

        window.removeEventListener('mousemove', handleChange)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }

    el.$destroy = () => el.removeEventListener('mousedown', handleMouseDown)
  },
  unbind: function (el) {
    el.$destroy()
  }
}
