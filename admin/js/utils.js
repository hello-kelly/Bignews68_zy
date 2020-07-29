// 工具函数
(function(w) {
    var utils = {
        // 1.str转obj
        strToobj: function(str) {
            str = str.slice(1);
            arr = str.split('&');
            var obj = {};
            for (var k in arr) {
                arr[k] = arr[k].split('=');

                obj[arr[k][0]] = arr[k][1];
            };
            return obj;
        }
    }
    w.utils = utils;
})(window)
// console.log(utils.strToobj('?name=haha&age=12'));
// utils = '111';