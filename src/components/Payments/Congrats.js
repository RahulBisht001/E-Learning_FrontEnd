import { useEffect, useState } from 'react'

import { useMediaQuery } from '@chakra-ui/react'

import Confetti from 'react-confetti';

const Congrats = () => {

    const confettiColors = [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4',
        '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107',
        '#FF9800', '#FF5722', '#795548', '#FF1493', '#7B68EE', '#32CD32', '#FFD700',
        '#FF6347', '#20B2AA', '#EE82EE', '#FFA500', '#00FF7F', '#BA55D3', '#00FA9A',
        '#800000', '#008080', '#FF00FF', '#4169E1', '#F08080', '#800080', '#87CEEB'
    ];

    const [showConfetti, setShowConfetti] = useState(true)

    const [isLaptop] = useMediaQuery('(min-width: 1024px)')
    const numberOfPieces = isLaptop ? 300 : 130;

    useEffect(() => {
        const confettiDuration = 5000

        //?_______ Stop the confetti after the specified duration _______

        const timeout = setTimeout(() => {
            setShowConfetti(false);
        }, confettiDuration)

        return () => {
            clearTimeout(timeout);
        }

    }, []);

    return (
        <>
            <div
                // className={`confetti-container ${showConfetti ? 'active' : ''}`}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    transition: 'opacity 0.5s ease-out',
                    opacity: showConfetti ? 1 : 0,
                    pointerEvents: showConfetti ? 'auto' : 'none'
                }}
            >
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    colors={confettiColors}
                    numberOfPieces={numberOfPieces}
                    recycle={false} //? Disable confetti recycling for immediate stop
                    gravity={0.3}
                    run='false'
                />
            </div>
        </>
    );
};

export default Congrats;
