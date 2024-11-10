'use client';

import { useParams } from 'next/navigation';
import useWebSocket from '@/app/hooks/useWebSocket';
import { useEffect, useState } from 'react';

const Home = () => {
    const { location } = useParams();
    const url = `ws://iot.crustea.id:1880/${location}/control`;
    const relayStateUrl = `http://iot.crustea.id:1880/${location}/control/state`;
    const { messages, sendMessage } = useWebSocket(url);
    
    const [relayStatus, setRelayStatus] = useState('Unknown');

    useEffect(() => {
        const fetchRelayStatus = async () => {
            try {
                const response = await fetch(relayStateUrl);
                const data = await response.json();
                setRelayStatus(data.state === 'open_relay' ? 'ON' : 'OFF');
            } catch (error) {
                console.error('Error fetching relay status:', error);
            }
        };

        fetchRelayStatus();
    }, [location, relayStateUrl]);

    const handleOpenRelay = () => {
        sendMessage('open_relay');
        setRelayStatus('ON');
    };

    const handleCloseRelay = () => {
        sendMessage('close_relay');
        setRelayStatus('OFF');
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-10 text-center">
                Aerator Control for {location}
            </h1>
            <p className="text-xl sm:text-2xl text-white mb-6">
                Current Relay Status: <span className="font-bold">{relayStatus}</span>
            </p>
            <div className="flex flex-wrap justify-center space-x-0 sm:space-x-6 space-y-4 sm:space-y-0 mb-10">
                <button
                    onClick={handleOpenRelay}
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-xl sm:text-2xl font-bold py-4 px-8 rounded-lg shadow-lg"
                >
                    Aerator ON
                </button>
                <button
                    onClick={handleCloseRelay}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-xl sm:text-2xl font-bold py-4 px-8 rounded-lg shadow-lg"
                >
                    Aerator OFF
                </button>
            </div>
        </div>
    );
};

export default Home;
