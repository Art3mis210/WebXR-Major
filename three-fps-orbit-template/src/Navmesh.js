import { Pathfinding } from 'three-pathfinding';
import { PathfindingHelper } from 'three-pathfinding';
import * as THREE from 'three';
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
export function LoadNavmesh(ModelName, ModelPosition, ModelScale, scene) {
    loader.load(ModelName, function OnLoad(gltf) {
        gltf.scene.scale.set(ModelScale.x, ModelScale.y, ModelScale.z);
        gltf.scene.position.set(ModelPosition.x, ModelPosition.y, ModelPosition.z);
        scene.add(gltf.scene);
        initializeNavmesh(gltf);
    });
}

let pathfinding;
let NavmeshZone;
export function initializeNavmesh(NavigationMesh)
{
    pathfinding = new Pathfinding();
    NavmeshZone = 'Navmesh';
    pathfinding.setZoneData(NavmeshZone, Pathfinding.createZone(NavigationMesh.geometry))
}
export function FindPath(StartPos,EndPos)
{
    console.log(pathfinding.findPath(FindClosestPoint(StartPos),FindClosestPoint(EndPos),NavmeshZone,0));
}
export function FindClosestPoint(Point)
{
    const Node= pathfinding.getClosestNode(Point,NavmeshZone,0);
    console.log(Node);
    return new THREE.Vector3(Node.centroid.x,Node.centroid.y,Node.centroid.z);
}

