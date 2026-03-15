"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef } from 'react';
import { LaserFlow } from './LaserFlow';

// NOTE: You can also adjust the variables in the shader for super detailed customization

// Basic Usage
<div style={{ height: '500px', position: 'relative', overflow: 'hidden' }}>
    <LaserFlow />
</div>

// Image Example Interactive Reveal Effect
export function Laserlanding() {
    const revealImgRef = useRef<HTMLImageElement>(null);

    return (
        <div
            style={{
                height: '800px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#060010'
            }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', `${x}px`);
                    el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
                }
            }}
            onMouseLeave={() => {
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', '-9999px');
                    el.style.setProperty('--my', '-9999px');
                }
            }}
        >
            <div className='mt-14 w-1/2 px-8 z-10 relative'>
                <header className="mb-8">

                </header>
            </div>

            <LaserFlow
                horizontalBeamOffset={0.1}
                verticalBeamOffset={0.0}
                color="#CF9EFF"
            />


            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '86%',
                height: '60%',
                backgroundColor: '#060010',
                borderRadius: '20px',
                border: '2px solid #FF79C6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem',
                zIndex: 6
            }}>
                {/* Your content here */}
                <div className='mt-20'>
                    a
                </div>
            </div>

            <img
                ref={revealImgRef}
                src="/hero.png"
                alt="Reveal effect"
                style={{
                    position: 'absolute',
                    width: '100%',
                    top: '-50%',
                    zIndex: 5,
                    mixBlendMode: 'lighten',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    '--mx': '-9999px',
                    '--my': '-9999px',
                    WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat'
                }}
                horizontalSizing={0.5}
                verticalSizing={2}
                wispDensity={1}
                wispSpeed={15}
                wispIntensity={5}
                flowSpeed={0.35}
                flowStrength={0.25}
                fogIntensity={0.45}
                fogScale={0.3}
                fogFallSpeed={0.6}
                decay={1.1}
                falloffStart={1.2}
            />
            <div>
                a
            </div>
        </div>
    );
}