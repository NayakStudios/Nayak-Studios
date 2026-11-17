"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type CarInfo = {
  name: string;
  label: string;
  description: string;
  target: string;
  model: string;
  color: number;
};

const cars: CarInfo[] = [
  {
    name: "BUSINESS",
    label: "VEHICLE 01",
    description:
      "Future ventures, business ideas and business opportunities.",
    target: "business",
    model: "/models/business-car.glb",
    color: 0x596cff,
  },
  {
    name: "APPS",
    label: "VEHICLE 02",
    description:
      "Apps, games and digital products created at Nayak Studios.",
    target: "apps",
    model: "/models/apps-car.glb",
    color: 0x29d8ee,
  },
  {
    name: "ABOUT NAYAK",
    label: "VEHICLE 03",
    description:
      "The studio, support and private portfolio.",
    target: "about",
    model: "/models/about-car.glb",
    color: 0x9b68ff,
  },
];

type CarObject = {
  group: THREE.Group;
  loadedModel?: THREE.Object3D;
};

export default function Showroom() {
  const mountRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState(0);

  const selectedRef = useRef(0);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    const container = mountRef.current;

    if (!container) return;

    // =====================================================
    // SCENE
    // =====================================================

    const scene = new THREE.Scene();

    // =====================================================
    // CAMERA
    // =====================================================

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );

    camera.position.set(0, 3.2, 10.5);

    // =====================================================
    // RENDERER
    // =====================================================

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

    renderer.toneMapping =
      THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure = 1.1;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type =
      THREE.PCFSoftShadowMap;

    container.appendChild(
      renderer.domElement
    );

    // =====================================================
    // LIGHTS
    // =====================================================

    scene.add(
      new THREE.HemisphereLight(
        0xffffff,
        0x10131e,
        1.8
      )
    );

    const keyLight =
      new THREE.DirectionalLight(
        0xffffff,
        4
      );

    keyLight.position.set(
      6,
      9,
      7
    );

    keyLight.castShadow = true;

    keyLight.shadow.mapSize.set(
      2048,
      2048
    );

    scene.add(keyLight);

    const blueLight =
      new THREE.PointLight(
        0x586cff,
        45,
        20
      );

    blueLight.position.set(
      -5,
      4,
      3
    );

    scene.add(blueLight);

    const cyanLight =
      new THREE.PointLight(
        0x54e8ff,
        35,
        18
      );

    cyanLight.position.set(
      0,
      1,
      6
    );

    scene.add(cyanLight);

    const purpleLight =
      new THREE.PointLight(
        0xa56cff,
        30,
        18
      );

    purpleLight.position.set(
      5,
      3,
      -3
    );

    scene.add(purpleLight);

    // =====================================================
    // FLOOR
    // =====================================================

    const floor =
      new THREE.Mesh(
        new THREE.CircleGeometry(
          18,
          128
        ),
        new THREE.MeshStandardMaterial({
          color: 0x06080e,
          metalness: 0.85,
          roughness: 0.22,
        })
      );

    floor.rotation.x =
      -Math.PI / 2;

    floor.position.y =
      -0.45;

    floor.receiveShadow = true;

    scene.add(floor);

    // =====================================================
    // ROUND STAGE
    // =====================================================

    const stage =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          5.25,
          5.25,
          0.4,
          128
        ),
        new THREE.MeshStandardMaterial({
          color: 0x070910,
          metalness: 0.9,
          roughness: 0.2,
        })
      );

    stage.position.y =
      -0.2;

    stage.receiveShadow = true;

    scene.add(stage);

    // =====================================================
    // GLOW RINGS
    // =====================================================

    const outerRing =
      new THREE.Mesh(
        new THREE.TorusGeometry(
          4.7,
          0.035,
          16,
          128
        ),
        new THREE.MeshBasicMaterial({
          color: 0x54e8ff,
        })
      );

    outerRing.rotation.x =
      Math.PI / 2;

    outerRing.position.y =
      0.03;

    scene.add(outerRing);

    const innerRing =
      new THREE.Mesh(
        new THREE.TorusGeometry(
          3.65,
          0.018,
          12,
          96
        ),
        new THREE.MeshBasicMaterial({
          color: 0x806cff,
        })
      );

    innerRing.rotation.x =
      Math.PI / 2;

    innerRing.position.y =
      0.04;

    scene.add(innerRing);

    // =====================================================
    // FALLBACK CAR
    // =====================================================

    const createFallbackCar = (
      color: number,
      index: number
    ) => {
      const car =
        new THREE.Group();

      car.userData.carIndex =
        index;

      const bodyMaterial =
        new THREE.MeshStandardMaterial({
          color,
          metalness: 0.82,
          roughness: 0.2,
        });

      const darkMaterial =
        new THREE.MeshStandardMaterial({
          color: 0x06070b,
          metalness: 0.8,
          roughness: 0.2,
        });

      const glassMaterial =
        new THREE.MeshPhysicalMaterial({
          color: 0x08131f,
          metalness: 0.15,
          roughness: 0.03,
          transparent: true,
          opacity: 0.92,
        });

      // Main body
      const body =
        new THREE.Mesh(
          new THREE.BoxGeometry(
            3.9,
            0.68,
            1.75
          ),
          bodyMaterial
        );

      body.position.y =
        0.65;

      body.castShadow = true;

      car.add(body);

      // Front hood
      const hood =
        new THREE.Mesh(
          new THREE.BoxGeometry(
            1.45,
            0.35,
            1.6
          ),
          bodyMaterial
        );

      hood.position.set(
        1.35,
        0.91,
        0
      );

      hood.castShadow = true;

      car.add(hood);

      // Cabin
      const cabin =
        new THREE.Mesh(
          new THREE.BoxGeometry(
            1.95,
            0.76,
            1.4
          ),
          glassMaterial
        );

      cabin.position.set(
        -0.25,
        1.18,
        0
      );

      cabin.rotation.z =
        -0.07;

      car.add(cabin);

      // Roof
      const roof =
        new THREE.Mesh(
          new THREE.BoxGeometry(
            1.35,
            0.12,
            1.4
          ),
          bodyMaterial
        );

      roof.position.set(
        -0.25,
        1.58,
        0
      );

      car.add(roof);

      // Wheels
      const wheelPositions = [
        [1.28, 0.42, 0.88],
        [1.28, 0.42, -0.88],
        [-1.38, 0.42, 0.88],
        [-1.38, 0.42, -0.88],
      ];

      wheelPositions.forEach(
        ([x, y, z]) => {
          const wheel =
            new THREE.Mesh(
              new THREE.CylinderGeometry(
                0.44,
                0.44,
                0.28,
                32
              ),
              darkMaterial
            );

          wheel.rotation.x =
            Math.PI / 2;

          wheel.position.set(
            x,
            y,
            z
          );

          wheel.castShadow = true;

          car.add(wheel);

          const rim =
            new THREE.Mesh(
              new THREE.CylinderGeometry(
                0.18,
                0.18,
                0.3,
                24
              ),
              new THREE.MeshStandardMaterial({
                color: 0xbfc5d0,
                metalness: 1,
                roughness: 0.12,
              })
            );

          rim.rotation.x =
            Math.PI / 2;

          rim.position.set(
            x,
            y,
            z
          );

          car.add(rim);
        }
      );

      // Headlights
      const headlightMaterial =
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xb8f2ff,
          emissiveIntensity: 5,
        });

      const head1 =
        new THREE.Mesh(
          new THREE.BoxGeometry(
            0.12,
            0.16,
            0.45
          ),
          headlightMaterial
        );

      head1.position.set(
        1.95,
        0.76,
        0.52
      );

      car.add(head1);

      const head2 =
        head1.clone();

      head2.position.z =
        -0.52;

      car.add(head2);

      // Underglow
      const glow =
        new THREE.PointLight(
          color,
          12,
          4
        );

      glow.position.y =
        0.02;

      car.add(glow);

      return car;
    };

    // =====================================================
    // CREATE 3 VEHICLE CONTAINERS
    // =====================================================

    const vehicleObjects:
      CarObject[] = [];

    for (let i = 0; i < cars.length; i++) {
      const fallback =
        createFallbackCar(
          cars[i].color,
          i
        );

      vehicleObjects.push({
        group: fallback,
      });

      scene.add(fallback);

      // Hide fallback initially only after
      // actual GLB successfully loads.
      fallback.visible = true;
    }

    // =====================================================
    // TRY LOAD REAL GLB MODELS
    // =====================================================

    const loader =
      new GLTFLoader();

    cars.forEach(
      (carData, index) => {
        loader.load(
          carData.model,

          (gltf) => {
            const model =
              gltf.scene;

            model.traverse(
              (child) => {
                if (
                  child instanceof
                  THREE.Mesh
                ) {
                  child.castShadow =
                    true;

                  child.receiveShadow =
                    true;

                  const materials =
                    Array.isArray(
                      child.material
                    )
                      ? child.material
                      : [child.material];

                  materials.forEach(
                    (material) => {
                      if (
                        material instanceof
                          THREE.MeshStandardMaterial ||
                        material instanceof
                          THREE.MeshPhysicalMaterial
                      ) {
                        material.envMapIntensity =
                          1.5;
                      }
                    }
                  );
                }
              }
            );

            model.userData.carIndex =
              index;

            model.position.y =
              -0.15;

            model.visible = true;

            vehicleObjects[index]
              .group.visible = false;

            vehicleObjects[index]
              .loadedModel = model;

            scene.add(model);
          },

          undefined,

          () => {
            // No error spam.
            // Fallback car stays visible.
          }
        );
      }
    );

    // =====================================================
    // DRAG
    // =====================================================

    let dragging = false;
    let moved = false;

    let previousX = 0;

    let targetRotation = 0;
    let currentRotation = 0;

    const pointerDown =
      (event: PointerEvent) => {
        dragging = true;
        moved = false;

        previousX =
          event.clientX;

        container.style.cursor =
          "grabbing";
      };

    const pointerMove =
      (event: PointerEvent) => {
        if (!dragging) return;

        const delta =
          event.clientX -
          previousX;

        if (
          Math.abs(delta) > 3
        ) {
          moved = true;
        }

        targetRotation +=
          delta * 0.006;

        previousX =
          event.clientX;
      };

    const pointerUp =
      (event: PointerEvent) => {
        if (!dragging) return;

        dragging = false;

        container.style.cursor =
          "grab";

        if (!moved) {
          const rect =
            renderer.domElement.getBoundingClientRect();

          const mouse =
            new THREE.Vector2(
              ((event.clientX -
                rect.left) /
                rect.width) *
                2 -
                1,

              -(
                ((event.clientY -
                  rect.top) /
                  rect.height) *
                  2 -
                1
              )
            );

          const raycaster =
            new THREE.Raycaster();

          raycaster.setFromCamera(
            mouse,
            camera
          );

          const clickableObjects:
            THREE.Object3D[] = [];

          vehicleObjects.forEach(
            (vehicle) => {
              clickableObjects.push(
                vehicle.group
              );

              if (
                vehicle.loadedModel
              ) {
                clickableObjects.push(
                  vehicle.loadedModel
                );
              }
            }
          );

          const hits =
            raycaster.intersectObjects(
              clickableObjects,
              true
            );

          if (hits.length > 0) {
            let object =
              hits[0].object;

            let index:
              number | undefined;

            while (
              object
            ) {
              if (
                typeof object.userData
                  ?.carIndex ===
                "number"
              ) {
                index =
                  object.userData.carIndex;

                break;
              }

              object =
                object.parent as THREE.Object3D;
            }

            if (
              typeof index ===
              "number"
            ) {
              setSelected(index);

              document
                .getElementById(
                  cars[index].target
                )
                ?.scrollIntoView({
                  behavior:
                    "smooth",
                  block: "start",
                });
            }
          }
        }
      };

    const pointerLeave =
      () => {
        dragging = false;

        container.style.cursor =
          "grab";
      };

    container.addEventListener(
      "pointerdown",
      pointerDown
    );

    container.addEventListener(
      "pointermove",
      pointerMove
    );

    container.addEventListener(
      "pointerup",
      pointerUp
    );

    container.addEventListener(
      "pointerleave",
      pointerLeave
    );

    // =====================================================
    // ANIMATION
    // =====================================================

    let animationId = 0;

    const animate = () => {
      animationId =
        requestAnimationFrame(
          animate
        );

      currentRotation +=
        (
          targetRotation -
          currentRotation
        ) * 0.08;

      const radius = 3.75;

      vehicleObjects.forEach(
        (vehicle, index) => {
          const angle =
            index *
              (
                (Math.PI * 2) /
                cars.length
              ) +
            currentRotation;

          const x =
            Math.sin(angle) *
            radius;

          const z =
            Math.cos(angle) *
            radius;

          const depth =
            (z + radius) /
            (radius * 2);

          let scale =
            0.72 +
            depth * 0.28;

          if (
            index ===
            selectedRef.current
          ) {
            scale *= 1.06;
          }

          // Fallback
          vehicle.group.position.set(
            x,
            -0.15,
            z
          );

          vehicle.group.rotation.y =
            angle + Math.PI;

          vehicle.group.scale.setScalar(
            scale
          );

          // Real model
          if (
            vehicle.loadedModel
          ) {
            vehicle.loadedModel.position.set(
              x,
              -0.15,
              z
            );

            vehicle.loadedModel.rotation.y =
              angle + Math.PI;

            vehicle.loadedModel.scale.setScalar(
              scale
            );
          }
        }
      );

      outerRing.rotation.z +=
        0.0008;

      innerRing.rotation.z -=
        0.0005;

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // =====================================================
    // RESIZE
    // =====================================================

    const handleResize =
      () => {
        if (!container) return;

        camera.aspect =
          container.clientWidth /
          container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
          container.clientWidth,
          container.clientHeight
        );
      };

    window.addEventListener(
      "resize",
      handleResize
    );

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      cancelAnimationFrame(
        animationId
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      container.removeEventListener(
        "pointerdown",
        pointerDown
      );

      container.removeEventListener(
        "pointermove",
        pointerMove
      );

      container.removeEventListener(
        "pointerup",
        pointerUp
      );

      container.removeEventListener(
        "pointerleave",
        pointerLeave
      );

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

  // =====================================================
  // BUTTON CONTROLS
  // =====================================================

  const nextCar = () => {
    setSelected(
      (current) =>
        (current + 1) % cars.length
    );
  };

  const previousCar = () => {
    setSelected(
      (current) =>
        (current - 1 + cars.length) %
        cars.length
    );
  };

  const selectCar = (
    index: number
  ) => {
    setSelected(index);

    document
      .getElementById(
        cars[index].target
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      id="showroom"
      className="showroom"
    >

      <div className="showroom-header">

        <div>
          <p className="showroom-label">
            02 / INTERACTIVE SHOWROOM
          </p>

          <h2>
            Explore the{" "}
            <span>
              fleet.
            </span>
          </h2>
        </div>

        <p className="showroom-hint">
          DRAG TO ROTATE • CLICK A CAR
        </p>

      </div>


      <div
        ref={mountRef}
        className="three-stage"
      />


      <div className="showroom-info">

        <p>
          {cars[selected].label}
        </p>

        <h3>
          {cars[selected].name}
        </h3>

        <span>
          {cars[selected].description}
        </span>

      </div>


      <div className="showroom-controls">

        <button
          type="button"
          onClick={previousCar}
          aria-label="Previous car"
        >
          ←
        </button>

        <div className="showroom-dots">

          {cars.map(
            (car, index) => (
              <button
                key={`${car.name}-${index}`}
                type="button"
                className={
                  selected === index
                    ? "active"
                    : ""
                }
                onClick={() =>
                  selectCar(index)
                }
                aria-label={`Select ${car.name}`}
              />
            )
          )}

        </div>

        <button
          type="button"
          onClick={nextCar}
          aria-label="Next car"
        >
          →
        </button>

      </div>


      <div className="showroom-corner">
        NAYAK
        <br />
        STUDIOS
        <br />
        2026
      </div>

    </section>
  );
}