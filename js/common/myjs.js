// 打字机效果:jquery对象，毫秒
function Typer(target,speed){
  this.target = target,
  this.str = this.target.html().split(''),
  this.speed = 500,
  this.typing  =  function(){
    var target = this.target,
    str = this.str,
    speed = this.speed,
    timer = null,
    count = 0;
    target.html("");
    if(!!str){
      var timer = setInterval(function(){
        target.html(target.html()+str[count]);
        count++;
        if(count >= str.length){
          clearInterval(timer);
        }
      },speed)      
    }     
  }
}