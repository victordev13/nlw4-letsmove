import React, { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from '../../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(
        ChallengesContext
    );

    const percentToNextLevel =
        Math.round(currentExperience * 100) / experienceToNextLevel;

    return (
        <div className={styles.ExperienceBar}>
            <span>0 xp</span>
            <div className={styles.bar}>
                <div
                    style={{ width: `${percentToNextLevel}%`}}
                    className={styles.currentExperience}
                />
                <span style={{ left: `${percentToNextLevel}%` }}>
                    
                    {currentExperience} xp
                
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </div>
    );
}
