import { useState } from "react";

export function ButtonState() {
    // let it change
    // let counter = 0; //ESSA SERIA A VARIÁVEL QUE NÃO É UM ESTADO

    //ESTADO (O COUNTER É NOSSO PARÂMETRO E O SETCOUNTER É A FUNÇÃO QUE VAI ALTERAR O ESTADO DO NOSSO PARÂMETRO)
    const [counter, setCounter] = useState(0)

    //MUTABILIDADE: O VALOR DO COUNTER NÃO É ALTERADO, É SETADO UM NOVO VALOR PARA ELE COM BASE NO VALOR DO 
    //COUNTER ANTIGO
    //CLOSURE: O SETCOUNTER FAZ COM QUE O VALOR DO BOTÃO SEJA INCREMENTADO E ISSO É MOSTRADO AUTOMATICAMENTE,
    //MAS O CONSOLE.LOG AINDA MOSTRA O VALOR DO COUNTER ANTIGO
    function increment(){
        setCounter(counter+1);
        console.log(counter);
    }

    return (
        <button onClick={increment}> {counter} </button>
    ) 
}