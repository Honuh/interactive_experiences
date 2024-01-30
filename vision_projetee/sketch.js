let points = [
  { x: 0, y: 0, text: "Synthétiser des sons inspirés de la mer", check: false, category: 0},
  { x: 0, y: 0, text: "Faire la piste audio de l’animation des fourmis de Louane", check: false, category: 0},
  { x: 0, y: -100, text: "Designer la pochette de L'EP", check: false, category: 1},
  { x: 0, y: -100, text: "Réaliser des visualisateurs pour les pistes de l’EP", check: false, category: 1},
  { x: 0, y: -200, text: "Se renseigner sur la création de niveaux beat saber - pour en faire un pour l’EP", check: false, category: 1},
  { x: 0, y: -300, text: "Développer l’album", check: false, category: 3}
];

let points2 = [
  { x: 100, y: 0, text: "Faire un gaussian splatting d’une chaise et le mettre sur Unreal", check: true, category: 0},
  { x: 100, y: -100, text: "Faire un sketch Touch Designer utilisant du scan 3D", check: false, category: 0},
  { x: 100, y: -200, text: "Faire un système de particules animée en stop motion avec les Geometry nodes de Blender", check: false, category: 0},
  { x: 100, y: -300, text: "Expérimenter le mélange 3D 2D (dessin et génératif)", check: false, category: 1},
  { x: 100, y: -400, text: "Lire l’empire des signes", check: false, category: 1},
  { x: 100, y: -500, text: "Expérimenter avec les textures digitales sur after effects", check: false, category: 1},
  { x: 100, y: -600, text: "Acheter un kit arduino", check: false, category: 1},
  { x: 100, y: -600, text: "Acheter un projecteur", check: false, category: 1},
  { x: 100, y: -700, text: "Travailler sur la réalisation d’un article sur mon sujet de mémoire de master", check: false, category: 2},
  { x: 100, y: -800, text: "Réaliser une expérience VR en gaussian splatting dans Unreal Engine", check: false, category: 2},
  { x: 100, y: -900, text: "Réapprendre le python pour Blender", check: false, category: 2},
  { x: 100, y: -1000, text: "Faire mon monde VR", check: false, category: 3}
];

let points3 = [
  { x: -100, y: 0, text: "Réaliser un showreel de 1 min présentant mes projets actuels", check: false, category: 1},
  { x: -100, y: -100, text: "Commencer les missions de freelance avec Plastic Collective", check: false, category: 2},
  { x: -100, y: -200, text: "Monter un collectif avec Louane", check: false, category: 3},
  { x: -100, y: -200, text: "Trouver un hangar pour en faire un lieu de création", check: false, category: 3}
];

let points4 = [
  { x: -200, y: 0, text: "Rechercher quoi faire pour la communication de l'EP", check: false, category: 0},
  { x: -200, y: 0, text: "Sortir l’EP", check: false, category: 2},
  { x: -200, y: -100, text: "Refaire un site portfolio", check: false, category: 2},
  { x: -200, y: -200, text: "Faire un concert ", check: false, category: 3}
];

let colonne = 50;
let rang = 150;


let particles = [];
let numParticles = 900;

let offsetX = 0;
let offsetY = 0;
let noiseSpeed = 0.2;
let zoomFactor = 1;

// Nouvelles variables pour la vélocité
let velocityX = 0;
let velocityY = 0;
let damping = 0.9; // Facteur d'amortissement pour l'inertie

let mouseXTransformed;
let mouseYTransformed;

let spritesheetP;
let spritesheetV;
let spritedata;
let animation = [];
let checkanim = [];

let point1 = [];
let point2 = [];
let point3 = [];
let point4 = [];

