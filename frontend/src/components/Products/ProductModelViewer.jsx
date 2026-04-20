import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

const ModelScene = ({ modelType = "coffee-bag", accentColor = "#d97706" }) => {
  if (modelType === "espresso-machine") {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.3, 1.8, 1.4]} />
          <meshStandardMaterial color="#d6d3d1" metalness={0.6} roughness={0.25} />
        </mesh>
        <mesh position={[0.7, -0.2, 0.9]}>
          <cylinderGeometry args={[0.14, 0.14, 0.9, 32]} />
          <meshStandardMaterial color={accentColor} />
        </mesh>
        <mesh position={[-0.7, 0.3, 0.8]}>
          <boxGeometry args={[0.55, 0.3, 0.2]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      </group>
    );
  }

  if (modelType === "manual-grinder") {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.48, 1.8, 32]} />
          <meshStandardMaterial color="#57534e" />
        </mesh>
        <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0.7]}>
          <boxGeometry args={[1.4, 0.08, 0.08]} />
          <meshStandardMaterial color={accentColor} />
        </mesh>
        <mesh position={[0.7, 1.2, 0]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial color="#f5f5f4" />
        </mesh>
      </group>
    );
  }

  if (modelType === "dripper") {
    return (
      <group>
        <mesh position={[0, 0.2, 0]}>
          <coneGeometry args={[1.05, 1.4, 32, 1, true]} />
          <meshStandardMaterial color={accentColor} />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.7, 24]} />
          <meshStandardMaterial color="#f5f5f4" />
        </mesh>
      </group>
    );
  }

  if (modelType === "kettle") {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        <mesh position={[1.1, 0.2, 0]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.06, 0.08, 1.3, 16]} />
          <meshStandardMaterial color={accentColor} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.7, 2.4, 0.8]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>
      <mesh position={[0, 1.2, 0.42]}>
        <boxGeometry args={[1.1, 0.25, 0.05]} />
        <meshStandardMaterial color="#f5f5f4" />
      </mesh>
    </group>
  );
};

const ProductModelViewer = ({ interactiveModel }) => {
  const hotspots = interactiveModel?.hotspots || [];
  const [activeHotspot, setActiveHotspot] = useState(hotspots[0] || null);

  if (!interactiveModel?.enabled) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0f0a08] p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Interactive 3D Exploration</h3>
          <p className="mt-1 text-sm text-stone-400">
            Rotate the product, zoom in, and inspect the highlighted components.
          </p>
        </div>
        <span className="rounded-full border border-amber-400/25 bg-amber-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-200">
          WebGL
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr,0.8fr]">
        <div className="h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_55%),linear-gradient(180deg,#1c1917_0%,#09090b_100%)]">
          <Canvas camera={{ position: [3.5, 2.5, 4.5], fov: 45 }}>
            <Suspense fallback={<Html center className="text-sm text-white">Loading model...</Html>}>
              <ambientLight intensity={1.1} />
              <directionalLight intensity={2} position={[3, 4, 2]} />
              <pointLight intensity={1.5} position={[-2, 2, 3]} color={interactiveModel.accentColor} />
              <ModelScene
                modelType={interactiveModel.modelType}
                accentColor={interactiveModel.accentColor}
              />
              <OrbitControls enablePan={false} autoRotate autoRotateSpeed={1.2} />
            </Suspense>
          </Canvas>
        </div>

        <div className="space-y-3">
          {hotspots.length ? (
            hotspots.map((hotspot) => (
              <button
                type="button"
                key={hotspot.id}
                onClick={() => setActiveHotspot(hotspot)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  activeHotspot?.id === hotspot.id
                    ? "border-amber-400/30 bg-amber-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="text-sm font-semibold text-white">{hotspot.label}</div>
                <div className="mt-1 text-sm text-stone-400">{hotspot.description}</div>
              </button>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-stone-400">
              No hotspots have been configured for this model yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModelViewer;
