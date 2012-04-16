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
    this.input = new Input();
    /*
    ** TODO: change to a parameter style
    */
    this.character = null;
    this.camera = null;
    this.attached = false;
    this.move_speed = 1;
    this.rotation_speed = 0.05;
    this.up_limit = 0.9;
    this.down_limit = -0.9;
    this.lookX_curr = 0;
    this.lookY_curr = 0;
    this.dampening = 0.0002;
    this.debug = false;
};

Controller.prototype.checkCamera = function() {
    /*
    ** checkCamera does a quick check on the character object to make sure
    ** it has an instance of THREE.Camera as a child.
    */
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
    /*
    ** Runs prerequisite checks and attaches the controller
    ** to the character object.
    */
    if(this.debug) console.log('CONTROLLER: Attaching...');
    if(character instanceof THREE.Object3D) {
        this.character = character;
        this.checkCamera();
        if(this.camera === null) {
            if(this.debug) console.log('CONTROLLER: [ERR] The THREE.Object does not have a child camera. Use THREE.Object3D.add() to add a THREE.Camera object');
            this.detach();
        } else {
            this.attached = true;
            if(this.debug) console.log('CONTROLLER: Success');
        }   
    } else {
        if(this.debug) console.log('CONTROLLER: [ERR] The Controller can only attach to an instance of THREE.Object3D');
        this.detach();
    }
};

Controller.prototype.detach = function() {
    /*
    ** Allows you to detach controls to handle things like GUI interaction.
    */
    if(this.debug) console.log('CONTROLLER: Detaching...');
    this.character = null;
    this.camera = null;
    this.attached = false;
};

Controller.prototype.update = function() {
    /*
    ** Updates the character object based on input.
    ** Make sure you call this method inside your animation loop.
    */
    if(this.attached === true) {
        if((this.input.a || this.input.left) && this.input.mouse_right) {
            this.character.translateX(- this.move_speed);
        }
        if((this.input.d || this.input.right) && this.input.mouse_right) {
            this.character.translateX(this.move_speed);
        }
        if(this.input.w || this.input.up) {
            this.character.translateZ(- this.move_speed);
        }
        if(this.input.s || this.input.down) {
            this.character.translateZ(this.move_speed);
        }
        if((this.input.d || this.input.right) && !this.input.mouse_right) {
            this.character.rotation.y -= this.rotation_speed;
        }
        if((this.input.a || this.input.left) && !this.input.mouse_right) {
                this.character.rotation.y += this.rotation_speed;
        }
        if(this.input.pageup && this.camera.rotation.x < this.up_limit) {
            this.camera.rotation.x += this.rotation_speed;
        }
        if(this.input.pagedown && this.camera.rotation.x > this.down_limit) {
            this.camera.rotation.x -= this.rotation_speed;
        }
        if(this.input.home || this.input.num_5) {
            this.camera.rotation.x = 0;
        }
        if(this.input.mouse_right && !this.input.mouse_look) {
            this.lookX_curr = this.input.mouseX;
            this.lookY_curr = this.input.mouseY;
        }
        if(this.input.mouse_look) {
            /*
            ** Mouse Look
            ** 
            ** TODO: Implement Tweening to smooth out rotations...
            */
            var deltaX = (this.lookX_curr - this.input.mouseX)*this.dampening;
            var deltaY = (this.lookY_curr - this.input.mouseY)*this.dampening;
            if(this.camera.rotation.x < this.up_limit && this.camera.rotation.x > this.down_limit) {
                if(deltaY < 0) {
                    this.camera.rotation.x -= this.rotation_speed * 0.5;
                }
                if(deltaY > 0) {
                    this.camera.rotation.x += this.rotation_speed * 0.5;
                }
            }
            if(Math.max(this.camera.rotation.x, this.up_limit) > this.up_limit || this.camera.rotation.x === this.up_limit) {
                this.camera.rotation.x = this.up_limit - 0.001;
            }
            if(Math.min(this.camera.rotation.x, this.down_limit) < this.down_limit || this.camera.rotation.x === this.down_limit) {
                this.camera.rotation.x = this.down_limit + 0.001;
            }
            if(deltaX < 0) {
                this.character.rotation.y -= this.rotation_speed;
            }
            if(deltaX > 0) {
                this.character.rotation.y += this.rotation_speed;
            }
        this.lookX_curr = this.input.mouseX;
        this.lookY_curr = this.input.mouseY;
        }
        if(this.input.wheel_delta !== 0 && this.input.wheel_delta > 0 && this.camera.position.z > 0) {
            this.camera.position.z -= 2;
            this.camera.position.y -= 1;
            this.camera.rotation.x += 0.02;
            this.input.wheel_delta = 0;
        }
        if(this.input.wheel_delta !== 0 && this.input.wheel_delta < 0 && this.camera.position.z < 50) {
            this.camera.position.z += 2;
            this.camera.position.y += 1;
            this.camera.rotation.x -= 0.02;
            this.input.wheel_delta = 0;
        }
        
    }
};