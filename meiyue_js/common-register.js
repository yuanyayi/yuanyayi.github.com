var flag = true,sendFlag = true,time = '';
var _hmt = _hmt || [];
var channel = getQueryString('ydmy_channel');

$(function () {
    if(channel){
        var substrChannel = channel.substr(0,5);
        if(substrChannel == 'M_GDT'){
            $('.M_GDT01').text('专业');
            $('.M_GDT02').text('还原');
            $('.M_GDT03').text('88键广角镜头，还原教学场景');
            $('.M_GDT04').text('优秀');
        }
        if(channel == 'M_LDYQ2'){
            $('.channel-item').text('律动用户独享2节25分钟陪练课程').show();
            $('#submit,#goTop').text('立即领取钢琴陪练课');
        }
        if(channel == 'M_LDYQ3'){
            $('.channel-item').text('律动用户独享3节25分钟陪练课程').show();
            $('#submit,#goTop').text('立即领取钢琴陪练课');
        }
    }
    $('#goTop').click(goTop);
    $('#submit').bind('click',function () {
        testPhone($('#phone').val());
    })
    $('.wrap-btn').bind('click',wrapHide);
    $('#receive').click(receiveFun);
})

//返回顶部
function goTop() {
    $('html,body').animate({'scrollTop':0},200)
}
//正则
function testPhone(phone) {
    var phoneNumReg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
    if(phoneNumReg.test(phone)){
        checkPhone(phone)
    }else{
        wrapShow('领取失败','手机号错误，请重新输入');
    }
}
//检验手机号是否注册
function checkPhone(phone) {
    if(flag){
        flag = false;
        $.ajax({
            type:'POST',
            url:getBaseUrl() + "meiyue/personalCenter/isRegistered",
            data:{phone:phone},
            dataType:'json',
            success:function (data) {
                if(data.code == 1000){
                    $('.before-write').hide();
                    $('.after-write').show();
                    var userPhone = phone.substring(0,3) + '****' + phone.substr(7);
                    $('#userPhone').text(userPhone);
                    flag = true;
                    getVeri(phone);
                    $('.veri-ele').bind('click',function () {
                        getVeri(phone);
                    })
                }else{
                    var msg = data.result ? data.result : data.info;
                    wrapShow('领取失败',msg);
                    flag = true;
                }
            },
            error:function () {
                wrapShow('领取失败','服务器走丢了');
                flag = true;
            }
        })
    }
}
//获取验证码
function getVeri(phone) {
    if(flag){
       flag = false;
        $.ajax({
            type: 'post',
            url: getBaseUrl() + 'meiyue/sendVerificationCode',
            data: {phone: phone},
            dataType: 'json',
            success: function (data) {
                countDown(phone);
            },
            error: function () {
                wrapShow('领取失败','服务器走丢了');
                flag = true;
            }
        })
    }
}
//倒计时
function countDown(phone) {
    var nums = 60;
    time = setInterval(function () {
        if(nums > 0){
            nums --;
            $('.veri-ele').text('已发送('+nums+')');
        }else{
            clearInterval(time);
            $('.veri-ele').text('重发验证码');
            flag = true;
            nums = 60;
        }
    },1000);
}
//确认领取
function receiveFun() {
    var phone = $('#phone').val();
    var nickname = $('#nickname').val();
    var captcha = $('#captcha').val();
    var channel = getUrlParameter('ydmy_channel');
    var source = 'MOBILE_WEBSITE';
    if(nickname != '' && captcha != ''){
       if(sendFlag){
           sendFlag = false;
           var parmas = {
               phone:phone,
               nickname:nickname,
               captcha:captcha,
               source:source,
               channel:channel
           };
           $.ajax({
               type:'POST',
               url:getBaseUrl() + 'meiyue/personalCenter/quickRegister',
               data:parmas,
               dataType:'json',
               success:function (data) {
                   if(data.code == 1000){
                       if(channel == 'M_LDYQ2' || channel == 'M_LDYQ3'){
                           wrapShow("领取成功","您已成功领取钢琴陪练课，我们的课程顾问会在24小时内与您联系")
                       }else{
                           wrapShow("领取成功","您已领取一节免费体验课，我们的课程顾问将在24小时内与您联系");
                       }
                       _hmt.push(['_trackEvent', 'receive', 'success']);
                       (function(a,b,c,d){
                           a[c]=function(){a[c]['ar']=a[c]['ar']||[];a[c]['ar'].push(arguments);};
                           var s=b.createElement('script');s.async = 1;s.src='//t.agrantsem.com/js/agt.js';
                           var r=b.getElementsByTagName('script')[0];r.parentNode.insertBefore(s,r);
                       })(window,document,'_agtjs','script');
                       _agtjs('init','AG_388020_WRRD','meiyuekeji.com');
                       _agtjs('trackPv');
                       _agtjs('loadEvent',{atsev:101,'atsusr':new Date().getTime()});
                       $('.wrap-btn').unbind().bind('click',function () {
                           location.reload();
                       })
                       sendFlag = true;
                   }else{
                       var msg = data.result ? data.result : data.info;
                       wrapShow("领取失败",msg);
                       sendFlag = true;
                   }
               },
               error:function () {
                   wrapShow('领取失败','服务器走丢了');
                   sendFlag = true;
               }
           })
       }
    }else{
        wrapShow('领取失败','请将信息填写完整后再提交');
    }
}
//遮罩层
function wrapShow(summary,msg) {
    $('.wrap').show();
    $('body,html').toggleClass('ovfl');
    $('.wrap .summary').text(summary);
    $('.wrap .title').text(msg);
}
function wrapHide() {
    $('.wrap').hide();
    $('body,html').toggleClass('ovfl');
}