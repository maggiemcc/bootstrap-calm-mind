// Cursor Follower
gsap.set(".ball", { xPercent: 55, yPercent: 55 });

var ball = document.querySelector(".ball");
var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = .45;

var xSet = gsap.quickSetter(ball, "x", "px");
var ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

gsap.ticker.add(() => {
    var dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
});


// Header text fade/move into position
gsap.from(".box", {
    opacity: 0, 
    y: 100, 
    duration: 1.5
  });


// // Text fade Effect on mouseover
// gsap.registerEffect({
//     name: "fade",
//     defaults: { duration: 2 },
//     effect: (targets, config) => {
//         return gsap.to(targets, { duration: config.duration, opacity: .55 });
//     }
// });

// document.querySelectorAll(".box").forEach(function (box) {
//     box.addEventListener("mouseenter", function () {
//         gsap.effects.fade(this);
//     });
// });


// Nav Buttons hover interaction (button will follow cursor until .1 offset)
var hoverMouse = function($el) {
    $el.each(function() {
      var $self = $(this);
      var hover = false;
      var offsetHoverMax = $self.attr("offset-hover-max") || 0.1;
      var offsetHoverMin = $self.attr("offset-hover-min") || 0.1;
  
      var attachEventsListener = function() {
        $(window).on("mousemove", function(e) {
          //
          var hoverArea = hover ? offsetHoverMax : offsetHoverMin;
  
          // cursor
          var cursor = {
            x: e.clientX,
            y: e.clientY + $(window).scrollTop()
          };
  
          // size
          var width = $self.outerWidth();
          var height = $self.outerHeight();
  
          // position
          var offset = $self.offset();
          var elPos = {
            x: offset.left + width / 2,
            y: offset.top + height / 2
          };
  
          // comparaison
          var x = cursor.x - elPos.x;
          var y = cursor.y - elPos.y;
  
          // dist
          var dist = Math.sqrt(x * x + y * y);
  
          // mutex hover
          var mutHover = false;
  
          // anim
          if (dist < width * hoverArea) {
            mutHover = true;
            if (!hover) {
              hover = true;
            }
            onHover(x, y);
          }
  
          // reset
          if (!mutHover && hover) {
            onLeave();
            hover = false;
          }
        });
      };
  
      var onHover = function(x, y) {
        TweenMax.to($self, 0.4, {
          x: x * 0.4,
          y: y * 0.4,
          //scale: .9,
          rotation: x * 0.05,
          ease: Power2.easeOut
        });
      };
      var onLeave = function() {
        TweenMax.to($self, 0.7, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          ease: Elastic.easeOut.config(1.2, 0.4)
        });
      };
  
      attachEventsListener();
    });
  };
  
  hoverMouse($('.navButtons'));
