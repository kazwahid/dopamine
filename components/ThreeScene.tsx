'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'kinetic' | 'soft'>('kinetic');

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.25, 5.8);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(1.35, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0xb78bff,
      metalness: 0.75,
      roughness: 0.24,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.02, 12, 96),
      new THREE.MeshBasicMaterial({
        color: 0xb78bff,
        transparent: true,
        opacity: 0.45,
      })
    );
    ring.rotation.x = Math.PI * 0.28;
    group.add(ring);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.PointLight(0xb78bff, 22, 12);
    key.position.set(2.5, 3, 4);
    scene.add(key);
    const fill = new THREE.PointLight(0x00d4ff, 10, 10);
    fill.position.set(-3, -1, 2);
    scene.add(fill);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    const resize = new ResizeObserver(onResize);
    resize.observe(mount);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      if (!reduced) {
        group.rotation.y = t * (mode === 'kinetic' ? 0.22 : 0.06);
        group.rotation.x = Math.sin(t * 0.5) * 0.08;
      }
      const color =
        mode === 'kinetic' ? new THREE.Color(0xb78bff) : new THREE.Color(0xffb366);
      mesh.material.color.copy(color);
      key.color.copy(color);
      (ring.material as THREE.MeshBasicMaterial).color.copy(color);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [mode]);

  return (
    <div className="three-shell">
      <div
        ref={mountRef}
        className="three-canvas"
        aria-label="Interactive 3D geometry scene"
        role="img"
      />
      <div className="three-controls" aria-label="3D material controls">
        <button
          type="button"
          className={mode === 'kinetic' ? 'active' : ''}
          onClick={() => setMode('kinetic')}
        >
          Kinetic
        </button>
        <button
          type="button"
          className={mode === 'soft' ? 'active' : ''}
          onClick={() => setMode('soft')}
        >
          Soft
        </button>
      </div>
      <p className="three-fallback">
        WebGL powers this live scene. The surrounding content tells the full
        story without it.
      </p>
    </div>
  );
}
