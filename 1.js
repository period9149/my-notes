function getWeatherImage(){
    var weatherImage = document.getElementById('weatherImage')
    weatherImage.src = '' // 初始图片 可以不写
    var weatherType = document.getElementsByTagName('p')[0].innerText
    if(weatherType == '晴'){
        weatherImage.src = '' // 图片路径
    }else if(weatherType == '小雨'){
        weatherImage.src = '' // 图片路径
    }else{
        weatherImage.src = '' // 图片路径
    }
}