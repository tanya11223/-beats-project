const sections = $("section");
const display = $(".maincontent");
const sidemenu = $(".fixed-menu");
const menuItems = sidemenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = MobileDetect.mobile();

let inscroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;

  if (isNan(position)) {
    console.error("передано неверное значение в countSectionPosition");
    return 0;
  }
  return position;
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {

  if(inscroll) return;

    const transitionOver = 1000;
    const mouseInertiaOver = 300;

    inscroll = true;
    const position = countSectionPosition(sectionEq);

  display.css({
    transform: 'translateY(${position}%)'
  });
  
  resetActiveClassForItem(section.sectionEq, "active");

  setTimeout(() => {
     inscroll = false;

     resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");


  }, transitionOver + mouseInertiaOver);
  }

const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();
  
  return{
    next() {
      if(nextSection.length) {
        performTransition(nextSection.index())
      }
    },
    prev() {  
    if(prevSection.length) {
    performTransition(prevSection.index())
  }
  },
  };
};

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();
  
  if (delayY > 0)  {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on("keydown", e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == "input" || tagName == "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;
    switch (e.keyCode) {
      case 38: //prev
       scroller.prev();
       break;
  
      case 40: //next
       scroller.next();
       break;
    }
  
});

$(".wrapper").on("touchmove",e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $("[data-section-id=${target}]");

  performTransition(reqSEction.index());
});

//touch swipe 
if (isMobile) {
  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
$("body").swipe( {
  swipe:function(
    event, 
    direction,
     ) {
    const scroller = viewportScroller();
    let scrollDirection = "";

    if (direction == "up") scrollDirection = "next";
    if (direction == "down") scrollDirection = "prev";
    
    scroller[scrollDirection]();
  },
});
}
