/* 
Student name: Utsha Bhandari
    student number: 2408886
*/
const api_key="e944f85531b7157607c023c91fd308a2";
const api_url=`https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${api_key}`;
const units= {
    pressure:"hPa",
    wind:"km/h",
    temp:"°C",
    humidity:"%"
};


const searchInputElement = document.getElementById("search_by_city")
const searchButtonElement=document.querySelector(".searchBtn")
const searchBox=document.querySelector(".search-input")
const toastMessageElement = document.getElementById("toast-message")


searchInputElement.addEventListener("keypress",function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const currentlyEnteredCity =  searchInputElement.value
      fetchCurrentCityWeather(currentlyEnteredCity)
    }
})


searchButtonElement.addEventListener("click", () => { 
      fetchCurrentCityWeather(searchBox.value);
    });


function date_time(){
    const d = new Date();
    console.log(d);
     monthnum=d.getMonth();
    switch (monthnum) {
        case 0:
            month="January"
            break;
        case 1:
            month="February"
            break;
        case 2:
            month="March"
            break;
        case 3:
            month="April"
            break;
        case 4:
            month="May"
            break;
        case 5:
            month="June"
            break;
        case 6:
            month="July"
            break;
        case 7:
            month="August"
            break;
        case 8:
            month="September"
            break;
        case 9:
            month="October"
            break;
        case 10:
            month="November"
            break;
        default:
            month="December"
            break;
    }

    datenum=d.getDate();
    final=month+" "+datenum;

    daynum=d.getDay();
   let days_week =[ "Sunday", "Monday",  "Tuesday",  "Wednesday", "Thursday",  "Friday", "Saturday"];
   todayis=days_week[daynum]
   console.log(r=todayis);
   yesterdaywas=days_week[daynum-1];
   tomorrowis=days_week[daynum+1];


//    Time
hour=d.getHours(); 
min=d.getMinutes(); 
totaltime=(hour+": "+min);
      }


date_time();

function updateDataToDOM (data) {
    const locationElement = document.querySelector(".location")
    const pressureElement=document.getElementById("pressurevalue")
    const humidityElement=document.getElementById("humidityvalue")
    const windElement=document.getElementById("windvalue")
    const precElement =document.getElementById("precipitationvalue")
    const tempElement = document.querySelector(".temp")
    const descElement=document.querySelector(".sunny")
    const dateElement=document.getElementById("date")
    const todayElement=document.getElementById("today")
    const yesterdayElement=document.getElementById("yesterday")
    const tomorrowElement=document.getElementById("tomorrow")
    const weatherIcon=document.querySelector(".weather-icon")
    const timeElement=document.getElementById("time")

    const precValue = data.main.precipitation || 'N/A'

    locationElement .innerHTML= data.name || 'N/A';
    pressureElement.innerHTML=data.main.pressure + " " + units.pressure;
    humidityElement.innerHTML=data.main.humidity+" "+units.humidity;
    windElement.innerHTML=data.wind.speed+" " +units.wind;
    tempElement .innerHTML= data.main.temp+ " "+units.temp;
    precElement.innerHTML=precValue;
    descElement.innerHTML=data.weather[0].description;
    dateElement.innerHTML=final;
    todayElement.innerHTML=todayis;
    yesterdayElement.innerHTML=yesterdaywas;
    tomorrowElement.innerHTML=tomorrowis;
    timeElement.innerHTML=totaltime;
   



    if(data.weather[0].main=="Clouds"){
        weatherIcon.src="https://lh3.googleusercontent.com/drive-viewer/AEYmBYTqrQ97hJPt-ixJpLXBQuxYItQhT2WCCRfZraFsOgjriY8AoOv2S86p1TAQNChezql4gpWEUOwh4clw2434acTPZlm4EA=s2560";
    }

    else if(data.weather[0].main=="Clear"){
        weatherIcon.src="https://lh3.googleusercontent.com/drive-viewer/AEYmBYQG6YtYZyt8up1jggsdAwtkvZNd5H5vy0W3WIcFs8yYXX_jbA1LJr60GWpjWxxv8GZ5I028Mm4xKk9TgIsfMXdWsX01lQ=s2560";
     }
     else if(data.weather[0].main=="Rain"){
        weatherIcon.src="https://lh3.googleusercontent.com/drive-viewer/AEYmBYS4wSkwspe3BAmmXLCAzHT9ozTseVeU7_3HIdI_PCHTyO_kjc10_O6QIg3ayh5ttsVieGD7axjE0lPHuv49rPBo2PIbkQ=s2560";
     }
     else if(data.weather[0].main=="Mist"){
        weatherIcon.src="https://lh3.googleusercontent.com/drive-viewer/AEYmBYQjNem02OUqcXpRrqXpHfpVEuQKQL_3gDpv07QJHa7u6egzTefGsotzgEK_QtSJa6Oz0-BVZCb1GLugvkb7mzJMFnQW1w=s2560";
     }
     else if(data.weather[0].main=="Drizzle"){
        weatherIcon.src="https://lh3.googleusercontent.com/drive-viewer/AEYmBYQxu-uGZP25RwVhrsWHSUittSsg0KnrNbyj6C7FlFhU2wnzJdyCSuJOBFhsIsD-lDY_vA6xDaVF16yDWKBengmoVJ1u=s2560";
     }
}


async function fetchCurrentCityWeather(selectedCity) {
    try {
        const response = await fetch(api_url + `&q=${selectedCity}`);
        const data = await response.json();
        updateDataToDOM(data)
        console.log(data)
    } catch(err) {
        toastMessageElement.innerHTML = 'Invalid city name'
        toastMessageElement.classList.toggle('show-toast')

        setTimeout(function () {
            toastMessageElement.classList.toggle('show-toast')
        }, 2500)
        
    }
}

const defaultCity = 'Bikaner'
fetchCurrentCityWeather(defaultCity);


