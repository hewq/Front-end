var app = {};
var rem = 0.01 * 0.5 * parseInt($('html').css('font-size').slice(0, -2));

/* 拖拽
 * @method drag
 * @param {object} $dom 需要移动的 dom 节点
 * @param {number} _top 可移动范围的顶端临界点
 * @param {number} _right 可移动范围的右端临界点
 * @param {number} _bottom 可移动范围的下端临界点
 * @param {number} _left 可移动范围的左端临界点
*/
app.drag = function ($dom, _top, _right, _bottom, _left) {
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

	width = parseInt($dom.css('width').slice(0, -2));
	height = parseInt($dom.css('height').slice(0, -2));

	$dom.on('touchstart', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}

    	startX = e.originalEvent.targetTouches[0].clientX;
		startY = e.originalEvent.targetTouches[0].clientY;
	});

	$dom.on('touchmove', function (e) {
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

		top = parseInt($dom.css('top').slice(0, -2));
		left = parseInt($dom.css('left').slice(0, -2));

		endTop = top + distanceY;
		endLeft = left + distanceX;

		_top !== undefined && (endTop < _top ? endTop = _top : endTop);
		_bottom !== undefined && (endTop > _bottom - height ? endTop = _bottom - height : endTop);
		_left !== undefined && (endLeft < _left ? endLeft = _left : endLeft);
		_right !== undefined && (endLeft > _right - width ? endLeft = _right - width : endLeft);

		// 移动
        $dom.css('top', endTop + 'px');
        $dom.css('left', endLeft + 'px');
	});
};

/* 缩放
 * @method drag
 * @param {object} $dom 需要缩放的 dom 节点
 * @param {number} _minWidth 可缩小的最小宽度
 * @param {number} _maxWidth 可放大的最大宽度
 * @param {number} _scale 手指每缩放 1px 实际元素的缩放大小
*/
app.scale = function ($dom, ,_scale, _minWidth, _maxWidth) {
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

	width = parseInt($dom.css('width').slice(0, -2));
	height = parseInt($dom.css('height').slice(0, -2));
	top = parseInt($dom.css('top').slice(0, -2));
	left = parseInt($dom.css('left').slice(0, -2));

	centerX = left + width / 2;
	centerY = top + height / 2;

	$dom.on('touchstart', function (e) {
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

	$dom.on('touchmove', function (e) {
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

        widthStart = parseInt($dom.css('width').slice(0, -2));
        heightStart = parseInt($dom.css('height').slice(0, -2));

		// 缩小：xDistanceBeforeMove > xDistanceAfterMove || yDistanceBeforeMove > yDistanceAfterMove
		// 放大：xDistanceBeforeMove < xDistanceAfterMove || yDistanceBeforeMove < yDistanceAfterMove
		if (xDistanceBeforeMove > xDistanceAfterMove || yDistanceBeforeMove > yDistanceAfterMove) { // 缩小
			widthEnd = widthStart - (thirdBeforeMove - thirdAfterMove) * (_scale ? _scale : defaultScale);
			_minWidth !== undefined && (widthEnd < _minWidth ? widthEnd = _minWidth : widthEnd);
			scale = widthEnd / widthStart;
		} else if (xDistanceBeforeMove < xDistanceAfterMove || yDistanceBeforeMove < yDistanceAfterMove) { // 放大
			widthEnd = widthStart + (thirdAfterMove - thirdBeforeMove) * (_scale ? _scale : defaultScale);
			_maxWidth !== undefined && (widthEnd > _maxWidth ? widthEnd = _maxWidth : widthEnd);
			scale = widthEnd / widthStart;
		}

		heightEnd = heightStart * scale;
		
		$dom.css({
            'width': widthEnd + 'px',
            'height': heightEnd + 'px',
            'top': centerY - heightEnd / 2 + 'px',
            'left': centerX - widthEnd / 2 + 'px'
        });
	});
};

window.etool = app;

