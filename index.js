function banner(){
		var page = 0;
		var $pic_box = $('.pic_box');
		var $slide_pic = $pic_box.find('img');
		var $slide_control = $('.slide_control li');
		var $control_img = $slide_control.find('img');
		var $len = $slide_pic.length;
		var $next = $('.next');
		var $pre = $('.pre');
		var index = 0;
		var timer = null;
		//公共函数
		function $slide_toggle(i){
	        $slide_pic.stop(true, true).fadeOut(200)//渐隐所有的图片
	                      				.eq(i).fadeIn(800);//渐显需要显示的图片
	        $control_img.removeClass("selected_li").eq(i).addClass("selected_li");
    	};

    	//next banner公共函数
		function $play_next(){//下一张的执行条件
	      if(!$slide_pic.is(":animated")){
	        page = page < ($len - 1) ? ++page : 0;
	        $slide_toggle(page);
	      }
	    }
		//自动轮播
		function auto_play(){timer=setInterval($play_next,3000)};
		auto_play();

		//幻灯片导航切换效果
	    $slide_control.click(function(){
	    	var i = $(this).index();
	        page = $(this).index();
	        $slide_toggle(page);
	      
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

	   // 幻灯片控制按钮
    	$pre.click(function(){//上一页按钮点击时
	      if(!$slide_pic.is(":animated")){
	        page = page <= 0 ? ($len - 1) : --page;
	        $slide_toggle(page);
	    	}
    	}).end().eq(1).click($play_next);

    	//幻灯片自动播放,鼠标悬停时停止播放
	    $pic_box.mouseenter(function(){
	      clearTimeout(timer);
	      }).mouseleave(function(){
	        auto_play();
	      });//鼠标悬停时,暂停自动播放,移出时取消定时器自动播放
	}
		banner();	
		
		
		//蒙版

		$('.pro-nav li').hover(function(){
				$(this).find('.cover').css('display','block')
				$(this).find('.icon').css('display','block');
			},function(){
				$(this).find('.cover').css('display','none')
				$(this).find('.icon').css('display','none');
			})
			
		//帅选
		$('.web').click(function(){
			$('.bg').removeClass('selected_nav')
			$('.web').addClass('selected_nav');
			$('.pro-nav li').stop(true, true).fadeOut(200)//渐隐所有的图片
	                      				$('.pro-nav').find('.web_pic').fadeIn(1300);//渐显需要显示的图片
		})
		
		$('.xy').click(function(){
			$('.bg').removeClass('selected_nav')
			$('.xy').addClass('selected_nav');
			$('.pro-nav li').stop(true, true).fadeOut(200)//渐隐所有的图片
	                      				$('.pro-nav').find('.xy_pic').fadeIn(1300);//渐显需要显示的图片
		})
		
		$('.game').click(function(){
			$('.bg').removeClass('selected_nav')
			$('.game').addClass('selected_nav');
			$('.pro-nav li').stop(true, true).fadeOut(200)//渐隐所有的图片
	                      				$('.pro-nav').find('.game_pic').fadeIn(1300);//渐显需要显示的图片
		})
		
		$('.all').click(function(){
			$('.bg').removeClass('selected_nav')
					$('.all').addClass('selected_nav');
			$('.pro-nav li').stop(true, true).fadeOut(200)//渐隐所有的图片
	                      				$('.pro-nav').find('li').fadeIn(1300);//渐显需要显示的图片
		})
					