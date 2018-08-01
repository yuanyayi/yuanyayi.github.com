var _hmt = _hmt || [];

$(function () {
    var timer = '';

    //遮罩层
    $('.promit-err').bind("click", function noErr() {
        $('#wrap').hide();
        $('#err-content>div').hide();
    });

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

    var phone = requestDic["phone"];
    var channel = requestDic["channel"];

    $('#sendPhoneCode').text(phone.toString().slice(0, 3) + '****' + phone.toString().slice(7))
    function hasErr(what) {
        $('#wrap').show();
        $(what).show();
    }
    var validClick = true;
    // countDown();
    $("#get-veri").bind('click', function countDown() {
        if (validClick) {
            var nums = 60;
            getIdentifyCode(phone);
            validClick = false;
            timer = setInterval(function () {
                if (nums > 0) {
                    nums--;
                    $('#get-veri').text('已发送(' + nums + ')');
                    $('#get-veri').css('background', '#ececec');
                } else {
                    clearInterval(timer);
                    $('#get-veri').text('重发验证码');
                    $('#get-veri').css('background', '#ececec');
                    nums = 60;
                    validClick = true;
                }
            }, 1000)
        }
    });


    $('#user-btn').bind('touchstart', function () {

        var phoneNumReg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
        if (!phoneNumReg.test(phone)) {
            hasErr('#phone-err');
        } else {
            $.ajax({
                type: 'post',
                url: getBaseUrl() + "meiyue/personalCenter/isRegistered",
                data: {phone: phone},
                dataType: 'json',
                success: function (data) {
                    if (data.code == '1000') {
                        var nums = 60;
                        var validClick = true;
                        $('.before-write').hide();
                        $('#send-phone').text(phone.toString().slice(0, 3) + '****' + phone.toString().slice(7))

                        $('.after-write').show();
                    } else if (data.code == '1001') {
                        hasErr('#phone-err-exist');
                    }
                },
                error: function () {
                    console.log(arguments)
                }
            })
        }

    })

    function getIdentifyCode(phone) {
        $.ajax({
            type: 'post',
            url: getBaseUrl() + 'meiyue/sendVerificationCode',
            data: {phone: phone},
            dataType: 'json',
            success: function (data) {
                console.log(data);
            },
            error: function () {
                console.log(arguments)
            }
        })
    }

    var oneclick = true;
    $("#immeditaID").bind('click', function register() {
        if (oneclick) {
            oneclick = false;
            // var phone = parseInt($('#user-phone').val());
            var nickname = $('#userSonName').val();
            var captcha = $('#userPhoneCode').val();
            if (!nickname) {
                hasErr('#name-err');
                oneclick = true;
            }
            else if (!captcha) {
                hasErr('#captcha-err-null');
                oneclick = true;
            } else {
                var parmas = {
                    nickname: nickname,
                    captcha: captcha,
                    phone: phone,
                    source: 'MOBILE_WEBSITE',
                    channel: channel
                };
                $.ajax({
                    type: 'post',
                    url: getBaseUrl() + 'meiyue/personalCenter/quickRegister',
                    data: parmas,
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == '1000') {
                            hasErr('#receive-success',function () {
                                //领取成功后晴空数据
                                $('#userSonName').text('');
                                $('#userPhoneCode').text('');
                            });
                            oneclick = true;

                        } else if (data.code == '1001') {
                            hasErr('#captcha-err-input');
                            oneclick = true;
                        }
                    },
                    error: function () {
                        console.log(arguments);
                    }
                })
            }
        }
    });


})
