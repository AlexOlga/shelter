const hamburger = document.querySelector('.burger');
const menu = document.querySelector('.nav');
const blackout=document.querySelector('.blackout');
const bodyTeg=document.body;
const navLink=document.querySelector('.nav__list');
const logo=document.querySelector('.logo');

function toggleMenu(){
    menu.classList.toggle('nav-active');
    hamburger.classList.toggle('burger-active');
    blackout.classList.toggle('blackout-active');
    bodyTeg.classList.toggle('look');
    logo.classList.toggle('logo-active');
}
hamburger.addEventListener('click',toggleMenu);
navLink.addEventListener('click',toggleMenu);
blackout.addEventListener('click', toggleMenu);



/*создание карты*/

function creatCard (item, blok){ 
    let img;
    let namePet;
    let card;
    let btn;
    card = document.createElement(`div`);
    card.dataset.id=item.id;
    card.classList.add('pets__card');
    blok.append(card); 
    img=document.createElement(`img`);
    img.classList.add('pets__img');
    img.src = item.img;
    card.append(img); 
    namePet=document.createElement(`h3`);
    namePet.classList.add('title');
    namePet.classList.add('pets_name');
    namePet.innerText = item.name;
    card.append( namePet); 
   btn=document.createElement(`button`);
    btn.classList.add('button_secondary');
    btn.innerText ='Learn more';
    card.append(btn);     
}

/*из массива petsArray в block добавляется numberCard с индексами отличными от prevSet*/
function geratioCards(data, blok, numberCard, prevSet){
 
  let indexArr=new Set();
  let max=data.length;
  while (indexArr.size < numberCard){
    let index=Math.floor(Math.random() * max);
    if (!(prevSet.has(index))) {indexArr.add(index)};
    }
    for (let i of indexArr) {
        creatCard (data[i],blok);
             }
      indexItem=indexArr;
    };



const mediaQueryTablet = window.matchMedia('(max-width: 1279px)');
const mediaQueryMobile = window.matchMedia('(max-width: 767px)');

function  countCards(){  
if (mediaQueryMobile.matches) { console.log('mobil'); return 1}
else if (mediaQueryTablet.matches) {return 2}
else {return 3};
};


async function getQuotes(blok,prevSet) {  
    const quotes = '../../assets/pets.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    const numberCard= countCards();
   geratioCards(data, blok, numberCard,prevSet);
   }

   async function getFirstQuotes() {  
    const quotes = '../../assets/pets.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    const numberCard= countCards();
    let max=data.length;
    let indexItA=[0,1,2];
    let indexItL=[7,6,5];
    let indexItR=[3,4,5];
    sliderActive.innerHTML='';
    sliderLeft.innerHTML='';
    sliderRight.innerHTML='';
    for  (i=0; i<numberCard; i++){      
      creatCard (data[indexItA[i]],sliderActive);      
      creatCard (data[indexItL[i]],sliderLeft);     
      creatCard (data[indexItR[i]],sliderRight);
    }  

   };

 window.addEventListener('load',getFirstQuotes) ;
 const slider=document.querySelector('.slider__content');
const sliderActive=document.querySelector('#slider-active');
let indexActiv=new Set ();
const sliderLeft=document.querySelector('#slider-left');
let indexLeft=new Set ();
const sliderRight=document.querySelector('#slider-right');
let indexRight=new Set ();

function getCardsIdBlok(block){
  let setItem= new Set();
let items=block.querySelectorAll('.pets__card');
items.forEach((card) => {
  setItem.add(+card.dataset.id)
});
return setItem;
}

function getCardsId(){
  indexLeft=getCardsIdBlok(sliderLeft);
  indexRight=getCardsIdBlok(sliderRight);
  indexActiv=getCardsIdBlok(sliderActive);
 }



 const btnNext=document.querySelector('.right-arrow');
 const btnPrev=document.querySelector('.left-arrow');


 const moveLeft = () => {
    slider.classList.add("transition-left");
   btnPrev.removeEventListener("click", moveLeft);
    btnNext.removeEventListener("click", moveRight);
  };


  const moveRight = () => {
    slider.classList.add("transition-right");
    btnPrev.removeEventListener("click", moveLeft);
    btnNext.removeEventListener("click", moveRight);
  };
  
  btnPrev.addEventListener("click", moveLeft);
  btnNext.addEventListener("click", moveRight);

 slider.addEventListener("animationend", (animationEvent) => {
    getCardsId();

   let changedItem;
   let indexItem;
    if (animationEvent.animationName === "move-left") { 
      slider.classList.remove("transition-left");
      indexActiv=indexRight;
      changedItem=sliderRight;
      document.querySelector("#slider-active").innerHTML = sliderRight.innerHTML;
    
     
    } else {
      slider.classList.remove("transition-right");
      indexRight=indexActiv;
      indexActiv=indexLeft;
      changedItem=sliderLeft;
      document.querySelector("#slider-active").innerHTML = sliderLeft.innerHTML; 
   
    }
    changedItem.innerHTML="";
    getQuotes(  changedItem,indexActiv);
    
    btnPrev.addEventListener("click", moveLeft);
    btnNext.addEventListener("click", moveRight);
  });

 mediaQueryTablet.addListener(getFirstQuotes);
 mediaQueryMobile.addListener(getFirstQuotes); 
 
  const popup=document.querySelector('.pop');
  const closePopBtn=document.querySelector('.pop__close');

  function generatePop(item){
    const img=document.querySelector('[data-key="img"]');
    img.src = item.img;
    const textArray =document.querySelectorAll('[data-key]');
    textArray.forEach((element)=>{
      element.textContent = item[element.dataset.key];
        }); 
  };
  async function popOpen(event) {  
    const quotes = '../../assets/pets.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    const INDEX=event.target.parentNode.dataset.id;
    console.log('index',INDEX);
    const item=data[INDEX];
    console.log('item', item);
    generatePop(item);
        
    popup.classList.add('pop-active');
    popup.classList.add('transition-opaque');
    blackout.classList.add('blackout-active');
    bodyTeg.classList.add('look');
   }


function popClose() {
  popup.classList.add('transition-opacity');
  popup.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "opacity-window") {
    popup.classList.remove('pop-active');
    popup.classList.remove('.transition-opaque');
    blackout.classList.remove('blackout-active');
    bodyTeg.classList.remove('look');
    popup.classList.remove('transition-opacity');
    };
  });
  
};

 sliderActive.addEventListener("click", popOpen);
 closePopBtn.addEventListener("click", popClose);