function preload() {
  spritedata = loadJSON('assets/point.json');
  spritesheetP = loadImage('assets/pointSpritesheet.png');
  spritesheetV = loadImage('assets/checkSpritesheet.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  mouseXTransformed = mouseX;
  mouseYTransformed = mouseY;
  
  textSize(8);
  textFont('Courier New');

  let frmes = spritedata.frames;
  for (let i = 0; i < frmes.length; i++) {
    let pos = frmes[i].position;
    let img = spritesheetP.get(pos.x, pos.y, pos.w, pos.h);
    let imgV = spritesheetV.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
    checkanim.push(imgV);

  }


  // Initialise les offsets pour le mouvement perlin des points
  for (let i = 0; i < points.length; i++) {

    points[i].x = -1.5*rang;
    if(points[i].category == 0) {points[i].y = -i*colonne;}
    if(points[i].category == 1) {points[i].y = -(i-2)*colonne - 300;}
    if(points[i].category == 3) {points[i].y = -(i-5)*colonne - 900;}

    point1[i] = new Sprite(animation, checkanim,points[i].x, points[i].y, points[i].text, noiseSpeed, points[i].check);
    
  }
  
  for (let i = 0; i < points2.length; i++) {
    points2[i].x = -0.5*rang;
    if(points2[i].category == 0) {points2[i].y = -i*colonne;}
    if(points2[i].category == 1) {points2[i].y = -(i-3)*colonne - 300;}
    if(points2[i].category == 2) {points2[i].y = -(i-8)*colonne - 600;}
    if(points2[i].category == 3) {points2[i].y = -(i-11)*colonne - 900;}

    point2[i] = new Sprite(animation, checkanim,points2[i].x, points2[i].y, points2[i].text, noiseSpeed, points2[i].check);
  }
  
  for (let i = 0; i < points3.length; i++) {
    points3[i].x = 0.5*rang;
    if(points3[i].category == 1) {points3[i].y = -i*colonne - 300;}
    if(points3[i].category == 2) {points3[i].y = -(i-1)*colonne - 600;}
    if(points3[i].category == 3) {points3[i].y = -(i-2)*colonne - 900;}

    point3[i] = new Sprite(animation, checkanim,points3[i].x, points3[i].y, points3[i].text, noiseSpeed, points3[i].check);
  }
  
  for (let i = 0; i < points4.length; i++) {
    points4[i].x = 1.5*rang;
    if(points4[i].category == 2) {points4[i].y = -(i-1)*colonne - 600;}
    if(points4[i].category == 3) {points4[i].y = -(i-3)*colonne - 900;}

    point4[i] = new Sprite(animation, checkanim,points4[i].x, points4[i].y, points4[i].text, noiseSpeed, points4[i].check);
  }

  // Initialise les particules en arrière-plan
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(-width,width),
      y: random(-height,height),
      xOffset: random(1000),
      yOffset: random(1000),
      z: random(1, 10),
      size: random(2, 3),
    });
  }
}


function draw() {
  background(0);

  // Calcul de la position de la souris dans le système de coordonnées transformé
  mouseXTransformed = (mouseX - width / 2) / zoomFactor + offsetX / zoomFactor;
  mouseYTransformed = (mouseY - height / 2) / zoomFactor + offsetY / zoomFactor;

  translate(width / 2, height / 2);
  scale(zoomFactor);

  // Affiche les particules en arrière-plan
  fill(50/zoomFactor);
  noStroke();
  for (let particle of particles) {
    translate(-width / 2, -height / 2);
    translate(-offsetX / zoomFactor * particle.z * 0.1, -offsetY / zoomFactor * particle.z * 0.1);
    let noiseX = noise(particle.xOffset);
    let noiseY = noise(particle.yOffset);

    // Ajout de l'effet de parallaxe
    particle.x += map(noiseX, 0, 1, -0.5, 0.5) * particle.z * 0.2;
    particle.y += map(noiseY, 0, 1, -0.5, 0.5) * particle.z * 0.2;

    particle.xOffset += 0.01;
    particle.yOffset += 0.01;

    if(particle.x > width) {particle.x = -width};
    if(particle.x < -width) {particle.x = width};
    if(particle.y > height) {particle.y = -height};
    if(particle.y < -height) {particle.y = height};


    ellipse(particle.x, particle.y, particle.size * particle.z * 0.2, particle.size * particle.z * 0.2);
    translate(width / 2, height / 2);
    translate(offsetX / zoomFactor * particle.z * 0.1, offsetY / zoomFactor * particle.z * 0.1);
  }

  translate(-offsetX / zoomFactor, -offsetY / zoomFactor);

  // Affiche les lignes entre les points
  stroke(220);
  strokeWeight(0.5);
  
  afficherligne(point1);
  afficherligne(point2);
  afficherligne(point3);
  afficherligne(point4);


  // Affiche les points et le texte associé
  rectMode(CORNER);
  textAlign(LEFT, TOP);
  textSize(8);

for(let p of point1) {
  p.perlindisp();
  p.animate(mouseXTransformed, mouseYTransformed, zoomFactor);
  p.show();
}

for(let p of point2) {
  p.perlindisp();
  p.animate(mouseXTransformed, mouseYTransformed, zoomFactor);
  p.show();
}

for(let p of point3) {
  p.perlindisp();
  p.animate(mouseXTransformed, mouseYTransformed, zoomFactor);
  p.show();
}

for(let p of point4) {
  p.perlindisp();
  p.animate(mouseXTransformed, mouseYTransformed, zoomFactor);
  p.show();
}

  //Afficher les titres
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(12);
  fill(255);
  text("Image et son", point1[0].x, point1[0].y+100, 100);
  text("Expertise de l’hybridation", point2[0].x, point2[0].y+100, 100);
  text("Equilibre travail individuel et en groupe", point3[0].x, point3[0].y+100, 100);
  text("Toucher un public", point4[0].x, point4[0].y+100, 100);


  // Applique l'effet d'inertie
  velocityX *= damping;
  velocityY *= damping;
  offsetX += velocityX;
  offsetY += velocityY;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // Vérifie si la souris est sur un point
  for (let point of points) {
    let d = dist(mouseX, mouseY, point.x + offsetX / zoomFactor, point.y + offsetY / zoomFactor);
    if (d < 10) {
      // Affiche le texte associé au point
      console.log("Texte associé au point");
      break;
    }
  }
}

