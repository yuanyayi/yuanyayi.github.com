$(function(){
    //生成用户唯一标识
        var d1 = new Date();
        var fp = new Fingerprint2();
        fp.get(function(result, components) {
            var d2 = new Date();
            var timeString = "Time took to calculate the fingerprint: " + (d2 - d1) + "ms";
            var details = "<strong>Detailed information: </strong><br />";
            if(typeof window.console !== "undefined") {
                setCookie('uuid',result,3650);
            }
        });

    var device_type = 'WECHATSERVICE';
    var device_id = getCookie('uuid');
    //输入框获取焦点时变色
    $('#phone,#password').bind('focus',changecolor);
    $('#phone,#password').bind('blur',restorecolor);
    $('#phone,#password').bind('input',changeSubColor)
    function changecolor() {
        $(this).parent().css('border-color','#f60');
        $(this).prev().css('color','#f60');
    }
    function restorecolor() {
        $(this).parent().css('border-color','#ccc');
        $(this).prev().css('color','#ccc');
    }
    function changeSubColor() {
        if($('#phone').val() != '' &&  $('#password').val().length >= 6){
            $('#submit').css('background','#f60');
        }else{
            $('#submit').css('background','rgb(194,194,194)');
        }
    }
    //创建cookie
    function getCookie(c_name)
    {
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }

    function setCookie(c_name,value,expiredays)
    {
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }

    function checkCookie()
    {
        user_phone = getCookie('user_phone');
        user_password = getCookie('user_password');
        user_token = getCookie('user_token');
        user_id = getCookie('user_id')
        if (user_phone!=null && user_phone!="" && user_password!=null && user_password!="")
        {
            // window.location.href = 'lesson.html';
        }
        else
        {
            user_phone = $('#phone').val();
            user_password = $('#password').val();
            user_token = $('#tokenId').text();
            user_id = $('#user_id').text();
            if (user_phone!=null && user_phone!="" && user_password!=null && user_password!="")
            {
                setCookie('user_phone',user_phone,3650);
                setCookie('user_password',user_password,3650);
                setCookie('user_token',user_token,3650);
                setCookie('user_id',user_id,3650);
                // window.location.href = 'lesson.html';
            }
        }
    }
    checkCookie();


    function GetRequest() {

        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    var requestDic = new Object();
    requestDic = GetRequest();

    var openid = requestDic["openid"];
    var refreshToken =  requestDic["refresh_token"];




    //登陆
    var userCick = true;
    $('#submit').bind('click',userLogin)
    function userLogin(){
        if(userCick){
            userCick = false;
            if($('#phone').val()==''){
                alert('请输入手机号！');
                userCick = true;
            }else if($('#password').val()==''){
                alert('请输入密码！');
                userCick = true;
            }else if($('#phone').val()!='' && $('#password').val()!=''){
                var param = {phone:parseInt($('#phone').val()),password:parseInt($('#password').val()),
                    device_type:'WECHTSERVICE',device_id:device_id};
                var param = {phone:parseInt($('#phone').val()),password:parseInt($('#password').val()),
                    device_type:'WECHTSERVICE',device_id:device_id,force:true};
                $.ajax({
                    type:"POST",
                    data:param,
                    dataType:'json',
                    url:getBaseUrl()+'meiyue/personalCenter/userLogin',
                    success:LoginSuccessful,
                    error:function (data) {
                        alert(data.info)
                    }
                })
                userCick = true;
            }
        }

    }
    function LoginSuccessful(data) {
        if(data.code == 1000){
            var user_token = data.result.user_info.user_token;
            var user_id = data.result.user_info.user_id;
            $('#userId').text(user_id);
            $('#tokenId').text(user_token);
            var user_phone = $('#phone').val();
            var user_password = $('#password').val();
            //登录成功后绑定openid
            var param = {phone:user_phone,openid:openid,refresh_token:refreshToken};
            $.ajax({
                type:"POST",
                data:param,
                dataType:'json',
                url:getBaseUrl()+'meiyue/wechat/bindWechatOpenid',
                success:function (data) {
                    if (data.code == 1000) {
                        alert('登录并绑定成功');
                        weixinClosePage();
                    }else {
                        alert(data.info);
                    }


               },error:function (data) {

                    alert(data.info);

                }
            })
            //创建cookie
            function getCookie(c_name)
            {
                if (document.cookie.length>0)
                {
                    c_start=document.cookie.indexOf(c_name + "=")
                    if (c_start!=-1) {
                        c_start = c_start + c_name.length + 1
                        c_end = document.cookie.indexOf(";", c_start)
                        if (c_end==-1) c_end=document.cookie.length
                        return unescape(document.cookie.substring(c_start,c_end))
                    }
                }
                return ""
            }

            function setCookie(c_name,value,expiredays)
            {
                var exdate=new Date()
                exdate.setDate(exdate.getDate()+expiredays)
                document.cookie=c_name+ "=" +escape(value)+
                    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
            }

            function checkCookie()
            {
                user_phone = getCookie('user_phone');
                user_password = getCookie('user_password');
                user_token = getCookie('user_token');
                user_id = getCookie('user_id');
                if (user_token!=null && user_token!="" && user_id!=null && user_id!="")
                {
                    // window.location.href = 'lesson.html';
                }
                else
                {
                    user_phone = $('#phone').val();
                    user_password = $('#password').val();
                    user_token = $('#tokenId').text();
                    user_id = $('#userId').text();
                    if (user_token!=null && user_token!="" && user_id!=null && user_id!="")
                    {
                        setCookie('user_phone',user_phone,3650);
                        setCookie('user_password',user_password,3650);
                        setCookie('user_token',user_token,3650);
                        setCookie('user_id',user_id,3650);
                        // window.location.href = 'lesson.html';
                    }
                }
            }
            checkCookie();
        }else if(data.code=1004){
            alert(data.info ,function () {
                var param = {phone:parseInt($('#phone').val()),password:parseInt($('#password').val()),
                    device_type:device_type,device_id:device_id,force:true};
                $.ajax({
                    type:"POST",
                    data:param,
                    dataType:'json',
                    url:getBaseUrl()+'meiyue/personalCenter/userLogin',
                    success:function (data) {
                        alert('登陆成功')
                    }
                })
            })
        }else{
            alert('账号或密码错误');
        }
    }

    //关闭微信页面
    function weixinClosePage() {
        console.log('enter weixinClosePage function');
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                console.log('enter weixinClosePage document.addEventListener');
                document.addEventListener('WeixinJSBridgeReady', weixin_ClosePage, false);
            } else if (document.attachEvent) {
                console.log('enter weixinClosePage document.attachEvent');
                document.attachEvent('WeixinJSBridgeReady', weixin_ClosePage);
                document.attachEvent('onWeixinJSBridgeReady', weixin_ClosePage);
            }
        } else {
            console.log('enter weixinClosePage else');
            weixin_ClosePage();
        }
    }
    function weixin_ClosePage() {
        console.log('enter weixin_ClosePage function');
        WeixinJSBridge.call('closeWindow');
    }


})