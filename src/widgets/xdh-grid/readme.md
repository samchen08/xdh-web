# xdh-grid 网格组件

实现 Flex 布局 和 基于 SortableJs 拖拽排序

## 用法

```
<xdh-grid :list="chartData" direction="row" wrap="nowrap" justify="space-between" align-items="stretch"
          align-content="stretch"
   <template slot-scope="scope">
       自定义内容
    </template>
</xdh-grid>
```

## 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| list | 数据项目 | Array | - | - |
| value | 数据项目, 提供双向绑定功能，list和value只能设置一个 | Array | - | - |
| sortable | sortablejs 实例化参数选项 | Object/Boolean | - | - |
| beforeAdd | 在添加前回调，如返回false，即阻止添加 | Function | - | - |
| props | 数据项item样式属性映射对象 | - | - | {order, basis, grow, shrink, align}|
| direction |决定主轴的方向(即项目的排列方向 | String |'row', 'row-reverse', 'column', 'column-reverse'| - |
| wrap |确定容器内item是否可换行|String|'nowrap', 'wrap', 'wrap-reverse'| - |
| justify |定义item在主轴的对齐方式|String|'flex-start', 'flex-end', 'center', 'space-between', 'space-around'|-|
| align-items |定义item在交叉轴上的对其方式|String|'flex-start', 'flex-end', 'center', 'baseline', 'stretch'|-|
| align-content |定义多根轴线的对齐方式，如果items只有一根轴线，该设置将不起作用|String|'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'|-|

### sortable 对象
```
{
	group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
	sort: true,  // sorting inside list
	delay: 0, // time in milliseconds to define when the sorting should start
	disabled: false, // Disables the sortable if set to true.
	store: null,  // @see Store
	animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
	handle: ".my-handle",  // Drag handle selector within list items
	filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
	preventOnFilter: true, // Call `event.preventDefault()` when triggered `filter`
	draggable: ".item",  // Specifies which items inside the element should be draggable
	ghostClass: "sortable-ghost",  // Class name for the drop placeholder
	chosenClass: "sortable-chosen",  // Class name for the chosen item
	dragClass: "sortable-drag",  // Class name for the dragging item
	dataIdAttr: 'data-id',

	forceFallback: false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in

	fallbackClass: "sortable-fallback",  // Class name for the cloned DOM Element when using forceFallback
	fallbackOnBody: false,  // Appends the cloned DOM Element into the Document's Body
	fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.

	scroll: true, // or HTMLElement
	scrollFn: function(offsetX, offsetY, originalEvent) { ... }, // if you have custom scrollbar scrollFn may be used for autoscrolling
	scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
	scrollSpeed: 10, // px

	setData: function (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) {
		dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
	}
}

```

## 作用域插槽属性
| 参数 | 说明 | 类型 |
|----|----|----|
| index | 数据索引| Number |
| item |数据项|Object|

## 方法
无

## 事件
| 事件名称 | 说明 | 回调参数 |
|-----|-----|----|
| on-choose | Element is chosen | evt: element index within parent |
| on-start | Element dragging started | evt: element index within parent |
| on-end | Element dragging ended | evt: element index within parent |
| on-add |  Element is dropped into the list from another list | evt: element index within parent |
| on-update | Changed sorting within list | evt: element index within parent |
| on-sort | Called by any change to the list (add / update / remove) | evt: element index within parent|
| on-remove | Element is removed from the list into another list | evt: element index within parent |
| on-filter| Attempt to drag a filtered element | evt: element index within parent |
| on-move | Event when you move an item in the list or between lists | evt: element index within parent |
| on-clone| Called when creating a clone of element | evt: element index within parent |

```
{
  onChoose: function (/**Event*/evt) {
		evt.oldIndex;  // element index within parent
	},

	// Element dragging started
	onStart: function (/**Event*/evt) {
		evt.oldIndex;  // element index within parent
	},

	// Element dragging ended
	onEnd: function (/**Event*/evt) {
		var itemEl = evt.item;  // dragged HTMLElement
		evt.to;    // target list
		evt.from;  // previous list
		evt.oldIndex;  // element's old index within old parent
		evt.newIndex;  // element's new index within new parent
	},

	// Element is dropped into the list from another list
	onAdd: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Changed sorting within list
	onUpdate: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Called by any change to the list (add / update / remove)
	onSort: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Element is removed from the list into another list
	onRemove: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Attempt to drag a filtered element
	onFilter: function (/**Event*/evt) {
		var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
	},

	// Event when you move an item in the list or between lists
	onMove: function (/**Event*/evt, /**Event*/originalEvent) {
		// Example: http://jsbin.com/tuyafe/1/edit?js,output
		evt.dragged; // dragged HTMLElement
		evt.draggedRect; // TextRectangle {left, top, right и bottom}
		evt.related; // HTMLElement on which have guided
		evt.relatedRect; // TextRectangle
		originalEvent.clientY; // mouse position
		// return false; — for cancel
	},

	// Called when creating a clone of element
	onClone: function (/**Event*/evt) {
		var origEl = evt.item;
		var cloneEl = evt.clone;
	}
}
```

## 更新日志

- 2017-12-28 新建组件 (by: chenhuachun )
