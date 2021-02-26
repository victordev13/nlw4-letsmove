import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../challenges.json';
export const ChallengesContext = createContext({} as ChallengesContextData);

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
        const storageLevel = localStorage.getItem('@level');
        const storageExperience = localStorage.getItem('@experience');
        const storageChallengesCompleted = localStorage.getItem(
            '@challengesCompleted'
        );

        if (storageLevel !== null && storageExperience !== null) {
            setLevel(Number(storageLevel));
            setCurrentExperience(Number(storageExperience));
            setChallengesCompleted(Number(storageChallengesCompleted));
        }
    }, []);

    useEffect(() => {
        console.log('saving');
        saveToStorage();
    }, [currentExperience]);

    function levelUp() {
        setLevel(level + 1);
    }

    function saveToStorage() {
        localStorage.setItem('@level', String(level));
        localStorage.setItem('@experience', String(currentExperience));
        localStorage.setItem(
            '@challengesCompleted',
            String(challengesCompleted)
        );
    }
 
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(
            Math.random() * challenges.length
        );

        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio💡', {
                body: `Valendo ${challenge.amount} XP`,
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        console.log(currentExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

        saveToStorage();
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
            }}>
            {children}
        </ChallengesContext.Provider>
    );
}
