$(function () {
    var clickOne = true;
    var veriOne = true;
    var timer = null;
    var phoneNumReg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
    $('.from>p>input').bind('input', changeColor);
    $('.get-veri').bind('touchend', sendVeri);
    $('.change-password').bind('touchend', sendPassword);

    function changeColor() {
        var phone = $('.write-phone>input').val();
        var veri = $('.write-veri>input').val();
        var password = $('.write-password>input').val();
        if (phoneNumReg.test(phone) && veri && password.length >= 6) {
            $('.change-password').css("background", '#f60')
        } else {
            $('.change-password').css("background", '#cdcdcd')
        }
    }

    function sendVeri() {
        if (veriOne) {
            veriOne = false;
            var phone = $('.write-phone>input').val();
            if (!phoneNumReg.test(phone)) {
                alert('请输入正确的手机号');
                veriOne = true;
            } else {
                var parmas = {phone: phone}
                $.ajax({
                    type: 'post',
                    url: getBaseUrl() + 'meiyue/sendVerificationCode',
                    data: parmas,
                    dataType: 'json',
                    success: function (data) {
                    },
                    error: function () {
                        console.log(arguments);
                    }
                })
                var num = 60;
                timer = setInterval(function () {
                    if(num > 0){
                        num --;
                        $('.get-veri').text('重新获取(' + num + ')秒');
                    }else{
                        clearInterval(timer);
                        $('.get-veri').text('获取验证码');
                        num = 60;
                        veriOne = true;
                    }
                },1000)
            }
        }
    }

    function sendPassword() {
        if (clickOne) {
            clickOne = false;
            var phone = $('.write-phone>input').val();
            var veri = $('.write-veri>input').val();
            var password = $('.write-password>input').val();
            if (!phoneNumReg.test(phone)) {
                alert('请输入正确的手机号');
                clickOne = true;
            }
            else if (!veri) {
                alert('请输入验证码');
                clickOne = true;
            } else if (password.length < 6) {
                alert('请输入6-12位密码');
                clickOne = true;
            } else {
                var parmas = {
                    phone: phone,
                    captcha: veri,
                    new_password: password
                }
                $.ajax({
                    type: 'post',
                    url: getBaseUrl() + 'meiyue/personalCenter/changePasswordByCaptcha',
                    data: parmas,
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == '1000') {
                            alert('密码修改成功');
                            clickOne = true;
                            window.location.href = 'login.html';
                        } else if (data.code == '1001') {
                            alert(data.info);
                            clickOne = true;
                        }
                    },
                    error: function () {
                        console.log(arguments);
                        clickOne = true
                    }
                })
            }
        }
    }

})