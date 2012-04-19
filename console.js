// Basic Console-ish Data Output
// Created by Derek Wright
// https://github.com/derekmwright
//
// Usage:
//   var output = new Console();
//
// Create an output line that gets updated by doing the following:
//   *you need to give it a name (for display), property of object you want to 
//   display and the object*
//
//   var output.create('player.x', 'x', player.position);
//
// To update the data being displayed just call update() in your render loop
//
// MainLoop() {
//   output.update();
// }
// 

var Console = Console || {};

Console = function() {
    this.domElement = document.createElement('div');
    this.domElement.style.position = 'absolute';
    this.domElement.style.top = '0';
    this.domElement.style.color = '#ffffff';
    this.domElement.style.fontFamily = 'Courier New';
    this.domElement.style.fontSize = '10pt';
    this.count = 0;
    this.children = [];

};

Console.prototype.create = function(name, property, object) {
    this.count++;
    var child = {};
    var line = document.createElement('p');
    
    var data = object[property];
    
    child.domElement = line;
    child.data = data;
    child.name = name;
    child.property = property;
    child.object = object;
    
    line.innerHTML = name + ': ' + data;
    
    this.children.push(child);
    this.domElement.appendChild(child.domElement);
};

Console.prototype.update = function() {
    for(var i=0;i<this.children.length;i++) {
        this.children[i].data = this.children[i].object[this.children[i].property];
        this.children[i].domElement.innerHTML = this.children[i].name + ': ' + this.children[i].data;
    }
};