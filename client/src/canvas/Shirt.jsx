import { easing } from 'maath';
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useTexture, useGLTF } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
	const snap = useSnapshot(state);
	const { nodes, materials } = useGLTF('/shirt_baked.glb');

	const logoTexture = useTexture(snap.logoDecal);
	const fullTexture = useTexture(snap.fullDecal);

	return (
		<group>
			<mesh
				castShadow
				geometry={nodes.T_Shirt_male.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
			/>
		</group>
	)
}

export default Shirt;
