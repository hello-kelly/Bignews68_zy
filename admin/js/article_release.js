// 发表文章

$(function() {
    // 1.文章类别渲染
    $.ajax({
        url: BigNew.category_list,
        success: function(info) {
            if (info.code == 200) {
                var htmlstr = template('categoryList', info);
                $('#form #selCategory').html(htmlstr);
                $('#form #selCategory option:first').attr('selected', true);
            }
        }
    });
    // 2.图片同步
    $('#inputCover').on('change', function() {
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        $(this).prev('img').attr('src', url);
    });
    //3.日期插件-input点击也会弹出效果
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        minDate: "2014-09-19 00:00:00",
        //与下面富文本存在层级覆盖问题所以添加的
        zIndex: 99999
    });
    // 5.富文本插件
    var E = window.wangEditor;
    var editor = new E('#editor');
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();
    // 4.提交
    // 只有发布状态的文章才能在前台被所有人看见
    $('#form').on('click', '.btn', function(e) {
        e.preventDefault();
        var data = new FormData($('#form')[0]);
        //追加文本内容
        data.append('content', editor.txt.html());
        // 判断当前点击的按钮
        if ($(this).hasClass('btn-release')) {
            data.append('state', '已发布')
        } else {
            data.append('state', '草稿')

        };
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: data,
            processData: false,
            contentType: false,
            success: function(info) {
                if (info.code == 200) {
                    // 发布成功后跳到文章列表页
                    window.location.href = './article_list.html';
                    // window.history.back(); //回退到之前的页面
                    parent.$('.menu .level01:eq(1) .level02 li:eq(0)').click();
                }
            }
        })


    })
})