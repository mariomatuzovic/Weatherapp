const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // Update the UI with the new city
  forecast
    .updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // Set local storage
  localStorage.setItem('location', city);
});

if (localStorage.getItem('location')) {
  forecast
    .updateCity(localStorage.getItem('location'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}

// UPDATING THE UI
function updateUI(data) {
  details.innerHTML = `
    <h5 class="my-3">
      ${data.cityDetails.EnglishName}
    </h5>
    <div class="my-3">
      ${data.weather.WeatherText}
    </div>
    <div class="display-4 my-4">
      <span>${data.weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // Update the night/day & icon images
  const iconSrc = `img/icons/${data.weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  if (data.weather.IsDayTime) {
    timeSrc = 'img/day.svg';
  } else {
    timeSrc = 'img/night.svg';
  }
  time.setAttribute('src', timeSrc);

  // Remove the d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
}
