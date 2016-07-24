// 简历
$(function(){
	//   导航栏active动态效果
  $('.nav li').on('click',function(){
    $(this).parent().find('li').removeClass('active');
    $(this).addClass('active');
  });
	// 图片自适应：
	var itemImage=$('.item-img img');
	itemImage.addClass('img-responsive');
	itemImage.height(itemImage.first().height());
});