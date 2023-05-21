import { useState } from 'react'
import './App.css'

function App() {
  const [value, setValue] = useState(0);
  const [filas, setFilas] = useState(Array(4).fill([]))

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value < 0) return

    let totalBase = 10000
    let filaMenor;

    for (let fila of filas) {
      const totalNoArray = fila.reduce((acc, value) => acc + value, 0)
      if (totalNoArray < totalBase) {
        totalBase = totalNoArray;
        filaMenor = fila
      }
    }

    setFilas(prev => prev.map(fila => fila === filaMenor ? [...fila, value] : fila))
  }

  const decrement = () => {

    let maior = 0
    for (let fila of filas) {
      let numero = fila.sort((a, b) => a - b).at(-1)

      if (numero > maior) {
        maior = numero
      }
    }
    
     // apagar o maior
    setFilas(prev => {
      let n = []
      prev.forEach(arr => {
       let a = arr.filter(max => max !== maior)
        n.push(a)
      })

      return n
    })


    // decrementar o maior
    /* setFilas(prev => {
      let n = []
      prev.forEach(arr => {
        if(arr.some(val=> val == maior)){
          let s = arr.sort((a, b)=> a + b)
          if(s[s.length - 1] == 0){
            s.pop()
          }
          s[s.length - 1] = maior - 1
          n.push(s)
        } else{
          n.push(arr)
        }
      })
      return n
    }) */

  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <button type="submit">Checkout</button>
        <button type="button" onClick={decrement}>Desfazer</button>
      </form>
      <div className="linhas">
        {filas.map((items, index) => {
          return (
            <div
              key={crypto.randomUUID()}
              className="linha"
            >
              Fila {index + 1}
              {items.map(item => {
                return (
                  <p key={crypto.randomUUID()}>{item}</p>
                )
              })}
              <p>Total: {items.reduce((acc, value) => acc + value, 0)}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
