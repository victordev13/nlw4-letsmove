import { useEffect, useState } from 'react';
import styles from '../../styles/components/Countdown.module.css';

export function Countdown() {
    //inicializando em segundos
    const [time, setTime] = useState(25 * 60);
    const [active, setActive] = useState(false);
    const [buttonText, setButtonText] = useState("Let's Move");
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes)
        .padStart(2, '0')
        .split('');
    const [secondLeft, secondRight] = String(seconds)
        .padStart(2, '0')
        .split('');

    const startOrPauseCountdown = () => {
        active ? setButtonText('Continue') : setButtonText('Pause');
        setActive(!active);
    };

    useEffect(() => {
        active && time > 0
            ? setTimeout(() => {
                  setTime(time - 1);
              }, 1000)
            : '';
    }, [active, time]);

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
            <button
                type="button"
                onClick={startOrPauseCountdown}
                className={styles.startButton}>
                {buttonText}
            </button>
        </div>
    );
}
