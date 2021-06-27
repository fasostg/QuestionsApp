import { Link, useHistory} from "react-router-dom";
import { FormEvent, useState } from "react";

import { Button } from '../components/Button';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
//ASIDE: é um componente do HTML usada apenas para simbolizar um conteúdo lateralizado, sem mudar esse conteúdo visualmente de fato
//STRONG: é um componente HTML usado não só para simbolizar um texto importante, mas também para colocar o texto em negrito

export function NewRoom() {
    const { user } = useAuth();

    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() == '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id, 
        })

        history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração para perguntas e respostas"/> 
                <strong>Crie salas de Q&amp;A ao vivo!</strong>
                <p>Tire dúvidas em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask"/>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                          type="text"
                          placeholder="Nome da sala"
                          onChange={event => setNewRoom(event.target.value)}
                          value={newRoom}
                        />
                        <Button type="submit">
                        Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala já existente? <Link to="/">Clique aqui!</Link>
                    </p>
                </div>
            </main>
        </div>
    ) 
}