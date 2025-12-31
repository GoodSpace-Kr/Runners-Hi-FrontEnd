"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StaticLayeredCharacter.module.css";

interface CharacterLayers {
  base?: string;
  hair: string;
  top: string;
  bottom: string;
  shoes: string;
  head?: string;
}

interface StaticLayeredCharacterProps {
  layers: CharacterLayers; // 각 부위의 폴더 경로
  className?: string;
  cropTop?: number;
  cropBottom?: number;
}

export default function StaticLayeredCharacter({
  layers,
  className = "",
  cropTop = 0,
  cropBottom = 0,
}: StaticLayeredCharacterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 180, height: 180 });
  const renderIdRef = useRef(0);

  // 부모 컨테이너 크기 감지
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.floor(width * 2),
          height: Math.floor(height * 2),
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 캔버스에 frame1만 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentRenderId = ++renderIdRef.current;
    const { width, height } = dimensions;

    // frame1만 사용 (애니메이션 폴더에서 첫 번째 프레임)
    const frame1Layers = {
      base: layers.base ? `${layers.base}/frame1.png` : undefined,
      shoes: `${layers.shoes}/frame1.png`,
      bottom: `${layers.bottom}/frame1.png`,
      top: `${layers.top}/frame1.png`,
      hair: `${layers.hair}/frame1.png`,
      head: layers.head ? `${layers.head}/frame1.png` : undefined,
    };

    // 레이어 순서 정의 (아래부터 위로)
    const layerOrder = [
      frame1Layers.base,
      frame1Layers.shoes,
      frame1Layers.bottom,
      frame1Layers.top,
      frame1Layers.hair,
      frame1Layers.head,
    ].filter(Boolean) as string[];

    let isCancelled = false;

    const loadAndDrawLayers = async () => {
      // 캔버스 완전히 초기화
      ctx.clearRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = false;

      for (const imageUrl of layerOrder) {
        if (isCancelled || currentRenderId !== renderIdRef.current) {
          return;
        }

        try {
          const img = await loadImage(imageUrl);

          if (isCancelled || currentRenderId !== renderIdRef.current) {
            return;
          }

          const sourceX = 0;
          const sourceY = cropTop;
          const sourceWidth = img.width;
          const sourceHeight = img.height - cropTop - cropBottom;

          ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
        } catch (error) {
          console.error("Failed to load layer:", imageUrl, error);
        }
      }
    };

    loadAndDrawLayers();

    return () => {
      isCancelled = true;
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }
    };
  }, [layers, dimensions, cropTop, cropBottom]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className={`${styles.canvas} ${className}`}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
