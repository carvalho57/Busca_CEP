(function() {
    'use strict';
    
    class DOM {
        constructor(no) {      
          this.element = document.querySelectorAll(no);
        }
        on(event, callback) {
          this.element[0].addEventListener(event,callback,false);
        }
        off(event,callback) {
          this.element[0].removeEventListener(event,callback,false);
        }
        onAll(event, callback) {
          Array.prototype.forEach.call(this.element, function (no) {
            no.addEventListener(event, callback, false);
          });
        }
        offAll(event, callback) {
          Array.prototype.forEach.call(this.element, function (no) {
            no.removeEventListener(event, callback);
          });
        }
        clearChildrens() {
          this.forEach(function(element) {
            while (element.firstChild) {
              element.removeChild(element.lastChild);
            }
          })      
        }
        getValue() {
          if(this.element.length == 1) {
            return this.element[0].value;
          }      
        }
        setText(value) {
          if(this.element.length == 1) {
            this.element[0].textContent = value;
          }      
        }    
        forEach() {
          Array.prototype.forEach.apply(this.element, arguments);
        }
        map() {
          return Array.prototype.map.apply(this.element, arguments);
        }
        filter() {
          return Array.prototype.filter.apply(this.element, arguments);
        }
        reduce() {
          return Array.prototype.reduce.apply(this.element, arguments);
        }
        reduceRight() {
          return Array.prototype.reduceRight.apply(this.element, arguments);
        }
        every() {
          return Array.prototype.every.apply(this.element, arguments);
        }
        some() {
          return Array.prototype.some.apply(this.element, arguments);
        }
        getElement() {
          return this.element[0];
        }
        getElements() {
          return this.element;
        }  
    }
  window.DOM = DOM;
})();
  

