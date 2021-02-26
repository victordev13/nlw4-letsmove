import { useEffect, useState, useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { CountDownContext } from '../../contexts/CountDownContext';
import styles from '../../styles/components/Countdown.module.css';


export function Countdown() {


    const {minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown
    } = useContext(CountDownContext);

    const [minuteLeft, minuteRight] = String(minutes)
        .padStart(2, '0')
        .split('');
    const [secondLeft, secondRight] = String(seconds)
        .padStart(2, '0')
        .split('');

 
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

