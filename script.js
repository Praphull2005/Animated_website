let scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    tl.to(".boundingelem",{
        y: 0,
        duration: 1.5,
        delay:-1,
        ease: Expo.easeInOut,
        stagger: .2
    })

    tl.from("#herofooter",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

function circleChaptaKaro(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dts){
        xscale = gsap.utils.clamp(.6, 1.4, dts.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dts.clientY - yprev);

        xprev = dts.clientX;
        yprev = dts.clientY;

        circlemousefollow(xscale, yscale);
    })
}

function circlemousefollow(xscale, yscale){
    window.addEventListener("mousemove", function(dts){
        document.querySelector("#minicircle").style.transform = `translate(${dts.clientX}px, ${dts.clientY}px) scale(${xscale}, ${yscale})`
    })
}

circleChaptaKaro();
circlemousefollow();
firstPageAnim();

/*pancho element ko select karo, uske bad teeno pr mousemove lgao,
jab mousemove ho uski x and y position pta kro, ab mose k x y position ke 
badle s image ko show karo and us image ko move karo, move karte waqt rotate karo*/


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffRot = 0;

    elem.addEventListener("mouseleave", function(details){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            duration: 0.5
        })
    });
    elem.addEventListener("mousemove", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffRot = details.clientX - rotate;
        rotate = details.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffRot*0.4)
        })
    });
});

