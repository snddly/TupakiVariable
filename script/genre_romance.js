var tl = gsap.timeline(),
    split = new SplitText("#quote", {
        type: "words,chars"
    }),
    words = split.words; // an array of all the divs that wrap each character

gsap.set("#quote", {
    perspective: 400
});

tl.to("#quote", {
    duration: 0.5,
    "--RMNC": "0", // RMNC 초기값 설정
    "--color-hue": "+=0", // 색상 변화를 위해 hue 설정
    "--color-saturation": "+=70%",
      
    ease: "none",
    stagger: {
        each: 0.4,
    }
}).to("#quote", {
    duration: 2.5,
    "--RMNC": "1000", // 색상이 완전히 변한 후 RMNC 값을 1000으로 변경
    ease: "none",
    stagger: {
        each: 0.4,
    }
}, "+=0.5"); // 색상 변화가 끝난 후 0.5초 후에 실행
