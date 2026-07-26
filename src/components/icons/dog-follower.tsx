"use client";

import React, { useRef, useEffect, useState } from "react";

// Calculate distance between two points
function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// Normalize angle to handle shortest path interpolation smoothly (-180 to 180)
function normalizeAngle(angle: number): number {
  let a = angle % 360;
  if (a > 180) a -= 360;
  if (a < -180) a += 360;
  return a;
}

export default function DogFollower() {
  const [isClient, setIsClient] = useState(false);
  
  const dogRef = useRef<HTMLImageElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef(0);
  const requestRef = useRef<number>();

  // Distance threshold - dog stops running when close enough
  const STOP_DISTANCE = 60;
  // Lerp factor controls how fast/snappy the dog follows (lower = slower/smoother)
  const LERP_FACTOR = 0.005;

  // Initialize on client side
  useEffect(() => {
    setIsClient(true);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseRef.current = { x: centerX, y: centerY };
    posRef.current = { x: centerX, y: centerY };
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate dog directly manipulating DOM for ultra-smooth 60fps without React state lag
  useEffect(() => {
    if (!isClient) return;

    function animate() {
      if (!dogRef.current) return;
      
      const mouse = mouseRef.current;
      const currentPos = posRef.current;
      
      const distance = getDistance(currentPos.x, currentPos.y, mouse.x, mouse.y);
      
      // If beyond stop distance, move and rotate towards cursor
      if (distance > STOP_DISTANCE) {
        // Smoothly interpolate position towards mouse
        currentPos.x += (mouse.x - currentPos.x) * LERP_FACTOR;
        currentPos.y += (mouse.y - currentPos.y) * LERP_FACTOR;
        
        // Target rotation based on full 360 trajectory
        const dx = mouse.x - currentPos.x;
        const dy = mouse.y - currentPos.y;
        
        const targetAngleRad = Math.atan2(dy, dx);
        let targetAngleDeg = (targetAngleRad * 180) / Math.PI;

        // Smoothly interpolate rotation using shortest path
        let angleDiff = normalizeAngle(targetAngleDeg - rotRef.current);
        
        // Rotate smoothly towards the target angle
        rotRef.current += angleDiff * 0.05; // slightly faster lerp for rotation than movement
        rotRef.current = normalizeAngle(rotRef.current);
        
        // Update DOM directly
        dogRef.current.style.left = `${currentPos.x - 32}px`;
        dogRef.current.style.top = `${currentPos.y - 32}px`;
        
        // Apply 360 rotation (but flip vertically if moving left so it's not completely upside down)
        // If the rotation is pointing left (between 90 and 180, or -90 and -180), we flip the Y axis 
        // to keep the dog upright while maintaining the correct trajectory angle.
        const isFacingLeft = Math.abs(rotRef.current) > 90;
        dogRef.current.style.transform = `rotate(${rotRef.current}deg) scaleY(${isFacingLeft ? -1 : 1})`;
        
      } else {
        // Dog has reached the stop distance, just pause movement.
        // We gently level out the dog to be upright when stopped
        let targetAngleDeg = 0;
        // If it was facing left when it stopped, level it out facing left
        const isFacingLeft = Math.abs(rotRef.current) > 90;
        if (isFacingLeft) targetAngleDeg = 180;
        
        let angleDiff = normalizeAngle(targetAngleDeg - rotRef.current);
        rotRef.current += angleDiff * 0.05;
        rotRef.current = normalizeAngle(rotRef.current);

        dogRef.current.style.transform = `rotate(${rotRef.current}deg) scaleY(${isFacingLeft ? -1 : 1})`;
      }

      requestRef.current = requestAnimationFrame(animate);
    }

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <img
      ref={dogRef}
      src="/dog-image-unscreen.gif"
      alt="dog follower"
      style={{
        position: "fixed",
        width: 80,
        height: 80,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform, left, top",
      }}
    />
  );
}
