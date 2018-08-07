var doc = document.documentElement;
var featureArr = [];

function getWindowSize(){
 var d= document, root= d.documentElement, body= d.body;
 var wid= window.innerWidth || root.clientWidth || body.clientWidth, 
 hi= window.innerHeight || root.clientHeight || body.clientHeight ;
 return [wid,hi]
}

var parallax = function(el){
  var wSize = getWindowSize();
  return {
    start:function(obj){
      var items = el.split(",");         
      items.forEach(function(item,id){        
        if(!obj){
          obj = {y:true,x:true,limit:[0.02,0.008]}
        }else{
          if(!obj.x && !obj.y){obj.x = true;obj.y = true}
          else if(!obj.x){obj.x = false}
          else if(!obj.y){obj.y = false}
          if(!obj.limit){obj.limit = [0.02,0.008]}
        }                
        parallax(item).run(obj);                                    
      })      
    },
    run:function(set){            
      var item = document.getElementsByClassName(el);
      var item_css = window.getComputedStyle(item[0]);
      var firstPos = item_css.getPropertyValue('background-position').split(" ").map(function(item){return parseFloat(item)}),posValue;  
      var scrollUnit = [],unitX,unitY;      
      if(wSize[0] > wSize[1]){
        unitX=(set.x ? (set.limit[0] - set.limit[1])/2 : 0);
        unitY=0;
      }else{
        unitY=(set.y ? (set.limit[0] - set.limit[1])/2 : 0);
        unitX=0;
      }
      if(set.x && set.y){
        firstPos.forEach(function(value,id){          
          if(id%2==0){
            scrollUnit[id] = Number((Math.random() * ((set.limit[0] ? set.limit[0] : 0.02) - (set.limit[1] ? set.limit[1] : set.limit[0] - 0.012)) + 0.008).toFixed(3) - unitX);          
          }else{
            scrollUnit[id] = Number((Math.random() * ((set.limit[0] ? set.limit[0] : 0.02) - (set.limit[1] ? set.limit[1] : set.limit[0] - 0.012)) + 0.008).toFixed(3) - unitY);          
          }          
        });
      }else if(set.x){        
        firstPos.forEach(function(value,id){
          if(id%2==0){
            scrollUnit[id] = Number((Math.random() * ((set.limit[0] ? set.limit[0] : 0.02) - (set.limit[1] ? set.limit[1] : set.limit[0] - 0.012)) + 0.008).toFixed(3) - unitX);          
          }else{
            scrollUnit[id] = 0;
          }          
        });
      }else if(set.y){
        firstPos.forEach(function(value,id){
          if(id%2==0){
            scrollUnit[id] = 0;
          }else{
            scrollUnit[id] = Number((Math.random() * ((set.limit[0] ? set.limit[0] : 0.02) - (set.limit[1] ? set.limit[1] : set.limit[0] - 0.012)) + 0.008).toFixed(3) - unitY);          
          }          
        });
      }            

      var progressParallax = function(position){                
        position.forEach(function(value,id){                                        
          if(id%2==0){        
            posValue+=(value-Number((scrollUnit[id]*(window.scrollY || doc.scrollTop)).toFixed(2)))+"% ";
          }else{    
            if(firstPos.length - 1 == id){
              posValue+=(value-Number((scrollUnit[id]*(window.scrollY || doc.scrollTop)).toFixed(2)))+"%";                
            }else{
              posValue+=(value-Number((scrollUnit[id]*(window.scrollY || doc.scrollTop)).toFixed(2)))+"%, ";                            
            }                 
          }          
          if(firstPos.length - 1 == id){             
            item[0].style.backgroundPosition = posValue;                  
          }
        })
      }      
      var elTop = getElemDistance(item[0]);

      var setItemPos = function () {
        posValue = "";  
        progressParallax(firstPos,el);
      }      
      setItemPos();      
      // featureArr.push(setItemPos);
      glevent.scroll(function(){
        setItemPos();
      });
      // window.onscroll = function(){                
      //   featureArr.forEach(function(fnc){
      //     fnc();
      //   })
      // }
    }
  }
}

parallax("b01_content").start({y:true});
parallax("box02").start({y:true,limit:[0.1,0.08]});
parallax("b03_content").start({y:true,limit:[0.1,0.1]})
parallax("box05").start({y:true,limit:[0.1,0.08]})
parallax("b04_bg").start({y:true,limit:[0.1,0.08]})