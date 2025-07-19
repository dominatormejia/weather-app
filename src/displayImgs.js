import clearNight from "./media/clear-night.png";
import partlyCloudyDay from "./media/partly-cloudy-day.png";
import sunnyDay from "./media/sunny.png";
import rainyDay from "./media/rainy-day.png";
import partlyCloudyNight from "./media/partly-cloudy-night.png";
import fogDay from "./media/fog.png";
import fogNight from "./media/foggy-night.png";
import windyDay from "./media/windyDay.png";
import windyNight from "./media/windyNight.png";
import snowy from "./media/snowy.png";

import sunnyVideo from "./media/sunnyDatTwo.mp4";
import rainyVideo from "./media/rainyVideo.mp4";
import partlyCloudyVideo from "./media/partlyCloudy.mp4";
import clearNightVideo from "./media/clearNightVideoTwo.mp4";
import cloudyNightVideo from "./media/partlyCloudyVideo.mp4";
import rainyNightVideo from "./media/rainyNightVideo.mp4";
import foggyNightVideo from "./media/foggyNightVideo.mp4";
import foggyDayVideo from "./media/foggyDayVideo.mp4";
import snowyDay from "./media/snowyDay.mp4";
import snowyNight from "./media/snowyNight.mp4";

import { getDay } from "date-fns";

export function displayCurrentDarkMedia(icon) {
  const imgs = document.querySelectorAll(".today-icon");
  const source = document.querySelector("source");
  const video = document.querySelector("video");

  if (icon === "clear-night") {
    imgs.forEach((imgs) => {
      imgs.src = clearNight;
    });
    source.src = clearNightVideo;
    video.load();
    return;
  }
  if (icon === "partly-cloudy-night" || icon === "cloudy") {
    imgs.forEach((imgs) => {
      imgs.src = partlyCloudyNight;
    });
    source.src = cloudyNightVideo;
    video.load();
    return;
  }
  if (icon.includes("rain")) {
    imgs.forEach((imgs) => {
      imgs.src = rainyDay;
    });
    source.src = rainyNightVideo;
    video.load();
    return;
  }
  if (icon === "fog") {
    imgs.forEach((imgs) => {
      imgs.src = fogNight;
    });
    source.src = foggyNightVideo;
    video.load();
    return;
  }
  if (icon === "wind") {
    imgs.forEach((imgs) => {
      imgs.src = windyNight;
    });
    source.src = cloudyNightVideo;
    video.load();
    return;
  }
  if (icon === "snow") {
    imgs.forEach((imgs) => {
      imgs.src = snowy;
    });
    source.src = snowyNight;
    video.load();
    return;
  }
}

export function displayCurrentLightMedia(icon) {
  const imgs = document.querySelectorAll(".today-icon");
  const source = document.querySelector("source");
  const video = document.querySelector("video");

  if (icon === "clear-day") {
    imgs.forEach((imgs) => {
      imgs.src = sunnyDay;
    });
    source.src = sunnyVideo;
    video.load();
    return;
  }
  if (icon === "partly-cloudy-day" || icon === "cloudy") {
    imgs.forEach((imgs) => {
      imgs.src = partlyCloudyDay;
    });
    source.src = partlyCloudyVideo;
    video.load();
    return;
  }
  if (icon.includes("rain")) {
    imgs.forEach((imgs) => {
      imgs.src = rainyDay;
    });
    source.src = rainyVideo;
    video.load();
    return;
  }
  if (icon === "fog") {
    imgs.forEach((imgs) => {
      imgs.src = fogDay;
    });
    source.src = foggyDayVideo;
    video.load();
    return;
  }
  if (icon === "wind") {
    imgs.forEach((imgs) => {
      imgs.src = windyDay;
    });
    source.src = partlyCloudyVideo;
    video.load();
    return;
  }
  if (icon === "snow") {
    imgs.forEach((imgs) => {
      imgs.src = snowy;
    });
    source.src = snowyDay;
    video.load();
    return;
  }
}

