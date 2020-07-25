// 主页面相关业务操作
// 1.跳转至index页面后显示当前用户昵称和头像
// 2.实现左侧菜单高亮显示
// 3.实现退出功能
$(function() {
    // 1.获取当前用户的昵称和头像,一下方式没办法获取，因为http无状态
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/user/info',
        success: function(res) {
            // 将响应数据渲染到页面中
            if (res.code == 200) {
                $('.sider .user_info img').attr('src', res.data.userPic);
                $('.sider .user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`);
                $('.header_bar  img').attr('src', res.data.userPic);
                $('.logout').on('click', function() {
                    // 2.2 删除本地存储中的token值 
                    localStorage.removeItem('token')
                        // 2.3 跳转到登陆页面
                    location.href = './login.html'
                })
            }

        }
    })
})