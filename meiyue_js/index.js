var _hmt = _hmt || [];

$(function () {
    var timer = '';

    //swiper
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
    });

    function hasErr(what) {
        $('#wrap').show();
        $(what).show();
    }

    //遮罩层
    $('.promit-err').bind("touchstart", noErr)

    function noErr() {
        $('#wrap').hide();
        $('#err-content>div').hide();
    }

    $('#user-btn').bind('touchstart', function () {
        var phone = parseInt($('#user-phone').val());
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
                        countDown();
                        $('#get-veri').bind('click', countDown);

                        function countDown() {
                            if (validClick) {
                                getIdentifyCode(phone);
                                validClick = false;
                                timer = setInterval(function () {
                                    if (nums > 0) {
                                        nums--;
                                        $('#get-veri').text('已发送(' + nums + ')');
                                        $('#get-veri').css('background', '#999');
                                    } else {
                                        clearInterval(timer);
                                        $('#get-veri').text('获取验证码');
                                        $('#get-veri').css('background', '#f85414');
                                        nums = 60;
                                        validClick = true;
                                    }
                                }, 1000)
                            }
                        }

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
            },
            error: function () {
                console.log(arguments)
            }
        })
    }

    $('#send-btn').bind('touchstart', register)
    var oneclick = true;

    function register() {
        if (oneclick) {
            oneclick = false;
            var phone = parseInt($('#user-phone').val());
            var nickname = $('#child-name').val();
            var captcha = $('#veri').val();
            var channel = getUrlParameter('ydmy_channel');
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
                            hasErr('#receive-success');
                            oneclick = true;
                            _hmt.push(['_trackEvent', 'receive', 'success']);
                            $('#receive-success>span').bind('click', function () {
                                window.location.href = 'index.html';
                            })
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
    }

    $("#free-get-btn").bind('click', function () {
        $('html,body').animate({'scrollTop': 0}, 200)
    })
})  
