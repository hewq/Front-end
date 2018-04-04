$(function(){
    $.fn.enlargeImg = function (options) {
        return this.each(function () {

            // 默认属性
            var defaultOptions = {
                width: 400,
                height: 400,
                position: 'right',
                offsetX: 20,
                offsetY: 0,
                opacity: 0.6,
                bgColor: '#fff',
                loading: "Loading..."
            };

            // 用户自定义属性
            options = $.extend(true, defaultOptions, options);

            // 获取容器，设置默认定位，设置图片与div同寛高
            var $container = $(this);
            var position = $container.css("position");
            if(position === 'static'){
                $container.css('position', 'relative');
            }
            $container.find('img').css({
                width: $container.width() + 'px',
                height: $container.height() + 'px'
            });

            // 生成镜片
            var $lens = $('<div></div>');
            $lens.css({
                position: 'absolute',
                zIndex: '990',
                opacity: defaultOptions.opacity,
                cursor: 'move',
                border: '1px solid #ccc',
                backgroundColor: defaultOptions.bgColor
            });

            /**
             * 创建大图
             * @param  {String} suffix 大图后缀
             * @param  {String} imgType    图片格式
             * @return {jQuery}            返回jQuery对象
             */
            function createBigImg(suffix, imgType){
                var imgSrc = $container.find('img').attr('src');
                suffix = suffix || '_big';

                var point = imgSrc.indexOf('.');
                imgType = imgType || imgSrc.substring(point + 1);

                var newImgSrc = imgSrc.substring(0, point) + suffix + '.' + imgType;
                var newImg = $('<img>').attr('src', newImgSrc).css('position', 'absolute');
                return newImg;
            }

            // 生成放大镜
            var $magnifier = $('<div></div>');
            var magnifierLeft, magnifierTop;
            switch (defaultOptions.position){
                case 'top':
                    magnifierLeft = 0;
                    magnifierTop = -$container.height() - defaultOptions.offsetY;
                    break;
                case 'right':
                    magnifierLeft = $container.width() + defaultOptions.offsetX;
                    magnifierTop = 0;
                    break;
                case 'bottom':
                    magnifierLeft = 0;
                    magnifierTop = $container.height + defaultOptions.offsetY;
                    break;
                case 'left':
                    magnifierLeft = -$container.width() - defaultOptions.offsetX;
                    magnifierTop = 0;
                    break;
            }
            $magnifier.css({
                left: magnifierLeft,
                top: magnifierTop,
                position: 'absolute',
                width: defaultOptions.width + 'px',
                height: defaultOptions.height + 'px',
                zIndex: '999',
                overflow: 'hidden',
                fontSize: '20px',
                textAlign: 'center',
                border: '1px solid #ccc',
                lineHeight: defaultOptions.height + 'px'
            });

            // 获取大图
            var $bigImg = createBigImg(defaultOptions.suffix, defaultOptions.imgType);
            $magnifier.append($bigImg).append(defaultOptions.loading);

            var criticalX, criticalY,
                distProportionX, distProportionY,
                flag = 0,
                finalX, finalY,
                containerOffset = $container.offset();
            // 首次触发事件
            function firstEnter() {
               $container.append($lens).append($magnifier);

               // 计算比例，镜片/原图 = 放大镜/大图
                var proportionX = $bigImg.width() / $container.width(),
                    proportionY = $bigImg.height() / $container.height();

                // 镜片宽高
                $lens.css({
                    width: $magnifier.width() / proportionX + 'px',
                    height: $magnifier.height() / proportionY + 'px'
                });

                // 计算镜片的临界值
                criticalX = $container.width() - $lens.width();
                criticalY = $container.height() - $lens.height();

                // 大图的偏移比例
                distProportionX = ( $bigImg.width() - $magnifier.width() ) / criticalX;
                distProportionY = ( $bigImg.height() - $magnifier.height() ) / criticalY;
            }

            /**
             * 镜片的移动范围
             * @param  {Number} pageD     鼠标坐标
             * @param  {Number} offsetD   容器偏移距离
             * @param  {Number} lensW     镜片div宽高
             * @param  {Number} criticalD 镜片div临界坐标
             * @return {[type]}           镜片div坐标
             */
            function calcDistance( pageD, offsetD, lensW, criticalD ){
                var finalD,
                    distance = pageD - offsetD - lensW / 2;
                if( distance > 0 && distance < criticalD ){
                    finalD = distance;
                }else if( distance < 0 ){
                    finalD = 0;
                }else {
                    finalD = criticalD;
                }

                return finalD;
            }

            // 绑定事件 mouseenter/mouseleave 和 mouseover/mouseout 的区别，mouseenter/mouseleave不会冒泡
            $container.mouseenter(function () {
                $lens.show();
                $magnifier.show();
                if( flag === 0 ){
                    firstEnter();
                    flag++;
                }
            }).mousemove(function (e) {
                // 计算镜片坐标
                finalX = calcDistance(e.pageX, containerOffset.left, $lens.width(), criticalX);
                finalY = calcDistance(e.pageY, containerOffset.top, $lens.height(), criticalY);
                $lens.css({
                    left: finalX + 'px',
                    top: finalY + 'px'
                });

                // 计算大图的偏移坐标
                $bigImg.css({
                    left: -finalX * distProportionX + 'px',
                    top: -finalY * distProportionY + 'px'
                });
            }).mouseleave(function () {
                $lens.hide();
                $magnifier.hide();
            });
        });
    };

    $('.imgContainer').enlargeImg({
        width: 400,
        height: 400,
        position: "right",
        offsetX: 20,
        offsetY: 0,
        opacity: 0.6,
        bgColor: "#fff",
        loading: "Loading..."
    });
});