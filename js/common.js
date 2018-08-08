var common = function(){
  return {
    start:function(){
      this.newsScroll();
      this.menuIcon();  
      this.windowScroll();
      this.totop();
    },
    newsScroll:function(){
        OverlayScrollbars(document.getElementsByClassName('custom-scroll-news'),{
          autoUpdate: true,
          nativeScrollbarsOverlaid:{
            showNativeScrollbars: true
          }
        })
    },
    menuIcon:function(){      
      var wWidth;      
      var items = document.getElementsByClassName("sub_link");
      glevent.load(function(){
        wWidth = this.innerWidth;
      })      

      glevent.resize(function(){
        var items = document.getElementsByClassName("sub_gnav");
        wWidth = this.innerWidth;        
        if(wWidth > 640){
          for(var i = 0;i < items.length;i++){
            items[i].style.opacity = "";
            if(parseInt(items[i].style.height) == 0){
              items[i].style.height = "";
            }
          }          
        }else{
          for(var i = 0;i < items.length;i++){
            if(parseInt(items[i].style.height) > 0){
              items[i].style.opacity = 1;
            }
          }
        }
      })      
      document.getElementsByClassName("menu-icon")[0].onclick = function(){                
        if(this.className.split("active").length > 1){
          this.className = this.className.replace(/\b active\b/g, "");          
          document.getElementById("gnavi").className = "";
        }else{
          this.className+=" active";
          document.getElementById("gnavi").className = "active";
        } 
      }
      glevent.click(".sub_link",function(cur){
        if(wWidth <= 640){           
          if(cur.className.split("select_subItem").length > 1){
            cur.className = cur.className.replace(/\b select_subItem\b/g, "");              
            if(document.getElementsByClassName("menu_down")[0]){
              KUTE.to(document.getElementsByClassName("menu_down")[0],{height:0},{easing: 'easingCubicOut', duration: 500}).start();
              KUTE.to(document.getElementsByClassName("menu_down")[0],{opacity:0},{easing: 'easingCubicOut', duration: 1200}).start();
              document.getElementsByClassName("menu_down")[0].className = document.getElementsByClassName("menu_down")[0].className.replace(/\b menu_down\b/g, "");
            }              
          }else{
            for(var i = 0;i < items.length; i++){
              items[i].className = items[i].className.replace(/\b select_subItem\b/g, "");
            }              
            if(document.getElementsByClassName("menu_down")[0]){
              KUTE.to(document.getElementsByClassName("menu_down")[0],{height:0},{easing: 'easingCubicOut', duration: 500}).start();
              KUTE.to(document.getElementsByClassName("menu_down")[0],{opacity:0},{easing: 'easingCubicOut', duration: 1200}).start();
              document.getElementsByClassName("menu_down")[0].className = document.getElementsByClassName("menu_down")[0].className.replace(/\b menu_down\b/g, "");
            }           
            var sub_menu = cur.nextElementSibling;   
            var submn_height = sub_menu.children[0].offsetHeight*sub_menu.children.length;              
            sub_menu.className += " menu_down";
            cur.className+=" select_subItem";
            setTimeout(function(){
              KUTE.to(document.getElementsByClassName("menu_down")[0],{height:submn_height},{easing: 'easingCubicOut', duration: 500}).start();
              KUTE.to(document.getElementsByClassName("menu_down")[0],{opacity:1},{easing: 'easingCubicOut', duration: 1200}).start();
            },50)
          }            
          return false;
        }
      })  
    },
    windowScroll:function(){
      var wWidth = window.outerWidth;            
      var elTop,counter,anchorPoint;
      getCounter();
      glevent.resize(function(){
        getCounter();
        checkHashLocation(window.location.hash);
      })
      glevent.load(function(){
        checkHashLocation(window.location.hash);
      })      
      function getCounter(){
        if(window.outerWidth <= 480){
          counter = 145;
        }else if(window.outerWidth <= 640){
          counter = 165;
        }else if(window.outerWidth <= 780){
          counter = 202;
        }else{
          counter = 0;
        }        
      }
      function checkHashLocation(hash,e){        
        if(window.outerWidth > 780 && hash.split("#").length > 1){
          anchorPoint = Number(document.getElementById(hash.split("#")[1]).getAttribute("data-anchor"));          
        }else{
          anchorPoint = 0;
        }
        if(hash.split("#").length > 1){                              
          if(document.getElementById(hash.split("#")[1]) !== null){            
            elTop = getElemDistance(document.getElementById(hash.split("#")[1]))-counter-anchorPoint;                                                
            // KUTE.to(document.getElementsByTagName("body")[0],{scroll:elTop},{easing: 'easingSinusoidalInOut',duration:800}).start()                            
            var scroll = anime({
              targets: [document.body, document.documentElement],
              scrollTop: elTop,
              duration: 800,              
              // direction: 'alternate',
              easing: 'easeInOutSine'
            });
            if(history.replaceState){
              history.replaceState(undefined,undefined,hash);
            }else{
              window.location.hash = "#/"+this.getAttribute("href");
            }                         
          }                    
          if(e){
            e.preventDefault();
          }          
        }        
      }

      function checkSubMenuClick(){
        
        glevent.click("[href*='#']",function(cur,e){
          // alert("run");
          checkHashLocation(cur.getAttribute("href"),e);                    
        })
      }
      checkSubMenuClick();
      // var items = document.getElementsByClassName("anchor_item");        
      // console.log(items);
      // for(var i = 0;i<items.length;i++){
      //   items[i].onclick = function(e){     
      //     checkHashLocation(this.getAttribute("href"),e);                    
      //   }
      // }
      // glevent.click("[href='#']",function(cur,e){
      //   checkHashLocation(cur.getAttribute("href"),e);                    
      // })
    },

    totop:function(){
      var doc = document.documentElement;
      glevent.scroll(function(){
        if((window.scrollY || doc.scrollTop) > 100){
          document.getElementsByClassName("totop")[0].className = document.getElementsByClassName("totop")[0].className.replace(/\b show\b/g, "");    
          document.getElementsByClassName("totop")[0].className+=" show";
        }else{          
          document.getElementsByClassName("totop")[0].className = document.getElementsByClassName("totop")[0].className.replace(/\b show\b/g, "");    
        }
      })
      document.getElementsByClassName("totop")[0].onclick = function(){
        KUTE.to('window',{scroll:0},{easing: 'easingSinusoidalInOut',duration:800}).start();                                      
      }
    }
  }
}
common().start();