import * as THREE from 'three';


let PlayerRef;
let controller1;
let controller2;
let raycastStart=new THREE.Vector3();
let raycastDir=new THREE.Vector3();
let VRRaycaster;
let floorRef;

export function SetupVRControllers(Player,scene,renderer,SceneSetup,floor)
{
    PlayerRef=Player;
    floorRef=floor;

    controller1 = SceneSetup.Controller(renderer,scene, 0);
    controller2 = SceneSetup.Controller(renderer, scene, 1);
    Player.position.y=8;

    VRRaycaster=new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(),0, 50);

    controller1.addEventListener('selectstart', onSelectStartControllerOne);
    controller1.addEventListener('selectend',onSelectEndControllerOne);

    controller2.addEventListener('selectstart', onSelectStartControllerTwo);
    controller2.addEventListener('selectend', onSelectEndControllerTwo);
}


function onSelectStartControllerOne()
{

}

function onSelectStartControllerTwo()
{
    
}

function onSelectEndControllerOne()
{
    TeleportPlayer(1);
}
function onSelectEndControllerTwo()
{
    TeleportPlayer(2);
}

function TeleportPlayer(Controller)
{
    if(Controller==1)
    {
        controller1.getWorldPosition(raycastStart);
        controller1.getWorldDirection(raycastDir);
    }
    else if(Controller==2)
    {
        controller2.getWorldPosition(raycastStart);
        controller2.getWorldDirection(raycastDir);
    }

    raycastDir.multiplyScalar(-1);
    
    VRRaycaster.set(raycastStart,raycastDir,100,100);
   
    //visualise
    // scene.add(new THREE.ArrowHelper(VRRaycaster.ray.direction, VRRaycaster.ray.origin, 300, 0xff0000));

    const VRRaycastIntersects = VRRaycaster.intersectObject(floorRef);
    console.log(VRRaycastIntersects);
    if(VRRaycastIntersects[0])
    {
        PlayerRef.position.set(VRRaycastIntersects[0].point.x, PlayerRef.position.y,VRRaycastIntersects[0].point.z);
    }
}