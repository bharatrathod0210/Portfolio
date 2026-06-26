export default function GlowOrb({ color = '#a855f7', size = 400, x = '50%', y = '50%', opacity = 0.15, blur = 120 }) {
  return (
    <div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        background: color,
        opacity,
        filter: `blur(${blur}px)`,
      }}
      aria-hidden="true"
    />
  );
}
