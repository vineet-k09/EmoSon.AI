import React, { useEffect, useState } from 'react';
import './BubbleEffect.css'; // Make sure to import the CSS file

const BubbleEffect = () => {
    const [bubbles, setBubbles] = useState([]);

    useEffect(() => {
        const bubbleInterval = setInterval(() => {
            // Create a new bubble with random properties
            const newBubble = {
                id: Math.random(),
                size: Math.random() * 40 + 20, // Bubble size between 20px and 60px
                left: Math.random() * 100 + '%', // Random left position from 0 to 100%
                color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`, // Random color with low transparency
                animationDuration: Math.random() * 2 + 3 + 's', // Random rise duration between 3s and 5s
            };
            setBubbles((prevBubbles) => [...prevBubbles, newBubble]);

            // Remove bubble after it finishes its animation
            setTimeout(() => {
                setBubbles((prevBubbles) => prevBubbles.filter(bubble => bubble.id !== newBubble.id));
            }, parseFloat(newBubble.animationDuration) * 1000); // Wait for animation to end before removing
        }, 500); // Create new bubble every 500ms

        return () => clearInterval(bubbleInterval);
    }, []);

    return (
        <div className="bubble-container">
            {bubbles.map((bubble) => (
                <div
                    key={bubble.id}
                    className="bubble"
                    style={{
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        left: bubble.left,
                        backgroundColor: bubble.color,
                        animationDuration: bubble.animationDuration,
                    }}
                />
            ))}
        </div>
    );
};

export default BubbleEffect;
