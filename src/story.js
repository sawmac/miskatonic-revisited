// first-macro.min.js, for SugarCube 2, by Chapel
;Macro.add("first",{skipArgs:!0,tags:["then","finally"],handler:function(){var a,t=$(document.createElement("span")),n=this.payload[this.payload.length-1],s=visited()-1;a=s<this.payload.length?this.payload[s].contents:"finally"===n.name?n.contents:"",t.wiki(a).addClass("macro-"+this.name).appendTo(this.output)}});
// end first-macro.min.js

// message-macro.min.js, for SugarCube 2, by Chapel
;setup.messageMacro={},setup.messageMacro.default="Help",Macro.add("message",{tags:null,handler:function(){var e=this.payload[0].contents,a=$(document.createElement("span")),s=$(document.createElement(this.args.includes("btn")?"button":"a")),t=$(document.createElement("span"));s.wiki(0<this.args.length&&"btn"!==this.args[0]?this.args[0]:setup.messageMacro.default).ariaClick(function(){a.hasClass("open")?t.css("display","none").empty():t.css("display","block").wiki(e),a.toggleClass("open")}),a.attr("id","macro-"+this.name+"-"+this.args.join("").replace(/[^A-Za-z0-9]/g,"")).addClass("message-text").append(s).append(t).appendTo(this.output)}});
// end message-macro.min.js

// notify.min.js, for SugarCube 2, by Chapel
;$(document.body).append("<div id='notify'></div>"),$(document).on(":notify",function(s){s.message&&"string"==typeof s.message&&(s.message.trim(),s.class?"string"==typeof s.class?s.class="open macro-notify "+s.class:Array.isArray(s.class)?s.class="open macro-notify "+s.class.join(" "):s.class="open macro-notify":s.class="open macro-notify",s.delay?("number"!=typeof s.delay&&(s.delay=Number(s.delay)),Number.isNaN(s.delay)&&(s.delay=2e3)):s.delay=2e3,$("#notify").empty().wiki(s.message).addClass(s.class),setTimeout(function(){$("#notify").removeClass()},s.delay))}),Macro.add("notify",{tags:null,handler:function(){var s=this.payload[0].contents,a=!1,e=!1;0<this.args.length&&("number"==typeof this.args[0]?(a=this.args[0],e=1<this.args.length&&this.args.slice(1).flatten()):e=this.args.flatten().join(" ")),$(document).trigger({type:":notify",message:s,delay:a,class:e})}});
// end notify.min.js

