"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
type Props = {
  active: boolean;
  mobile: boolean;
  scroll: RefObject<number>;
  onReady: () => void;
  onFailure: () => void;
};
function Core({
  scroll,
  onReady,
  onFailure,
}: {
  scroll: RefObject<number>;
  onReady: () => void;
  onFailure: () => void;
}) {
  const body = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Group>(null);
  const initialized = useRef(false);
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (e: Event) => {
      e.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  useFrame((state, delta) => {
    if (!initialized.current) {
      initialized.current = true;
      onReady();
    }
    const dt = Math.min(delta, 0.05);
    const progress = scroll.current;
    if (body.current) {
      body.current.rotation.y = THREE.MathUtils.damp(
        body.current.rotation.y,
        state.pointer.x * 0.3 +
          Math.sin(state.clock.elapsedTime * 0.22) * 0.12 -
          0.2,
        3,
        dt,
      );
      body.current.rotation.x = THREE.MathUtils.damp(
        body.current.rotation.x,
        state.pointer.y * 0.12 + 0.15,
        3,
        dt,
      );
      body.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
    }
    if (ring.current) ring.current.rotation.z += dt * 0.12;
    if (shell.current) shell.current.scale.setScalar(1 + progress * 0.25);
  });
  return (
    <group ref={body} rotation={[0.15, -0.35, -0.2]}>
      <group ref={shell}>
        <group rotation={[0.65, 0.15, 0]}>
          <mesh>
            <torusGeometry args={[2.12, 0.13, 12, 96]} />
            <meshStandardMaterial
              color="#526875"
              metalness={0.9}
              roughness={0.28}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[2.12, 0.017, 8, 96]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00c4df"
              emissiveIntensity={3}
            />
          </mesh>
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            return (
              <RoundedBox
                key={i}
                args={[0.23, 0.3, 0.25]}
                radius={0.025}
                smoothness={2}
                position={[Math.cos(angle) * 2.12, Math.sin(angle) * 2.12, 0]}
                rotation={[0, 0, angle]}
              >
                <meshStandardMaterial
                  color={i % 6 === 0 ? "#81bdc5" : "#273f4d"}
                  metalness={0.85}
                  roughness={0.3}
                />
              </RoundedBox>
            );
          })}
        </group>
        <group ref={ring} rotation={[-0.5, 0.9, 0.5]}>
          <mesh>
            <torusGeometry args={[1.77, 0.17, 8, 80]} />
            <meshStandardMaterial
              color="#80919b"
              metalness={0.95}
              roughness={0.28}
            />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <torusGeometry args={[1.77, 0.018, 8, 80]} />
            <meshStandardMaterial
              color="#00baca"
              emissive="#00cbe2"
              emissiveIntensity={2}
            />
          </mesh>
        </group>
      </group>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[1.05, 1.05, 0.68, 6]} />
          <meshStandardMaterial
            color="#243945"
            metalness={0.85}
            roughness={0.32}
          />
        </mesh>
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.08, 6]} />
          <meshStandardMaterial
            color="#071b23"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.41, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.65, 0.025, 8, 6]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00e8ff"
            emissiveIntensity={4}
          />
        </mesh>
        <mesh position={[0, 0.43, 0]}>
          <cylinderGeometry args={[0.43, 0.43, 0.07, 6]} />
          <meshStandardMaterial
            color="#265b68"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <group
            key={i}
            position={[Math.cos(a) * 1.25, Math.sin(a) * 1.25, 0]}
            rotation={[0, 0, a]}
          >
            <RoundedBox args={[0.5, 0.2, 0.3]} radius={0.03} smoothness={2}>
              <meshStandardMaterial
                color="#465f6d"
                metalness={0.9}
                roughness={0.3}
              />
            </RoundedBox>
            <mesh position={[0, 0, 0.16]}>
              <boxGeometry args={[0.29, 0.025, 0.015]} />
              <meshStandardMaterial
                color="#00ddeb"
                emissive="#00b9dd"
                emissiveIntensity={3}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
/** Manual advance caps actual WebGL draws, not merely mesh updates. */
function FrameBudget({ active, mobile }: { active: boolean; mobile: boolean }) {
  const advance = useThree((state) => state.advance);
  useEffect(() => {
    const render = () => advance(performance.now() / 1000);
    if (!active) return;
    render();
    const timer = window.setInterval(
      render,
      Math.ceil(1000 / (mobile ? 20 : 30)),
    );
    return () => clearInterval(timer);
  }, [active, mobile, advance]);
  return null;
}
export default function CoreScene({
  active,
  mobile,
  scroll,
  onReady,
  onFailure,
}: Props) {
  return (
    <Canvas
      dpr={mobile ? 1 : [1, 1.5]}
      frameloop="never"
      camera={{ position: [0, 0, 7.4], fov: 42 }}
      gl={{ alpha: true, antialias: !mobile, powerPreference: "low-power" }}
      fallback={null}
      style={{ touchAction: "pan-y" }}
    >
      <FrameBudget active={active} mobile={mobile} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={4} color="#d9f3ff" />
      <directionalLight position={[-4, -1, 2]} intensity={3} color="#00bfd6" />
      <pointLight position={[0, 0, 3]} intensity={4} color="#00dfff" />
      <Core scroll={scroll} onReady={onReady} onFailure={onFailure} />
    </Canvas>
  );
}
