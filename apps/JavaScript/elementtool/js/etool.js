var app = {};
var rem = 0.01 * 0.5 * parseInt($('html').css('font-size').slice(0, -2));

/* 拖拽
 * @method drag
 * @param {object} obj 数据对象
*/
app.drag = function (obj) {
	var startX,
		startY, // 开始触摸的坐标
		endX,  
		endY,   // 移动后的坐标
		distanceX,
		distanceY,  // 移动的距离
		top,
		left,  // 元素位置坐标
		width,
		height, // 元素的宽高
		endTop,
		endLeft; // 移动后的元素位置

	width = parseInt(obj.$dom.css('width').slice(0, -2));
	height = parseInt(obj.$dom.css('height').slice(0, -2));

	obj.$dom.on('touchstart', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}

    	startX = e.originalEvent.targetTouches[0].clientX;
		startY = e.originalEvent.targetTouches[0].clientY;
	});

	obj.$dom.on('touchmove', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}

    	endX = e.originalEvent.targetTouches[0].clientX;
		endY = e.originalEvent.targetTouches[0].clientY;

		distanceX = endX - startX;
		distanceY = endY - startY;

		// 实时更新起始点
		startX = endX;
		startY = endY;

		top = parseInt(obj.$dom.css('top').slice(0, -2));
		left = parseInt(obj.$dom.css('left').slice(0, -2));

		endTop = top + distanceY;
		endLeft = left + distanceX;

		obj.top !== undefined && (endTop < obj.top ? endTop = obj.top : endTop);
		obj.bottom !== undefined && (endTop > obj.bottom - height ? endTop = obj.bottom - height : endTop);
		obj.left !== undefined && (endLeft < obj.left ? endLeft = obj.left : endLeft);
		obj.right !== undefined && (endLeft > obj.right - width ? endLeft = obj.right - width : endLeft);

		// 移动
        obj.$dom.css('top', endTop + 'px');
        obj.$dom.css('left', endLeft + 'px');

        obj.callback !== undefined ? obj.callback() : 0;
	});
};

/* 缩放
 * @method drag
 * @param {object} obj 数据对象
*/
app.scale = function (obj) {
	var x1Start,
		x2Start,
		y1Start,
		y2Start,  // 两个触点坐标
		x1End,
		x2End,
		y1End,
		y2End,   // 两个触点移动后的坐标
		xDistanceBeforeMove,
		xDistanceAfterMove,
		yDistanceBeforeMove,
		yDistanceAfterMove,  // 两个触点移动的距离
		thirdBeforeMove,
		thirdAfterMove,  // 移动前后的对角线距离
		widthStart,
		heightStart,   // 缩放前的宽高
		widthEnd,
		heightEnd,  // 缩放后的宽高
		centerX,
		centerY,  // 中心点 
		width,
		height,
		top,
		left,   // 原始位置
		defaultScale = 1,
		scale;   // 缩放比例

	width = parseInt(obj.$dom.css('width').slice(0, -2));
	height = parseInt(obj.$dom.css('height').slice(0, -2));
	top = parseInt(obj.$dom.css('top').slice(0, -2));
	left = parseInt(obj.$dom.css('left').slice(0, -2));

	centerX = left + width / 2;
	centerY = top + height / 2;

	obj.$dom.on('touchstart', function (e) {
		if (e.originalEvent.targetTouches.length !== 2) {
			return false;
		}

    	x1Start = e.originalEvent.targetTouches[0].clientX;
		y1Start = e.originalEvent.targetTouches[0].clientY;

		if (e.originalEvent.targetTouches.length === 2) {
    		x2Start = e.originalEvent.targetTouches[1].clientX;
        	y2Start = e.originalEvent.targetTouches[1].clientY;
    	}
	});

	obj.$dom.on('touchmove', function (e) {
		if (e.originalEvent.targetTouches.length !== 2) {
			return false;
		}
    	x1End = e.originalEvent.targetTouches[0].clientX;
		y1End = e.originalEvent.targetTouches[0].clientY;

		if (e.originalEvent.targetTouches.length === 2) {
    		x2End = e.originalEvent.targetTouches[1].clientX;
			y2End = e.originalEvent.targetTouches[1].clientY;
    	}

		// 通过移动前后两点距离的大小来判断缩小还是放大
		xDistanceBeforeMove = Math.abs(Math.abs(x1Start) - Math.abs(x2Start));
		xDistanceAfterMove = Math.abs(Math.abs(x1End) - Math.abs(x2End));
		yDistanceBeforeMove = Math.abs(Math.abs(y1Start) - Math.abs(y2Start));
		yDistanceAfterMove = Math.abs(Math.abs(y1End) - Math.abs(y2End));

		x1Start = x1End;
		x2Start = x2End;
		y1Start = y1End;
		y2Start = y2End;

		thirdBeforeMove = Math.sqrt(yDistanceBeforeMove * yDistanceBeforeMove + xDistanceBeforeMove * xDistanceBeforeMove);
		thirdAfterMove = Math.sqrt(yDistanceAfterMove * yDistanceAfterMove + xDistanceAfterMove * xDistanceAfterMove);

        widthStart = parseInt(obj.$dom.css('width').slice(0, -2));
        heightStart = parseInt(obj.$dom.css('height').slice(0, -2));

		// 缩小：xDistanceBeforeMove > xDistanceAfterMove || yDistanceBeforeMove > yDistanceAfterMove
		// 放大：xDistanceBeforeMove < xDistanceAfterMove || yDistanceBeforeMove < yDistanceAfterMove
		if (xDistanceBeforeMove > xDistanceAfterMove || yDistanceBeforeMove > yDistanceAfterMove) { // 缩小
			widthEnd = widthStart - (thirdBeforeMove - thirdAfterMove) * (obj.scale ? obj.scale : defaultScale);
			obj.minWidth !== undefined && (widthEnd < obj.minWidth ? widthEnd = obj.minWidth : widthEnd);
			scale = widthEnd / widthStart;
		} else if (xDistanceBeforeMove < xDistanceAfterMove || yDistanceBeforeMove < yDistanceAfterMove) { // 放大
			widthEnd = widthStart + (thirdAfterMove - thirdBeforeMove) * (obj.scale ? obj.scale : defaultScale);
			obj.maxWidth !== undefined && (widthEnd > obj.maxWidth ? widthEnd = obj.maxWidth : widthEnd);
			scale = widthEnd / widthStart;
		}

		heightEnd = heightStart * scale;
		
		obj.$dom.css({
            'width': widthEnd + 'px',
            'height': heightEnd + 'px',
            'top': centerY - heightEnd / 2 + 'px',
            'left': centerX - widthEnd / 2 + 'px'
        });

        obj.callback !== undefined ? obj.callback() : 0;
	});
};

window.etool = app;

