import "./styles.css";
import { getDarkIcon, getLightIcon } from "./displayImgs";
import { format, parse } from "date-fns";

async function getWeather(input) {
  let search = "Austin Texas";

  if (input) {
    search = input;
  }

  const key = "5E89832B6JDJ6VL66XZ36G4RK";

  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(search)}?unitGroup=us&key=${key}&contentType=json`,
    { mode: "cors" },
  );
  const responseJson = await response.json();

  return responseJson;
}

async function displayCurrent() {
  const currentTemp = document.querySelector(".temp");
  const currentFeelsLike = document.querySelector(".feelsLike");
  const currentTime = document.querySelector(".time");
  const currentConditions = document.querySelector(".conditions");
  const event = document.querySelector(".event");
  const max = document.querySelector(".max");
  const min = document.querySelector(".min");
  const rainChance = document.querySelector(".rain-chance");
  const precipitation = document.querySelector(".precipitation");

  const currentData = await getWeather().then((weather) => {
    return weather.currentConditions;
  });
  const data = await getWeather().then((weather) => {
    return weather;
  });

  currentTemp.textContent = `${currentData.temp}°`;
  currentFeelsLike.textContent = `${currentData.feelslike}°`;

  max.textContent = ` ${data.days[0].tempmax}°`;
  precipitation.textContent = `Precipitation: ${currentData.precip}in`;
  min.textContent = ` ${data.days[0].tempmin}°`;
  rainChance.textContent = `Chance of Rain: ${currentData.precipprob}%`;

  currentConditions.textContent = `${currentData.conditions} Conditions`;
  event.textContent = `${data.alerts[0].event}`;
  const parsedTime = parse(currentData.datetime, "HH:mm:ss", new Date());
  const formatted = format(parsedTime, "hh:mm a");
  currentTime.textContent = formatted;
}

async function displayIcon() {
  const icon = await getWeather().then((weather) => {
    return weather.currentConditions.icon;
  });

  icon.includes("night") ? getDarkIcon() : getLightIcon();
}

window.addEventListener("load", () => {
  getWeather().then((response) => {
    console.log(response);
  });
  displayCurrent();
});
