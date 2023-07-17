import { easing } from 'maath';
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useTexture, useGLTF } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
	const snap = useSnapshot(state);
	const stateString = JSON.stringify(snap);
	const { nodes, materials } = useGLTF('/shirt_baked.glb');

	const logoTexture = useTexture(snap.logoDecal);
	const fullTexture = useTexture(snap.fullDecal);

	useFrame((state, delta) => {
		easing.dampC(
			materials.lamber1.color,
			snap.color,
			0.25,
			delta
		)
	});

	return (
		<group key={stateString}> // Tracking state changes
			<mesh
				castShadow
				geometry={nodes.T_Shirt_male.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
			>
				{snap.isFullTexture && (
					<Decal
						position={[0,0,0]}
						rotation={[0,0,0]}
						scale={1}
						map={fullTexture}
					/>
				)}

				{snap.isLogoTexture && (
					<Decal
						position={[0,0.04,0.15]}
						rotation={[0,0,0]}
						scale={0.15}
						map={logoTexture}
						map-anisotropy={16}
						depthTest={false}
						depthWrite={true}
					/>
				)}
			</mesh>
		</group>
	)
}

export default Shirt;
