var cv = document.getElementById('cv');
var c = cv.getContext('2d');
var txtDiv = document.getElementById('txt');
var playBtn = document.getElementById("button");
var audio = document.getElementById('audio');
var img = new Image();
var index = 1;
var flag = false;


img.src = 'img/badapple00000.jpg'
img.onload = init; // 图片加载完开始转换

playBtn.onclick = function() {
    if (!flag) {
        audio.play();
        play();
        flag = true;
        playBtn.value = '播放中...';
    }
};

// 播放动画
function play() {
    if (index++ < 4380) {
        img.src = 'img/badapple0' + format(index, 4) + '.jpg';
        setTimeout(play, 50);
    } else {
        playBtn.value = '播放完成\n点击重放';
        flag = false;
        index = 1;
        audio.load();
        img.src = 'img/badapple00000.jpg';
    }
}


// 格式化
function format(num, all) {
    var arr = num.toString().split('');
    for (var i = 0; arr.length < all; i++) {
        arr.unshift('0');
    }
    return arr.join('');

}

// 根据灰度生成相应字符
function toText(g) {
    if (g <= 30) {
        return '#';
    } else if (g > 30 && g <= 60) {
        return '&';
    } else if (g > 60 && g <= 120) {
        return '$';
    }  else if (g > 120 && g <= 150) {
        return '*';
    } else if (g > 150 && g <= 180) {
        return 'o';
    } else if (g > 180 && g <= 210) {
        return '!';
    } else if (g > 210 && g <= 240) {
        return ';';
    }  else {
        return '.';
    }
}


// 根据rgb值计算灰度
function getGray(r, g, b) {
    return 0.299 * r + 0.578 * g + 0.114 * b;
}

// 转换
function init() {
    txtDiv.style.width = img.width + 'px';
    cv.width = img.width;
    cv.height = img.height;
    c.drawImage(img, 0, 0);
    var imgData = c.getImageData(0, 0, img.width, img.height);
    var imgDataArr = imgData.data;
    var imgDataWidth = imgData.width;
    var imgDataHeight = imgData.height;
    var html = '';
    for (h = 0; h < imgDataHeight; h += 12) {
        var p = '<p>';
        for (w = 0; w < imgDataWidth; w += 6) {
            var index = (w + imgDataWidth * h) * 4;
            var r = imgDataArr[index + 0];
            var g = imgDataArr[index + 1];
            var b = imgDataArr[index + 2];
            var gray = getGray(r, g, b);
            p += toText(gray);
        }
        p += '</p>';
        html += p;
    }
    txtDiv.innerHTML = html;
}
