$(function(){

 //定义一个幻灯片播放函数,调用时填写的四个参数分别代表要执行幻灯片播放的元素,播放方式,图片显示数量和自动播放速度
 //播放方式有两个参数 slide 和 fade ,分别代表滑动播放和渐隐渐显播放,默认滑动播放
 //填写图片显示数量用于计算播放页数,默认一个页面播放一张图片

  function site_slide(el,type,num,time){
    var $view = $(el);//幻灯片窗口元素
    var $w = $view.width();
    var $h = $view.height();
    var $pics_box = $view.find(".pics-box");//图片盒子
    var $pic = $pics_box.find("img");//图片
    var $prev = $view.find(".btn .prev");//上一张按钮
    var $next = $view.find(".btn .next");//下一张按钮
    var $slide_control = $view.find(".slide-control li");//幻灯片控制选项
    var $len = $pic.length;//图片数量
    var $i = Math.ceil($len/num);//总播放页数
    var $timer = null;//存放setInterval(自动播放),悬停幻灯片窗口时移除自动播放
    var index = 0;//当前的播放图片

    $prev.css("top",$h/2 - 37 +"px");//居中对齐按钮
    $next.css("top",$h/2 - 37 +"px");//居中对齐按钮

    var $slide_fn = function(){//定义滑动播放函数
      var $toggle = function(index){
        $slide_control.removeClass("selected")//清除所有控制选项选中 .selected 样式
                      .eq(index).addClass("selected");//当前图片对应的控制选项添加选中样式
      }
      $toggle(0);//默认从第一张开始播放

      $slide_control.mouseenter(function() { //鼠标悬停幻灯片导航时
        var inx = $(this).index();
        if(inx != index){
          index = inx;
          $toggle(index);//切换当前幻灯片导航项样式
          $pics_box.stop(true,true).animate({"left": "-" + $w * index + "px"}, 300);//当前播放页面切换为鼠标悬停导航项对应的图片
        }
      });

      var $next_fn = function(){//定义下一张播放函数,自动播放和点击下一张按钮时调用
        if(!$pics_box.is(":animated")){//当前没有动画列表时点击才生效
          index = index >= ($i-1) ? 0 : ++index;
          $pics_box.animate({"left": "-" + $w + "px"}, 500, function(){
            $pics_box.css({"left":0}).find("a:first").appendTo($pics_box);
          });
          $toggle(index);
        }
      }

      $prev.click(function() {
        if(!$pics_box.is(":animated")){
          if(index == 0){
            index = ($i-1);
            $pics_box.animate({"left": "-" + $w * ($i-1) + "px"}, 300);
            $toggle(index);
          } else {
            --index;
            $pics_box.animate({"left": "+=" + $w + "px"}, 300);
            $toggle(index);
          }
        }
      });
      $next.click($next_fn);

      var $auto_play = function(){
        $timer = setInterval($next_fn,time);
      };
      $auto_play();
      $view.hover(function() {
        $(this).find(".btn").show();
        clearInterval($timer);
      },function(){
        $(this).find(".btn").hide();
        $auto_play();
      });

    }
    
    var $fade_fn = function(){
      var $toggle = function(inx){//定义切换函数,参数代表要显示的图片
        $pic.stop(true,true).fadeOut(200)//渐隐所有图片
            .eq(inx).fadeIn(200);//渐显参数指定位置的图片
        $slide_control.removeClass("selected")//清楚所有控制选项选中 .selected 样式
                      .eq(inx).addClass("selected");//当前图片对应的控制选项添加选中样式
      }
      $toggle(0);//默认从第一张开始播放

      $slide_control.mouseenter(function() { //鼠标悬停幻灯片控制选项时,切换当前显示图片为他对应的图片
        var inx = $(this).index();
        if(inx != index){
          index = inx;
          $toggle(index);
        }
      });

      var $nextfn = function(){
        index = index >= ($len-1) ? 0 : ++index;
        $toggle(index);
      }
      $prev.click(function() {
        index = index <= 0 ? ($len-1) : --index;
        $toggle(index);
      });
      $next.click($nextfn);

      var $auto_play = function(){
        $timer = setInterval($nextfn,time);
      }
      $auto_play();

      $view.hover(function() {
        $(this).find(".btn").show();
        clearInterval($timer);
      },function(){
        $(this).find(".btn").hide();
        $auto_play();
      });

    }
    if(type=="fade"){
      $fade_fn();
    } else if("slide") {
      $slide_fn();
    } 
  }
  site_slide("#focus .slide","fade",1,4000);//焦点区域幻灯片
  site_slide("#todays .slide","slide",4,10000);//今日推荐幻灯片
  site_slide("#floor1 .slide","slide",1,4000);//1楼幻灯片
  site_slide("#floor2 .slide","slide",2,4000);//2楼幻灯片
  site_slide("#floor3 .slide","slide",1,4000);//3楼幻灯片
  site_slide("#floor4 .slide","slide",1,4000);//4楼幻灯片
  site_slide("#floor5 .slide","slide",1,4000);//5楼幻灯片
  site_slide("#floor6 .slide","slide",2,4000);//6楼幻灯片
  site_slide("#floor7 .slide","slide",2,4000);//7楼幻灯片
  site_slide("#floor8 .slide","slide",2,4000);//8楼幻灯片
  site_slide("#floor9 .slide","slide",1,4000);//9楼幻灯片
  site_slide("#floor10 .slide","slide",1,4000);//10楼幻灯片
  site_slide("#floor11 .mcl .slide","slide",1,4000);//11楼幻灯片-1
  site_slide("#floor11 .mcr .slide","slide",1,4000);//11楼幻灯片-2

  //top(顶部导航) start
  function top_nav(){
    
    $("#top li.dropdown").hover(function() {
      $(this).addClass("hover").find(".dropdown-panel").show().end()//悬停带下拉面板的列表项时,显示下拉面板
             .find("i.arrow").html("&#xe63d;");//并改为向上小箭头
    }, function() {
      $(this).removeClass("hover").find(".dropdown-panel").hide().end()//离开下拉面板或列表项时,隐藏下拉面板
             .find("i.arrow").html("&#xe63e;");//并改为向下小箭头
    });
   
    $(".city .dropdown-panel a").click(function() {//点击选择城市名时
      $(".city .city-name").text($(this).text());//一级目录中的城市名改为点击的城市名
      $(this).parents(".dropdown-panel").hide().find("a").removeClass("selected");//隐藏城市选择面板,去除所有的城市的.selected样式
      $(this).addClass("selected");//给点击的元素添加.selected样式
    });
  }
  top_nav();

  //header(头部)
  function header(){
    $("#header .search input").focus (function(){//搜索框获得焦点时
      if($(this).val() == this.defaultValue){//如果搜索框文本是默认值
        $(this).css("color","#000").val("");//则清空搜索框文本,并改变文字颜色
      }
    }).blur(function() {//当搜索框失去焦点时
      if($(this).val() == ""){//如果搜索框文本为空
        $(this).css("color","#999").val(this.defaultValue);//则添加搜索框文本为默认值,并改变文字颜色
      }
    });

    $("#header .shopping-cart").hover(function() {//鼠标悬停"我的购物车"时
      $(this).addClass("hover")//添加悬停时的样式
             .append("<i class='white-bg'></i>")//插入内容,用来遮挡当前下边框与下拉面板上边框
             .find(".dropdown").show();//显示下拉面板
    }, function() {//鼠标离开"我的购物车时"
      $(this).removeClass("hover")//清除悬停样式
             .find(".white-bg").remove().end()//清除用来遮挡下边框与下拉面板上边框的元素
             .find(".dropdown").hide();//下拉面板隐藏
    });
  }
  header();

  //nav(导航)
    function nav(){
      var $dd = $("#nav .categorys dd"); //获取分类导航列表项
      var $detail = $("#nav").find(".detail-categorys"); //获取分类列表里的详细分类面板
      $dd.hover(function() {//鼠标悬停分类导航列表项时
        $(this).addClass("hover");//当前列表项添加hover类样式
        $detail.eq($(this).index()-1).show();//显示他对应的详细分类面板
      }, function() {
        $(this).removeClass("hover");//鼠标离开分类导航列表项时,去除他的hover类样式
        $detail.eq($(this).index()-1).hide();//隐藏他对应的详细分类面板
      });

      $detail.hover(function() {//鼠标悬停详细分类面板时
        $(this).show();//当前面板显示(上面设置了离开分类列表项就隐藏,该设置是当离开列表项的同时如果是进入详细分类面板,则继续显示)
        $dd.eq($(this).index()-3).addClass("hover");//给当前详细分类面板对应的分类导航项添加.hover类样式
      }, function() {
        $(this).hide();//鼠标离开时,该面板隐藏
        $dd.removeClass("hover");//他对应的导航列表项也移除.hover样式
      });

      $detail.find(".channels a").hover(function() {//鼠标悬停详细分类面板内的购买渠道链接时
        $(this).addClass("hover");//添加.hover类样式
      }, function() {
        $(this).removeClass("hover");//去除.hover类样式
      });
    }
    nav();


  //猜你喜欢
  function may_like(){
    var $may_like = $("#may-like");//获取"猜你喜欢"
    var $refresh = $may_like.find(".class-title .refresh");//获取"换一批"按钮
    var $spacer = $may_like.find(".spacer i");//获取分割线
    var $ul = $may_like.find("ul");//获取"猜你喜欢"列表
    var $len = $ul.length;//获取列表个数
    var index = 0;
    $ul.find("li").each(function(inx, el) {//遍历每一个列表项
      if(!((inx+1) % 6)){//能被6整除的元素(不包括0,即每行最后一个),去除右边框
        $(this).find(".info").css("border-right","none");
      }
      var $info_name = $(this).find(".pic img").attr("title");//获得图片title属性
      $(this).find(".info .name a").text($info_name);//让列表项里的.name里a链接文字的设为图片的title属性
    });
    $may_like.mouseenter(function() {//鼠标经过"猜你喜欢"板块时
      $spacer.stop(true,true).css("right","830px")//分割线从左到右移动
             .animate({"right":"-2px"},1000);
    });
    $refresh.click(function() {//点击"换一批按钮时"
      index = index >= $len-1 ? 0 : ++index;
      $ul.hide().eq(index).show()//切换列表项
      return false;
    });
  }
  may_like();

  //京东特色购
  function ccr(){
    var $timer = null;//存放定时函数,鼠标悬停"按钮时"改变按钮宽度,鼠标移出时清除定时函数
    $("#ccr li a span").hover(function() {
      var $span = $(this);//获取按钮
      var $w = $span.width();//获取按钮宽度
      var $spanfn = function(){
        $span.find("i").stop(true,true).fadeOut(700).end()//鼠标悬停时,小箭头图标渐隐至隐藏
             .stop(true,true).animate({"width": "+=15px"},700,//鼠标悬停时,按钮宽度在当前基础上+15px
              function(){
               $span.width($w).find("i").show();//执行完上面的动画后恢复按钮宽度,小箭头图标重新显示
              });
      }
      $spanfn();//调用函数
      $timer = setInterval($spanfn,1200);//之后每隔1200毫秒再调用一次
    }, function() {
      clearInterval($timer);//鼠标离开时清除定时函数
    });
  }
  ccr();

  //楼层板块
  function floor(){

    var $tab = function(){//选项卡切换
      $(".floor .tab li").mouseenter(function() {//悬停选项卡选项时
        var $parent = $(this).parents(".module");
        var $li = $parent.find(".tab li");
        var index = $li.index(this);
        $li.removeClass("selected").eq(index).addClass("selected");//移除所有选项卡选中样式后,给当前悬停的选项卡添加选中样式
        $parent.find(".mc .main").hide().eq(index).show();//隐藏所有main面板后,选项卡对应位置的main面板显示
      });
    }
    $tab();//调用选项卡切换
    
    var $info = function(){//商品信息设置
      $(".main .p-box .name a").each(function(index, el) {
        var $parent = $(this).parents(".p-box")//获取离他最近的与.pic元素共同的父元素盒子
        var $name = $parent.find(".pic img").attr("alt");//获取图片alt属性
        var $href = $parent.find(".pic a").attr("href");//获取图片链接
        $(this).text($name).attr("href",$href);//设置商品名称为图片的alt属性,链接为图片的链接
      });
    }
    $info();//调用商品信息设置
  }
  floor();


  //今日抄底板块
  function special(){
    var $special = $("#special");

    $special.find(".lower li").hover(function() {//鼠标悬停今日抄底窗口时
      $(this).find(".pic").stop().animate({"margin-left":"-20px"},500);//当前窗口内的商品图片向右偏移20px
    }, function() {
      $(this).find(".pic").stop().animate({"margin-left":"0px"},500);//鼠标离开窗口时图片回到原来位置
    });

    //热门晒单
    var $view = $special.find(".share .mc");
    var $ul = $view.find("ul");
    var $li = $ul.find("li");
    var $h = $li.height();
    var $len = $li.length;
    var index = 0;

    setInterval(function(){
      if(index >= ($len-2)){
        index = 0;
        $ul.animate({"top":"35px"},300);
      }else{
        ++index;
        $ul.animate({"top":"-="+ $h +"px"},300);
      }
    },3000);
  }
  special();

  function elevator(){
    var $back_top = $("#back-top");//获取返回顶部按钮
    var $floor_elevator = $("#floor-elevator");//获取楼层电梯
    var $floor = $(".floor");//获取楼层容器
    var $floor_y = $floor.offset().top;//获取楼层容器距离顶部的位置(用于楼层容器进入窗口时楼层电梯才显示)
    var $hide_y = $(".advantage").offset().top - 400;//.advantage 是页面底部的横幅(用于当此元素进入窗口时,代表已走出楼层板块,隐藏楼层电梯)

    var $condition = function(){//电梯显示的基本条件
      if($(this).scrollTop() == 0){//如果滚动条滚动到顶部
        $back_top.hide();//隐藏返回顶部电梯
      }else{
        $back_top.show();//否则显示返回顶部电梯
      };
      if($(this).scrollTop() >= ($floor_y-200)){//如果滚动条滚动到楼层位置上来200像素的位置时
        $floor_elevator.show();//显示楼层电梯
        if($(this).scrollTop() >= $hide_y) {//如果滚动条滚出楼层位置
        $floor_elevator.hide();//隐藏楼层电梯
        }
      } else {//如果窗口宽度小于1330px
        $floor_elevator.hide();//隐藏楼层电梯
      };
    }



    //楼层电梯定位
    var $position = function(){
      var $x = ($(window).width() - $(".w").width()-100)/2;//如果不减去100是获取窗口边缘到内容的距离,减100是为了把电梯大概的宽度也计算在内
      if($(this).width() < 1250){//如果当前窗口宽度小于1250px;
          $floor_elevator.hide();//隐藏楼层电梯
          $back_top.hide();//隐藏返回顶部电梯
      } else {//否则
        if($(this).width() >= 1300){
          $back_top.css("right",$x+"px");
          $floor_elevator.css("left",$x+"px");
        } else {
          $back_top.css("right","0");
          $floor_elevator.css("left","0");
        };
        $condition();//调用显示电梯函数
      }
    }
    $position();//调用电梯定位
    $(window).resize($position);//窗口发生改变时重新定位电梯位置

    $(window).scroll(function(){
      $condition();//调用显示电梯函数
      
      var $current_id = ""; 
      $floor.find(".module").each(function(){//遍历每一个楼层内的module板块
        var $x = $(this).offset().top; //获取遍历一个元素,将当前元素相对于文档顶部的值赋予$x
        if($(window).scrollTop() >= $x-500){//如果滚动条滚动到当前元素
          $current_id = "#" + $(this).attr("id");//获取当前元素ID值
        } else {
          return false;
        }
      });
      //滚动条滚动到楼层板块($current_id值为真),且当前楼层ID与.current的href值不相等时
      if($current_id && $current_id != $floor_elevator.find(".current").attr("href")){
        $floor_elevator.find("li a").removeClass("current");//移除所有.current类样式
        $floor_elevator.find("[href="+$current_id+"]").addClass("current");//当前楼层添加.current样式
      }
    });
  }
  elevator();

});