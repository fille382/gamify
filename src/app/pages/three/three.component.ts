import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';


@Component({
  selector: 'app-three',
  template: '<div #rendererContainer></div>',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  mesh: THREE.Mesh | null = null;
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  rolling = false;
  

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
      this.renderer = new THREE.WebGLRenderer();
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 5;
      const loader = new THREE.TextureLoader();
      const materials = [
        new THREE.MeshPhongMaterial({ map: loader.load('../../assets/dice/dice1.svg') }),
        new THREE.MeshPhongMaterial({ map: loader.load('../../assets/dice/dice2.svg') }),
        new THREE.MeshPhongMaterial({ map: loader.load('../../assets/dice/dice3.svg') }),
        new THREE.MeshPhongMaterial({ map: loader.load('../../assets/dice/dice4.svg') }),
        new THREE.MeshPhongMaterial({ map: loader.load('../../assets/dice/dice5.svg') }),
        new THREE.MeshPhongMaterial({ map: loader.load('../../assets/dice/dice6.svg') }),
      ];
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  this.mesh = new THREE.Mesh(geometry, materials);
  this.scene.add(this.mesh);
        // Create a point light
        const light = new THREE.PointLight(0xffffff, 700, 1000);
      light.position.set(0, 0, 10);
      this.scene.add(light);
      
    }
  }

  ngOnInit() {}

  onDocumentMouseDown(event: MouseEvent) {
    event.preventDefault();
  
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    this.raycaster.setFromCamera(this.mouse, this.camera);
  
    if (this.mesh) {
      const intersects = this.raycaster.intersectObjects([this.mesh]);
    
      if (intersects.length > 0) {
        this.rollDice();
      }
    }
  }

// Define the quaternions that correspond to each face of the dice
diceFacesRotations = [
  new THREE.Quaternion(), // Face 1
  new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI * 0.5, 0, 0)), // Face 2
  new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, 0)), // Face 3
  new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI * 1.5, 0, 0)), // Face 4
  new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI * 0.5, 0)), // Face 5
  new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0)) // Face 6
];

rollDice() {
  if (this.mesh) {
    this.rolling = true;
    const rollTime = Math.random() * 2000 + 1000; // Roll for 1-3 seconds
    const tensionTime = 2000; // Additional time for tension

    // Select a random face
    const randomFace = Math.floor(Math.random() * 6);

    // Create a random quaternion
    const randomQuaternion = new THREE.Quaternion();
    randomQuaternion.setFromEuler(new THREE.Euler(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    ));

    // Then, rotate to the final position
    const endQuaternion = this.diceFacesRotations[randomFace];

    // Start from the random quaternion
    this.mesh.quaternion.copy(randomQuaternion);

    // First, roll around randomly for tensionTime
    new TWEEN.Tween({ t: 0 })
      .to({ t: 1 }, tensionTime)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(({ t }) => {
        if (this.mesh) {
          this.mesh.quaternion.slerp(randomQuaternion, t);
        }
      })
      .onComplete(() => {
        // Then, roll to the final position
        new TWEEN.Tween({ t: 0 })
          .to({ t: 1 }, rollTime)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(({ t }) => {
            if (this.mesh) {
              this.mesh.quaternion.slerp(endQuaternion, t);
            }
          })
          .onComplete(() => {
            this.rolling = false;
          })
          .start();
      })
      .start();
  }
}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
      this.animate();
    }
  }

  animate() {
    if (isPlatformBrowser(this.platformId)) {
      window.requestAnimationFrame(() => this.animate());
      TWEEN.update();
      this.renderer.render(this.scene, this.camera);
    }
  }
}