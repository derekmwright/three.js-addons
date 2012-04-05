var Input = Input || {};

Input = function() {
    this.dom = document;
    this.mouse_look = false;
    this.mouse_drag = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.viewHalfX = window.innerWidth / 2;
    this.viewHalfY = window.innerHeight / 2;
    
    // Mouse Input
    this.onMouseDown = function(event) {
        event.preventDefault();
        event.stopPropagation();
        if(event.button === 0) {
            this.mouse_left = true;
        }
        if(event.button == 2) {
            this.mouse_right = true;
        }
        this.mouse_drag = true;
        this.mouseX = event.pageX - this.viewHalfX;
        this.mouseY = event.pageY - this.viewHalfY;
	};
    
    this.onMouseUp = function(event) {
        event.preventDefault();
        event.stopPropagation();
        if(event.button === 0) {
            this.mouse_left = false;
        }
        if(event.button == 2) {
            this.mouse_look = false;
            this.mouse_right = false;
        }
		this.mouse_drag = false;
	};
    
    this.onMouseMove = function(event) {
        if(this.mouse_drag && event.button == 2) {
            this.mouse_look = true;
		    this.mouseX = event.pageX - this.viewHalfX;
		    this.mouseY = event.pageY - this.viewHalfY;
        } else {
            this.mouse_look = false;
        }
	};
    
    // Keyboard Input
    this.onKeyDown = function(event) {
        switch(event.keyCode) {
            case 8:     this.backspace = true;      break;
            case 9:	    this.tab = true;	        break;
            case 13:	this.enter = true;	        break;
            case 16:	this.shift = true;	        break;
            case 17:	this.ctrl = true;	        break;
            case 18:	this.alt = true;	        break;
            case 19:	this.pausebreak = true;	    break;
            case 20:	this.capslock = true;	    break;
            case 27:	this.esc = true;	        break;
            case 33:	this.pageup = true;	        break;
            case 34:	this.pagedown = true;	    break;
            case 35:	this.end = true;	        break;
            case 36:    this.home = true;	        break;
            case 37:	this.left = true;	        break;
            case 38:	this.up = true;             break;
            case 39:	this.right = true;          break;
            case 40:	this.down = true;           break;
            case 45:	this.ins = true;            break;
            case 46:	this.del = true;            break;
            case 48:	this._0 = true;             break;
            case 49:	this._1 = true;             break;
            case 50:	this._2 = true;             break;
            case 51:	this._3 = true;             break;
            case 52:	this._4 = true;             break;
            case 53:	this._5 = true;             break;
            case 54:	this._6 = true;             break;
            case 55:	this._7 = true;             break;
            case 56:	this._8 = true;	            break;
            case 57:	this._9 = true;	            break;
            case 65:	this.a = true;	            break;
            case 66:	this.b = true;	            break;
            case 67:	this.c = true;	            break;
            case 68:	this.d = true;	            break;
            case 69:	this.e = true;	            break;
            case 70:	this.f = true;	            break;
            case 71:	this.g = true;	            break;
            case 72:	this.h = true;	            break;
            case 73:	this.i = true;	            break;
            case 74:	this.j = true;	            break;
            case 75:	this.k = true;	            break;
            case 76:	this.l = true;	            break;
            case 77:	this.m = true;	            break;
            case 78:	this.n = true;	            break;
            case 79:	this.o = true;	            break;
            case 80:	this.p = true;	            break;
            case 81:	this.q = true;	            break;
            case 82:	this.r = true;	            break;
            case 83:	this.s = true;	            break;
            case 84:	this.t = true;	            break;
            case 85:	this.u = true;	            break;
            case 86:	this.v = true;	            break;
            case 87:	this.w = true;	            break;
            case 88:	this.x = true;	            break;
            case 89:	this.y = true;	            break;
            case 90:	this.z = true;	            break;
            case 93:	this.select = true;	        break;
            case 96:	this.num_0 = true;	        break;
            case 97:	this.num_1 = true;	        break;
            case 98:	this.num_2 = true;	        break;
            case 99:	this.num_3 = true;	        break;
            case 100:	this.num_4 = true;	        break;
            case 101:	this.num_5 = true;	        break;
            case 102:	this.num_6 = true;	        break;
            case 103:	this.num_7 = true;	        break;
            case 104:	this.num_8 = true;	        break;
            case 105:	this.num_9 = true;	        break;
            case 106:	this.multiply = true;	    break;
            case 107:	this.add = true;	        break;
            case 109:	this.subtract = true;       break;
            case 110:	this.decimalpoint = true;	break;
            case 111:	this.divide = true;         break;
            case 112:	this.f1 = true;	            break;
            case 113:	this.f2 = true;	            break;
            case 114:	this.f3 = true;	            break;
            case 115:	this.f4 = true;	            break;
            case 116:	this.f5 = true;	            break;
            case 117:	this.f6 = true;	            break;
            case 118:	this.f7 = true;	            break;
            case 119:	this.f8 = true;             break;
            case 120:	this.f9 = true;             break;
            case 121:	this.f10 = true;	        break;
            case 122:	this.f11 = true;            break;
            case 123:	this.f12 = true;            break;
            case 144:	this.numlock = true;        break;
            case 145:	this.scrolllock = true;	    break;
            case 186:	this.semicolon = true;	    break;
            case 187:	this.equalsign = true;      break;
            case 188:	this.comma = true;          break;
            case 189:	this.dash = true;           break;
            case 190:	this.period = true;         break;
            case 191:	this.forwardslash = true;   break;
            case 192:	this.graveaccent = true;	break;
            case 219:	this.openbracket = true;	break;
            case 220:	this.backslash = true;      break;
            case 221:	this.closebraket = true;    break;
            case 222:	this.singlequote = true;    break;
		}
	};
    
    this.onKeyUp = function ( event ) {
        switch(event.keyCode) {
            case 8:     this.backspace = false;     break;
            case 9:	    this.tab = false;           break;
            case 13:	this.enter = false;         break;
            case 16:	this.shift = false;         break;
            case 17:	this.ctrl = false;	        break;
            case 18:	this.alt = false;	        break;
            case 19:	this.pausebreak = false;	break;
            case 20:	this.capslock = false;	    break;
            case 27:	this.esc = false;	        break;
            case 33:	this.pageup = false;	    break;
            case 34:	this.pagedown = false;	    break;
            case 35:	this.end = false;	        break;
            case 36:    this.home = false;	        break;
            case 37:	this.left = false;	        break;
            case 38:	this.up = false;	        break;
            case 39:	this.right = false;	        break;
            case 40:	this.down = false;	        break;
            case 45:	this.ins = false;	        break;
            case 46:	this.del = false;	        break;
            case 48:	this._0 = false;	        break;
            case 49:	this._1 = false;	        break;
            case 50:	this._2 = false;	        break;
            case 51:	this._3 = false;	        break;
            case 52:	this._4 = false;	        break;
            case 53:	this._5 = false;	        break;
            case 54:	this._6 = false;	        break;
            case 55:	this._7 = false;	        break;
            case 56:	this._8 = false;            break;
            case 57:	this._9 = false;	        break;
            case 65:	this.a = false;	            break;
            case 66:	this.b = false;	            break;
            case 67:	this.c = false;	            break;
            case 68:	this.d = false;	            break;
            case 69:	this.e = false;	            break;
            case 70:	this.f = false;	            break;
            case 71:	this.g = false;	            break;
            case 72:	this.h = false;	            break;
            case 73:	this.i = false;	            break;
            case 74:	this.j = false;	            break;
            case 75:	this.k = false;	            break;
            case 76:	this.l = false;	            break;
            case 77:	this.m = false;	            break;
            case 78:	this.n = false;	            break;
            case 79:	this.o = false;	            break;
            case 80:	this.p = false;	            break;
            case 81:	this.q = false;	            break;
            case 82:	this.r = false;	            break;
            case 83:	this.s = false;	            break;
            case 84:	this.t = false;	            break;
            case 85:	this.u = false;	            break;
            case 86:	this.v = false;	            break;
            case 87:	this.w = false;	            break;
            case 88:	this.x = false;	            break;
            case 89:	this.y = false;	            break;
            case 90:	this.z = false;	            break;
            case 93:	this.select = false;        break;
            case 96:	this.num_0 = false;	        break;
            case 97:	this.num_1 = false;	        break;
            case 98:	this.num_2 = false;	        break;
            case 99:	this.num_3 = false;	        break;
            case 100:	this.num_4 = false;	        break;
            case 101:	this.num_5 = false;	        break;
            case 102:	this.num_6 = false;	        break;
            case 103:	this.num_7 = false;	        break;
            case 104:	this.num_8 = false;	        break;
            case 105:	this.num_9 = false;	        break;
            case 106:	this.multiply = false;      break;
            case 107:	this.add = false;           break;
            case 109:	this.subtract = false;	    break;
            case 110:	this.decimalpoint = false;	break;
            case 111:	this.divide = false;	    break;
            case 112:	this.f1 = false;	        break;
            case 113:	this.f2 = false;	        break;
            case 114:	this.f3 = false;	        break;
            case 115:	this.f4 = false;	        break;
            case 116:	this.f5 = false;	        break;
            case 117:	this.f6 = false;	        break;
            case 118:	this.f7 = false;	        break;
            case 119:	this.f8 = false;	        break;
            case 120:	this.f9 = false;	        break;
            case 121:	this.f10 = false;	        break;
            case 122:	this.f11 = false;	        break;
            case 123:	this.f12 = false;	        break;
            case 144:	this.numlock = false;	    break;
            case 145:	this.scrolllock = false;	break;
            case 186:	this.semicolon = false;	    break;
            case 187:	this.equalsign = false;	    break;
            case 188:	this.comma = false;	        break;
            case 189:	this.dash = false;	        break;
            case 190:	this.period = false;	    break;
            case 191:	this.forwardslash = false;	break;
            case 192:	this.graveaccent = false;	break;
            case 219:	this.openbracket = false;	break;
            case 220:	this.backslash = false;	    break;
            case 221:	this.closebraket = false;	break;
            case 222:	this.singlequote = false;	break;
		}
	};
    this.dom.addEventListener('contextmenu', function(event) { event.preventDefault(); }, false);
    this.dom.addEventListener('mousedown', bind( this, this.onMouseDown), false);
    this.dom.addEventListener('mousemove', bind( this, this.onMouseMove), false);
	this.dom.addEventListener('mouseup', bind( this, this.onMouseUp), false);
    this.dom.addEventListener('keydown', bind( this, this.onKeyDown), false);
    this.dom.addEventListener('keyup', bind( this, this.onKeyUp), false);
    
    function bind( scope, fn ) {
        return function () {
			fn.apply( scope, arguments );
		};
    }
};