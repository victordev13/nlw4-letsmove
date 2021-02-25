import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from '../../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

    return (
        <div className={styles.challengeContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                            className={styles.challengeFailedButton}
                            onClick={resetChallenge}>
                            Falhei
                        </button>
                        <button className={styles.challengeSucceededButton}>
                            Consegui
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeInactive}>
                    <strong> Finalize um ciclo e receba um desafio </strong>
                    <p>
                        <img src="/icons/level-up.svg" />
                        Avançe de nível completando um desafio.
                    </p>
                </div>
            )}
        </div>
    );
}
