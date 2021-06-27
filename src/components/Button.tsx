import { ButtonHTMLAttributes} from 'react';

import '../styles/button.scss';

//PEGA TODAS AS PROPRIEDADES DO BOTÃO DO HTML (button) E UMA PROPRIEDADE BOOLEANA 'ISOUTLINED'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { isOutlined?: boolean };

//PEGA TUDO O QUE É 'ISOUTLINED' E O RESTO É JOGADO NO PROPS
export function Button({ isOutlined = false, ...props}: ButtonProps) {
    return (
        <button
        //SE 'ISOUTLINED' EXISTIR, COLOCAR CLASSE 'OUTLINED', CASO CONTRÁRIO, NÃO COLOCAR CLASSE NENHUMA
        className={`button ${isOutlined ? 'outlined' : ''}`} 
        {...props}
        />
    ) 
}

