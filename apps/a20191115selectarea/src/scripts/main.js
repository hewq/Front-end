;(function() {
    var wAlert = window.alert;
    window.alert = function (message) {
        try {
            var iframe = document.createElement("IFRAME");
            iframe.style.display = "none";
            iframe.setAttribute("src", 'data:text/plain,');
            document.documentElement.appendChild(iframe);
            var alertFrame = window.frames[0];
            var iwindow = alertFrame.window;
            if (iwindow == undefined) {
                iwindow = alertFrame.contentWindow;
            }
            iwindow.alert(message);
            iframe.parentNode.removeChild(iframe);
        }
        catch (exc) {
            return wAlert(message);
        }
    }

    // 解决页面双击上移问题
    var agent = navigator.userAgent.toLowerCase();        //检测是否是ios
    var iLastTouch = null;                                //缓存上一次tap的时间
    if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0)
    {
        document.body.addEventListener('touchend', function(event)
        {
            var iNow = new Date()
                .getTime();
            iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
            var delta = iNow - iLastTouch;
            if (delta < 500 && delta > 0)
            {
                event.preventDefault();
                return false;
            }
            iLastTouch = iNow;
        }, false);
    }

    let privinceCode, cityCode, areaCode;
    let $selected = $('.selected'),
        $pageSelect = $('.page-select'),
        $sltedCur = $('.slted-cur'),
        $sltedPrivince = $('.slted-privince'),
        $sltedCity = $('.slted-city'),
        $sltedArea = $('.slted-area'),
        $unitSelect = $('.unit-select');
    let rem = 0.01 * 0.5 * parseInt($('html').css('font-size').slice(0, -2));

    let app = {};

    app.getArea = function () {
        $.ajax({
            url: './data/provinces.json',
            type: 'get',
            success: function (data) {
                window.privinces = data;
                let node1 = '<li data-code="'
                let node2 = '" class="unit-item privince-item"></li>';
                let node = '';
                for (let i = 0; i < privinces.length; i++) {
                    node = node1 + privinces[i].code + node2;
                    $(node).html(privinces[i].name).appendTo($('.list-privince'));
                }

                $('.privince-item').on("click",function(e){
                    e.stopPropagation();
                    privinceCode = $(this).get(0).dataset.code;
                    $sltedCity.html('请选择');
                    $sltedArea.html('请选择');
                    let node1 = '<li data-code="'
                    let node2 = '" class="unit-item city-item"></li>';
                    let node = '';
                    for (let i = 0; i < cities.length; i++) {
                        if (cities[i].provinceCode === privinceCode) {
                            node = node1 + cities[i].code + node2;
                            $(node).html(cities[i].name).appendTo($('.list-city'));
                        }
                    }
                    app.slideToCity();
                    $sltedPrivince.html($(this).html());
                    $sltedCity.on('click', function () {
                        app.slideToCity();
                    });
                }); 

            },
            error: function (error) {
                console.log(error);
            }
        });
        $.ajax({
            url: './data/cities.json',
            type: 'get',
            success: function (data) {
                window.cities = data;
            },
            error: function (error) {
                console.log(error);
            }
        });
        $.ajax({
            url: './data/areas.json',
            type: 'get',
            success: function (data) {
                window.areas = data;
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    app.slideToPrivince = () => {
        $sltedCur.animate({
            left: 60 * rem + 'px'
        }, 500);
        $unitSelect.animate({
            left: 0
        }, 500);
    }

    app.slideToCity = () => {
        $('.city-item').on("click",function(e){
            e.stopPropagation();
            cityCode = $(this).get(0).dataset.code;
            $sltedArea.html('请选择');
            let node1 = '<li data-code="'
            let node2 = '" class="unit-item area-item"></li>';
            let node = '';
            for (let i = 0; i < areas.length; i++) {
                if (areas[i].cityCode === cityCode) {
                    node = node1 + areas[i].code + node2;
                    $(node).html(areas[i].name).appendTo($('.list-area'));
                }
            }
            app.slideToArea();
            $sltedCity.html($(this).html());
            $sltedArea.on('click', function (e) {
            e.stopPropagation();
                app.slideToArea();
            });
        }); 
        $sltedCur.animate({
            left: 220 * rem + 'px'
        }, 500);
        $unitSelect.animate({
            left: -750 * rem + 'px'
        }, 500);
    }

    app.slideToArea = () => {
        $('.area-item').on("click",function(e){
            e.stopPropagation();
            $sltedArea.html($(this).html());
            hideSelect();
        }); 
        $sltedCur.animate({
            left: 385 * rem + 'px'
        }, 500);
        $unitSelect.animate({
            left: -750 * 2 * rem + 'px'
        }, 500);
    }

    app.main = function () {
        app.getArea();
    };

    app.main();

    $('.ipt-unit').on('click', function () {
        $pageSelect.fadeIn(300);
        $selected.animate({
            bottom: 900 * rem + 'px'
        }, 500);
        $unitSelect.animate({
            bottom: 0
        }, 500);
    });

    $sltedPrivince.on('click', function (e) {
        e.stopPropagation();
        app.slideToPrivince();
    });

    

    function hideSelect() {
        $pageSelect.fadeOut(300);
        $selected.animate({
            bottom: -100 * rem + 'px'
        }, 500);
        $unitSelect.animate({
            bottom: -900 * rem + 'px'
        }, 500);
    }

    $pageSelect.on('click', function () {
        hideSelect();
    });
})();
