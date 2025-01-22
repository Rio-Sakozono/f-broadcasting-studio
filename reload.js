// 画面の大きさが変わる度にリロード
var timer = false;
$(window).resize(function () {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        // リロード
        location.reload();
    }, 200);
});