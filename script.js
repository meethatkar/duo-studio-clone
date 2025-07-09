function locomotive() {
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
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
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
    scrollTrigger: {
        trigger: "#page-1>h1",
        scroller: "#main",
        // markers: true,
        start: "top 0%",
        end: "10% -10%",
        scrub: 3
    }
})

page1_tl.to("#page-1>h1", {
    left: -100,
}, "page-1-anim")

page1_tl.to("#page-1>h2", {
    right: -100,
}, "page-1-anim")

page1_tl.to("#page-1>video", {
    width: "90%"
}, "page-1-anim")


// PAGE 2 TIMELINE
var page2_tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#page-1>h1",
        scroller: "#main",
        // markers: true,
        start: "top -30%",
        end: "top -50%",
        scrub: 1
    }
})

page2_tl.to("#main", {
    backgroundColor: "#fff",
    duration: 1
})


// CURSOR ANIMATION
var cursorDiv = document.getElementById("cursor");
document.addEventListener("mousemove", (dets) => {
    cursorDiv.style.left = dets.clientX - 10 + "px";
    cursorDiv.style.top = dets.clientY - 10 + "px";
    // cursorDiv.style.cursor = "none";
})
document.querySelector("body").style.cursor = "none"

// CURSOR VIDEO ENTER
var vidDiv = document.querySelector("#page-1>video");
// IN
vidDiv.addEventListener("mouseenter", () => {
    cursorDiv.innerText = "SOUND ON",
        cursorDiv.style.width = "7%",
        cursorDiv.style.height = "3%",
        cursorDiv.style.borderRadius = "50px"
    cursorDiv.style.textAlign = "center"
})
// OUT
vidDiv.addEventListener("mouseleave", () => {
    cursorDiv.innerText = "",
        cursorDiv.style.width = "20px"
    cursorDiv.style.height = "20px"
    cursorDiv.style.borderRadius = "50%"
})

// PAGE 4
var page4_tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#page-4",
        scroller: "#main",
        // markers: true,
        start: "top 60%",
        end: "top 40%",
        scrub: 1
    }
})

page4_tl.to("#main", {
    backgroundColor: "#100D0E"
})


// PAGE 5
var boxes = document.querySelectorAll(".pg-5-box");
boxes.forEach((box) => {
    let boxImg = box.getAttribute("data-image");
    // console.log(boxImg);
    box.addEventListener("mouseenter", () => {
        cursorDiv.style.height = "300px";
        cursorDiv.style.width = "400px";
        cursorDiv.style.borderRadius = "10px";
        cursorDiv.style.backgroundImage = `url(${boxImg})`;
    })
    box.addEventListener("mouseleave", () => {
        cursorDiv.style.height = "20px";
        cursorDiv.style.width = "20px";
        cursorDiv.style.borderRadius = "50%";
        cursorDiv.style.backgroundImage = `none`;
    })
})

// Home Page H1 animation
var h1div = document.querySelector("#page-1>h1");
var h2Div = document.querySelector("#page-1>h2");
window.addEventListener("load", () => {
    console.log(h1div, h2Div);
    h1div.style.transform = "rotate(0deg)";
    h2Div.style.transform = "rotate(0deg)";
    h1div.style.opacity = 1;
    h2Div.style.opacity = 1;
})


// PURPLE DIV ANIMATION
var purpleDiv = document.querySelector("#purple");
var navH4s = document.querySelectorAll("#nav-mid h4");
var purpleDivH2 = document.querySelectorAll("#purple h2")
navH4s.forEach((h4div) => {
    h4div.addEventListener("mouseenter", () => {
        purpleDivH2.forEach((h2Div) => {
            h2Div.innerText = h4div.textContent;
            // console.log(h2Div);
            
        })
        purpleDiv.style.zIndex = "40";
        purpleDiv.style.opacity = "1";
    })
    h4div.addEventListener("mouseleave", () => {
        purpleDiv.style.zIndex = "0";
        purpleDiv.style.opacity = "0";
    })
})

