var getElemDistance = function ( elem ) {  
    var location = 0,h = parseInt(elem.offsetHeight/2);                
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }    
    return location >= 0 ? (location-h) : 0;
};




var resizeFunc = [],
loadFunc = [],
scrollFunc = [],
clickFunc = {};
var funt;
var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};

var public = function(){
  return {
    resize:function(fnc){
      resizeFunc.push(fnc);
      window.onresize = function(){
        resizeFunc.forEach(function(func){
          func();
        })
      }      
    },
    load:function(fnc){
      loadFunc.push(fnc);
      window.onload = function(){
        loadFunc.forEach(function(func){
          func();
        })
      }
    },
    scroll: function(fnc){
      scrollFunc.push(fnc);
      window.onscroll = function(){
        scrollFunc.forEach(function(func){
          func();
        })
      }
    },
    click:function(el,fnc){      
      var objItemQuery,objItem,lement;
      
      if(el.split("=").length > 1 || el.split("[").length > 1){
        objItemQuery = el;
        elements = document.querySelectorAll(el);
        objItem = elements[0].className;                  
      }else{
        objItem = el.split("#").length > 1 ? el.split("#")[1] : el.split(".")[1];
        elements = document.getElementById(objItem) || document.getElementsByClassName(objItem);      
        objItem = (elements[0] || elements).className != "" ? elements[0].className : elements.id;                  
      }      
      
      if(elements[0]){
        if(!objItemQuery){
          objItem = elements[0].className;        
          for(var i = 1;i<elements.length;i++){
            objItem = (objItem.split(" ").length > elements[i].className.split(" ").length ? objItem : elements[i].className);
            if(i == elements.length - 1){            
              if(!clickFunc[objItem]){
                clickFunc[objItem] = [];                      
              }            
              clickFunc[objItem].push(fnc);
              setClick(elements,objItem);      
            }
          }
        }else{
          objItem = elements[0].className;        
          for(var i = 1;i<elements.length;i++){
            if(objItem == ""){
              objItem = elements[i].className;                            
              
            }else{              
              objItem = (objItem.split(" ").length > elements[i].className.split(" ").length ? objItem : elements[i].className);
              
            }                       
            if(i == elements.length - 1){ 
              
              if(!clickFunc[objItem]){
                clickFunc[objItem] = [];                      
              }            
              clickFunc[objItem].push(fnc);                            
            }
          }          
          if(!clickFunc[objItemQuery]){
            clickFunc[objItemQuery] = [];                      
          }            
          clickFunc[objItemQuery].push(fnc);
          setClick(elements,objItemQuery); 
          setClick(document.getElementsByClassName(objItem),objItem);
        }
        function setClick(elements,obj){
          for(var i = 0;i < elements.length;i++){
            elements[i].onclick = function(e){
              var cur = this,ev=e;              
              clickFunc[obj].forEach(function(func){
                func(cur,ev);
              })              
            }
          }
        }        
      }else{
        if(!clickFunc[objItem]){
          clickFunc[objItem] = [];        
        }        
        clickFunc[objItem].push(fnc);
        elements.onclick = function(e){
          var cur = this,ev = e;
          clickFunc[objItem].forEach(function(func){
            func(cur,ev);
          })            
        }
      } 
    }
  }
}

var glevent = public();