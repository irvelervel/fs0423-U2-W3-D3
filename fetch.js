// impariamo ad utilizzare il metodo fetch()
// fetch è un metodo integrato in tutti i browser moderni
// fetch effettua una REQUEST verso un server :)

// fetch torna una Promise!

// come funziona fetch?
// fetch può accettare fino a DUE parametri (il primo è obbligatorio, il secondo no):
// 1) URL da contattare (obbligatorio, è una stringa)
// 2) un oggetto di configurazione, che può specificare un metodo HTTP, un'autenticazione, un payload, etc. (non è obbligatorio)

// METODI HTTP:
// GET -> recupera dati (il metodo di default)
// POST -> crea un nuovo dato
// PUT -> modifica un dato esistente
// DELETE -> elimina un dato esistente

const getRemoteData = function () {
  fetch('https://jsonplaceholder.typicode.com/users', {
    // method: 'GET', // --> method: 'GET' è anche il valore predefinito
  })
    .then((response) => {
      console.log('RESPONSE OBJECT', response)
      // la response è un oggetto che ci informa di come sia andata la nostra request
      // dentro questo oggetto response abbiamo ottenuto informazioni importanti come "ok" e "status"
      // ...però manca l'array di utenti che stavamo cercando! dov'è??

      // poichè fetch() è stata fatta in un certo modo, anche in caso di 404, 401, etc. la Promise non viene mai rejectata
      // questo comporta che anche in caso di errore potremmo finire nel then!
      // per ottenere il corpo della response (body, payload) dobbiamo utilizzare su di essa un metodo che si chiama .json()
      // quindi è necessario eseguire il metodo .json() SOLAMENTE se non siamo in stato di errore!
      if (response.ok) {
        // finirò qui dentro quando la fetch termina correttamente, con ad es. uno status code di 200!
        console.log('fetch terminata con successo!')
        // vuol dire che il codice di stato era nella famiglia dei 200, che sono luce verde!
        // ora sì che possiamo invocare il metodo json() per ottenere i dati di questa fetch!
        return response.json()
        // ritorno la Promise .json() dal blocco .then
      } else {
        throw new Error('Errore nella response')
        // questa riga serve a spedirmi come un razzo direttamente nel .catch()
      }
    })
    .then((data) => {
      // questo blocco .then() verrà invocato solamente alla risoluzione della Promise collegata al .json()
      console.log('finalmente i dati!', data)

      data.forEach((user) => {
        console.log(user.email)
      })
    })
    .catch((err) => {
      // finirò qui dentro quando la fetch NON termina correttamente! o se abbiamo throwato a mano l'errore!
      console.log('errore nella fetch!', err)
    })
}

getRemoteData()
