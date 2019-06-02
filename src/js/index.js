// 图表
var ctx = "myChart";

var myChart = new Chart(ctx, {
    type: "line",

    data: {
        labels: ["昨天", "今天", "明天", "后天", "周二", "周三", "周四", "周五"],
        datasets: [{
            label: 'min',
            data: [19, 16, 17, 19, 21, 18, 20, 21],
            backgroundColor: [
                'rgba(255, 255, 255,1)',
                'rgba(255, 255, 255,1)',
                'rgba(255, 255, 255,1)',
                'rgba(255, 255, 255,1)',
                'rgba(255, 255, 255,1)',
                'rgba(255, 255, 255,1)'
            ],
            pointBackgroundColor: [
                'rgba(69, 206, 252, 1)',
                'rgba(69, 206, 252, 1)',
                'rgba(69, 206, 252, 1)',
                'rgba(69, 206, 252, 1)',
                'rgba(69, 206, 252, 1)',
                'rgba(69, 206, 252, 1)'
            ],


            borderColor: [
                'rgba(69, 206, 252, 1)',
                'rgba(69, 206, 252, 1)',
                'rgba(69, 206, 252, 1)',
                'rgba(69, 206, 252, 1)',
                'rgba(69, 206, 252, 1)',
                'rgba(69, 206, 252, 1)'
            ],
            borderWidth: 2
        },
        {
            label: 'max',
            data: [32, 29, 33, 35, 31, 33, 34, 34],
            backgroundColor: [
                'rgba(255, 255, 255,1)',
                'rgba(255, 255, 255,1)',
                'rgba(255, 255, 255,1)',
                'rgba(255, 255, 255,1)',
                'rgba(255, 255, 255,1)',
                'rgba(255, 255, 255,1)'
            ],
            pointBackgroundColor: [
                'rgba(255, 213, 79, 1)',
                'rgba(255, 213, 79, 1)',
                'rgba(255, 213, 79, 1)',
                'rgba(255, 213, 79, 1)',
                'rgba(255, 213, 79, 1)',
                'rgba(255, 213, 79, 1)'
            ],


            borderColor: [
                'rgba(255, 213, 79, 1)',
                'rgba(255, 213, 79, 1)',
                'rgba(255, 213, 79, 1)',
                'rgba(255, 213, 79, 1)',
                'rgba(255, 213, 79, 1)',
                'rgba(255, 213, 79, 1)'
            ],
            borderWidth: 2
        }

        ]
    },


    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        }

    }
});








// 搜索城市
var cityName = document.getElementById("city");
var search = document.getElementById("search");

if (search.display == "none") {
    cityName.addEventListener("click", () => {
        search.display = "block";
    })

} else if (search.display == "block") {
    cityname.addEventListener("click", () => {
        search.display = "none";
    })
}

// promise 封装ajax
function request(url) {
    return new Promise((resolve, reject) => {
        var XHR = new XMLHttpRequest();
        XHR.open('GET', url, true);
        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4) {
                if (XHR.status === 200) {
                    // 请求成功，将服务器返回的数据reslove出去
                    resolve(XHR.responseText);
                } else {
                    // 请求失败，将触发的错误reject出去
                    reject(new Error(XHR.responseText));
                }
            }
        };
        XHR.send();
    });
}

// 调用request请求chongqing现在的空气质量
request("https://free-api.heweather.net/s6/air/now?location=chongqing&key=d4d8036c94e1477caca1412170db10db").then((res) => {
    var nowAir = JSON.parse(res);

    // console.log(nowAir);
    // console.log(nowAir.HeWeather6[0].air_now_city)

    document.querySelector('#aqi').innerHTML = nowAir.HeWeather6[0].air_now_city.aqi;
    document.querySelector('#qlty').innerHTML = nowAir.HeWeather6[0].air_now_city.qlty;
}).catch((e) => {
    new Error(e);
});



