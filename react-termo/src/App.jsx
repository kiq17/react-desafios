import React, { useState, useEffect } from 'react'
import './App.css'
import Data from './Componentes/Data'
import Linha from './Componentes/Linha'


export default function App() {
  const [palavra, setPalavra] = useState("");
  const [tentativa, setTentativa] = useState("");
  const [palavrasTentadas, setPalavraTentadas] = useState(Array(6).fill(null));
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const pegarLetra = (e) => {
      if (gameOver) {
        return
      }

      if (e.key == "Enter") {
        if (tentativa.length < 5) {
          return
        }
        
        const newPalavrasTentadas = [...palavrasTentadas];
        newPalavrasTentadas[newPalavrasTentadas.findIndex(val => val == null)] = tentativa;
        setPalavraTentadas(newPalavrasTentadas);
        setTentativa("");

        if (tentativa == palavra) {
          setGameOver(true)
        } 
      }


      if (e.key == "Backspace") {
        const tentativaSliced = tentativa.slice(0, -1);
        setTentativa(tentativaSliced);
        return
      }

      if (tentativa.length == 5) return

      setTentativa(tentativa + e.key)
    };

    window.addEventListener("keydown", pegarLetra);

    return () => window.removeEventListener("keydown", pegarLetra);

  }, [tentativa, gameOver, palavrasTentadas])

  useEffect(() => {
    const random = Data[Math.floor(Math.random() * Data.length)];
    setPalavra(random);
  }, []);

  return (
    <>
      {palavrasTentadas.map((palavraTentada, index) => {
        const isNull = index === palavrasTentadas.findIndex(val => val == null);
        return (
          <Linha key={index}
            tentativa={isNull ? tentativa : palavraTentada ?? ""}
            final={!isNull && palavraTentada != null}
            palavra={palavra}
          />
        )
      })}
    </>
  )

}
