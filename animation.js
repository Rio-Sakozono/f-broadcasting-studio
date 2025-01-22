
// 球体アニメーション

// 画面サイズと設定
const W_WIDTH = window.innerWidth;
const W_HEIGHT = window.innerHeight;
const W_ASPECT = W_WIDTH / W_HEIGHT;
const W_RATIO = window.devicePixelRatio;

let camera, scene, renderer, earth;

window.onload = () => {
    // カメラの作成と設定
    camera = new THREE.PerspectiveCamera(50, W_ASPECT, 1, 10000);
    camera.position.set(0, 0, 600);

    // カメラの操作を有効にする
    const controls = new THREE.OrbitControls(camera, document.getElementById("main_canvas"));
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // シーンを作成
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // ライトの作成
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const ambLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambLight);

    // レンダラーの作成
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(W_RATIO);
    renderer.setSize(W_WIDTH, W_HEIGHT);

    // HTMLの指定された要素にレンダラーを追加
    document.getElementById("main_canvas").appendChild(renderer.domElement);

    // 地球の作成
    const txLoader = new THREE.TextureLoader();
    const normalMap = txLoader.load("image/ra.png"); // テクスチャ画像のパスを適宜変更
    const geometry = new THREE.SphereBufferGeometry(100, 300, 300);
    const material = new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: 1,
        color: 0xffffff,
        map: normalMap,
    });

    earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // アニメーション開始
    animate();
};

// アニメーション関数
function animate() {
    earth.rotation.y += 0.002; // 回転速度
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


// スクロールマーク

$(document).ready(function () {
    var isHovered = false; // ホバー状態の判定
    var scrollTimeout;
    var isScrolling = false; // スクロールアニメーション中かどうかの判定

    // 初期位置調整
    $('.wrapper').css({
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)'
    });

    // スクロール時の処理
    $(window).on('scroll', function () {
        if (isScrolling) return; // アニメーション中は処理を無効化

        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height(); // ドキュメントの全体の高さ
        var windowHeight = $(window).height(); // ウィンドウの高さ
        var section1 = $('#section1');
        var sectionOffset = section1.offset().top; // セクション1の上端の位置

        // 一番下に到達しているか確認
        if (scrollTop + windowHeight >= scrollHeight) {
            $('html, body').stop(true); // スクロールを停止
        }

        // セクション1が画面に一部でも見えているかを判定
        if (scrollTop + windowHeight > sectionOffset) {
            // セクション1が見えた場合、スクロールマークをふわっと非表示
            $('.wrapper').fadeOut(300); // 非表示
        } else {
            // セクション1が見えていない場合、スクロールマークをふわっと表示
            $('.wrapper').fadeIn(300); // 表示
        }
    });

    // ホバー時の処理
    $('.scroll-down-box').on('mouseenter', function () {
        isHovered = true;
        scrollTimeout = setTimeout(function () {
            if (isHovered && !isScrolling) {
                isScrolling = true; // スクロールアニメーションを開始
                $('html, body').animate({
                    scrollTop: $('#section1').offset().top
                }, 1000, function () {
                    isScrolling = false; // アニメーション完了時にリセット
                });
            }
        }, 500); // 0.5秒後にスクロール
    });

    // ホバー解除時の処理
    $('.scroll-down-box').on('mouseleave', function () {
        isHovered = false;
        clearTimeout(scrollTimeout); // ホバー解除時にタイマーをリセット
    });
});