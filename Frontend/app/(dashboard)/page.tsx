
import Head from 'next/head';
import { UserButton } from '@clerk/nextjs';
import { initialProfile } from '@/lib/initial-profile';

import dynamic from 'next/dynamic';

// Dynamically import the WebcamCapture component with no SSR
const DynamicWebcamCapture = dynamic(() => import('./_components/web-cam'), { ssr: false });


const WebcamPage = async() => {


    const profile = await initialProfile();
    console.log(profile);

    return (

        <main>
            <UserButton />
            <h1>Webcam Capture</h1>
            <DynamicWebcamCapture />
        </main>
    );
};

export default WebcamPage;
