var app = {};

var slideDistance = 80; // 滑动监听距离

// 起始位置
app.START_TOP = 0;
app.START_LEFT = 0;

// 起始大小
app.START_WIDTH = 0;
app.START_HEIGHT = 0;

// 移动到指定位置
app.moveTo = function ($dom, top, left) {
	$dom.css({
		top: top + 'px',
		left: left + 'px'
	})
};

// 缩放到指定大小
app.scaleTo = function ($dom, width, height) {
	$dom.css({
		width: top + 'px',
		height: left + 'px'
	})
};

/* 拖拽
 * @method drag
 * @param {object} obj 数据对象
*/
app.drag = function (obj) {
	var startX,
		startY, // 开始触摸的坐标
		endX,  
		endY,   // 移动后的坐标
		top,
		left,  // 元素位置坐标
		width,
		height, // 元素的宽高
		touchToTop,
		touchToLeft, 
		endTop,
		endLeft; // 移动后的元素位置

	width = parseInt(obj.$dom.css('width').slice(0, -2));
	height = parseInt(obj.$dom.css('height').slice(0, -2));

	obj.$dom.on('touchstart', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}

		app.START_TOP = parseInt(obj.$dom.css('top').slice(0, -2))
		app.START_LEFT = parseInt(obj.$dom.css('left').slice(0, -2))

    	startX = e.originalEvent.targetTouches[0].clientX;
		startY = e.originalEvent.targetTouches[0].clientY;

		touchToTop = startY - app.START_TOP;
		touchToLeft = startX - app.START_LEFT;

        obj.startCallback !== undefined ? obj.startCallback() : 0;
	});

	obj.$dom.on('touchmove', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}

    	endX = e.originalEvent.targetTouches[0].clientX;
		endY = e.originalEvent.targetTouches[0].clientY;

		endTop = endY - touchToTop;
		endLeft = endX - touchToLeft;

		obj.topLimitTo !== undefined && (endTop < obj.topLimitTo ? endTop = obj.topLimitTo : endTop);
		obj.bottomLimitTo !== undefined && (endTop > obj.bottomLimitTo - height ? endTop = obj.bottomLimitTo - height : endTop);
		obj.leftLimitTo !== undefined && (endLeft < obj.leftLimitTo ? endLeft = obj.leftLimitTo : endLeft);
		obj.rightLimitTo !== undefined && (endLeft > obj.rightLimitTo - width ? endLeft = obj.rightLimitTo - width : endLeft);

		// 移动
        obj.$dom.css('top', endTop + 'px');
        obj.$dom.css('left', endLeft + 'px');

        obj.moveCallback !== undefined ? obj.moveCallback() : 0;
	});

	obj.$dom.on('touchend', function (e) {
        obj.endCallback !== undefined ? obj.endCallback() : 0;
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

	START_WIDTH = width = parseInt(obj.$dom.css('width').slice(0, -2));
	START_HEIGHT = height = parseInt(obj.$dom.css('height').slice(0, -2));
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

        obj.startCallback !== undefined ? obj.startCallback() : 0;
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
			widthEnd = widthStart - (thirdBeforeMove - thirdAfterMove) * (obj.scaleTimes ? obj.scaleTimes : defaultScale);
			obj.minWidth !== undefined && (widthEnd < obj.minWidth ? widthEnd = obj.minWidth : widthEnd);
			scale = widthEnd / widthStart;
		} else if (xDistanceBeforeMove < xDistanceAfterMove || yDistanceBeforeMove < yDistanceAfterMove) { // 放大
			widthEnd = widthStart + (thirdAfterMove - thirdBeforeMove) * (obj.scaleTimes ? obj.scaleTimes : defaultScale);
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

        obj.moveCallback !== undefined ? obj.moveCallback() : 0;
	});

	obj.$dom.on('touchend', function (e) {
		obj.endCallback !== undefined ? obj.endCallback() : 0;
	});
};

// 滑动监听

