fetch(
  'https://api.open-meteo.com/v1/forecast?latitude=37.4903&longitude=14.0622&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin'
)
  .then((res) => {
    // abbiamo ottenuto la Response
    if (res.ok) {
      // se finisco qua vuol dire che ho ottenuto una Response ok!
      // ora dobbiamo prelevare il JSON dalla Response
      return res.json()
    } else {
      if (res.status === 404) {
        throw new Error('404 - Not Found')
      } else if (res.status === 500) {
        throw new Error('500 - Internal Server Error')
      } else {
        throw new Error('Errore generico')
      }
    }
  })
  .then((weatherData) => {
    console.log('weatherData', weatherData)

    // seleziono le porzioni del DOM da riempire dinamicamente
    // SEZIONE DATA
    const currentDay = document.getElementById('current-day')
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth() + 1
    currentDay.innerText = day + '/' + month
    // SEZIONE TEMP.MIN
    const tempMinP = document.getElementById('temp-min')
    const newSpanMin = document.createElement('span')
    newSpanMin.innerText = weatherData.daily.temperature_2m_min[0] + '°C'
    tempMinP.appendChild(newSpanMin)
    // SEZIONE TEMP.MAX
    const tempMaxP = document.getElementById('temp-max')
    const newSpanMax = document.createElement('span')
    newSpanMax.innerText = weatherData.daily.temperature_2m_max[0] + '°C'
    tempMaxP.appendChild(newSpanMax)
  })
  .catch((err) => {
    console.log(err)
    // magari qua creiamo un Alert di bootstrap...
  })
