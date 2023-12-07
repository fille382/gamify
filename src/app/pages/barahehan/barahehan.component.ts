import { Component, ElementRef, NgZone, AfterViewInit, ViewChild, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { PhysicsService } from './physics.service';

// Convert Cannon.js Vec3 to Three.js Vector3
function cannonToThree(vec: CANNON.Vec3): THREE.Vector3 {
  return new THREE.Vector3(vec.x, vec.y, vec.z);
}
// Convert Three.js Vector3 to Cannon.js Vec3
function threeToCannon(vec: THREE.Vector3): CANNON.Vec3 {
  return new CANNON.Vec3(vec.x, vec.y, vec.z);
}

@Component({
  selector: 'app-barahehan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barahehan.component.html',
  styleUrls: ['./barahehan.component.scss']
})
export class BarahehanComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  clickableCube!: THREE.Mesh;
  clickableCubeBody!: CANNON.Body;
  
  constructor(private ngZone: NgZone, private physicsService: PhysicsService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer = new THREE.WebGLRenderer();
      this.initializeScene();
      this.animate();
    }
  }

  ngOnDestroy() {
    // Clean up resources if needed
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  initializeScene() {
     // Set up Three.js scene
    this.renderer = new THREE.WebGLRenderer();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);


    // Create a clickable cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshNormalMaterial();
    this.clickableCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.clickableCube.position.set(0, 0.5, 0); // Centered at (0, 0.5, 0)
    this.scene.add(this.clickableCube);

    // Set up physics for the clickable cube
    const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    this.clickableCubeBody = new CANNON.Body({ mass: 1 });
    this.clickableCubeBody.addShape(cubeShape);

    // Set up physics
    this.physicsService.world.gravity.set(0, -9.82, 0);

    // Set the camera position and look at the center
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Convert Three.js position to Cannon.js position
    const initialPosition = threeToCannon(this.clickableCube.position);
    this.clickableCubeBody.position.copy(initialPosition);

    this.physicsService.world.addBody(this.clickableCubeBody);
  }

  animate() {
    this.ngZone.runOutsideAngular(() => {
      const animateFn = () => {
        requestAnimationFrame(animateFn);
  
        // Update physics
        this.physicsService.world.step(1 / 60);
  
        // Sync Three.js object with Cannon.js body
        const cannonPosition = threeToCannon(this.clickableCube.position);
        this.clickableCubeBody.position.copy(cannonPosition);
  
        // ... Update Three.js objects
  
        this.render();
      };
  
      animateFn();
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onCubeClick() {
    // Apply a force to make the cube roll
    const force = new CANNON.Vec3(0, 0, -10); // Adjust the force as needed
    const localPoint = new CANNON.Vec3(0, 0, 0); // Apply force at the center of the cube
    this.clickableCubeBody.applyImpulse(force, localPoint);
  }
}
