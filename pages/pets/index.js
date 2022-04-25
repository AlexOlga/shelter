const hamburger = document.querySelector('.burger');
const menu = document.querySelector('.nav');
const blackout=document.querySelectorAll('.blackout');
const bodyTeg=document.body;
const navLink=document.querySelector('.nav__list');
const logo=document.querySelector('.logo');

function toggleMenu(){
    menu.classList.toggle('nav-active');
    hamburger.classList.toggle('burger-active');
    blackout[0].classList.toggle('blackout-active');
    bodyTeg.classList.toggle('look');
    logo.classList.toggle('logo-active');
   
}
hamburger.addEventListener('click',toggleMenu);
navLink.addEventListener('click',toggleMenu);
blackout[0].addEventListener('click', toggleMenu);


    const mediaQueryTablet = window.matchMedia('(max-width: 1279px)');
    const mediaQueryMobile = window.matchMedia('(max-width: 767px)');
 
 
let maxNumber;
let selectArray=[];
function  choiceArray(){  
    let allCards=8;
    let cardsOnPage;
    let allPages;    
     if (mediaQueryMobile.matches) {
        cardsOnPage=3;
        allPages=16;
        maxNumber=16;
        }
    else if (mediaQueryTablet.matches) {
        cardsOnPage=6;
        allPages=8;
        maxNumber=8;
    }
    else {
        cardsOnPage=8;
        allPages=6;
        maxNumber=6;
    };

 let   k=0;
for (let i=0; i<allPages; i++){
   selectArray[i]=[];
for (let j=0; j<cardsOnPage;j++){
    selectArray[i][j]=k;
    if (k<(allCards-1)){k++} else {k=0};
};
};

for (let i=0; i<allPages; i++){
 let randomNumber=Math.floor(Math.random() * (allPages-1));
    for (let j=0; j<randomNumber; j++){
        let k1=Math.floor(Math.random() * (cardsOnPage));
    //  console.log('k1',k1);
        let k2=Math.floor(Math.random() * (cardsOnPage));
    //  console.log('k2',k2);
        let item=selectArray[i][k1];
        selectArray[i][k1]=selectArray[i][k2];
        selectArray[i][k2]=item;
    }
   
};

    };
    choiceArray();
    console.log(selectArray);
   
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
    card.classList.add('transition-opaque');       
    };

const container=document.querySelector('.cards_container');

async function getPage(numberPage) {  
    const quotes = '../../assets/pets.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    /*let selectArray=choiceArray();*/
    let item= selectArray[numberPage];
    item.forEach((elem)=>{
    let infoCard=data[elem];
    creatCard (infoCard, container);
    });   
   };
let pageNumber=1;            
window.addEventListener('load',getPage(0)) ;
/*открытие popUp*/
const popup=document.querySelector('.pop');
const closePopBtn=document.querySelector('.pop__close');


function generatePop(infoCard){
    const img=document.querySelector('[data-key="img"]');
    img.src =  infoCard.img;
    const textArray =document.querySelectorAll('[data-key]');
    textArray.forEach((element)=>{
      element.textContent =  infoCard[element.dataset.key];
        }); 
  };
async function popOpen(event) {  
    const quotes = '../../assets/pets.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    const INDEX=event.target.parentNode.dataset.id;
    const  infoCard=data[INDEX]; 
    generatePop(infoCard);
     
    popup.classList.add('pop-active');
    popup.classList.add('transition-opaque');
    blackout[1].classList.add('blackout-active');
    bodyTeg.classList.add('look');
   };


function popClose() {
  popup.classList.add('transition-opacity');
  popup.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "opacity-window") {
    popup.classList.remove('pop-active');
    popup.classList.remove('.transition-opaque');
    blackout[1].classList.remove('blackout-active');
    bodyTeg.classList.remove('look');
    popup.classList.remove('transition-opacity');
    };
  });
  
};

 container.addEventListener("click", popOpen);
 closePopBtn.addEventListener("click", popClose);
 blackout[1].addEventListener('click', popClose);

/*пагинация*/
function getNextPage(){
    pageNumber++;
    numberBtn.innerText=pageNumber;

  if (pageNumber==2){
        prevBtn.removeAttribute('disabled');
        prevBtn.classList.add('active-arrow');
        startBtn.removeAttribute('disabled');
        startBtn.classList.add('active-arrow');
    } else if (pageNumber==maxNumber){
        nextBtn.setAttribute('disabled', true);
        nextBtn.classList.remove('active-arrow');
        endBtn.setAttribute('disabled', true);
        endBtn.classList.remove('active-arrow');
    }
    let cardArray=document.querySelectorAll('.pets__card');
    cardArray.forEach((elem)=>{
        elem.classList.add('transition-opacity');
        elem.addEventListener("animationend", (animationEvent) => {
            if (animationEvent.animationName === "opacity-window") {
            elem.remove();           
            }
    });
    });
     getPage(pageNumber-1);      
};

function getPrevPage(){
    pageNumber--;
    numberBtn.innerText=pageNumber;
   
   if (pageNumber==maxNumber-1){
        nextBtn.removeAttribute('disabled');
        nextBtn.classList.add('active-arrow');
        endBtn.removeAttribute('disabled');
        endBtn.classList.add('active-arrow');
    } else if (pageNumber==1){
        prevBtn.setAttribute('disabled', true);
        prevBtn.classList.remove('active-arrow');
        startBtn.setAttribute('disabled', true);
        startBtn.classList.remove('active-arrow');
    }
    let cardArray=document.querySelectorAll('.pets__card');
    cardArray.forEach((elem)=>{
        elem.classList.add('transition-opacity');
        elem.addEventListener("animationend", (animationEvent) => {
            if (animationEvent.animationName === "opacity-window") {
            elem.remove();           
            }
    });
    });
     getPage(pageNumber-1);      
};

function getStartPage(){
    pageNumber=2;
    nextBtn.removeAttribute('disabled');
    nextBtn.classList.add('active-arrow');
    endBtn.removeAttribute('disabled');
    endBtn.classList.add('active-arrow');
    getPrevPage();   
};

function getEndPage(){
    pageNumber=maxNumber-1;
    prevBtn.removeAttribute('disabled');
    prevBtn.classList.add('active-arrow');
    startBtn.removeAttribute('disabled');
    startBtn.classList.add('active-arrow');
    getNextPage();   
};


function getNewPage(event){
    paginac.removeEventListener('click',getNewPage);
    const button=event.target;
   
    if (button==nextBtn){  getNextPage(); };
    if (button==endBtn){  getEndPage(); };
    if (button==startBtn){ getStartPage();  };
    if (button==prevBtn){ getPrevPage();   };
  paginac.addEventListener('click',getNewPage);
};

const nextBtn=document.querySelector('.next-arrow');
const endBtn=document.querySelector('.end-arrow');
const numberBtn=document.querySelector('.button_number ');
const prevBtn=document.querySelector('.previous-arrow');
const startBtn=document.querySelector('.start-arrow');
const paginac=document.querySelector('.navigation');

paginac.addEventListener('click',getNewPage);











