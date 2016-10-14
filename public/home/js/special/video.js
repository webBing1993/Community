$(function(){ 
    //显示或隐藏文章
    $("#show").click(function(){
        $(".z_text").slideDown(600);
        $("#show").hide();
        $("#hide").show();
    });
    $("#hide").click(function(){
        $(".z_text").slideUp(600);
        $("#show").show();
        $("#hide").hide();
    });
    //点赞
    $(".click_zan").click(function(){
        var parent = $(this).parents(".col-xs-12");
        parent.find(".click_zan").hide();
        parent.find(".click_zan-1").show();
    });
    //取消点赞
    $(".click_zan-1").click(function(){
        var parent = $(this).parents(".col-xs-12");
        parent.find(".click_zan-1").hide();
        parent.find(".click_zan").show();
    });
    //收藏
    $(".click_sc").click(function(){
        $(".click_sc").hide();
        $(".click_qx").show();
    });


    //切换讨论区
    // $("#banner").find("li").on("click",function(){
    //     $(this).addClass("boxshadow").siblings().removeClass("boxshadow");
    //     $(".sho").hide().eq($(this).index()).show();
    // });

    //调用carousel方法
     carousel($("#banner"),"li");

});
    // 跑马灯 banner切换
function carousel(banenr,li){
    //console.log(this);
    var myTouch = util.toucher(document.getElementById("banner_box"));
    var arr = [];
    var ul = $(banenr);
    var li = ul.find(li);
    // 复制第一份和最后一份
    var firstLi = li.first(),
        lastLi = li.last(),
        l_w = li.width(),
        l_h = li.height(),
        liItems = li.slice(1),
        liSize = liItems.size()/2,
        rightSlice = liItems.slice(0,liSize),
        level = Math.floor(li.size()/2);
        leftSlice = liItems.slice(liSize),
        gap = ((ul.width() - l_w)/2)/level,
        firstLeft =  (ul.width() - l_w)/2;//水平居中
        fixOffsetleft = firstLeft+l_w,
        scale = 0.8,
        flag = true;
        //console.log("右边个数："+level+" ==== 左边个数："+leftSlice.size()+" ===== 每个元素间距："+gap);
        //console.log("li宽度："+l_w+" ==== ul宽度："+ul.width()+" ==== 左边距："+fixOffsetleft+" ===== 第一个左边距："+firstLeft);
    // 设置第一帧的  宽高
    firstLi.css({
        width : l_w,
        height : l_h,
        zIndex : Math.floor(li.size()/2),
        left : firstLeft,
        top : (ul.height() - l_h)/3,  //竖直居中
    });
    firstLi.addClass("sel");
    rightSlice.each(function(i){
        level --;
        l_w = l_w * scale;
        l_h = l_h * scale;
        var j = i;
        $(this).css({
            width : l_w,
            height : l_h,
            zIndex : level,
            // opacity : 1/(i+2),
            left : fixOffsetleft+(++j)*gap -l_w,
            top : (ul.height() - l_h) /2.1
        });
        //console.log($(this)[0].style.left);
    });
    var lw = rightSlice.last().width(),
        lh = rightSlice.last().height(),
        oloop = Math.floor(li.size()/2);
    leftSlice.each(function(i){
        var j = i;
        $(this).css({
            width : lw,
            height :lh,
            zIndex : j,
            // opacity : 1/(oloop+1),
            left : i*gap,
            top : (ul.height() - lh) /2.1
        });
        lw = lw/scale;
        lh = lh/scale;
        oloop--;
    });
    // 操作
    var zIndexArr = [];
    var leftFn = function(){
        event.preventDefault();
        change_banner(1);
        li.each(function(){
            var self = $(this),
                prev = self.prev().get(0) ? self.prev() : lastLi,
                width = prev.width(),
                height = prev.height(),
                zIndex = prev.css("zIndex"),
                //opacity = prev.css("opacity"),
                left = prev.css("left"),
                top = prev.css("top");
            zIndexArr.push(zIndex);
            self.stop(true,true).animate({
                width :  width,
                height : height,
                zIndex : zIndex,
               // opacity : opacity,
                left : left,
                top : top
            },function(){
            });
            if(zIndex == 1){
                self.addClass("sel").siblings().removeClass("sel");
                bannertd = $(this).attr("banner");
                //console.log(bannertd);
            }
        });
        li.each(function(i){
            $(this).css("zIndex",zIndexArr[i]);
        });
    }
    var rightFn = function(){
        event.preventDefault();
        change_banner(1);
        li.each(function(){
            var self = $(this),
                prev = self.prev().get(0) ? self.prev() : lastLi,
                width = prev.width(),
                height = prev.height(),
                zIndex = prev.css("zIndex"),
                //opacity = next.css("opacity"),
                left = prev.css("left"),
                top = prev.css("top");
            zIndexArr.push(zIndex);
            self.stop(true,true).animate({
                width :  width,
                height : height,
                zIndex : zIndex,
                //opacity : opacity,
                left : left,
                top : top
            },function(){
            });
            if(zIndex == 1){
                self.addClass("sel").siblings().removeClass("sel");
                self.addClass("sel").siblings().removeClass("sel");
                bannertd = $(this).attr("banner");
                // console.log(bannertd);
            }
        });
        li.each(function(i){
            $(this).css("zIndex",zIndexArr[i]);
        });
    }
    myTouch.on("swipeLeft",leftFn);
    myTouch.on("swipeRight",rightFn);
    // $("#banner_box").find(".poster-prev-btn").on("click",function(){
    //     leftFn();
    //     $(".poster-btn").hide();
    //     $(".poster-btn").fadeIn(3000);
    // });
    // $("#banner_box").find(".poster-next-btn").on("click",function(){
    //     leftFn();
    //     $(".poster-btn").hide();
    //     $(".poster-btn").fadeIn(3000);
    // });

    //$("#banner_box").find(".poster-next-btn").on("click",rightFn);
}
function pullUp(number,obj){
    var all_len = $(".d_p_body").eq(number).find(obj).find(".d_list").length;
    if(all_len < 10){
        $("#pullUp").hide();
    } else {
        $("#pullUp").show();
    }
}
function change_banner(num){
    $("#banner").find("li").each(function(){
        var li_opacity = $(this).css("z-index");
        var last_index = $("#banner").find("li:last-child").index();
        if(li_opacity == 1){
            //获取当前banner最上层的LI标签的banner值；根据最有滑进行动态加减
            var li_index = $(this).index();
            var new_li_index = li_index*1+num*1;
            $("#p_banner").find(".style").each(function(){
                var d_p_index = $(this).index();
                var comment = $(this);

                if(d_p_index == new_li_index){
                    $(this).show()
                    $(this).siblings().hide();
                    pullUp(d_p_index,".style");
                }else if(new_li_index>last_index){
                    if(d_p_index == 0){
                        $(this).show();
                        $("#p_banner").css("left",0);
                        pullUp(d_p_index,".style");
                    }else{
                        $(this).hide();
                    }
                }else if(new_li_index<0){
                    if(d_p_index == last_index){
                        $(this).show();
                        $("#p_banner").css("left",0);
                        pullUp(d_p_index,".style");
                    }else{
                        $(this).hide();
                    }
                }
            });
        }
    });
}