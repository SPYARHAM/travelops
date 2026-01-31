"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function AnimatedGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create globe
    const geometry = new THREE.IcosahedronGeometry(2, 24);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4f46e5,
      wireframe: false,
      emissive: 0x2d2d5f,
      shininess: 10,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Create wireframe
    const wireframeGeometry = new THREE.IcosahedronGeometry(2.05, 24);
    const wireframeMaterial = new THREE.MeshPhongMaterial({
      color: 0x818cf8,
      wireframe: true,
      emissive: 0x1e1e3f,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Add route lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xa5b4fc,
      transparent: true,
      opacity: 0.4,
      linewidth: 2,
    });

    // Create random routes
    const routePoints = [
      [0, 0, 2.2],
      [1.5, 1, 2.2],
      [1, -1.5, 2.2],
      [-1, 1.5, 2.2],
    ];

    for (let i = 0; i < routePoints.length; i++) {
      for (let j = i + 1; j < routePoints.length; j++) {
        const points = [
          new THREE.Vector3(...(routePoints[i] as [number, number, number])),
          new THREE.Vector3(...(routePoints[j] as [number, number, number])),
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
      }
    }

    // Lighting
    const light1 = new THREE.PointLight(0xffffff, 1);
    light1.position.set(5, 3, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x6366f1, 0.5);
    light2.position.set(-5, -3, 3);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    camera.position.z = 5;

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Very slow rotation
      globe.rotation.x += 0.0001;
      globe.rotation.y += 0.0003;

      wireframe.rotation.x = globe.rotation.x;
      wireframe.rotation.y = globe.rotation.y;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
