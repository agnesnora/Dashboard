/**
 * Challenge: get a random image from Unsplash and set it as the background
 *
 * Part 1:
 *
 * URL: https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature
 * (You can change the "query" at the end to whatever theme you want)
 *
 * Change the body's backgroundImage to:
 * `url(<insert the URL of the iamge from the API here>)`
 *
 * (You may need to dig around the response body a bit to find this URL)
 *
 * (Note I've already added some CSS to resize the image within the window.
 * Instructions for this were found on CSS Tricks:
 * https://css-tricks.com/perfect-full-page-background-image/#awesome-easy-progressive-css3-way)
 */

fetch(
  `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    document.getElementById("author").textContent = `By:${data.user.name}`;
  })
  .catch((err) => {
    console.log(err);
    document.body.style.background = `url("https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080")`;
  });

fetch(`https://api.coingecko.com/api/v3/coins/vaiot`)
  .then((res) => {
    if (!res.ok) {
      throw Error;
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    document.getElementById(
      "cripto-top"
    ).innerHTML = `<img src="${data.image.small}">
    <span>${data.name}</span>
   
    `;
    document.getElementById("cripto-bottom").innerHTML = `
    <p>💱: ${data.market_data.current_price.huf}HUF</p>
    <p>☝️:${data.market_data.high_24h.huf}HUF</p>
    <p>👇:${data.market_data.low_24h.usd}HUF</p>`;
  })
  .catch((err) => console.log("something went wrong"));

/**
 * Challenge: Add the name and icon of the cryptocurrency
 * to the upper-left of the dashboard page
 *
 * Use `data.name` and `data.image.small` to access that info
 */
/**
 * Challenge: Add the following data points underneath the
 * name and icon (1 paragraph each):
 *
 * 1. Current price (data.market_data.current_price.usd)
 * 2. 24-hour high price (data.market_data.high_24h.usd)
 * 3. 24-hour low price (data.market_data.low_24h.usd)
 *
 * Feel free to check the response data object for your own currency
 * if you don't want to use USD.
 */

function getTimeHtml() {
  const date = new Date();
  const options = {
    timeStyle: "short",
    hour12: "true",
  };

  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-EN",
    options
  );
}

setInterval(getTimeHtml, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  // console.log(position.coords.latitude, position.coords.longitude);

  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();

      // fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${long}&lon=${long}&appid=d2a3329ea3bdf32807a07f76b5fdf6ce`
      // )
      //   .then((res) => res.json)
      //   .then((data) => console.log(data));
    })
    .then((data) => {
      const icon = data.weather[0].icon;
      const temperature = Math.round(data.main.temp);
      const locationName = data.name;
      document.getElementById(
        "weather"
      ).innerHTML = `<div id="weather-top"><img src="http://openweathermap.org/img/wn/${icon}@2x.png"><p class="weather-temp">${temperature}°C</p></div><p class="weather-city">${locationName}</p>`;
    });
});
