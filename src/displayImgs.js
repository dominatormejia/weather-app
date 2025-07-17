import clearNight from "./media/clear-night.png";
import partlyCloudyDay from "./media/partly-cloudy-day.png";
import sunnyDay from "./media/sunny.png";
import rainyDay from "./media/rainy-day.png";
import sunnyVideo from "./media/sunnyVideo.mp4";
import rainyVideo from "./media/rainyVideo.mp4";
import partlyCloudyVideo from "./media/partlyCloudy.mp4";

export function displayCurrentDarkMedia(icon) {
  const imgs = document.querySelectorAll(".today-icon");

  imgs.forEach((imgs) => {
    imgs.src = clearNight;
  });
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
  if (icon === "partly-cloudy-day") {
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
}

export function displayHourlyInformation(input, data) {
  const hourWrapper = document.querySelector(".future-hours");

  for (let i = input + 1; i <= input + 8; i++) {
    if (data.days[0].hours[i]) {
      //   console.log(data.days[0].hours[i]);
      const div = document.createElement("div");
      const img = document.createElement("img");
      const span = document.createElement("span");
      const para = document.createElement("p");
      div.classList.add("hours");
      img.classList.add("small-weather-icon");

      img.src = partlyCloudyDay;
      const roundedTemp = Math.round(data.days[0].hours[i].temp);
      span.textContent = `${roundedTemp}°`;

      if (i >= 12) {
        let time = i - 12;
        para.textContent = `${time} PM`;
      } else {
        let time = i;
        para.textContent = `${time} AM`;
      }

      if (i >= input + 6) {
        div.classList.add("hidden-mobile");
      }
      div.appendChild(img);
      div.appendChild(span);
      div.appendChild(para);
      hourWrapper.appendChild(div);
    }
  }
}

export function displayDailyData(input) {
  const dayWrapper = document.querySelector(".future-days");

  for (let i = 1; i <= 6; i++) {
    console.log(input[i]);
    const div = document.createElement("div");
    const img = document.createElement("img");
    const divWrapper = document.createElement("div");
    const divTempWrap = document.createElement("div");
    const span = document.createElement("span");
    const max = document.createElement("span");
    const min = document.createElement("p");

    div.classList.add("days");
    img.classList.add("small-weather-icon");
    img.src = sunnyDay;
    span.textContent = "Day";
    divTempWrap.classList.add("temp-wrapper");
    max.classList.add("max");
    max.textContent = `${Math.round(input[i].tempmax)}°`;
    min.textContent = `${Math.round(input[i].tempmin)}°`;

    if (i === 6) {
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

export function clearHours() {
  const hourWrapper = document.querySelector(".future-hours");

  while (hourWrapper.firstElementChild) {
    hourWrapper.removeChild(hourWrapper.firstElementChild);
  }
}
