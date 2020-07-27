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
        minDate: "2014-09-19 00:00:00"
    });
    // 4.提交
})