import clearNight from "./media/clear-night.png";

export function getDarkIcon() {
  const imgs = document.querySelectorAll("img");

  imgs.forEach((imgs) => {
    imgs.src = clearNight;
  });
}

export function getLightIcon() {
  console.log("fail");
}
