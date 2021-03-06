$(function() {
    //给form表单添加submit事件
    $('.login_form').on('submit', function(e) {
        //阻止其默认传输数据给当前页面的行为
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: BigNew.user_login,
            data: $(this).serialize(),
            success: function(info) {
                //不管登录是否成功，都弹出一个模态框
                $('#myModal').modal('show');
                $('#myModal .modal-body>p').text(info.msg);
                if (+info.code === 200) {
                    localStorage.setItem('token', info.token);
                    // 模态框隐藏后触发的事件hidden.bs.modal
                    $('#myModal').on('hidden.bs.modal',
                        function() {
                            location.href = './index.html'
                        }
                    )
                }
            }
        })
    });
    // $('.input_sub').on('click', function(e) {
    //     e.preventDefault();
    //     $.ajax({
    //         type: 'post',
    //         url: 'http://localhost:8080/api/v1/admin/user/login',
    //         data: $('.login_form').serialize(),
    //         success: function(info) {
    //             if (+info.code === 200) {
    //                 location.href = './index.html'
    //             }
    //         }

    //     })
    // })
})