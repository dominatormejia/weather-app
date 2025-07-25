import "./styles.css";
import {
  displayCurrentLightMedia,
  displayCurrentDarkMedia,
  displayHourlyInformation,
  clearHours,
  displayDailyData,
  clearDays,
} from "./displayImgs";
import { add, format } from "date-fns";

async function getWeather(input) {
  let search = "Chino";

  if (input) {
    search = input;
  }
  try {
    const key = "7FQ95UCN9YWCKQQN2SGNXLLWG";

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(search)}?unitGroup=us&key=${key}&contentType=json`,
      { mode: "cors" },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error ${response.status}: ${response.statusText}\n${errorText}`,
      );
    }
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log(err);
  }
}

async function displayCurrent(search) {
  const currentTemp = document.querySelector(".temp");
  const currentFeelsLike = document.querySelector(".feelsLike");
  const currentTime = document.querySelector(".time");
  const currentConditions = document.querySelector(".conditions");
  const event = document.querySelector(".event");
  const max = document.querySelectorAll(".max");
  const min = document.querySelectorAll(".min");
  const rainChance = document.querySelector(".rain-chance");
  const precipitation = document.querySelector(".precipitation");
  const input = document.querySelector("input");

  const currentData = await getWeather(search).then((weather) => {
    return weather.currentConditions;
  });
  const data = await getWeather(search).then((weather) => {
    return weather;
  });

  currentTemp.textContent = `${Math.round(currentData.temp)}°`;
  currentFeelsLike.textContent = `${Math.round(currentData.feelslike)}°`;
  max.forEach((max) => {
    max.textContent = ` ${Math.round(data.days[0].tempmax)}°`;
  });
  precipitation.textContent = `Precipitation: ${currentData.precip}in`;
  min.forEach((min) => {
    min.textContent = ` ${Math.round(data.days[0].tempmin)}°`;
  });
  rainChance.textContent = `Chance of Rain: ${currentData.precipprob}%`;
  currentConditions.textContent = `${currentData.conditions} Conditions`;
  if (data.alerts[0]) {
    event.textContent = `${data.alerts[0].event}`;
  }

  console.log(data.tzoffset);
  const offset = data.tzoffset;
  const localDate = new Date();
  const utcDate = add(localDate, {
    minutes: localDate.getTimezoneOffset(),
  });
  const targetDate = add(utcDate, {
    hours: offset,
  });
  currentTime.textContent = format(targetDate, "h:mm a");

  input.value = `${data.resolvedAddress}`;
}

async function displayIcon(search) {
  const icon = await getWeather(search).then((weather) => {
    return weather.currentConditions.icon;
  });
  const currentData = await getWeather(search).then((weather) => {
    return weather.currentConditions;
  });

  currentData.datetime <= currentData.sunset &&
  currentData.datetime >= currentData.sunrise
    ? displayCurrentLightMedia(icon)
    : displayCurrentDarkMedia(icon);
}

async function displayHours(search) {
  const data = await getWeather(search).then((weather) => {
    return weather;
  });
  const timeInt = parseInt(data.currentConditions.datetime);

  displayHourlyInformation(timeInt, data);
}

async function displayDays(search) {
  const data = await getWeather(search).then((weather) => {
    return weather.days;
  });

  displayDailyData(data);
}

window.addEventListener("load", () => {
  getWeather().then((response) => {
    console.log(response);
  });
  displayCurrent();
  displayIcon();
  displayHours();
  displayDays();
});

(function submit() {
  const form = document.querySelector("form");
  const input = document.querySelector("input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeather(input.value);
    displayCurrent(input.value);
    displayIcon(input.value);
    clearHours();
    displayHours(input.value);
    clearDays();
    displayDays(input.value);
    getWeather(input.value).then((response) => {
      console.log(response);
    });
  });
})();
