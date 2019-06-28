
$(document).ready(function(){
  let port = "http://192.168.1.55:3000";
   var socket = io.connect("http://192.168.1.55:3000");
        $("#send").click(()=>{
          sendRegister({acceptance:$("#acceptance").val(),name: $("#name").val(),lastname: $("#prenom").val(),cp: $("#cp").val(),phone:$("#phone").val(),email: $("#email").val(), message: $("#message").val()});
        })
        $("#openmenu").click(()=>{
            $("#screen_menu").removeClass("close");
            $(".main_container").addClass("opened");
        })
        $("#close").click(()=>{
            $("#screen_menu").addClass("close");
            $(".main_container").removeClass("opened");
        })
        getUser();
        alert("test")
        
    socket.on('message', addUser)
    let cpt = 0;
    function addUser(fish){
      console.log(fish)
        $("#messages").append(`<div class='fish fish_level-${fish.fish_level} fish_wrap firsh-${cpt}'><div class='fish_name'>${fish.name}</div></div>`)
        animateDiv(`.firsh-${cpt}`);
        cpt++;
    }

    function getUser(){
      $.get(`${port}/allUser`, (data) => {
        data.forEach(addUser);
      })
    }

    function sendRegister(message){
      $.post(`${port}/register`, message)
      
    }
    
function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(myclass){

    var newq = makeNewPosition();
    
      var x = $(myclass).position();
      if(x.left < newq[1]){
        $(myclass).addClass("reverse");
      }else{
        $(myclass).removeClass("reverse");
      }
    $(myclass).animate({ top: newq[0], left: newq[1] }, 5000,   function(){
      animateDiv(myclass);        
    });
    
};
particlesJS("dust", {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.1,
      random: true,
      anim: {
        enable: true,
        speed: 0.3,
        opacity_min: 0.05,
        sync: false
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false
      },
      onclick: {
        enable: false
      },
      resize: false
    }
  },
  retina_detect: true
});    
});s