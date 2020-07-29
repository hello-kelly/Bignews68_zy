// 文章列表页面实现功能
// 1.一触发文章列表就渲染页面，内容刷新
// 1.1所有分类渲染
// 1.2文章列表
// 2.增加分页功能，且点击分页内按键可对应切换
// 3.删除按钮可删除
// 4.编辑按钮
// 5.筛选功能
// 6.点击发表文章可切换到发表文章页面


$(function() {
    // 1.一触发文章列表就渲染页面，内容刷新
    // 1.1所有分类渲染

    $.ajax({
        url: BigNew.category_list,
        success: function(info) {
            if (info.code == 200) {
                var htmlstr = template('tmp_cate', info);
                $('#selCategory').html(htmlstr);
            }
        }
    });

    // 1.2文章列表
    $.ajax({
        url: BigNew.article_query,
        success: function(info) {
            if (info.code == 200) {
                var htmlstr = template('tbody', info.data);
                $('tbody').html(htmlstr);
                // 如果什么也没查到，就不启用分页，显示p标签内容
                if (info.data.totalCount == 0) {
                    $('#pagination-demo').hide().next().show()
                } else {
                    // 开启分页
                    pagination(info);
                    $('#pagination-demo').show().next().hide();
                }
            }
        }
    });

    // 2.增加分页功能，且点击分页内按键可对应切换
    //2.1 封装一个实现分页的函数 是在获取文章列表页数据完成后来调用的
    var currentpage = 1;

    function pagination(res) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage,
            visiblePages: 7, // 每个显示的最多页码值
            first: '首页',
            last: '尾页',
            prev: '上一页',
            next: '下一页',
            initiateStartPageClick: false,
            onPageClick: function(event, page) {
                // page为当前点击的页数，event为事件
                // 点击页面，获取当前点击页面的内容

                currentpage = page;
                $.ajax({
                    url: BigNew.article_query,
                    data: {
                        key: $('#myForm input[name=key]').val(),
                        type: $('#myForm select[name=type]').val(),
                        state: $('#myForm select[name=state]').val(),
                        page: currentpage,
                        perpage: 6
                    },
                    success: function(info) {
                        if (info.code == 200) {
                            var htmlstr = template('tbody', info.data);
                            $('tbody').html(htmlstr);
                            // 如果什么也没查到，就不启用分页，显示p标签内容
                            if (info.data.totalCount == 0) {
                                $('#pagination-demo').hide().next().show()
                            } else {
                                // 开启分页
                                pagination(info);
                                $('#pagination-demo').show().next().hide();
                            }
                        }
                    }
                });

            }
        })
    };
    // 5.筛选功能
    $('#myForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: BigNew.article_query,
            data: {
                key: $('#myForm input[name=key]').val(),
                type: $('#myForm select[name=type]').val(),
                state: $('#myForm select[name=state]').val(),
                page: 1,
                perpage: 6
            },
            success: function(info) {
                console.log(info);
                if (info.code == 200) {
                    var htmlstr = template('tbody', info.data);
                    $('tbody').html(htmlstr);
                    // 如果什么也没查到，就不启用分页，显示p标签内容
                    if (info.data.totalCount == 0) {
                        $('#pagination-demo').hide().next().show();
                    } else {
                        // 开启分页
                        // pagination(info);
                        // 改变页码显示
                        // 第1个参数是当总页码改变的时候
                        // 第2个参数是现在的总页码值
                        // 第3个参数是默认显示的页码值
                        // 如果是最后一页 删除的数据比较多，当最后一页的数据全部删除之后，应该要显示前一页的数据
                        $('#pagination-demo').twbsPagination('changeTotalPages', info.data.totalPage, 1)
                        $('#pagination-demo').show().next().hide();
                    }
                }
            }
        });

    });
    // 6.点击发表文章可切换到发表文章页面
    $('#release_btn').on('click', function() {
        parent.$('.menu .level02 li:eq(1)').click();
    });
    // 3.删除按钮可删除
    $('#delmodal').on('shown.bs.modal', function(e) {
        window.delbtn = $(e.relatedTarget);
    });
    $('#delmodal .btn-sure-del').on('click', function() {
        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: {
                id: window.delbtn.attr('id')
            },
            success: function(info) {
                if (info.code == 204) {
                    $('#delmodal').modal('hide');
                    $.ajax({
                        url: BigNew.article_query,
                        data: {
                            key: $('#myForm input[name=key]').val(),
                            type: $('#myForm select[name=type]').val(),
                            state: $('#myForm select[name=state]').val(),
                            page: currentpage,
                            perpage: 6
                        },
                        success: function(info) {
                            if (info.code == 200) {
                                var htmlstr = template('tbody', info.data);
                                $('tbody').html(htmlstr);
                                // 如果什么也没查到，就不启用分页，显示p标签内容
                                if (info.data.totalCount == 0) {
                                    $('#pagination-demo').hide().next().show()
                                } else {
                                    // 开启分页
                                    pagination(info);
                                    $('#pagination-demo').show().next().hide();
                                }
                            }
                        }
                    });
                }
            },
            error: function(info) {
                alert(info.msg)
            }
        })
    });
    // 4.编辑按钮
    $('tbody').on('click', '.edit', function() {
        parent.$('.menu .level02 li:eq(1)').click();

    })
})