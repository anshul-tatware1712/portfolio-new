"use client";

import React, { useRef, useEffect, useState } from "react";

// Calculate distance between two points
function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// Move toward target at constant speed
function moveTowards(
  currentX: number,
  currentY: number,
  targetX: number,
  targetY: number,
  speed: number,
): { x: number; y: number } {
  const dx = targetX - currentX;
  const dy = targetY - currentY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // If we're close enough, stop
  if (distance <= speed) {
    return { x: targetX, y: targetY };
  }

  // Move at constant speed toward target
  const ratio = speed / distance;
  return {
    x: currentX + dx * ratio,
    y: currentY + dy * ratio,
  };
}

export default function DogFollower() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [dog, setDog] = useState({ x: 0, y: 0 });
  const [facingLeft, setFacingLeft] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const requestRef = useRef<number>();

  // Distance threshold - dog stops running when close enough
  const STOP_DISTANCE = 50;
  // Constant speed in pixels per frame (adjust for faster/slower)
  const SPEED = 1;

  // Initialize on client side
  useEffect(() => {
    setIsClient(true);
    setMouse({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setDog({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate dog following cursor with constant speed
  useEffect(() => {
    function animate() {
      setDog((d) => {
        const distance = getDistance(d.x, d.y, mouse.x, mouse.y);

        // Only move if far enough from cursor
        if (distance > STOP_DISTANCE) {
          setIsRunning(true);

          // Determine if dog should face left or right
          if (mouse.x < d.x) {
            setFacingLeft(true);
          } else if (mouse.x > d.x) {
            setFacingLeft(false);
          }

          // Move toward cursor at constant speed
          return moveTowards(d.x, d.y, mouse.x, mouse.y, SPEED);
        } else {
          setIsRunning(false);
          return d;
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    }

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mouse]);

  if (!isClient) return null;

  return (
    <img
      src="/dog-image-unscreen.gif"
      alt="dog follower"
      className={isRunning ? "running" : "idle"}
      style={{
        position: "fixed",
        left: `${dog.x - 32}px`,
        top: `${dog.y - 32}px`,
        width: 80,
        height: 80,
        pointerEvents: "none",
        zIndex: 9999,
        // Flip horizontally when facing left
        transform: facingLeft ? "scaleX(-1)" : "scaleX(1)",
        transition: "transform 0.2s ease-out",
      }}
    />
  );
}
