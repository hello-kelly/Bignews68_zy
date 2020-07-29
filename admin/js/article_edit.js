$(function() {
    // 5.富文本插件
    var E = window.wangEditor;
    var editor = new E('#editor');
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();

    //3.日期插件-input点击也会弹出效果
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        minDate: "2014-09-19 00:00:00",
        //与下面富文本存在层级覆盖问题所以添加的
        zIndex: 99999
    });
    //先把categoryId渲染了
    $.ajax({
        url: BigNew.category_list,
        success: function(info) {
            var htmlstr = template('cate', info);
            $('#categoryId').html(htmlstr)
        }
    });

    // 获取信息并渲染到页面
    var search = location.search;
    var id = utils.strToobj(search).id;
    $.ajax({
        url: BigNew.article_search,
        data: {
            id: id
        },
        success: function(info) {
            if (info.code == 200) {
                $('#form input[name=title]').val(info.data.title);
                // $('#form input[name=cover]').val(info.data.cover)
                $('#form .article_cover').attr('src', info.data.cover);
                $('#form #categoryId').val(info.data.categoryId);
                $('#form input[name=date]').val(info.data.date);
                editor.txt.html(info.data.content)
            }
        }
    });
    //图片变动
    $('#inputCover').on('change', function() {
        var file = this.files[0];
        var url = URL.createObjectURL(file)
        $(this).prev('img').attr('src', url);
    });
    // 保存或发布
    $('#form').on('click', '.btn', function(e) {
        e.preventDefault();
        var data = new FormData($('#form')[0])
        if ($(this).hasClass('btn-edit')) {
            data.append('state', '已发布');
        } else {
            data.append('state', '草稿');
        };
        data.append('content', editor.txt.html());
        data.append('id', id);
        console.log(data)
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: data,
            processData: false,
            contentType: false,
            success: function(info) {
                if (info.code == 200) {
                    location.href = './article_list.html'
                }
            }

        });
    })


})