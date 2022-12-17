import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const loader = new GLTFLoader().setPath('models/');
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); // use a full url path
loader.setDRACOLoader(dracoLoader);
/**
 *
 * @param {*} ModelName Name of the model in models folder
 * @param {*} ModelPosition position of the model
 * @param {*} ModelScale scale of the model
 */
export function LoadModel(ModelName, ModelPosition, ModelScale, scene) {
    loader.load(ModelName, function OnLoad(gltf) {
        gltf.scene.scale.set(ModelScale.x, ModelScale.y, ModelScale.z);
        gltf.scene.position.set(ModelPosition.x, ModelPosition.y, ModelPosition.z);
        gltf.scene.receiveShadow = true;
        scene.add(gltf.scene);
    });
}