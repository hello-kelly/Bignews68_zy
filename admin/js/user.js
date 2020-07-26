// 个人中心页面
// 一跳转，就更新页面信息
$(function() {
    //获取信息详情
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        success: function(info) {
            if (info.code === 200) {
                for (var k in info.data) {
                    $(`.userinfo .${k}`).val(info.data[k])
                };
                $('.userinfo .user_pic').attr('src', info.data.userPic);
            }

        }
    });


    // 用户图标上传
    $('#exampleInputFile').on('change', function() {
        // 获取待上传的图片
        var file = this.files[0];
        // 生成一个大对象的二进制形式的图片链接
        var url = URL.createObjectURL(file);
        $('.userinfo .user_pic').attr('src', url);
    });
    // 确认修改按钮事件
    $('#changeform').on('submit', function(e) {
        //阻止其默认传输数据给当前页面的行为
        e.preventDefault();
        var data = new FormData($('#changeform')[0]);
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: data,
            processData: false,
            contentType: false,
            success: function(info) {
                if (info.code == 200) {
                    alert(info.msg);
                    // 修改成功后更新页面的图片昵称等等
                    $.ajax({
                        type: 'get',
                        url: BigNew.user_info,
                        success: function(res) {
                            if (res.code === 200) {
                                parent.$('.sider .user_info img').attr('src', res.data.userPic);
                                parent.$('.sider .user_info span').html(`欢迎&nbsp;&nbsp;${ res.data.nickname}`);
                                parent.$('.header_bar img').attr('src', res.data.userPic);
                            };
                        }
                    })
                }
            }
        })
    })
})