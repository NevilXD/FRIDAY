const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const time = document.querySelector("#time");
const battery = document.querySelector("#battery");
const internet = document.querySelector("#internet");
const msgs = document.querySelector(".messages");
document.querySelector("#start_friday_btn").addEventListener("click", () => {
    recognition.start();
})
let fridayComs = [];
fridayComs.push("hi/hello");
fridayComs.push("commands");
fridayComs.push("open google");
fridayComs.push("open youtube");
fridayComs.push("open facebook");
fridayComs.push("open instagram");
fridayComs.push("open whatsapp");
fridayComs.push("open github");
fridayComs.push("open github profile");
fridayComs.push("search google");
fridayComs.push("search youtube");
fridayComs.push("news");
function weather(location) {
    const weatherCont = document.querySelector(".temp").querySelectorAll("*");
    let loc = location;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=e1b7c51e943a031517bdd599f4c7e459`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            weatherCont[0].textContent = `Location : ${data.name}`;
            weatherCont[1].textContent = `Country : ${data.sys.country}`;
            weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
            weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
            weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherCont[5].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
            weatherCont[6].textContent = `But it feels like ${ktc(data.main.feels_like)}`;
            weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
            weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
            weaterStatement = `Sir The Weather In ${data.name} is ${
            data.weather[0].description
                } And The Temperature Feels Like ${ktc(data.main.feels_like)}`;
        } else {
            weatherCont[0].textContent = "Weather Info Not Found!";
        }
    }
    xhr.send();
}
function ktc(k) {
    k = k - 273.15;
    return k.toFixed(2);
}
let date = new Date();
let hrs = date.getHours();
let mins = date.getMinutes();
let secs = date.getSeconds();
function autoFriday() {
    setTimeout(() => {
        recognition.start();
    }, 1000)
}
window.onload = () => {
    if(localStorage.getItem("friday_setup") === null){
                readOut("Sir, Kindly Fill Out The Form...");
    }
    fridayComs.forEach((e) => {
        document.querySelector(".commands").innerHTML += `<p>${e}</p><br>`;
    })
    time.textContent = `${hrs} : ${mins} : ${secs}`;
    setInterval(() => {
        let date = new Date();
        let hrs = date.getHours();
        let mins = date.getMinutes();
        let secs = date.getSeconds();
        time.textContent = `${hrs} : ${mins} : ${secs}`;
    }, 1000);
    let batteryPromise = navigator.getBattery();
batteryPromise.then(batteryCallback);
function batteryCallback(batteryObject) {
    printBatteryStatus(batteryObject);
    setInterval(() => {
        printBatteryStatus(batteryObject);
    }, 5000);
}
navigator.onLine
    ? (internet.textContent = "Online")
    : (internet.textContent = "Offline");
setInterval(() => {
    navigator.onLine
        ? (internet.textContent = "Online")
        : (internet.textContent = "Offline");
}, 5000);
function printBatteryStatus(batteryObject) {
    let batteryLevel = (batteryObject.level * 100).toFixed(0);
    battery.textContent = `${batteryLevel}%`;

    if (batteryObject.charging === true) {
        document.querySelector(".battery").style.width = "200px";
        battery.textContent = `${batteryLevel}% Charging`;
    }
}
}
if(localStorage.getItem("friday_setup") !== null) {
    weather(JSON.parse(localStorage.getItem("friday_setup")).location);
}
const setup = document.querySelector(".friday_setup");
setup.style.display = "none";
if(localStorage.getItem("friday_setup") === null) {
    setup.style.display = "block";
    setup.querySelector("button").addEventListener("click", userInfo)
}
function userInfo() {
    let setupInfo = {
        name : setup.querySelectorAll("input")[0].value,
        bio : setup.querySelectorAll("input")[1].value,
        location : setup.querySelectorAll("input")[2].value,
        instagram : setup.querySelectorAll("input")[3].value,
        twitter : setup.querySelectorAll("input")[4].value,
        github : setup.querySelectorAll("input")[5].value,
    }
    let testArr = [];
    setup.querySelectorAll("input").forEach((e) => {
        testArr.push(e.value);
    })
    if(testArr.includes("")) {
        readOut("Please Enter Your Complete Information Sir.");
    } else {
        localStorage.clear();
        localStorage.setItem("friday_setup", JSON.stringify(setupInfo));
        setup.style.display = "none";
        weather(JSON.parse(localStorage.getItem("friday_setup")).location);
    }
}
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
let windowsB = [];
recognition.onresult = function(event) {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript = transcript.toLowerCase();
    let userdata = localStorage.getItem("friday_setup");
    if(transcript.includes("hi") || transcript.includes("hello")) {
        readOut("Hello Sir!");
    }
    if(transcript.includes("commands") || transcript.includes("comments")) {
        readOut("Sir, These Are The Following Commands Which I Follow...");
        document.querySelector(".commands").style.display = "block";
    }
    if(transcript.includes("close this")){
        readOut("Closing It Sir...");
        document.querySelector(".commands").style.display = "none";
        setup.style.display = "none";
    }
    if(transcript.includes("close all tabs")){
        readOut("Closing All The Tabs Sir...");
        windowsB.forEach((e) => {
            e.close();
        })
    }
    if(transcript.includes("open youtube")) {
        readOut("Opening YouTube...");
        let a = window.open("https://www.youtube.com/");
        windowsB.push(a);
    }
    if(transcript.includes("open google")) {
        readOut("Opening Google...");
        let a = window.open("https://www.google.com/");
        windowsB.push(a);
    }
    if(transcript.includes("open whatsapp")) {
        readOut("Opening WhatsApp...");
        let a = window.open("https://www.whatsapp.com/");
        windowsB.push(a);
    }
    if(transcript.includes("open instagram")) {
        readOut("Opening Instagram...");
        let a = window.open("https://www.instagram.com/");
        windowsB.push(a);
    }
    if(transcript.includes("open facebook")) {
        readOut("Opening Facebook...");
        let a = window.open("https://www.facebook.com/");
        windowsB.push(a);
    }
    if(transcript.includes("google") && transcript.includes("search")) {
    readOut("Here's What I Found...");
    transcript = transcript.replace("search", "")
        .replace("friday", "")
        .replace("google", "")
        .replace("for", "")
        .replace("in", "")
        .replace("on", "")
        .replace("about", "");
    transcript = transcript.trim().replace(/\s+/g, " ").replace(/ /g, "+");
    window.open(`https://www.google.com/search?q=${transcript}`);
    }
    if(transcript.includes("youtube") && transcript.includes("search")) {
    readOut("Here's What I Found...");
    transcript = transcript.replace("search", "")
        .replace("friday", "")
        .replace("youtube", "")
        .replace("for", "")
        .replace("in", "")
        .replace("on", "")
        .replace("about", "");
    transcript = transcript.trim().replace(/\s+/g, " ").replace(/ /g, "+");
    window.open(`https://www.youtube.com/search?q=${transcript}`);
    }
    if(transcript.includes("news") || transcript.includes("headlines")) {
        getNews();
    }
};
function readOut(message){
    const speech = new SpeechSynthesisUtterance;
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
}
async function getNews() {
    var url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=c2c66edfd47843d296b71034085c20e5";
    var req = new Request(url);
    await fetch(req)
        .then((response) => response.json())
        .then((data) => {
            let arrNews = data.articles;
            arrNews.length = 5;
            let a = [];
            arrNews.forEach((e, index) => {
                a.push(index+1);
                a.push("........");
                a.push(e.title);
                a.push("........");
            });
            readOut(a);
        });
}