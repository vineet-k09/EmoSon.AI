import React, { useEffect, useState } from 'react';
import './customCursor.css';

const CustomCursor = () => {
    const [elSelected,
        // setElSelected
    ] = useState(false);

    // useEffect(() => {
    // const body = document.body;
    // const cursor = document.querySelector('.cursor');
    // const curContain = document.querySelector('.curContain');

    // const delayHider = () => {
    //     setTimeout(() => {
    //         curContain.classList.add("displayNone");
    //         cursor.classList.add("displayNone");
    //     }, 150);
    // };

    // const delayShower = () => {
    //     setTimeout(() => {
    //         curContain.classList.remove("displayNone");
    //         cursor.classList.remove("displayNone");
    //     }, 150);
    // };

    // body.addEventListener('mouseenter', delayShower);
    // body.addEventListener('mouseleave', delayHider);

    // return () => {
    //     body.removeEventListener('mouseenter', delayShower);
    //     body.removeEventListener('mouseleave', delayHider);
    // };
    // }, []);

    const cursorSize = 10;
    const PAD = 8;

    const goto = (x, y) => {
        if (elSelected) return;
        const cursor = document.querySelector('.cursor');
        cursor.style.left = `${x - cursorSize / 2}px`;
        cursor.style.top = `${y - cursorSize / 2}px`;

        // Update curContain position
        setTimeout(() => {
            const curContain = document.querySelector('.curContain');
            curContain.style.left = `${x}px`;
            curContain.style.top = `${y}px`;
        }, 100);
    };

    const handleMouseMove = (ev) => {
        goto(ev.clientX, ev.clientY);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div className="curContain"></div>
            <div className="cursor"></div>
        </>
    );
};

export default CustomCursor;
