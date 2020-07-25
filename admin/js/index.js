// 主页面相关业务操作
// 1.跳转至index页面后显示当前用户昵称和头像
// 2.实现左侧菜单高亮显示
// 3.实现退出功能
$(function() {
    // 1.获取当前用户的昵称和头像,一下方式没办法获取，因为http无状态
    $.ajax({
        type: 'get',
        url: BigNew.user_info,
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
    });
    // 3.给左侧按钮添加点击高亮功能
    $('.menu .level01').on('click', function() {
        $(this).addClass('active').siblings('.level01').removeClass('active');
        // 当点击文章管理这个按钮时，显示二级
        if ($(this).index() === 1) {
            $('.level02').slideToggle();
            $('.icon-arrowdownl').toggleClass('rotate0');
            //jQuery对象的click()事件,他只会触发js单击事件,而不会触发a标签的默认跳转事件.
            //dom对象的click()事件,他不仅会触发js单击事件,还会触发a标签的默认跳转事件
            $('.level02 li:eq(0)>a')[0].click();
        }
    });
    // 二级菜单高亮并让第一个默认高亮,在下拉显示的时候就触发
    $('.level02 li').on('click', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
})