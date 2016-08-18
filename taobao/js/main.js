$(function(){
// 一.top-nav(顶部导航条)
  var top_nav = function(){
// 1.鼠标悬停至带有下拉面板的元素时,显示下拉面板
    var $J_menu = $(".top-nav li.J-menu");//获取带有下拉面板的元素
    $J_menu.hover(function() {
      $(this).find(".down-panel").show();//鼠标移入时获取下拉面板并且显示
    }, function() {
      $(this).find(".down-panel").hide();//鼠标移出时获取下拉面板并且隐藏
    });
// 2.鼠标悬停下拉面板时,父级元素的背景设为白色
    var $down_panel = $(".top-nav .down-panel");//获取下拉面板元素
    $down_panel.hover(function() {
      $(this).parents(".J-menu").css({"background":"#FFF","height":"36px"});//原高度35px,悬停状态设置36px是为了覆盖祖先元素设置的下边框
    }, function() {
      $(this).parents(".J-menu").css("background","#F5F5F5");
    });
  }
  top_nav();
// 二.header(头部导航)
  var header = function(){
//鼠标悬停至一级导航列表时,显示他的二级导航面板
    var $first_nav = $(".header .first-nav");
    $first_nav.hover(function() {
      $(this).find(".second-nav").slideDown(200);
    }, function() {
      $(this).find(".second-nav").slideUp(200);
    });
//鼠标悬停在二级导航列表项时,改变背景颜色
    var $second_nav_li = $(".header .second-nav li");//获取二级导航的列表项
    $second_nav_li.hover(function() {
      $(this).css("background","#00CCCE");
    }, function() {
      $(this).css("background","#FFF");
    });
  }
  header();

// 三.banner(幻灯片)
  var banner = function(){
//1-1.需要用到的元素
    var page = 0;//当前的播放位置
    var $banner_bg = $(".banner .banner-bg li");
    var $slide = $(".banner .slide");
    var $slide_img = $(".banner .slide-img");//图片列表容器
    var $slide_img_pic = $slide_img.find("li");//图片列表
    var $slide_pic_len = $slide_img_pic.length;//滑动图片的数量
    var $slide_width = $slide_img.width();//幻灯片总长度
    var $img_width = $slide_width/$slide_pic_len;//单个图片长度;
    var $slide_btn = $(".banner .slide-btn i");//幻灯片控制按钮
    var $tab_nav = $(".banner .tab-nav li");//幻灯片导航
    var timer;//此空变量用来存放鼠标移入时执行的延时函数,鼠标移除时可以清除该函数
    var $slide_toggle = function(i){//i:当前播放的位置 w:单个图片长度,调用时传入上面定义的$img_width
        $slide_img_pic.stop(true, true).fadeOut(200)//渐隐所有的图片
                      .eq(i).fadeIn(800);//渐显需要显示的图片
        $tab_nav.removeClass("current").eq(i).addClass("current");//清除所有幻灯片导航的current类,并给当前播放图片对应的导航添加current
        $banner_bg.stop(true, true).fadeOut(100)
                      .eq(i).fadeIn(1500);
    };
    $slide_toggle(0);
//1-2.幻灯片导航切换效果
    $tab_nav.click(function() {
    var i = $(this).index();//获取点击元素的位置
      if(page != i){//当前已经是图片对应导航时点击无效,如当前播放的是第一张,当点击导航第一个小按钮时候让他不产生效果
        page = $(this).index();
        $slide_toggle(page);
      };
    }).mouseenter(function() {
      var i = $(this).index();
      if(page != i){//当前已经是图片对应导航时悬停无效
      page = $(this).index();
      timer = setTimeout(function(){
        $slide_toggle(page);
      },500);}  
    }).mouseleave(function() {
      clearTimeout(timer);//鼠标移除时取消定时器切换
    });
//1-3.幻灯片控制按钮
    $play_next = function(){//下一张的执行条件
      if(!$slide_img_pic.is(":animated")){
        page = page < ($slide_pic_len - 1) ? ++page : 0;//当前页是最后一张时跳转到第一张,否则就显示后面一张
        $slide_toggle(page);
      }
    }
    $slide_btn.eq(0).click(function() {//上一页按钮点击时
      if(!$slide_img_pic.is(":animated")){
        page = page <= 0 ? ($slide_pic_len - 1) : --page;//当前页是第一张时跳转到最后一张,否则就显示前面一张
        $slide_toggle(page);
      }
    }).end().eq(1).click($play_next);

//1-4.幻灯片自动播放,鼠标悬停时停止播放
    var auto_play = function(){timer=setInterval($play_next,3000)};//自定一个自动播放函数,让他循环播放,并且当页面是最后一张时,跳转到第一张
    auto_play();//调用自动播放

    $slide.mouseenter(function(){
      $slide_btn.show();
      clearTimeout(timer);
      }).mouseleave(function(){
      $slide_btn.hide();
        auto_play();
      });//鼠标悬停时,暂停自动播放,移出时取消定时器自动播放
  }
  banner();

// 四.hot-block(热点推荐板块)
  var hot_block = function(){
//1.鼠标悬停项目窗口时,完整显示项目信息
    var $hot_item = $(".hot-block .hot-list li");
    $hot_item.mouseenter(function() {
      $(this).find(".item-other").animate({"height":"55px"},200);
    }).mouseleave(function() {
      $(this).find(".item-other").animate({"height":"0"},200);
    });
  }

  hot_block();

// 五.module(所有项目组件)函数
  var module = function (){
//1.鼠标悬停"更多项目"按钮时,改变背景颜色
    var $more_class = $(".module .item-class");
    $more_class.mouseenter(function() {
      $(this).find(".more-con").css("background","#32DCDE");
    }).mouseleave(function(){
      $(this).find(".more-con").css("background","#00CCCE");
    });
// 2.项目焦点图文字信息的上滑效果
    var $item_list_focus = $(".module .item-focus");//获取焦点图窗口
    $item_list_focus.mouseenter(function() {
      $(this).find(".item-info").css("height","90px");//鼠标悬停焦点图窗口时,焦点图的项目说明更改为90px
    }).mouseleave(function() {
      $(this).find(".item-info").css("height","36px");//鼠标悬停焦点图窗口时,焦点图的项目说明更改为30px
    });;
// 3.鼠标移动到项目窗口上时候,项目图片降低图片透明度
    var $item_list = $(".module li:not('.item-focus')");//获取非焦点图的项目窗口
     $item_list.mouseenter(function() {
       $(this).find('img').fadeTo(200,0.9);//保留90%不透明度
     }).mouseleave(function(){
       $(this).find('img').fadeTo(200,1);//设置不透明度为100%
     });   
  }
  module();
//六.new-block(最新上线)
  var new_block = function(){
//1.点击左边按钮往前滚动,点击向右边按钮时,往后滚动
    var page = 1;
    var i = 4;
    $(".new-block .slide-con .left").click(function() {
      var $parent = $(this).parents(".module"); //获取共同的祖先元素
      var $v_content = $parent.find(".item-list-wrap");
      var $v_slide = $parent.find(".item-list"); //要滑动的元素
      var $len = $v_slide.find("li").length; //滑动元素的子元素总数
      var $v_width = $v_content.width(); //滑动元素的宽度
      var $page_count = Math.ceil($len/i); //滑动页面总数(子元素总数除以每版面的要放多少子元素并往大取整数获得)
      if(!$v_slide.is(":animated")){
        if(page == 1){
          $v_slide.animate({"left": "-" + $v_width*($page_count-1) + "px"}, 300)
          page = $page_count;
        }else{
          $v_slide.animate({"left": "+=" + $v_width}, 300)
          page--;
        };
      }
    });

    $(".new-block .slide-con .right").click(function() {
      var $parent = $(this).parents(".module"); //获取共同的祖先元素
      var $v_content = $parent.find(".item-list-wrap");
      var $v_slide = $parent.find(".item-list"); //要滑动的元素
      var $len = $v_slide.find("li").length; //滑动元素的子元素总数
      var $v_width = $v_content.width(); //滑动元素的宽度
      var $page_count = Math.ceil($len/i); //滑动页面总数(子元素总数除以每版面的要放多少子元素并往大取整数获得)
      if(!$v_slide.is(":animated")){
        if(page == $page_count){
          $v_slide.animate({"left": "0"}, 300)
          page = 1;
        }else{
          $v_slide.animate({"left": "-=" + $v_width}, 300)
          page++;
        };
      }
    });
  }
  new_block();
// 七.weekly-top(每周排行)
  $weekly_top = function(){
// 1.鼠标悬停列表项时,该项添加.current-top类
    var $left_panel = $(".weekly-top .left-panel");
    var $top_li = $left_panel.find("li"); //获取左边面板所有排名列表项
    $top_li.mouseenter(function() {
      var $item_detail_box = $(this).parents(".ranking-panel").find(".right-panel a"); //获取右边面板所有详细信息盒子,共5个,与列表项对应
      $top_li.removeClass("current-top");/*1.鼠标悬停时清除所有li元素的.current-top类*/
      $(this).addClass("current-top")/*2.当前悬停的li元素添加上.current-top类*/
             .append("<i class='iconfont'>&#x344b;</i>");/*3.添加i.iconfont（li元素右边的三角形）*/
      $item_detail_box.hide().eq($(this).index()).show();/*4.鼠标悬停左边列表项时,隐藏右边面板所有详细信息盒子,然后当前悬停第几个列表项,就显示右边第几个详细信息盒子*/
    }).mouseleave(function() {
      $top_li.find(".iconfont").remove();/*鼠标移出时,移除左边列表项最右边的三角形图标*/
    });
    $left_panel.mouseleave(function() {
      $(this).find("li.current-top").append("<i class='iconfont'>&#x344b;</i>");
    });

  }
  $weekly_top();

// 八.successful-case(成功案例)
  $successful_case = function(){
    // 1.鼠标悬停项目窗口时,.case-desc(项目简介)面板向上滑动
    var $case_li = $(".successful-case .item-list li");
    $case_li.mouseenter(function() {
      $(this).find("span.case-desc").animate({"height": "90px"}, 300)
    }).mouseleave(function() {
      $(this).find("span.case-desc").animate({"height": "0"}, 300)
    });
  }

  $successful_case();



















});