export function displayHourlyInformation(input, data) {
  const hourWrapper = document.querySelector(".future-hours");

  for (let i = input + 1; i <= input + 8; i++) {
    if (!data.days[0].hours[i]) break;

    const div = document.createElement("div");
    const img = document.createElement("img");
    const span = document.createElement("span");
    const para = document.createElement("p");
    div.classList.add("hours");
    img.classList.add("small-weather-icon");

    const dayIcons = displayDailyandHourlyMedia(data.days[0].hours[i], data);
    if (dayIcons) {
      img.src = dayIcons;
    } else {
      console.warn("Missing icon for:", data.days[0].hours[i].icon);
    }

    const roundedTemp = Math.round(data.days[0].hours[i].temp);
    span.textContent = `${roundedTemp}°`;

    if (i > 12) {
      let time = i - 12;
      para.textContent = `${time} PM`;
    } else if (i === 12) {
      let time = i;
      para.textContent = `${time} PM`;
    } else {
      let time = i;
      para.textContent = `${time} AM`;
    }

    if (i >= input + 5) {
      div.classList.add("hidden-mobile");
    }
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(para);
    hourWrapper.appendChild(div);

    if (i === 23) {
      break;
    }
  }
}

export function displayDailyData(input) {
  const dayWrapper = document.querySelector(".future-days");

  for (let i = 1; i <= 6; i++) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const divWrapper = document.createElement("div");
    const divTempWrap = document.createElement("div");
    const span = document.createElement("span");
    const max = document.createElement("span");
    const min = document.createElement("p");

    div.classList.add("days");

    img.classList.add("small-weather-icon");

    const dayIcons = displayDailyandHourlyMedia(input[i], null);
    if (dayIcons) {
      img.src = dayIcons;
    } else {
      console.warn("Missing icon for:", input[i].icon);
    }
    const daysOfWeek = getDaysofWeek(input[i].datetime);
    span.textContent = daysOfWeek;
    divTempWrap.classList.add("temp-wrapper");
    max.classList.add("max");
    max.textContent = `${Math.round(input[i].tempmax)}°`;
    min.textContent = `${Math.round(input[i].tempmin)}°`;

    if (i === 5 || i === 6) {
      div.classList.add("hidden-middle");
    }
    if (i === 5) {
      div.classList.add("hidden-smaller");
    }
    if (i === 4) {
      div.classList.add("hidden-small");
    }
    if (i >= 3) {
      div.classList.add("hidden-mobile");
    }

    div.appendChild(img);
    divWrapper.appendChild(span);
    divTempWrap.appendChild(max);
    divTempWrap.appendChild(min);
    divWrapper.appendChild(divTempWrap);
    div.appendChild(divWrapper);
    dayWrapper.appendChild(div);
  }
}
function displayDailyandHourlyMedia(input, data) {
  if (data) {
    const datetime = parseInt(input.datetime);
    const sunrise = parseInt(data.days[0].sunrise);
    const sunset = parseInt(data.days[0].sunset);

    if (datetime <= sunrise || datetime >= sunset) {
      if (input.icon === "clear-night") {
        return clearNight;
      } else if (input.icon === "partly-cloudy-night") {
        return partlyCloudyNight;
      }
    }
  }

  const icon = input.icon;

  if (icon) {
    if (icon === "clear-day") {
      return sunnyDay;
    }
    if (icon === "partly-cloudy-day" || input.icon === "cloudy") {
      return partlyCloudyDay;
    }
    if (icon.includes("rain")) {
      return rainyDay;
    }
  }
}

function getDaysofWeek(input) {
  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  let splitDate = input.split("-");
  const date = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
  const dayNumber = getDay(date);
  return days[dayNumber];
}

export function clearHours() {
  const hourWrapper = document.querySelector(".future-hours");

  while (hourWrapper.firstElementChild) {
    hourWrapper.removeChild(hourWrapper.firstElementChild);
  }
}
export function clearDays() {
  const dayWrapper = document.querySelector(".future-days");

  while (dayWrapper.children[1]) {
    dayWrapper.removeChild(dayWrapper.lastChild);
  }
}
