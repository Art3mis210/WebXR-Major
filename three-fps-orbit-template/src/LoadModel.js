import loader from "sass-loader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const loader = new GLTFLoader().setPath("Models/");
export function LoadModel(ModelName, ModelPosition, ModelScale, scene) {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );

    loader.load(ModelName, function OnLoad(gltf) {
        gltf.scene.scale.set(ModelScale.x, ModelScale.y, ModelScale.z);
        gltf.scene.position.set(ModelPosition.x, ModelPosition.y, ModelPosition.z);
        gltf.scene.receiveShadow = true;
        scene.add(gltf.scene);
        console.log('imported');
    });
}