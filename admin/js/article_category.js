// 文章分类
// 增删改查
$(function() {
    function render() {
        $.ajax({
            url: BigNew.category_list,
            success: function(info) {
                if (info.code === 200) {
                    var html = template('categoryList', info);
                    $('tbody').html(html)

                }
            }
        })
    };
    render();
    // 1.模态框显示后触发，判断当前点击的是新增还是编辑
    $('#myModal').on('shown.bs.modal', function(e) {
        // console.log(e.relatedTarget);//显示是一个标签，DOM对象
        $('#form')[0].reset();
        window.Modal_e = $(e.relatedTarget);
        if (Modal_e.data('name') === "add") {
            // 说明触发源头是新增按钮
            $('#myModal h4').text('新增分类');

        } else {
            // 说明触发源头是编辑按钮
            $('#myModal h4').text('编辑分类');
            //获取并显示当前选中行的内容
            $.ajax({
                url: BigNew.category_search,
                data: {
                    id: Modal_e.data('id')
                },
                success: function(info) {
                    if (info.code === 200) {
                        $('#form #titlename').val(info.data[0].name);
                        $('#form #slug').val(info.data[0].slug);
                    }
                }
            })
        }
    });
    //模态框里的确认按钮
    $('#myModal .btn-primary').on('click', function() {
        var url;
        if (Modal_e.data('name') === "add") {
            url = BigNew.category_add;
        } else if (Modal_e.data('name') === "change") {
            url = BigNew.category_edit;
        };
        $.ajax({
            type: 'post',
            url: url,
            data: $('#form').serialize() + `&id=${Modal_e.data('id')}`,
            success: function(info) {
                if (info.code === 201 || info.code === 200) {
                    $('#myModal').modal('hide');
                    render();
                } else {
                    console.log(info)
                }
            }
        })
    });
    //删除模态框和删除按钮
    $('#delModal').on('shown.bs.modal', function(e) {
        Modal_e = $(e.relatedTarget);
    });
    $('#delModal .btn-primary').on('click', function() {
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: Modal_e.data('id')
            },
            success: function(info) {
                if (info.code === 204) {
                    $('#delModal').modal('hide');
                    render();
                } else {
                    console.log(info)
                }
            }
        })
    })
})