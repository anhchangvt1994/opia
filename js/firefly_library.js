var rootEl, darkBg = document.getElementsByClassName('mainvs_dark');
var firefly = function(el){  
  return {
    start:function(){
      var items = el.split(","),timer=0;      
      rootEl = items;
      items.forEach(function(item,id){
        setTimeout(function(){
          firefly(item).run();                    
        },timer);
        if(items.length - 1 > id){            
          timer = Math.random() * (3000 - 2000) + 2000;              
        }
      })
    },
    run:function(){      
      var timer = Math.floor(Math.random() * (10000 - 9000) + 9000),    
          distance01 = (Math.random() * (2500 - 2000) + 2000),
          distance02 = (Math.random() * (700 - 150) + 100),
          rd01, rd02, top01, left01;    
      var sparateTimer;
      var interval,opaRun;


      function waiting(){
        setTimeout(function(){                
          setCordClouds();
          interval = autoRun();  
          sparateTimer = timer/10;
          opaRun = opaTimer();          
        },100);  
      }
      waiting();
      function opaTimer(){  
        return setTimeout(function(){
        sparateTimer += timer/10;                
          if (timer - sparateTimer > timer/10) {
            document.getElementsByClassName(el)[0].style.opacity = (Math.random() * (1 - 0.5) + 0.3).toFixed(1);
            clearTimeout(opaRun);
            opaRun = opaTimer();            
          }else {            
            clearTimeout(opaRun);
            document.getElementsByClassName(el)[0].style.opacity = 0;
            setTimeout(function(){              
              document.getElementsByClassName(el)[0].removeAttribute("style");
              document.getElementsByClassName(el)[0].style.transition = "none";              
              clearInterval(interval);
              setTimeout(function(){                
                waiting();
              },Math.random() * (300 - 150) + 150)
            },Math.random() * (700 - 200) + 200)
          }
          opaBackground();
        }, timer/10)
      }

      function opaBackground(){
        var opaTotal=0;
        rootEl.forEach(function(item,id){                      
          opaTotal+=parseFloat(document.getElementsByClassName(item)[0].style.opacity || 0);
          if(rootEl.length - 1 == id){
            if(opaTotal >= 1){
              darkBg[0].style.opacity = 0;
            }else if(opaTotal >= 0.7){
              darkBg[0].style.opacity = 0.15;
            }else{
              darkBg[0].style.opacity = 0.2;
            }
          }
        })
      }

      function autoRun() {
        return setInterval(function() {            
            sparateTimer = 1000;
            opaRun = opaTimer();
            timer = Math.floor(Math.random() * (10000 - 5000) + 5000);
            distance01 = (Math.random() * (2500 - 2000) + 2000),
            distance02 = (Math.random() * (700 - 150) + 100),        
            setCordClouds();
        }, timer);
      }

      function setCordClouds() {
        rd01 = (Math.random() * (2.5 - 2) + 2).toFixed(4),
        rd02 = (Math.random() * (3 - 0.0100) + 0.0100).toFixed(4),    
        top01 = -(distance01 * parseFloat(rd01)),    
        left01 = -(distance02 * parseFloat(rd02));        
        document.getElementsByClassName(el)[0].removeAttribute("style");
        document.getElementsByClassName(el)[0].style.backgroundPosition = left01 + "px " + top01 + "px ," + (left01 - (Math.random() * (2000 - 1000) + 1000)) + "px " + (top01 - (Math.random() * (2000 - 1000) + 1000)) + "px";
      }

    }
  }
}

firefly("firefly01,firefly02").start();