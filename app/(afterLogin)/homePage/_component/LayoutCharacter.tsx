"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LayerdCharacter.module.css";

interface CharacterLayers {
  base: string;
  hair: string;
  top: string;
  bottom: string;
  shoes: string;
  head?: string;
}

interface LayeredCharacterProps {
  layers: CharacterLayers;
  className?: string;
  cropTop?: number;
  cropBottom?: number;
}

export default function LayeredCharacter({
  layers,
  className = "",
  cropTop = 0,
  cropBottom = 0,
}: LayeredCharacterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 120, height: 120 });
  const renderIdRef = useRef(0); // 렌더링 ID 추적

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

  // 캔버스에 레이어 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 현재 렌더링 ID 증가
    const currentRenderId = ++renderIdRef.current;
    const { width, height } = dimensions;

    // 레이어 순서 정의 (아래부터 위로)
    const layerOrder = [layers.base, layers.shoes, layers.bottom, layers.top, layers.hair, layers.head].filter(
      Boolean
    ) as string[];

    let isCancelled = false;

    const loadAndDrawLayers = async () => {
      // 캔버스 완전히 초기화
      ctx.clearRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = false;

      for (const imageUrl of layerOrder) {
        // 이 렌더링이 취소되었거나 새로운 렌더링이 시작되었는지 확인
        if (isCancelled || currentRenderId !== renderIdRef.current) {
          return;
        }

        try {
          const img = await loadImage(imageUrl);

          // 이미지 로드 후 다시 확인
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

    // Cleanup: 이 effect가 종료되면 렌더링 취소
    return () => {
      isCancelled = true;
      // 캔버스 초기화
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
