import React from "react";

const Linha = ({ tentativa, final, palavra }) => {
    const quadrados = [];

    for (let i = 0; i < 5; i++) {

        let letra = tentativa[i];
        let className = "quadrado";

       
        if (final) {
            if (letra === palavra[i]) {
                className += " correto";
            } else if (palavra.includes(letra)) {
                className += " quase";
            } else {
                className += " incorreto";
            }
            
        }
        

        quadrados.push(<div key={i} className={className}>{letra}</div>)
    }

    return (
        <div className="linha">
            {quadrados}
        </div>
    )
}

export default Linha