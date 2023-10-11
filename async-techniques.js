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

// pageStartWithCallback()

// SOLUZIONE 2) approccio con una Promise
// Una Promise è un wrapper, un contenitore che circonda una callback e la gestisce in un modo più elegante,
// senza callback hell, comodo nel caso si vogliano concatenare facilmente numerose operazioni asincrone

const countUntilThreeWithPromise = function () {
  return new Promise((resolve, reject) => {
    console.log('conto fino a 3...')
    reject('ERRORE DEL SERVER! :(')
    setTimeout(() => {
      // una volta che individuo la corretta fine dell'esecuzione della Promise, invoco resolve()
      resolve('ciao!')
      // la Promise viene risolta :D
    }, 3000)
  })
}

const pageStartWithPromise = function () {
  // questa Promise può finire bene, o finire male
  // ora io devo inserire il pezzo di codice successivo, COSA FARE DOPO
  // devo inserire da qualche parte il mio console.log('FINITO!')
  countUntilThreeWithPromise()
    .then((message) => {
      // finiamo nel .then() quando la Promise viene RESOLVED
      // è come se "ripartissi" dal resolve() della Promise
      // qui dentro si prosegue l'esecuzione del codice, perchè la Promise è terminata correttamente! :D
      console.log('FINITO!', message)
    })
    .catch((err) => {
      // finiamo nel .catch() quando la Promise viene REJECTED
      // qui dentro gestiamo l'eventuale errore scaturito dalla Promise "finita male"
      console.log('ERRORE', err)
    })
}

pageStartWithPromise()
