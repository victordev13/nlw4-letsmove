import '../styles/global.css';
import Head from 'next/head';
import { ChallengesProvider } from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }) {
    return (
        <ChallengesProvider>
            <Component {...pageProps} />;
        </ChallengesProvider>
    );
}

export default MyApp;
