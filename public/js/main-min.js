const startBtn=document.getElementById("start"),screens=document.querySelectorAll(".screen"),timeList=document.getElementById("time-list"),petNumberList=document.getElementById("pets-list"),timeEl=document.getElementById("time"),board=document.getElementById("board");let petLeft,time=0,pets=0,score=0;function createPets(){for(let e=0;e<pets;++e)createRandomPet(),petLeft=pets}function startGame(){setInterval(decreaseTime,1e3),setRoom(),createPets(),setTime(time)}function decreaseTime(){if(0===time)finishGame();else{let e=--time;e<10&&(e=`0${e}`),setTime(e)}}function setTime(e){timeEl.innerHTML=`00:${e}`}function finishGame(){timeEl.parentNode.classList.add("hide"),board.classList.add("boardFinish"),board.style.background="none",board.innerHTML=`<h1>Your score is <span class="primary">${score}</span></h1>`,setTimeout(()=>{clearMoveUp(),location.reload()},3e3)}function clearMoveUp(){for(screen of screens)screen.classList.remove("hide");board.classList.remove("boardFinish")}function createRandomPet(){const e=document.createElement("div");e.classList.add("pet");const t=getRandomNumber(40,70),{width:s,height:n}=board.getBoundingClientRect(),a=getRandomNumber(15,s-t-10),r=getRandomNumber(15,n-t-10);e.style.background=`url(./img/${getRandomNumber(1,10)}.png)`,e.style.backgroundSize="cover",e.style.width=`${t}px`,e.style.height=`${t}px`,e.style.left=`${a}px`,e.style.top=`${r}px`,board.append(e)}function setRoom(){board.style.background=`url(./img/${getRandomNumber(11,20)}.png)`,board.style.backgroundSize="cover"}function getRandomNumber(e,t){return Math.round(Math.random()*(t-e)+e)}startBtn.addEventListener("click",e=>{e.preventDefault(),screens[0].classList.add("up")}),timeList.addEventListener("click",e=>{e.target.classList.contains("timebtn")&&(time=Number(e.target.dataset.time),e.target.classList.add("hovered"),petNumberList.addEventListener("click",e=>{e.target.classList.contains("petbtn")&&(pets=Number(e.target.dataset.number),e.target.classList.add("hovered"),setTimeout(()=>{screens[1].classList.add("up"),startGame()},500))}))}),board.addEventListener("click",e=>{e.target.classList.contains("pet")&&(score++,petLeft--,e.target.remove(),0===petLeft&&(setRoom(),createPets()))});