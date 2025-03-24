import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [elSelected,
        // setElSelected
    ] = useState(false);

    useEffect(() => {
        const body = document.body;
        const cursor = document.querySelector('.cursor');
        const curContain = document.querySelector('.curContain');

        const delayHider = () => {
            setTimeout(() => {
                curContain.classList.add("displayNone");
                cursor.classList.add("displayNone");
            }, 150);
        };

        const delayShower = () => {
            setTimeout(() => {
                curContain.classList.remove("displayNone");
                cursor.classList.remove("displayNone");
            }, 150);
        };

        body.addEventListener('mouseenter', delayShower);
        body.addEventListener('mouseleave', delayHider);

        return () => {
            body.removeEventListener('mouseenter', delayShower);
            body.removeEventListener('mouseleave', delayHider);
        };
    }, []);

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

    // const handleMouseOver = (ev) => {
    //     const target = ev.currentTarget.getBoundingClientRect();
    //     goto(target.x - PAD + cursorSize / 2, target.y - PAD + cursorSize / 2);
    //     const cursor = document.querySelector('.cursor');
    //     cursor.style.width = `${target.width + PAD * 2}px`;
    //     cursor.style.height = `${target.height + PAD * 2}px`;
    //     cursor.style.zIndex = "-1";
    //     cursor.classList.add("selected");
    //     cursor.classList.remove("cursor");
    //     document.querySelector('.curContain').classList.add("displayNone");
    //     setElSelected(true);
    // };

    // const handleMouseLeave = () => {
    //     const cursor = document.querySelector('.cursor');
    //     cursor.style.width = `${cursorSize}px`;
    //     cursor.style.height = `${cursorSize}px`;
    //     cursor.style.zIndex = "9999";
    //     cursor.classList.remove("selected");
    //     cursor.classList.add("cursor");
    //     document.querySelector('.curContain').classList.remove("displayNone");
    //     setElSelected(false);
    // };

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
