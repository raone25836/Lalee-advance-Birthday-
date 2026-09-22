import { useMemo } from 'react';

interface HeartItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotation: number;
}

export function FloatingHearts() {
  const hearts: HeartItem[] = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 96) + 2,
      size: Math.floor(Math.random() * 22) + 14,
      duration: Math.floor(Math.random() * 8) + 7,
      delay: Math.floor(Math.random() * 6),
      opacity: Math.random() * 0.45 + 0.25,
      rotation: Math.floor(Math.random() * 60) - 30,
    }));
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-400 select-none animate-float-heart"
          style={{
            left: `${heart.left}%`,
            bottom: '-40px',
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `floatUp ${heart.duration}s ease-in-out infinite`,
            animationDelay: `${heart.delay}s`,
            transform: `rotate(${heart.rotation}deg)`,
            filter: 'drop-shadow(0 0 8px rgba(219, 39, 119, 0.4))',
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
}
