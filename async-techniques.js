// ESEMPIO DI CODICE ASINCRONO

const countUntilThree = function () {
  setTimeout(() => {
    console.log('conto fino a 3...')
  }, 3000)
}

const pageStart = function () {
  countUntilThree()
  console.log('FINITO!') // vorrei che questo console.log fosse l'ultimo della serie!
}

// pageStart()

// avete due funzioni, la prima delle quali contiene un'operazione ASINCRONA (parte subito, ma NON finisce subito)
// e avete la necessità di chiamare una porzione di codice solamente DOPO la fine dell'esecuzione della prima

// come facciamo a far eseguire la riga 11 solamente DOPO la conclusione della riga 10?

// SOLUZIONE 1) approccio con una CALLBACK
// una callback è una funzione che viene passata come parametro di un'altra funzione

const countUntilThreeWithCallback = function (nextCode) {
  console.log('conto fino a 3...')
  setTimeout(() => {
    nextCode()
  }, 3000)
}

const pageStartWithCallback = function () {
  countUntilThreeWithCallback(() => {
    console.log('FINITO!')
  })
}

pageStartWithCallback()
