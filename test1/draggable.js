/** 레이어 팝업 드래그 앤 드롭 이벤트 */
var Draggable = function (id) {
    var el = document.getElementById(id),
        isDragReady = false,
        dragoffset = {
            x: 0,
            y: 0
        };
    this.init = function () {
        //only for this demo
        this.initPosition();
        this.events();
    };
    // 초기 레이어팝업 위치 설정
    this.initPosition = function () {
        var windowW = "410";
        var windowH = "300";
        var left = Math.ceil((window.screen.width - windowW)/2);
        var top = Math.ceil((window.screen.height - windowH)/2);

        el.style.position = "fixed";
        el.style.top = top + "px";
        el.style.left = left + "px";
    };
    //draggable event
    this.events = function () {
        _on(el, 'mousedown', function (e) {
            isDragReady = true;
            //corssbrowser mouse pointer values
            e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
                    document.documentElement.scrollLeft :
                    document.body.scrollLeft);
            e.pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
                    document.documentElement.scrollTop :
                    document.body.scrollTop);
            dragoffset.x = e.pageX - el.offsetLeft;
            dragoffset.y = e.pageY - el.offsetTop;
        });
        _on(document, 'mouseup', function () {
            isDragReady = false;
        });
        _on(document, 'mousemove', function (e) {
            if (isDragReady) {
                e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
                        document.documentElement.scrollLeft :
                        document.body.scrollLeft);
                e.pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
                        document.documentElement.scrollTop :
                        document.body.scrollTop);

                el.style.top = (e.pageY - dragoffset.y) + "px";
                el.style.left = (e.pageX - dragoffset.x) + "px";
            }
        });
    };
    //cross browser event Helper function
    var _on = function (el, event, fn) {
        document.attachEvent ? el.attachEvent('on' + event, fn) : el.addEventListener(event, fn, !0);
    };
    this.init();
}

/** 레이어 팝업을 띄운다 */
function Openpop(){
    document.getElementById("layer").style.display = 'block';
    document.getElementsByClassName("dim-layer")[0].style.display = 'inline';
    new Draggable('layer');
}
/** 레이어 팝업을 닫는다 */
function Closepop(){
    document.getElementById("layer").style.display='none';
    document.getElementsByClassName("dim-layer")[0].style.display = 'none';
}