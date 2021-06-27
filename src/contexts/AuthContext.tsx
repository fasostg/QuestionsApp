import { useHistory } from 'react-router-dom';
import { createContext, ReactNode, useState, useEffect } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  //PROMISE É O RETORNO DE TODA FUNÇÃO ASYNC
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider (props: AuthContextProviderProps) {
    const history = useHistory();

    const[user, setUser] = useState<User>();
    const[loading, setLoading] = useState(true);
    /* const inputNew = 'João Seboso'
    useEffect(() => {
        document.title = inputNew;
    }, []) */

    //O USEEFFECT FAZ COM QUE, QUANDO A NOSSA FUNÇÃO APP FOR EXIBIDA EM TELA, O ONAUTHSTATECHANGED MONITORE O ESTADO DE AUTENTICAÇÃO DO USUÁRIO E, SE O USUÁRIO JÁ ESTIVER AUTENTICADO, AS INFORMAÇÕES DO USUÁRIO SÃO BUSCADAS E PREENCHIDAS 
    useEffect(() => {
      //TODO EVENT LISTENER (AUTH.ONAUTHSTATECHANGED) PRECISA SER DECLARADO COMO VARIÁVEL, PARA QUE ELE NÃO RODE ETERNAMENTE (PODEMOS NOS DESINSCREVER DELE LÁ EMBAIXO COM O RETURN)
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const { displayName, photoURL, uid } = user
        
          //MENSAGEM DE ERRO SE O NOME OU A FOTO DO USUÁRIO NÃO EXISTIR
          if (!displayName || !photoURL) {
            throw new Error('Missing information from Google account!')
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
          setLoading(false)
        }
      })
  
      return () => {
        unsubscribe();
      }
    }, [])
  
    async function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider;
      const result = await auth.signInWithPopup(provider);
            //SE O USUÁRIO EXISTE
      if (result.user){
        const { displayName, photoURL, uid } = result.user
        
        //MENSAGEM DE ERRO SE O NOME OU A FOTO DO USUÁRIO NÃO EXISTIR
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google account!')
        }
        
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    }
    
    //LOG OUT 
    async function signOut() {
        await auth.signOut();
        setUser(undefined);
        history.push('/');
    }

    if (loading) {
      return(<p>Carregando...</p>)
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}