/* 左滑
 * @method leftSlideHandler
 * @param {object} obj 数据对象
*/
app.leftSlideHandler = function (obj) {
	var startX,
		startY, // 开始触摸的坐标
		endX,  
		endY,   // 移动后的坐标
		endTop,
		endLeft, // 移动后的元素位置
		isLeftSlide; // 是否左滑

	obj.$dom.on('touchstart', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}
    	startX = e.originalEvent.targetTouches[0].clientX;
		startY = e.originalEvent.targetTouches[0].clientY;

		isLeftSlide = false;
	});

	obj.$dom.on('touchmove', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}

    	endX = e.originalEvent.targetTouches[0].clientX;
		endY = e.originalEvent.targetTouches[0].clientY;

		endTop = endY - startY;
		endLeft = endX - startX;

		// 判定
		if (endX < startX && -endLeft > slideDistance && Math.abs(endLeft) > Math.abs(endTop) && !isLeftSlide) {
			isLeftSlide = true;
		}
	});

	obj.$dom.on('touchend', function (e) {
		if (isLeftSlide) {
        	obj.success !== undefined ? obj.success() : 0;
		} else {
			obj.fail !== undefined ? obj.fail() : 0;
		}
	});
};

/* 右滑
 * @method rightSlideHandler
 * @param {object} obj 数据对象
*/
app.rightSlideHandler = function (obj) {
	var startX,
		startY, // 开始触摸的坐标
		endX,  
		endY,   // 移动后的坐标
		endTop,
		endLeft, // 移动后的元素位置
		isRightSlide; // 是否右滑


	obj.$dom.on('touchstart', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}
    	startX = e.originalEvent.targetTouches[0].clientX;
		startY = e.originalEvent.targetTouches[0].clientY;

		isRightSlide = false;
	});

	obj.$dom.on('touchmove', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}

    	endX = e.originalEvent.targetTouches[0].clientX;
		endY = e.originalEvent.targetTouches[0].clientY;

		endTop = endY - startY;
		endLeft = endX - startX;

		// 判定
		if (endX > startX && endLeft > slideDistance && Math.abs(endLeft) > Math.abs(endTop) && !isRightSlide) {
			isRightSlide = true;
		}
	});

	obj.$dom.on('touchend', function (e) {
		if (isRightSlide) {
			obj.success !== undefined ? obj.success() : 0;
		} else {
			obj.fail !== undefined ? obj.fail() : 0;
		}
	});
};

/* 上滑
 * @method upSlideHandler
 * @param {object} obj 数据对象
*/
app.upSlideHandler = function (obj) {
	var startX,
		startY, // 开始触摸的坐标
		endX,  
		endY,   // 移动后的坐标
		endTop,
		endLeft, // 移动后的元素位置
		isUpSlide; // 是否上滑

	obj.$dom.on('touchstart', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}
    	startX = e.originalEvent.targetTouches[0].clientX;
		startY = e.originalEvent.targetTouches[0].clientY;

		isUpSlide = false;
	});

	obj.$dom.on('touchmove', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}

    	endX = e.originalEvent.targetTouches[0].clientX;
		endY = e.originalEvent.targetTouches[0].clientY;

		endTop = endY - startY;
		endLeft = endX - startX;

		// 判定
		if (endY < startY && -endTop > slideDistance && Math.abs(endLeft) < Math.abs(endTop) && !isUpSlide) {
			isUpSlide = true;
		}
	});

	obj.$dom.on('touchend', function (e) {
		if (isUpSlide) {
			obj.success !== undefined ? obj.success() : 0;
		} else {
			obj.fail !== undefined ? obj.fail() : 0;
		}
	});
};

/* 下滑
 * @method downSlideHandler
 * @param {object} obj 数据对象
*/
app.downSlideHandler = function (obj) {
	var startX,
		startY, // 开始触摸的坐标
		endX,  
		endY,   // 移动后的坐标
		endTop,
		endLeft, // 移动后的元素位置
		isDownSlide; // 是否下滑


	obj.$dom.on('touchstart', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}
    	startX = e.originalEvent.targetTouches[0].clientX;
		startY = e.originalEvent.targetTouches[0].clientY;

		isDownSlide = false;
	});

	obj.$dom.on('touchmove', function (e) {
		if (e.originalEvent.targetTouches.length !== 1) {
			return false;
		}

    	endX = e.originalEvent.targetTouches[0].clientX;
		endY = e.originalEvent.targetTouches[0].clientY;

		endTop = endY - startY;
		endLeft = endX - startX;

		// 判定
		if (endY > startY && endTop > slideDistance && Math.abs(endLeft) < Math.abs(endTop) && !isDownSlide) {
			isDownSlide = true;
		}
	});

	obj.$dom.on('touchend', function (e) {
		if (isDownSlide) {
			obj.success !== undefined ? obj.success() : 0;
		} else {
			obj.fail !== undefined ? obj.fail() : 0;
		}
	});
};

window.etool = app;

