let jet=document.querySelector(".jet");
let width=document.querySelector(".gameContent").offsetWidth / 50;
let gameContent=document.querySelector(".gameContent");
let score=document.querySelector(".score");
let life=document.querySelector('.life');
let finalScore=document.querySelector(".finalScore");
let lifeCount=5;
let count=0;
let ctEnemy=1,ctFire=1;
let attack= new Map();
let fire= new Map();
let th=0;
let ans=0;

let leftBtn=document.querySelector(".left");
let rightBtn=document.querySelector('.right');

score.innerText=`Your Score:  ${ans}`;
life.innerText=`Life:  ${lifeCount}`;


function trackPos(){
    for(let [k1, tm] of fire){
        const rect1=tm.getBoundingClientRect();
        if(rect1.bottom<=0){
            let val=tm;
            fire.delete(k1);
            val.remove();
            continue;
        }
        for(let [k, v] of attack){
            const rect=v.getBoundingClientRect();
            if(rect.left<=rect1.right && rect.right>=rect1.left && rect.bottom>=rect1.top){
                ans++; score.innerText=`Your Score:  ${ans}`;
                let val=v;
                attack.delete(k);
                val.remove();
                val=tm;
                fire.delete(k1);
                val.remove();
            }
            if(rect.bottom>=gameContent.offsetHeight){
                let val=v;
                attack.delete(k);
                val.remove();
                lifeCount--; life.innerText=`Life:  ${lifeCount}`;
                if(lifeCount==0){
                    finalScore.innerText=`${ans}`;
                    document.querySelector(".gameOver").style.display="block";
                    for(let [k, v] of attack){
                        v.remove();
                    }
                    clearInterval(attackingInterval);
                    clearInterval(firingInterval);
                    clearInterval(trackingInterval);
                }
            }
        }
    }
}
const trackingInterval=setInterval(trackPos,5);
function firing (){
    let tm=document.createElement("div");
    tm.classList.add("fire");
    tm.classList.add(`fire${ctFire}`);
    fire.set(`fire${ctFire}`,tm);
    ctFire++; if(ctFire>200)ctFire=1;
    tm.style.left=`${(count * width) + 7}px`;
    gameContent.appendChild(tm);
}
const firingInterval=setInterval(firing, 100);

function attacking (){
    let tm=document.createElement("div");
    tm.classList.add(`attack`);
    tm.classList.add(`attack${ctEnemy}`);
    attack.set(`attack${ctEnemy}`,tm);
    ctEnemy++; if(ctEnemy>200)ctEnemy=1;
    tm.style.left=`${Math.floor(Math.random() * gameContent.offsetWidth)}px`;
    gameContent.appendChild(tm);

}
const attackingInterval=setInterval(attacking, 1000);
document.addEventListener('keydown', (e)=>{
    let key=e.key;
    if(key === "ArrowRight" && count<49){
        count++;
        jet.style.transform=`translateX(calc(${count * width}px))`;      
    }
});
let rightActive;
let mobileRight;
rightBtn.addEventListener("touchstart", ()=>{
    mobileRight=()=>{
        if(count<49){
            count++;
            jet.style.transform=`translateX(calc(${count * width}px))`;      
        }
    };
    mobileRight();
    rightActive=setInterval(mobileRight,40);
});
rightBtn.addEventListener("touchend", ()=>{
    clearInterval(rightActive);
});

document.addEventListener('keydown', (e)=>{
    let key=e.key;
    if(key === "ArrowLeft" && count>0){
        count--;
        jet.style.transform=`translateX(calc(${count * width}px))`;
    }
});
let mobileLeft;
let leftActive;
leftBtn.addEventListener("touchstart", ()=>{
    mobileLeft=()=>{
        if(count>0){
            count--;
            jet.style.transform=`translateX(calc(${count * width}px))`;
        }
    };
    mobileLeft();
   leftActive=setInterval(mobileLeft,40);
});
leftBtn.addEventListener("touchend", ()=>{
    clearInterval(leftActive);
});

// while(1){
    
// }