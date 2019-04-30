/*
 *main.js 引入 Vue.use(rightmenu)
 *局部使用v-rightmenu='menu(变量)'
 */

/**
 * direction 鼠标左右键
 * boxStyle  菜单列表样式
 * optionStyle 菜单选项样式
 * menus 菜单列表
 * content 菜单显示的文字 <支持html>
 * callback：菜单点击要触发函数  需要在methods定义
 * style ： 本项菜单的单独样式 可以覆盖掉optionStyle
 * icon : icon图片地址
 * iconStyle: icon 图片的样式（例如大小等 直接作用于图片）
 * iconPosition : 支持left / right (其余全部按照left处理);
 */

/**
 * 字段(field)           类型(type)                 是否可以为空(is can null)    默认值
 * direction           [left | right]                       Y                   right
 * boxStyle               [ css ]                           Y                   ""
 * optionStyle            [ css ]                           Y                   ""
 * menus                 [ Array ]                          N                   ""
 * content            [ html | text ]                       Y                   ""
 * callback           [  methods function ]                 Y                   return false
 * style                  [ css ]                           Y                   ""
 * icon                   [ url ]                           Y                   ""
 * iconStyle              [ css ]                           Y                   ""
 * iconPosition           [string]                          Y                   "left"
 */
export default {
  // 调用use时候执行该方法
  install: function (Vue, options) {
    var GLOBLEsize = 0
    var dd = ''
    // 声明
    Vue.directive('rightmenu', {
      // 插入时候触发
      bind (el, binding, vnode) {
        // 设置body宽高（为了遮照）
        dd = binding.value['direction'] === 'left' ? 'click' : 'contextmenu'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.height = '100%'
        // 防止id重复  每次累计加一
        let currentSize = GLOBLEsize
        if (el.style.position == '') {
          el.style.position = 'relative'
        }
        // 设置菜单层级高于遮罩层
        el.style.zIndex = '99998'
        /**
         * 增加一个遮罩层方便我控制菜单显示时候取消其余事件
         */
        var Mask = document.createElement('div')
        var Maskstyle =
          'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99997;'
        Mask.style = Maskstyle + 'display:none'
        Mask.setAttribute('id', 'TT_MASK')
        document.body.appendChild(Mask)
        el.addEventListener(dd, e => {
          // debugger;

          var e = event || window.event
          e.stopPropagation() // 阻止冒泡事件
          e.cancelBubble = true // 阻止冒泡事件ie
          e.preventDefault() // 阻止默认事件
          // 隐藏所有菜单
          for (let i = 0; i < GLOBLEsize; i++) {
            if (document.getElementById('tt_right_menu' + i)) {
              document.getElementById(
                'tt_right_menu' + i
              ).style = `display:none`
            }
          }
          // 菜单位置
          var menuX =
            e.pageX || e.pageY
              ? e.pageX
              : e.clientX + document.body.scrollLeft - document.body.clientLeft // 获取pageX 兼容ie
          var menuY =
            e.pageX || e.pageY
              ? e.pageY
              : e.clientY + document.body.scrollTop - document.body.clientTop
          // 右键显示遮罩层
          document.getElementById('TT_MASK').style = Maskstyle + 'display:block'
          // 找不到这个节点时候 新增一个menu 用于多个菜单的兼容问题
          if (!document.getElementById('tt_right_menu' + currentSize)) {
            // 创建div
            let boxDiv = document.createElement('div')
            // 指令的绑定值进行遍历 生成菜单的节点
            binding.value['menus'].map(item => {
              let optionp = document.createElement('div')
              // 控制icon位置
              let iconPosition = ''
              // icon内容
              let icon = ''
              // 文字内容
              let content = ''
              // 设置节点文字不可选中
              optionp.setAttribute('unselectable', 'on')

              /**
               * 兼容用户没有callback的情况
               */
              if (item.callback) {
                optionp.onclick = function () {
                  // 隐藏菜单的父级节点
                  optionp.parentNode.style.display = 'none'
                  // 隐藏遮罩层
                  Mask.style = Maskstyle + 'display:none'

                  return vnode.context[item.callback](item)
                }
              } else {
                // 无callback情况
                optionp.onclick = function () {
                  // 隐藏菜单的父级节点
                  optionp.parentNode.style.display = 'none'
                  // 隐藏遮罩层
                  Mask.style = Maskstyle + 'display:none'
                  return false
                }
              }
              /**
               * 兼容在展开的选项上右击会出现默认右键，以及禁用穿透事件
               */
              optionp.addEventListener('contextmenu', e => {
                var e = event || window.event
                e.stopPropagation() // 阻止冒泡事件
                e.cancelBubble = true // 阻止冒泡事件ie
                e.preventDefault() // 阻止默认事件
              })
              // 如果用户设置了icon
              if (item.icon) {
                // 判断icon位置是左还是右面 -》 可扩展为一个函数 让用户更高程度自定义
                if (
                  item.iconPosition &&
                  (item.iconPosition == 'left' || item.iconPosition == 'right')
                ) {
                  iconPosition = item.iconPosition
                } else {
                  // 默认值 left
                  iconPosition = 'left'
                }
                icon = item.icon
              }
              // 判断content文字 也可以升级为一个函数提高可扩展性
              if (item.content) {
                content = item.content
              }
              // 判断icon是否有
              if (icon != '') {
                // 剧左或者右
                if (iconPosition == 'right') {
                  // 生成img
                  let img = new Image()
                  img.src = icon
                  img.style = (item.iconStyle || '') + 'vertical-align:middle;'
                  optionp.innerHTML = content
                  // 追加到option
                  optionp.appendChild(img)
                } else {
                  let img = new Image()
                  img.src = icon
                  img.style = (item.iconStyle || '') + 'vertical-align:middle;'
                  optionp.appendChild(img)
                  optionp.innerHTML += content
                }
              } else {
                // 设置文字内容
                optionp.innerHTML = content
              }
              /**
               * 兼容屏幕出界的情况；
               */
              optionp.style = `text-align:center;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;margin-block-start: 0em;margin-block-end: 0em;-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;${
                binding.value['optionStyle'] ? binding.value['optionStyle'] : ''
              };${item['style'] ? item['style'] : ''};`
              // 追加选项到总菜单
              boxDiv.appendChild(optionp)
            })
            // 设置唯一id
            boxDiv.setAttribute('id', 'tt_right_menu' + currentSize)
            // 菜单的样式
            boxDiv.style = `background:#fff;color:#333;${
              binding.value['boxStyle'] ? binding.value['boxStyle'] : ''
            };position:fixed;z-index:99999;top:${menuY}px;left:${menuX}px;`
            //    追加到页面
            document.body.appendChild(boxDiv)
            let divWidth = boxDiv.clientWidth || boxDiv.offsetWidth
          } else {
            // 节点已经存在则不需要重复创建 节省性能，只需要获取后设置位置即可
            let boxDiv = document.getElementById('tt_right_menu' + currentSize)
            boxDiv.style = `color:#333;background:#fff;${
              binding.value['boxStyle'] ? binding.value['boxStyle'] : ''
            };position:fixed;z-index:99999;top:${menuY}px;left:${menuX}px;`
            /**
             * 判断是否超出屏幕宽度
             */
            if (menuX + boxDiv.clientWidth >= document.body.clientWidth) {
              boxDiv.style.left = menuX - boxDiv.clientWidth + 'px'
            }
            /**
             * 判断是否超出屏幕高度
             */
            if (menuY + boxDiv.clientHeight >= document.body.clientHeight) {
              boxDiv.style.top = menuY - boxDiv.clientHeight + 'px'
            }
          }
        })
        // 每次创建都会使得唯一遍量增加 防止重复
        GLOBLEsize++
        // 增加遮罩层的点击事件 （在空白处点击移除右键菜单）-》包含左键和右键点击
        document.getElementById('TT_MASK').addEventListener('click', () => {
          if (document.getElementById('tt_right_menu' + currentSize)) {
            document.getElementById(
              'tt_right_menu' + currentSize
            ).style = `display:none`
          }
          document.getElementById('TT_MASK').style = 'display:none'
        })
        document
          .getElementById('TT_MASK')
          .addEventListener('contextmenu', () => {
            if (document.getElementById('tt_right_menu' + currentSize)) {
              document.getElementById(
                'tt_right_menu' + currentSize
              ).style = `display:none`
            }
            document.getElementById('TT_MASK').style = 'display:none'
          })
      },
      unbind (el) {
        // 解绑时候移除右键监听防止影响其他页面
        el.removeEventListener(dd, this, true)
      }
    })
  }
}
