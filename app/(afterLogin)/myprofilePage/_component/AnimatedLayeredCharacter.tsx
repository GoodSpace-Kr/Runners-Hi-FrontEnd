"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AnimatedLayeredCharacter.module.css";

interface CharacterLayers {
  base?: string;
  hair: string;
  top: string;
  bottom: string;
  shoes: string;
  head?: string;
}

interface AnimatedLayeredCharacterProps {
  layers: CharacterLayers;
  frameCount?: number;
  frameRate?: number;
  className?: string;
  cropTop?: number;
  cropBottom?: number;
}

export default function AnimatedLayeredCharacter({
  layers,
  frameCount = 4,
  frameRate = 8,
  className = "",
  cropTop = 0,
  cropBottom = 0,
}: AnimatedLayeredCharacterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 200, height: 180 });
  const [currentFrame, setCurrentFrame] = useState(1);
  const renderIdRef = useRef(0);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

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

  // 애니메이션 프레임 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev % frameCount) + 1);
    }, 1000 / frameRate);

    return () => clearInterval(interval);
  }, [frameCount, frameRate]);

  // 캔버스에 현재 프레임 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentRenderId = ++renderIdRef.current;
    const { width, height } = dimensions;

    // 현재 프레임의 레이어 경로 생성
    const currentFrameLayers = {
      base: layers.base ? `${layers.base}/frame${currentFrame}.png` : undefined,
      shoes: `${layers.shoes}/frame${currentFrame}.png`,
      bottom: `${layers.bottom}/frame${currentFrame}.png`,
      top: `${layers.top}/frame${currentFrame}.png`,
      hair: `${layers.hair}/frame${currentFrame}.png`,
      head: layers.head ? `${layers.head}/frame${currentFrame}.png` : undefined,
    };

    // 레이어 순서 정의 (아래부터 위로)
    const layerOrder = [
      currentFrameLayers.base,
      currentFrameLayers.shoes,
      currentFrameLayers.bottom,
      currentFrameLayers.top,
      currentFrameLayers.hair,
      currentFrameLayers.head,
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
          // eslint-disable-next-line react-hooks/immutability
          const img = await loadImageCached(imageUrl);

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
  }, [layers, currentFrame, dimensions, cropTop, cropBottom, frameCount]);

  // 이미지 캐싱
  const loadImageCached = async (src: string): Promise<HTMLImageElement> => {
    if (imageCache.current.has(src)) {
      return imageCache.current.get(src)!;
    }

    const img = await loadImage(src);
    imageCache.current.set(src, img);
    return img;
  };

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
