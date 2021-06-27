import { useState, useEffect, FormEvent } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>


type Quest = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [quest, setQuest] = useState<Quest[]>([]);
    const [title, setTitle] = useState('');

    //RECURSO PARA OBSERVAR AS PERGUNTAS DO FIREBASE, SEMPRE QUE UMA PERGUNTA FOR ADICIONADA, ELA SERÁ MOSTRADA POR ESSA FUNÇÃO
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
        
        // .ONCE (OUVE 1 VEZ E PARA DE OUVIR), .ON (OUVE SEMPRE QUE ACONTECER O EVENTO - EVENT LISTENER)
        // 'VALUE' PARA RETORNAR TODOS OS DADOS DA SALA ROOM
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTitle(databaseRoom.title);
            setQuest(parsedQuestions);
        })

        return () => {
            roomRef.off('value');
        }
    }, [roomId, user?.id]);


    return { quest, title };
}