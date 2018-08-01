var _hmt = _hmt || [];



$(function () {
    var timer = '';

    //遮罩层
    $('.promit-err').bind("click", function noErr() {
        $('#wrap').hide();
        $('#err-content>div').hide();
    });

    function hasErr(what) {
        $('#wrap').show();
        $(what).show();
    }
    $("#immeditaID").bind('click',function () {
        var phone = parseInt($('#user-phone').val());
        var phoneNumReg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
        if (!phoneNumReg.test(phone)) {
            hasErr('#phone-err');
        }else {
            $.ajax({
                type: 'post',
                url: getBaseUrl() + "meiyue/personalCenter/isRegistered",
                data: {phone: phone},
                dataType: 'json',
                success: function (data) {
                    if (data.code == '1000') {
                        getIdentifyCode(phone);
                    } else if (data.code == '1001') {
                        hasErr('#phone-err-exist');
                    }
                },
                error: function () {
                    console.log('user-btn');
                }
            })
        }

    })


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
    var  getUserId = requestDic["userId"];




    function getIdentifyCode(phone) {

        var channel = 'ZJS_' + getUserId;

        $.ajax({
            type: 'post',
            url: getBaseUrl() + 'meiyue/sendVerificationCode',
            data: {phone: phone},
            dataType: 'json',
            success: function (data) {
                window.location.href = 'voucherMessage.html?phone='+phone + '&channel=' + channel;
            },
            error: function () {
                console.log(arguments)
            }
        })
    }




})
