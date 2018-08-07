var doc = document.documentElement;
var b01 = document.getElementsByClassName("box01");
var b01_cnt = document.getElementsByClassName("b01_content");
var b01_cntCss = window.getComputedStyle(b01_cnt[0]);
var firstPos,posValue,scrollValue;
var lastScrollTop=0,updown = 1;


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

var elTop = getElemDistance(b01[0]);



firstPos = b01_cntCss.getPropertyValue('background-position');
firstPos = firstPos.split(" ").map(function(item){return parseFloat(item)});  

var setItemPos = function () {
  posValue = " ";  
  // if(elTop - (window.scrollY || doc.scrollTop) > -250 && elTop - (window.scrollY || doc.scrollTop) <= 250){
  //   scrollValue = Number((0.01*(window.scrollY || doc.scrollTop)).toFixed(2));            
  // }else{    
  //   scrollValue = 0;
  // } 
  scrollValue = Number((0.03*(window.scrollY || doc.scrollTop)).toFixed(2));            

  if((window.scrollY || doc.scrollTop) > lastScrollTop){
    updown = 1;        
    b01_cnt[0].style.backgroundPosition = (firstPos[0] + scrollValue*updown)+"% "+(firstPos[1] + scrollValue*updown)+"%";      
    console.log(firstPos[0] + scrollValue*updown); 
  }
  else if ((window.scrollY || doc.scrollTop) < lastScrollTop){
    updown = 1;    
    b01_cnt[0].style.backgroundPosition = (firstPos[0] + scrollValue*updown)+"% "+(firstPos[1] + scrollValue*updown)+"%";          
    console.log(firstPos[0] + scrollValue*updown); 
  }
  // firstPos.forEach(function(value,id){
  //   if(id%2==0 || firstPos.length - 1 == id){        
  //     posValue+=(value+scrollValue*updown)+"% ";
  //   }else{        
  //     posValue+=(value+scrollValue*updown)+"%, ";
  //   }
  //   if(firstPos.length - 1 == id){        
  //     b01_cnt[0].style.backgroundPosition = posValue;      
  //   }
  // })  
  console.log("scrollTop : "+window.scrollY);
  console.log("scrollTop x 0.0005 : "+(0.008*(window.scrollY || doc.scrollTop)).toFixed(2));
  console.log("updown : "+updown);
  console.log("curren post : "+(firstPos[0] + scrollValue*updown)+","+(firstPos[1] + scrollValue*updown));  
  console.log(firstPos[0]);
  console.log(scrollValue*updown);
  console.log("---------------------"); 
  lastScrollTop = window.scrollY || doc.scrollTop;
}

window.onscroll = function(){ 
  setItemPos();       
}
setItemPos(b01_cntCss.getPropertyValue('background-position'));