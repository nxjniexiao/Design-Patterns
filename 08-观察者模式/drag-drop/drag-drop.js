var DragDrop = (function() {
  var draggingDom = null;
  var diffX = 0;
  var diffY = 0;
  var dragdrop = new EventTarget();
  // 事件处理程序
  function handleDrag(event) {
    var target = event.target;
    var className = target.className;
    var type = event.type;
    switch (type) {
      case 'mousedown':
        if (className.indexOf('draggable') > -1) {
          draggingDom = target;
          diffX = target.offsetLeft - event.clientX;
          diffY = target.offsetTop - event.clientY;
          // 触发自定义事件 drag-start
          dragdrop.fire({
            type: 'drag-start',
            target: draggingDom,
            x: event.clientX,
            y: event.clientY
          });
        }
        break;
      case 'mousemove':
        if (draggingDom) {
          draggingDom.style.left = event.clientX + diffX + 'px';
          draggingDom.style.top = event.clientY + diffY + 'px';
          // 触发自定义事件 draging
          dragdrop.fire({
            type: 'draging',
            target: draggingDom,
            x: event.clientX,
            y: event.clientY
          });
        }
        break;
      case 'mouseup':
        // 触发自定义事件 drag-end
        dragdrop.fire({
          type: 'drag-end',
          target: draggingDom,
          x: event.clientX,
          y: event.clientY
        });
        draggingDom = null;
    }
  }
  // 公共接口
  dragdrop.enable = function() {
    document.addEventListener('mousedown', handleDrag);
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDrag);
  };
  dragdrop.disable = function() {
    document.removeEventListener('mousedown', handleDrag);
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDrag);
  };
  return dragdrop;
})();
