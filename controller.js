// First Person RPG Style character controls
// Created by Derek Wright
// https://github.com/derekmwright
//
// Requires:
//   input.js
//
// Usage:
//   var controller = new Controller();
//   var player = new THREE.Object3D;
//   var camera = new THREE.PerspectiveCamera(...etc...);
//   player.add(camera); <-- The camera MUST be a child of the player 3D Object...
//   scene.add(player);
//   controller.attach(player);
//
//   MainLoop() {
//     controller.update();
//   }
//
// Notes: You can use an event, like a domElement getting focus, to detach from 
// the controller and handle things like GUI input.
//
// <div onfocus='controller.detach();' onblur='controller.attach(player);'>


var Controller = Controller || {};

Controller = function() {
    this.character = null;
    this.camera = null;
    this.attached = false;
    this.move_speed = 1;
    this.rotation_speed = 0.05;
    this.up_limit = 0.9;
    this.down_limit = -0.9;
    this.input = new Input();
    this.lookX_curr = 0;
    this.lookY_curr = 0;
    this.dampening = 0.0002;
    this.max_speed = 0.05;
};

Controller.prototype.checkCamera = function() {
    var char = this.character;
    var l = char.children.length;
    if(l > 0) {
        for(var i=0;i<l;i++) {
            if(char.children[i] instanceof THREE.Camera) {
                this.camera = char.children[i];
            }
        }
    }
};

Controller.prototype.attach = function(character) {
    console.log('CONTROLLER: Attaching...');
    if(character instanceof THREE.Object3D) {
        this.character = character;
        this.checkCamera();
        if(this.camera === null) {
            console.log('CONTROLLER: [ERR] The THREE.Object does not have a child camera. Use THREE.Object3D.add() to add a THREE.Camera object');
            this.detach();
        } else {
            this.attached = true;
            console.log('CONTROLLER: Success');
        }   
    } else {
        console.log('CONTROLLER: [ERR] The Controller can only attach to an instance of THREE.Object3D');
        this.detach();
    }
};

Controller.prototype.detach = function() {
    console.log('CONTROLLER: Detaching...');
    this.character = null;
    this.camera = null;
    this.attached = false;
};

Controller.prototype.update = function() {
    if(this.attached === true) {
        if(this.input.a || this.input.left && this.input.mouse_right) {
            this.character.translateX(- this.move_speed);
        }
        if(this.input.d || this.input.right && this.input.mouse_right) {
            this.character.translateX(this.move_speed);
        }
        if(this.input.w || this.input.up) {
            this.character.translateZ(- this.move_speed);
        }
        if(this.input.s || this.input.down) {
            this.character.translateZ(this.move_speed);
        }
        if(this.input.d || this.input.right && !this.input.mouse_right) {
            this.character.rotation.y -= this.rotation_speed;
        }
        if(this.input.a || this.input.left && !this.input.mouse_right) {
                this.character.rotation.y += this.rotation_speed;
        }
        if(this.input.pageup && this.camera.rotation.x < this.up_limit) {
            this.camera.rotation.x += this.rotation_speed;
        }
        if(this.input.pagedown && this.camera.rotation.x > this.down_limit) {
            this.camera.rotation.x -= this.rotation_speed;
        }
        if(this.input.home) {
            this.camera.rotation = new THREE.Vector3(0,0,0);
        }
        if(this.input.mouse_right && !this.input.mouse_look) {
            this.lookX_curr = this.input.mouseX;
            this.lookY_curr = this.input.mouseY;
        }
        if(this.input.mouse_look) {
            var deltaX = this.lookX_curr - this.input.mouseX;
            var deltaY = this.lookY_curr - this.input.mouseY;
            //if(this.camera.rotation.x < this.up_limit && this.camera.rotation.x > this.down_limit) {
                this.camera.rotation.x += deltaY * this.dampening;
            //}
            this.character.rotation.y += deltaX * this.dampening;
        }
    }
};