import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ChamberVisualizationProps {
  depth: number;
  refractiveIndex: number;
  uvIntensity: number;
  irradiationMode: 'top' | 'bottom';
  time: number;
}

export default function ChamberVisualization({
  depth,
  refractiveIndex,
  uvIntensity,
  irradiationMode,
  time,
}: ChamberVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'rgba(10, 14, 39, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const cuvettWidth = 80;
    const cuvettHeight = 200;

    // Draw cuvette
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - cuvettWidth / 2, centerY - cuvettHeight / 2, cuvettWidth, cuvettHeight);

    // Draw gradient inside cuvette based on refractive index
    const gradient = ctx.createLinearGradient(0, centerY - cuvettHeight / 2, 0, centerY + cuvettHeight / 2);
    const colorIntensity = Math.min((1.48788 - refractiveIndex) * 10000, 1);
    gradient.addColorStop(0, `rgba(0, 217, 255, ${0.3 * colorIntensity})`);
    gradient.addColorStop(0.5, `rgba(157, 78, 221, ${0.2 * colorIntensity})`);
    gradient.addColorStop(1, `rgba(58, 134, 255, ${0.3 * colorIntensity})`);

    ctx.fillStyle = gradient;
    ctx.fillRect(centerX - cuvettWidth / 2, centerY - cuvettHeight / 2, cuvettWidth, cuvettHeight);

    // Draw UV rays
    const rayCount = Math.ceil(uvIntensity * 10);
    for (let i = 0; i < rayCount; i++) {
      const x = centerX - cuvettWidth / 2 + (i * cuvettWidth) / rayCount;
      const startY = irradiationMode === 'top' ? centerY - cuvettHeight / 2 - 30 : centerY + cuvettHeight / 2 + 30;
      const endY = irradiationMode === 'top' ? centerY - cuvettHeight / 2 : centerY + cuvettHeight / 2;

      ctx.strokeStyle = `rgba(0, 217, 255, ${0.5 + Math.random() * 0.5})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }

    // Draw depth marker
    const depthY = centerY - cuvettHeight / 2 + (depth / 5) * cuvettHeight;
    ctx.strokeStyle = 'rgba(255, 183, 0, 0.6)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX - cuvettWidth / 2, depthY);
    ctx.lineTo(centerX + cuvettWidth / 2, depthY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw particles (animated based on time)
    const particleCount = Math.floor(time / 5) + 5;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 + time * 0.05;
      const radius = 30 + Math.sin(time * 0.1 + i) * 10;
      const px = centerX + Math.cos(angle) * radius;
      const py = centerY + Math.sin(angle) * radius;

      ctx.fillStyle = `rgba(0, 217, 255, ${0.6 - (i / particleCount) * 0.4})`;
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw labels
    ctx.fillStyle = 'rgba(232, 234, 255, 0.8)';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';

    if (irradiationMode === 'top') {
      ctx.fillText('UV254 ↓', centerX, centerY - cuvettHeight / 2 - 10);
    } else {
      ctx.fillText('UV254 ↑', centerX, centerY + cuvettHeight / 2 + 20);
    }

    ctx.fillText(`Depth: ${depth.toFixed(1)} mm`, centerX, centerY + cuvettHeight / 2 + 40);
    ctx.fillText(`n = ${refractiveIndex.toFixed(5)}`, centerX, centerY + cuvettHeight / 2 + 55);
  }, [depth, refractiveIndex, uvIntensity, irradiationMode, time]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        width={300}
        height={400}
        className="border border-primary/30 rounded-lg bg-gradient-to-b from-background to-sidebar/50"
      />
      <motion.div
        className="mt-4 text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-sm text-primary font-semibold">Live Simulation</p>
        <p className="text-xs text-foreground/60">Time: {time.toFixed(0)} min</p>
      </motion.div>
    </div>
  );
}
