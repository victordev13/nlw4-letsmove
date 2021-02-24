import React from 'react';
import styles from '../../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    return (
        <div className={styles.ExperienceBar}>
            <span>0 xp</span>
            <div className={styles.bar}>
                <div
                    style={{ width: '50%' }}
                    className={styles.currentExperience}
                />
                <span style={{ left: '50%' }}>300 xp</span>
            </div>
            <span>600 xp</span>
        </div>
    );
}
