"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type RainDrop = {
  mesh: THREE.Mesh;
  speed: number;
  sway: number;
  phase: number;
};

type Leaf = {
  mesh: THREE.Mesh;
  speed: number;
  rotationSpeed: number;
  sway: number;
  phase: number;
};

export default function Falls() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;

    if (!container) return;

    const scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(
      0x1b3026,
      0.012
    );

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      150
    );

    camera.position.set(0, 2, 18);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type =
      THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // =====================================================
    // LIGHT
    // =====================================================

    scene.add(
      new THREE.HemisphereLight(
        0xd9f5ff,
        0x132118,
        2.5
      )
    );

    const sun = new THREE.DirectionalLight(
      0xffe7c5,
      4.5
    );

    sun.position.set(
      -10,
      15,
      10
    );

    scene.add(sun);

    const blueLight = new THREE.PointLight(
      0x77bbff,
      18,
      45
    );

    blueLight.position.set(
      -8,
      5,
      8
    );

    scene.add(blueLight);

    const greenLight = new THREE.PointLight(
      0x4dff9a,
      10,
      40
    );

    greenLight.position.set(
      8,
      4,
      4
    );

    scene.add(greenLight);

    // =====================================================
    // DARK SKY
    // =====================================================

    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(
        70,
        48,
        32
      ),
      new THREE.MeshBasicMaterial({
        color: 0x10231a,
        side: THREE.BackSide,
      })
    );

    scene.add(sky);

    // =====================================================
    // GLOWING MOON
    // =====================================================

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(
        1.4,
        48,
        48
      ),
      new THREE.MeshStandardMaterial({
        color: 0xf0eadc,
        roughness: 1,
        emissive: 0x47443b,
        emissiveIntensity: 0.5,
      })
    );

    moon.position.set(
      7,
      8,
      -10
    );

    scene.add(moon);

    const moonGlow = new THREE.Mesh(
      new THREE.SphereGeometry(
        2,
        32,
        32
      ),
      new THREE.MeshBasicMaterial({
        color: 0xb8d7ff,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      })
    );

    moonGlow.position.copy(
      moon.position
    );

    scene.add(moonGlow);

    // =====================================================
    // GROUND
    // =====================================================

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(
        100,
        100
      ),
      new THREE.MeshStandardMaterial({
        color: 0x0d1c12,
        roughness: 1,
      })
    );

    ground.rotation.x =
      -Math.PI / 2;

    ground.position.y =
      -5;

    ground.receiveShadow = true;

    scene.add(ground);

    // =====================================================
    // WATER
    // =====================================================

    const water = new THREE.Mesh(
      new THREE.CircleGeometry(
        13,
        128
      ),
      new THREE.MeshPhysicalMaterial({
        color: 0x214f58,
        roughness: 0.08,
        metalness: 0.2,
        transparent: true,
        opacity: 0.95,
      })
    );

    water.rotation.x =
      -Math.PI / 2;

    water.position.y =
      -4.88;

    scene.add(water);

    // =====================================================
    // MOUNTAINS
    // =====================================================

    const mountainGroup =
      new THREE.Group();

    scene.add(mountainGroup);

    const mountainMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x20342b,
        roughness: 1,
        flatShading: true,
      });

    for (let i = 0; i < 16; i++) {
      const height =
        7 +
        Math.random() * 9;

      const mountain =
        new THREE.Mesh(
          new THREE.ConeGeometry(
            3 +
              Math.random() * 2.5,
            height,
            8
          ),
          mountainMaterial
        );

      mountain.position.set(
        -38 +
          i * 5,
        height / 2 - 5,
        -18 -
          Math.random() * 6
      );

      mountain.scale.x =
        1.3 +
        Math.random() * 1.3;

      mountainGroup.add(
        mountain
      );
    }

    // =====================================================
    // TREES
    // =====================================================

    const treeGroup =
      new THREE.Group();

    scene.add(treeGroup);

    const trunkMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x4a2d1d,
        roughness: 1,
      });

    const foliageMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x1c4d2a,
        roughness: 1,
      });

    for (let i = 0; i < 38; i++) {
      const tree =
        new THREE.Group();

      const trunk =
        new THREE.Mesh(
          new THREE.CylinderGeometry(
            0.12,
            0.25,
            3.3,
            8
          ),
          trunkMaterial
        );

      trunk.position.y =
        -3.1;

      tree.add(trunk);

      const crown =
        new THREE.Mesh(
          new THREE.ConeGeometry(
            1.1 +
              Math.random() * 0.4,
            3.5 +
              Math.random() * 1.4,
            9
          ),
          foliageMaterial
        );

      crown.position.y =
        -1.1;

      tree.add(crown);

      tree.position.set(
        -32 +
          Math.random() * 64,
        0,
        -8 +
          Math.random() * 10
      );

      tree.scale.setScalar(
        0.7 +
          Math.random() * 1.7
      );

      treeGroup.add(tree);
    }

    // =====================================================
    // RAIN
    // =====================================================

    const rainGeometry =
      new THREE.CylinderGeometry(
        0.018,
        0.045,
        1.2,
        8
      );

    const rainMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xd2efff,
        transparent: true,
        opacity: 0.9,
      });

    const rainDrops: RainDrop[] =
      [];

    for (let i = 0; i < 450; i++) {
      const drop =
        new THREE.Mesh(
          rainGeometry,
          rainMaterial
        );

      drop.position.set(
        (Math.random() - 0.5) *
          42,

        -3 +
          Math.random() * 30,

        -4 +
          Math.random() * 24
      );

      drop.rotation.x =
        0.05;

      scene.add(drop);

      rainDrops.push({
        mesh: drop,
        speed:
          0.11 +
          Math.random() * 0.13,
        sway:
          0.003 +
          Math.random() * 0.008,
        phase:
          Math.random() *
          Math.PI *
          2,
      });
    }

    // =====================================================
    // FALLING LEAVES
    // =====================================================

    const leafGeometry =
      new THREE.PlaneGeometry(
        0.2,
        0.45
      );

    const leafColors = [
      0x2a6135,
      0x4f873f,
      0x7c742d,
      0x654929,
    ];

    const leaves: Leaf[] = [];

    for (let i = 0; i < 120; i++) {
      const leaf =
        new THREE.Mesh(
          leafGeometry,
          new THREE.MeshBasicMaterial({
            color:
              leafColors[
                Math.floor(
                  Math.random() *
                    leafColors.length
                )
              ],
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.95,
            depthWrite: false,
          })
        );

      leaf.position.set(
        (Math.random() - 0.5) *
          40,

        -3 +
          Math.random() * 25,

        -2 +
          Math.random() * 22
      );

      scene.add(leaf);

      leaves.push({
        mesh: leaf,
        speed:
          0.008 +
          Math.random() * 0.018,
        rotationSpeed:
          0.006 +
          Math.random() * 0.016,
        sway:
          0.015 +
          Math.random() * 0.025,
        phase:
          Math.random() *
          Math.PI *
          2,
      });
    }

    // =====================================================
    // MIST
    // =====================================================

    const mistGroup =
      new THREE.Group();

    scene.add(mistGroup);

    const mistMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xd0e5dc,
        transparent: true,
        opacity: 0.07,
        depthWrite: false,
      });

    for (let i = 0; i < 30; i++) {
      const mist =
        new THREE.Mesh(
          new THREE.SphereGeometry(
            1,
            16,
            16
          ),
          mistMaterial
        );

      mist.position.set(
        (Math.random() - 0.5) *
          45,

        -2 +
          Math.random() * 7,

        -5 +
          Math.random() * 12
      );

      mist.scale.set(
        2 +
          Math.random() * 5,

        0.5 +
          Math.random(),

        1
      );

      mistGroup.add(mist);
    }

    // =====================================================
    // PARALLAX
    // =====================================================

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    const pointerMove = (
      event: PointerEvent
    ) => {
      targetX =
        (event.clientX /
          window.innerWidth -
          0.5) *
        2;

      targetY =
        (event.clientY /
          window.innerHeight -
          0.5) *
        2;
    };

    window.addEventListener(
      "pointermove",
      pointerMove
    );

    // =====================================================
    // ANIMATION
    // =====================================================

    let time = 0;
    let animationId = 0;

    const animate = () => {
      animationId =
        requestAnimationFrame(
          animate
        );

      time += 0.01;

      currentX +=
        (targetX - currentX) *
        0.025;

      currentY +=
        (targetY - currentY) *
        0.025;

      camera.position.x =
        currentX * 1.5;

      camera.position.y =
        2 -
        currentY * 0.8;

      camera.lookAt(
        0,
        -1,
        -5
      );

      // Rain
      rainDrops.forEach(
        (drop) => {
          drop.mesh.position.y -=
            drop.speed;

          drop.mesh.position.x +=
            Math.sin(
              time * 1.4 +
                drop.phase
            ) *
            drop.sway;

          if (
            drop.mesh.position.y <
            -5
          ) {
            drop.mesh.position.y =
              22 +
              Math.random() *
                8;

            drop.mesh.position.x =
              (Math.random() - 0.5) *
              42;

            drop.mesh.position.z =
              -4 +
              Math.random() * 24;
          }
        }
      );

      // Leaves
      leaves.forEach(
        (leaf) => {
          leaf.mesh.position.y -=
            leaf.speed;

          leaf.mesh.position.x +=
            Math.sin(
              time +
                leaf.phase
            ) *
            leaf.sway;

          leaf.mesh.rotation.x +=
            leaf.rotationSpeed;

          leaf.mesh.rotation.y +=
            leaf.rotationSpeed *
            0.7;

          leaf.mesh.rotation.z +=
            leaf.rotationSpeed *
            0.4;

          if (
            leaf.mesh.position.y <
            -5
          ) {
            leaf.mesh.position.y =
              16 +
              Math.random() *
                8;

            leaf.mesh.position.x =
              (Math.random() - 0.5) *
              40;
          }
        }
      );

      // Trees subtle movement
      treeGroup.rotation.y =
        Math.sin(time * 0.08) *
        0.015;

      // Mist
      mistGroup.position.x =
        Math.sin(
          time * 0.12
        ) * 2;

      mistGroup.position.z =
        Math.cos(
          time * 0.1
        );

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // =====================================================
    // RESIZE
    // =====================================================

    const resize = () => {
      const width =
        container.clientWidth;

      const height =
        container.clientHeight;

      camera.aspect =
        width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height
      );
    };

    window.addEventListener(
      "resize",
      resize
    );

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      cancelAnimationFrame(
        animationId
      );

      window.removeEventListener(
        "pointermove",
        pointerMove
      );

      window.removeEventListener(
        "resize",
        resize
      );

      rainGeometry.dispose();
      rainMaterial.dispose();

      leafGeometry.dispose();

      renderer.dispose();

      if (
        container.contains(
          renderer.domElement
        )
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="falls-scene"
      aria-hidden="true"
    />
  );
}