// 调用request请求chongqing现在的天气
request("https://free-api.heweather.net/s6/weather/now?location=chongqing&key=d4d8036c94e1477caca1412170db10db").then((res) => {
    var nowWea = JSON.parse(res);
    // console.log(nowWea);
    document.querySelector('#temperature').innerHTML = nowWea.HeWeather6[0].now.tmp + "°";
    document.querySelector('#wea').innerHTML = nowWea.HeWeather6[0].now.cond_txt;
    document.querySelector('#addition').innerHTML = "相对湿度：" + nowWea.HeWeather6[0].now.hum;

    // 不按规定路径找？chart.min.js里为什么会去找图片？？？
    // 报错
    // Chart.min.js:12 Chart.min.js:12 GET http://zlj.com/front_test/images/clear.jpg 404 (Not Found)

    // var weather = document.querySelector('#wea').innerHTML;
    // var bg = document.querySelector('#weather');
    // switch (weather) {
    //     case "晴":
    //         bg.style.backgroundImage = "url(../images/clear.jpg)";
    //         break;
    //     case "多云":
    //         bg.style.backgroundImage = "url(../images/cloud.jpg)";
    //         break;
    //     case "雨":
    //         bg.style.backgroundImage = "url(../images/rain.jpg)";
    //         break;
    //     case "雪":
    //         bg.style.backgroundImage = "url(../images/snow.jpg)";
    //         break;
    //     case "阴":
    //         bg.style.backgroundImage = "url(../images/overcast.jpg)";
    //         break;
    //     case "风":
    //         bg.style.backgroundImage = "url(../images/thunder.jpg)";
    //         break;
    //     default:
    //             bg.style.backgroundImage = "url(../images/clear.jpg)";
    //             break;
    // }

}).catch((e) => {
    new Error(e);
});



// 调用request请求chongqing逐小时的天气,没有权限？？？

request("https://free-api.heweather.net/s6/weather/hourly?location=chongqing&key=d4d8036c94e1477caca1412170db10db").then((res) => {
    var hourlyWea = JSON.parse(res);
    // console.log(hourlyWea);

}).catch((e) => {
    new Error(e);
});



// 调用request请求chongqing未来几天的天气


request("https://free-api.heweather.net/s6/weather/forecast?location=chongqing&key=d4d8036c94e1477caca1412170db10db").then((res) => {
    var forecastWea = JSON.parse(res);
    // console.log(forecastWea);
    // console.log("aaa");

    // 只有三天的数据
    var b = forecastWea.HeWeather6[0].daily_forecast;
    // console.log(b[0]);

    // 给到近两天的天气

    (function () {
        document.querySelector("#today .temp").innerHTML = b[0].tmp_max + "/" + b[0].tmp_min + "°";
        document.querySelector("#tommorrow .temp").innerHTML = b[1].tmp_max + "/" + b[1].tmp_min + "°";

        document.querySelector("#today .weath").innerHTML = b[0].cond_txt_d;
        document.querySelector("#tommorrow .weath").innerHTML = b[1].cond_txt_d;
    })();



        // 给到近一周的天气

        // 白天天气状况
        (function () {
            // console.log("aaa");
            var a = document.querySelectorAll('#week #week_list .item .daytime .weat')

            var c = b.concat(b);
            for (let i = 0; i <= 5; i++) {
                a[i].innerHTML = c[i].cond_txt_d;
            }
        })();


    // 晚上天气状况
    (function () {
        // console.log("aaa");
        var a = document.querySelectorAll('#week #week_list .item .night .weat')

        var c = b.concat(b);
        for (let i = 0; i <= 5; i++) {
            a[i].innerHTML = c[i].cond_txt_n;
        }
    })();

    // 风向
    (function () {
        var a = document.querySelectorAll('#week #week_list .item .wind .w')

        var c = b.concat(b);
        for (let i = 0; i <= 5; i++) {
            a[i].innerHTML = c[i].wind_dir;
            if (c[i].wind_dir == "无持续风向") {
                a[i].innerHTML = "微风";
            }
        }
    })();

    // 风力
    (function () {
        var a = document.querySelectorAll('#week #week_list .item .wind .wi')
        var b = forecastWea.HeWeather6[0].daily_forecast;
        var c = b.concat(b);
        for (let i = 0; i <= 5; i++) {
            a[i].innerHTML = c[i].wind_sc + "级";
        }
    })();

}).catch((e) => {
    new Error(e);
});


// 调用request请求chongqing生活指数

request("https://free-api.heweather.net/s6/weather/lifestyle?location=chongqing&key=d4d8036c94e1477caca1412170db10db").then((res) => {
    var lifestyleMes = JSON.parse(res);
    // 数据不全，只可访问部分
    // console.log(lifestyleMes);
    (function () {
        var a = lifestyleMes.HeWeather6[0].lifestyle;
        // console.log(lifestyleMes.HeWeather6[0].lifestyle)

        var b = document.querySelectorAll('#index_of_living .item .content')
        // 顺序不一样
        //舒适度指数
        b[11].innerHTML = a[0].brf;
        // 穿衣
        b[1].innerHTML = a[1].brf;
        // 感冒
        b[3].innerHTML = a[2].brf;
        // 运动
        b[5].innerHTML = a[3].brf;
        // 旅游
        b[8].innerHTML = a[4].brf;
        // 防晒
        b[6].innerHTML = a[5].brf;
        // 洗车
        b[4].innerHTML = a[6].brf;
        // 空气
        b[10].innerHTML = a[7].brf;
    })();

}).catch((e) => {
    new Error(e);
});

