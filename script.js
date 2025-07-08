function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

locomotive();


// PAGE 1 TIMELINE
var page1_tl = gsap.timeline({
    scrollTrigger:{
        trigger: "#page-1>h1",
        scroller: "#main",
        // markers: true,
        start: "top 32%",
        end: "top 0%",
        scrub: 1
    }
})

page1_tl.to("#page-1>h1",{
    x:-100,
},"page-1-anim")

page1_tl.to("#page-1>h2",{
    x:100,
},"page-1-anim")

page1_tl.to("#page-1>video",{
    width: "90%"
},"page-1-anim")


// PAGE 2 TIMELINE
var page2_tl = gsap.timeline({
    scrollTrigger:{
        trigger: "#page-1>h1",
        scroller: "#main",
        // markers: true,
        start: "top -30%",
        end: "top -50%",
        scrub: 1
    }
})

page2_tl.to("#main",{
    backgroundColor: "#fff",
    duration: 1
})


// CURSOR ANIMATION
var cursorDiv = document.getElementById("cursor");
document.addEventListener("mousemove",(dets)=>{
    cursorDiv.style.left = dets.clientX-10+"px";
    cursorDiv.style.top = dets.clientY-10+"px";
    // cursorDiv.style.cursor = "none";
})
document.querySelector("body").style.cursor="none"

// CURSOR VIDEO ENTER
var vidDiv =document.querySelector("#page-1>video");
// IN
vidDiv.addEventListener("mouseenter",()=>{
    cursorDiv.innerText = "SOUND ON",
    cursorDiv.style.width="7%",
    cursorDiv.style.height="3%",
    cursorDiv.style.borderRadius="50px"
    cursorDiv.style.textAlign="center"
})
// OUT
vidDiv.addEventListener("mouseleave",()=>{
    cursorDiv.innerText = "",
    cursorDiv.style.width="20px"
    cursorDiv.style.height="20px"
    cursorDiv.style.borderRadius="50%"
})

// PAGE 4
var page4_tl = gsap.timeline({
    scrollTrigger:{
        trigger: "#page-4",
        scroller: "#main",
        // markers: true,
        start: "top 290%",
        end: "top 270%",
        scrub: 1
    }
})

page4_tl.to("#main",{
    backgroundColor:"#111"
})