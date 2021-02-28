import { CompletedChallenges } from '../components/CompletedChallenges';
import { ChallengeBox } from '../components/ChallengeBox';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';
import { CountdownDownProvider } from '../contexts/CountDownContext';
import { GetServerSideProps } from 'next';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps{
    level: number, 
    currentExperience: number, 
    challengesCompleted: number;
}

export default function Home(props: HomeProps) {
    return (
        <ChallengesProvider 
            level={props.level} 
            currentExperience={props.currentExperience}
            challengesCompleted={props.challengesCompleted}
        >
            <div className={styles.container}>
                <Head>
                    <title>Let's Move</title>
                </Head>
                <ExperienceBar />

                <CountdownDownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenges />
                            <Countdown />
                        </div>
                        <div>
                            <ChallengeBox />
                        </div>
                    </section>
                </CountdownDownProvider>
            </div>
        </ChallengesProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const user = {
        level: 0,
        currentExperience: 0,
        challengesCompleted: 0,
    };

    const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
    return {
        props: {
            level: Number(level),
            currentExperience: Number(currentExperience),
            challengesCompleted: Number(challengesCompleted)
        },
    };
};
