import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountDownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;
const INITIAL_TIME = 0.05 * 60;

export const CountDownContext = createContext({} as CountDownContextData);

export function CountdownDownProvider({ children }) {
    const { startNewChallenge } = useContext(ChallengesContext);
    //inicializando em segundos
    const [time, setTime] = useState(INITIAL_TIME);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const startCountdown = () => {
        setIsActive(true);
    };

    const resetCountdown = () => {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(INITIAL_TIME);
    };

    useEffect(() => {
        if (minutes === 5) {
            if (Notification.permission === 'granted') {
                new Notification('Quase lá, continue...🤓', {
                    body: `Faltam apenas 5 minutos`,
                });
            }
        }
    }, [minutes]);

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <CountDownContext.Provider
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown,
            }}>
            {children}
        </CountDownContext.Provider>
    );
}
