/**
 * Created by Administrator on 2016/5/5.
 */
$(function(){
    //公用js
    var t_h = $('.top').height()-10;
    $('body').css('padding-top',t_h);
    //设置菜单默认选中样式
    var page_id = $('.pageBody').attr('pageId');
    //alert(page_id);
    $('.list').find('span').eq(page_id).css({'color':'#fff','font-size':'16px'}).siblings().css({'color':'rgba(255,255,255,0.6)','font-size':'14px'});
    var contentLen = $(".shadow_box").find(".content").length;
    if(contentLen < 2) {
        $(".change").hide();
    }
    loadmore();
    listIndex();
    change();

});
function loadmore(){
    var content=$(".content")
}
function listIndex(){
    var bac_img = $('.current_special').find('.bac_img');
    var content = $('.shadow_box').find('.content');
    var len = bac_img.length;
    var zIndex = len;
    var zIndex2 = len;
    bac_img.each(function(){
        $(this).css('z-index',zIndex);
        zIndex--;
    });
    content.each(function(){
        $(this).css('z-index',zIndex2);
        zIndex2--;
    });
}

function change(){
    $('.change').on('click',function(){
        var content = $('.shadow_box').find('.content');
        var bac_img = $('.current_special').find('.bac_img');
        var len = content.length;
        if(len > 1) {
            content.each(function(){
                var tIndex = $(this).css('z-index');
                if(tIndex == len){
                    var tCon = $(this);
                    var back = setTimeout(function(){
                        tCon.insertAfter(content.eq(len-1));
                        tCon.removeClass('niceIn');
                        tCon.animate({"left":0},0);
                        listIndex();
                    },1200);
                    tCon.addClass('niceIn');
                    tCon.animate({"left":-win_w},1000);
                    back;
                }
            });
            bac_img.each(function(){
                var tIndex = $(this).css('z-index');
                if(tIndex == len){
                    var tImg = $(this);
                    var back = setTimeout(function(){
                        tImg.insertAfter(bac_img.eq(len-1));
                        tImg.fadeIn(0);
                        listIndex();
                    },1010);
                    tImg.fadeOut(1000);
                }
            });
            listIndex();
        }
    });
}