// simple-inventory.min.js, for SugarCube 2, by Chapel
;setup.simpleInv={},setup.simpleInv.options={tryGlobal:!0,defaultStrings:{empty:"The inventory is empty...",listDrop:"Discard",separator:"\n"}},setup.simpleInv.attachEvent=function(i,t,n,r){$(document).trigger({type:"initialized"===r?":inventory-init":":inventory-update",instance:i,receiving:t,moved:n,context:r})},setup.simpleInv.inventory=function(i){"use strict";if(i=i?(i=[].slice.call(arguments)).flatten():[],!(this instanceof setup.simpleInv.inventory))return new setup.simpleInv.inventory(i);i=(this.inv=i).length?i:null,setup.simpleInv.attachEvent(this,null,i,"initialized")},setup.simpleInv.inventory.is=function(i){return i instanceof setup.simpleInv.inventory},setup.simpleInv.inventory.log=function(i){return setup.simpleInv.inventory.is(i)?"Inventory.log() -> "+i.toArray().join(" - "):"Inventory.log() -> object is not an inventory..."},setup.simpleInv.inventory.removeDuplicates=function(i){if(setup.simpleInv.inventory.is(i)){var t,n=i.toArray();return t=[],n.forEach(function(i){t.includes(i)||t.push(i)}),t}},setup.simpleInv.inventory.getUID=function(i,t){var n=Math.random().toString(36).substring(7);return arguments.length<2&&(i=Math.random().toString(36).substring(7),t=random(99)),"simple-inv-"+t+"-"+Date.now()+"-"+i.replace(/[^A-Za-z0-9]/g,"")+"-"+n},setup.simpleInv.inventory.prototype={transfer:function(i){if(arguments.length<2)return this;if(!(i instanceof setup.simpleInv.inventory))return this;for(var t=[].slice.call(arguments),n=[],r=0,e=(t=t.slice(1).flatten()).length;r<e;r++)this.inv.includes(t[r])&&(this.inv.delete(t[r]),n.push(t[r]));return n.length&&(i.inv=i.inv.concat(n),setup.simpleInv.attachEvent(this,i,n,"transfer")),this},has:function(){var i=[].slice.call(arguments).flatten();return!(!i||!i.length)&&this.inv.includesAny(i)},hasAll:function(){var i=[].slice.call(arguments).flatten();return!(!i||!i.length)&&this.inv.includesAll(i)},pickUp:function(i){var t,n=[].slice.call(arguments).flatten(),r=this;return n&&n.length&&("unique"!==i&&"unique"!==n[0]||(n=n.splice(1),t=[],n.forEach(function(i){r.inv.includes(i)||t.push(i)}),n=t),this.inv=this.inv.concat(n),setup.simpleInv.attachEvent(this,null,n,"pickup")),this},drop:function(){var t,i=[].slice.call(arguments).flatten(),n=this;if(i&&i.length){var r=[];i.forEach(function(i){n.has(i)&&(r.push(i),t=n.inv.indexOf(i),n.inv.deleteAt(t))}),setup.simpleInv.attachEvent(this,null,r,"drop")}return this},sort:function(){return this.inv=this.inv.sort(),setup.simpleInv.attachEvent(this,null,null,"sort"),this},show:function(i){return i&&"string"==typeof i||(i=setup.simpleInv.options.defaultStrings.separator),this.inv.length?this.inv.join(i):setup.simpleInv.options.defaultStrings.empty},empty:function(){var i=clone(this.inv);return this.inv=[],setup.simpleInv.attachEvent(this,null,i,"drop"),this},toArray:function(){return this.inv},linkedList:function(o,l){o&&o instanceof setup.simpleInv.inventory||(o=!1);var i=this.toArray(),u=this,v=$(document.createElement("span"));return i&&i.length?i.forEach(function(i,t,n){var r=$(document.createElement("span")),e=$(document.createElement("a")),s=l||setup.simpleInv.options.defaultStrings.drop,a=setup.simpleInv.inventory.getUID(i,t);e.wiki(s).addClass("simple-inv drop-link"),e.ariaClick(function(){o?u.transfer(o,i):u.drop(i),$("#"+a).empty()}),r.attr("id",a).addClass("simple-inv link-listing").wiki(i+" ").append(e),t<n.length-1&&r.wiki("<br />"),v.append(r)}):v.wiki(setup.simpleInv.options.defaultStrings.empty),v},constructor:setup.simpleInv.inventory,toJSON:function(){return JSON.reviveWrapper("new setup.simpleInv.inventory("+JSON.stringify(this.inv)+")")},clone:function(){return new setup.simpleInv.inventory(this.inv)}},setup.simpleInv.options.tryGlobal&&(window.Inventory=window.Inventory||setup.simpleInv.inventory),Macro.add("newinventory",{handler:function(){if(1!==this.args.length)return this.error("incorrect number of arguments");var i=this.args[0].trim();if("$"!==i[0]&&"_"!==i[0])return this.error('variable name "'+this.args[0]+'" is missing its sigil ($ or _)');Wikifier.setValue(i,new setup.simpleInv.inventory(this.args.slice(1).flatten()))}}),Macro.add("pickup",{handler:function(){if(this.args.length<2)return this.error("incorrect number of arguments");var i=this.args[0].trim();if("$"!==i[0]&&"_"!==i[0])return this.error('variable name "'+this.args[0]+'" is missing its sigil ($ or _)');var t=Wikifier.getValue(i);if(!setup.simpleInv.inventory.is(t))return this.error("variable "+i+" is not an inventory!");t.pickUp(this.args.slice(1).flatten())}}),Macro.add("drop",{handler:function(){if(this.args.length<2)return this.error("incorrect number of arguments");var i=this.args[0].trim();if("$"!==i[0]&&"_"!==i[0])return this.error('variable name "'+this.args[0]+'" is missing its sigil ($ or _)');var t=Wikifier.getValue(i);if(!setup.simpleInv.inventory.is(t))return this.error("variable "+i+" is not an inventory!");t.drop(this.args.slice(1).flatten())}}),Macro.add("transfer",{handler:function(){if(this.args.length<3)return this.error("incorrect number of arguments");var i=this.args[0].trim();if("$"!==i[0]&&"_"!==i[0])return this.error('variable name "'+this.args[0]+'" is missing its sigil ($ or _)');var t=Wikifier.getValue(i);if(!setup.simpleInv.inventory.is(t))return this.error("variable "+i+" is not an inventory!");var n=this.args[1].trim();if("$"!==n[0]&&"_"!==n[0])return this.error('variable name "'+this.args[1]+'" is missing its sigil ($ or _)');var r=Wikifier.getValue(n);if(!setup.simpleInv.inventory.is(r))return this.error("variable "+n+" is not an inventory!");t.transfer(r,this.args.slice(2).flatten())}}),Macro.add("dropall",{handler:function(){if(1!==this.args.length)return this.error("incorrect number of arguments");var i=this.args[0].trim();if("$"!==i[0]&&"_"!==i[0])return this.error('variable name "'+this.args[0]+'" is missing its sigil ($ or _)');var t=Wikifier.getValue(i);if(!setup.simpleInv.inventory.is(t))return this.error("variable "+i+" is not an inventory!");t.empty()}}),Macro.add("clear","dropall",!1),Macro.add("sort",{handler:function(){if(1!==this.args.length)return this.error("incorrect number of arguments");var i=this.args[0].trim();if("$"!==i[0]&&"_"!==i[0])return this.error('variable name "'+this.args[0]+'" is missing its sigil ($ or _)');var t=Wikifier.getValue(i);if(!setup.simpleInv.inventory.is(t))return this.error("variable "+i+" is not an inventory!");t.sort()}}),Macro.add("inventory",{handler:function(){if(this.args.length<1||2<this.args.length)return this.error("incorrect number of arguments");var i=this.args[0].trim();if("$"!==i[0]&&"_"!==i[0])return this.error('variable name "'+this.args[0]+'" is missing its sigil ($ or _)');var t=Wikifier.getValue(i);if(!setup.simpleInv.inventory.is(t))return this.error("variable "+i+" is not an inventory!");var n=$(document.createElement("span")),r=!!this.args[1]&&this.args[1];n.wiki(t.show(r)).addClass("macro-"+this.name).appendTo(this.output)}}),Macro.add("linkedinventory",{handler:function(){if(this.args.length<2||3<this.args.length)return this.error("incorrect number of arguments");var i=!1,t=this.args[1].trim(),n="string"==typeof this.args[0]&&this.args[0];if(!n)return this.error("first argument should be the link text");if("$"!==t[0]&&"_"!==t[0])return this.error('variable name "'+this.args[1]+'" is missing its sigil ($ or _)');var r=Util.slugify(t);r=this.name+"-"+r;var e=Wikifier.getValue(t);if(!setup.simpleInv.inventory.is(e))return this.error("variable "+t+" is not an inventory!");if(2<this.args.length){var s=this.args[2].trim();if("$"!==s[0]&&"_"!==s[0])return this.error('variable name "'+this.args[2]+'" is missing its sigil ($ or _)');if(i=Wikifier.getValue(s),!setup.simpleInv.inventory.is(i))return this.error("variable "+s+" is not an inventory!")}e.linkedList(i,n).attr("id",r).addClass("macro-"+this.name).appendTo(this.output)}});
// end simple-inventory.min.js

// stow UI BAR
UIBar.stow();

// keyboard events
(function () {
	$(document).on('keyup', function (ev) {
		/* the ev variable contains a keyup event object.
		 *
		 * ev.keyCode - contains the ASCII code of the key that was released, this property is supported in effectively all browsers.
		 * ev.key     - contains the key value of the key that was released, this property is supported by most modern browsers.
		 *
		 */
    

		/* the following shows an alert when the 'a' key is released. */
		if (ev.key === 'a') {
			UIBar.stow();
        }
        if (ev.key === 's') {
			UIBar.unstow();
        }
        if (ev.key === 'd') {
            DebugView.toggle();
        }
        if (ev.key === 'r') {
            Engine.restart();
        }
        if (ev.key === 'ArrowRight') {
            Engine.forward();
        }
        if (ev.key === 'ArrowLeft') {
            Engine.backward();
		}
	});
}());

// show passage in a dialog macro
Macro.add('look', {
	skipArgs : false,
	handler  : function () {
		try {
            let passage = this.args[0];
            Dialog.setup(passage);
            Dialog.wiki(Story.get(passage).processText().trim());
            Dialog.open();
		}
		catch (ex) {
			return this.error('bad conditional expression: ' + ex.message);
		}
	}
});
