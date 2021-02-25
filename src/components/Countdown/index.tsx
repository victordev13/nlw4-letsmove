import { useEffect, useState, useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from '../../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;
const INITIAL_TIME = 0.1 * 60;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);
        //inicializando em segundos
    const [time, setTime] = useState(INITIAL_TIME);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes)
        .padStart(2, '0')
        .split('');
    const [secondLeft, secondRight] = String(seconds)
        .padStart(2, '0')
        .split('');

    const startCountdown = () => {
        setIsActive(!isActive);
    };

    const resetCountdown = () => {
        clearTimeout(countdownTimeout);
        setIsActive(!isActive);
        setTime(INITIAL_TIME);
    };

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
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button disabled className={styles.startButton}>
                    Finalizado!
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button
                            type="button"
                            onClick={resetCountdown}
                            className={`${styles.startButton} ${styles.startButtonActive}`}>
                            Stop Move
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={startCountdown}
                            className={styles.startButton}>
                            Let's Move
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

