// // 发表文章
// // 1.文章类别渲染
// $(function() {
//     $.ajax({
//         url: BigNew.category_list,
//         success: function(info) {
//             if (info.code == 200) {
//                 var htmlstr = template('tmp_cate', info);
//                 $('#form .form-group .form-control category').html(htmlstr);
//                 $('#form .form-group .form-control category option:first').attr('selected', true);
//             }
//         }
//     });
// })