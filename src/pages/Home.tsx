import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';


import '../styles/auth.scss';

import { useTheme } from "../hooks/useTheme";

export function Home() {
    const { theme, toggleTheme } = useTheme();

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
   
    async function handleCreateRoom() {  
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() == '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Sala não existe!');
            return;
        }

        if (!roomRef.val().endedAt) {
            alert('A sala já foi encerrada.');
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }
 
    return (
        <div id="page-auth" className={theme}>
            <aside>
               <img src={illustrationImg} alt="Ilustração para perguntas e respostas"/> 
               <strong>Crie salas de Q&amp;A ao vivo!</strong>
               <p>Tire dúvidas em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <h1>{theme}</h1>
                    <button onClick={toggleTheme}>Mudar tema</button>
                    <img src={logoImg} alt="Letmeask"/>
                    <button onClick={handleCreateRoom} className="googlebutton">
                        <img src={googleIconImg} alt="Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator"> Ou entre em uma sala </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                          type="text"
                          placeholder="Digite o código da sala"
                          onChange={ event => setRoomCode(event.target.value)}
                          value={roomCode}
                        />
                        <Button type="submit">
                        Entrar na sala
                        </Button>
                    </form>
                    
                </div>
            </main>
        </div>
    ) 
}