import { Pathfinding } from 'three-pathfinding';
import { PathfindingHelper } from 'three-pathfinding';
import * as THREE from 'three';


export function initializeNavmesh(navmesh)
{
    const pathfinding = new Pathfinding();
    const ZONE = 'level1';
    pathfinding.setZoneData(ZONE, Pathfinding.createZone(navmesh.geometry));
    console.log(pathfinding.getClosestNode(ZONE,new THREE.Vector3(0,0,0)));
    //PathfindingHelper.
}