function mouseDragged() {
  // Déplace la vue si la souris est cliquée et déplacée
  let deltaX = mouseX - pmouseX;
  let deltaY = mouseY - pmouseY;

  // Applique l'inertie
  velocityX -= deltaX * map(zoomFactor, 0.5, 5, 0.08, 0.02);
  velocityY -= deltaY * map(zoomFactor, 0.5, 5, 0.08, 0.02);

  offsetX -= deltaX;
  offsetY -= deltaY;

  offsetX = constrain(offsetX,-width*0.5*zoomFactor, width*0.5*zoomFactor);
  offsetY = constrain(offsetY,-height*zoomFactor, height*zoomFactor);
}

function mouseWheel(event) {
  // Gère le zoom avec la molette de la souris
  let delta = event.delta;
  let zoomIncrement = -delta * 0.002;
  let prevZoomFactor = zoomFactor;
  zoomFactor += zoomIncrement;
  zoomFactor = constrain(zoomFactor, 1, 5);
  return false; // Empêche le défilement de la page
}


function afficherligne(listeligne) {
  for (let i = 0; i < listeligne.length - 1; i++) {
    line(listeligne[i].x, listeligne[i].y, listeligne[i + 1].x, listeligne[i + 1].y);
  }
}


class Sprite {
  constructor(animation, checkanim, x, y, text, noisespeed, check) {
    this.x = x;
    this.y = y;
    this.size = 20;

    this.text = text;

    this.animation = animation;
    this.checkanim = checkanim;
    this.len = this.animation.length;
    this.index = random(3);

    this.noiseoffX = random(1000);
    this.noiseoffY = random(1000);
    this.noiseSpeed = noisespeed;
    this.speed = 0;
    this.check = check;

    this.textOpacity = 255;
  }

  perlindisp() {
    //Perlin noise displacement
    this.noiseX = noise(this.noiseoffX);
    this.noiseY = noise(this.noiseoffY);
    this.x += map(this.noiseX, 0, 1, -0.1, 0.1);
    this.y += map(this.noiseY, 0, 1, -0.1, 0.1);
    this.noiseoffX += this.noiseSpeed;
    this.noiseoffY += this.noiseSpeed;
  }

  show() {
    //text
    noStroke();
    fill(220, this.textOpacity);
    text(this.text, this.x + 20, this.y-5, 100);

    //animation
    fill(0);
    ellipse(this.x, this.y, 20, 20);
    let index = floor(this.index) % this.len;
    if(this.check == true) { image(this.checkanim[index], this.x-this.size*0.5, this.y-this.size*0.5, this.size, this.size);}
    else if(this.check == false) { image(this.animation[index], this.x-this.size*0.5, this.y-this.size*0.5, this.size, this.size);}
    
  }

  animate(mouseXTransformed, mouseYTransformed, zoomFactor) {

    //Mouse Proximity calculation

    this.mouseXT = mouseXTransformed;
    this.mouseYT = mouseYTransformed;
    this.zoom = zoomFactor;

    this.textOpacity = map(abs(dist(this.x, this.y, this.mouseXT, this.mouseYT)),10,60 / this.zoom,255,0);
    this.size = map(abs(dist(this.x, this.y, this.mouseXT, this.mouseYT)),15,100 / this.zoom,30,20);
    this.speed = map(abs(dist(this.x, this.y, this.mouseXT, this.mouseYT)),15,100 / this.zoom,0.1,0.05);
    if(this.size<20){this.size=20};
    if(this.size>30){this.size=30};
    if(this.speed<0.05){this.speed=0.05};
    if(this.speed>0.1){this.speed=0.1};

    //animation 
    this.index += this.speed;
  }
}