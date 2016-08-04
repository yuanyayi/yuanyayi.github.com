// 简历
$(function(){
	//   导航栏active动态效果
  $('.nav li').on('click',function(){
    $(this).parent().find('li').removeClass('active');
    $(this).addClass('active');
  });
	// 幻灯片
	// 幻灯片效果部分代码
});
// 设定元素初始宽度
function setFilmItemWidth(){
	$('.slide').each(function(){
		var that=$(this),
			iw=that.css('width');
		that.attr('iNow',0);
		var h=$('#home').height();
		that.find('.screen').css('height',h*0.8+'px');
		that.find('.film-item').css('width',iw);
		that.find('.labels').css('width',iw);
	});
}

// 监听窗口变化
$(window).resize(function(){
	setFilmItemWidth();
});

$(function(){
	//设置幻灯片单元宽度
	setFilmItemWidth();
	// 幻灯片移动
	$('.slide').each(function(){
	//变量列表
		var that=$(this),
			iNow=parseInt(that.attr('iNow')),//index
			film=that.find('.film'),
			iw=that.width(),
			n=that.find('.film .film-item').length-1;//单元数，不包括最后一张
			iLeft=iw*iNow,
			labels=that.find('.labels'),
			prev=that.find('.prev'),
			next=that.find('.next');
	// 控制器
		prev.on('click',function(){
			moveSlide(iNow-1);
		});
		next.on('click',function(){
			moveSlide(iNow+1);
		});
		labels.each(function(){});
	//定时器
		var slideTimer=setInterval(function(){moveSlide(iNow+1);},3000);
		that.hover(function(){
			clearInterval(slideTimer);
		},function(){
			slideTimer=setInterval(function(){moveSlide(iNow+1);},3000);
		});
	//标签控制
		labels.on('click','i',function(){
			var i=$(this).index();
			changeLabels(i);
			moveSlide(i);
		});
	//函数库
		function moveSlide(iNew){
			if(iNew<0){
				iNew=n-1;
			}else if(iNew>n){
				iNew=0;
			}
			//从最后一张到第一张
			if(iNow==n-1&&iNew==n){
				film.animate({'left':-iw*(n)},'slow',function(){
					film.css('left',0);
				});
				iNow=0;
			}
			//第一张到最后一张
			else if(iNow==0&&iNew==n-1){
				film.css('left',-iw*(n)+'px');
				film.animate({'left':-iw*(n-1)},'slow');
				iNow=n-1;
			}
			//一般情况
			else{
				film.animate({'left':-iw*iNew},'slow');
				iNow=iNew;
			}
			changeLabels(iNow);
		}
	// 标签动态
		function changeLabels(i){
			labels.find('i').removeClass('active').eq(i).addClass('active');
		}
	});
});