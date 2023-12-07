import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { World, Body, Vec3, Sphere, Plane } from 'cannon';
import { Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, MeshBasicMaterial, Mesh, PlaneGeometry } from 'three';
import { ApplicationRef } from '@angular/core';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-cannon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cannon.component.html',
  styleUrl: './cannon.component.scss'
})

export class CannonComponent implements OnInit {
  world: World;
  scene: Scene; // Declare scene here
  camera!: PerspectiveCamera;
  renderer!: WebGLRenderer;

  constructor(private appRef: ApplicationRef) {
    this.world = new World();
    this.scene = new Scene();

    if (typeof window !== 'undefined') {
      this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.renderer = new WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
    } else {
      // Provide fallback values
      this.camera = new PerspectiveCamera();
    }
  }

  ngOnInit() {
    console.log('HELLOOOOOOOOOOOOOOOOOOOOOOO');
    this.appRef.isStable.pipe(first()).subscribe(() => this.animate());
    this.world.gravity.set(0, -1, 0); // m/s²

    // Create a sphere
    var radius = 1; // m
    var sphereBody = new Body({
      mass: 1, // kg, setting mass to 0 makes the body static
      position: new Vec3(0, 0, 0), // m
      shape: new Sphere(radius)
    });
    this.world.addBody(sphereBody);

    // Create a plane
    var planeBody = new Body({
      mass: 0, // Setting mass to 0 makes the body static
    });
    var planeShape = new Plane();
    planeBody.addShape(planeShape);
    this.world.addBody(planeBody);

    // Create a sphere geometry and material for rendering
    var sphereGeometry = new SphereGeometry(radius);
    var sphereMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
    var sphereMesh = new Mesh(sphereGeometry, sphereMaterial);

    // Add the sphere mesh to your scene
    this.scene.add(sphereMesh);

    // Position the camera
    this.camera.position.set(0,0,100) // Set the camera's position

    if (sphereMesh && sphereBody && sphereBody.position) {
      sphereMesh.position.copy(sphereBody.position as any);
    }
  }

  animate() {
    console.log('ANIMATE');
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      window.requestAnimationFrame(() => this.animate());
    } else {
      // Provide a fallback function or skip this line
    }

    // Step the physics world
    var timeStep = 1 / 60; // seconds
    this.world.step(timeStep);

    // Update the sphere mesh to match the sphere body
    var sphereBody = this.world.bodies[0];
    var sphereMesh = this.scene.children[0] as Mesh;

    if (sphereBody && sphereBody.position) {
      sphereMesh.position.copy(sphereBody.position as any);
      sphereMesh.quaternion.copy(sphereBody.quaternion as any);
    }

    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
