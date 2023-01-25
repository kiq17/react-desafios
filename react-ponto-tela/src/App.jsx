import { useState } from "react"
import "./App.css"

function App() {
  const [pontoPop, setPontoPop] = useState([]);
  const [pontos, setPontos] = useState([]);

  const handlePosition = (e) => {
    const { pageY, pageX } = e;
    const ponto = { top: pageY - 20, left: pageX };
    setPontos([...pontos, ponto]);
  };

  const handleDesfazer = () => {
    if (pontos.length != 0) {
      const ultimoPonto = pontos.pop();
      const newPontos = pontos.filter(ponto => ponto !== ultimoPonto);
      setPontos(newPontos);
      setPontoPop([...pontoPop, ultimoPonto]);
    } else {
      return alert("Você precisa clicar na tela")
    }
  };

  const handleRefazer = () => {
    if (pontoPop.length != 0) {
      const ultimoPontoPop = pontoPop.pop();
      if (!ultimoPontoPop) return alert("Ação invalida");
      setPontos([...pontos, ultimoPontoPop]);
    } else {
      return alert("Todas as ações foram refeitas")
    }
  };

  return (
    <>
      <div className="butoes">
        <div style={{ margin: "0 auto", width: "max-content", display: "flex", gap: "20px" }}>
          <button
            onClick={() => handleDesfazer()}
          >Desfazer</button>

          <button
            onClick={() => handleRefazer()}
          >Reafazer</button>

          <p>Total de pontos: {pontos.length}</p>
        </div>
      </div>
      <div onClick={(e) => handlePosition(e)}
        style={{ position: "relative", height: "100vh" }}
        className="App">


        {pontos.length
          ?
          (pontos.map((ponto, index) => (
            <div key={index} style={{ height: "50px", width: "50px", borderRadius: "100%", position: "absolute", top: ponto?.top, left: ponto.left, backgroundColor: "black", transform: "translate(-50%, -50%)" }}>
            </div>
          )))
          :
          <></>}
      </div>
    </>
  )
}

export default App
