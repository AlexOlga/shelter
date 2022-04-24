const hamburger = document.querySelector('.burger');
const menu = document.querySelector('.nav');
const blackout=document.querySelector('.blackout');
const bodyTeg=document.body;
const navLink=document.querySelector('.nav__list');
const logo=document.querySelector('.logo');

hamburger.addEventListener('click', ()=>{
    menu.classList.toggle('nav-active');
    hamburger.classList.toggle('burger-active');
    blackout.classList.toggle('blackout-active');
    bodyTeg.classList.toggle('look');
    logo.classList.toggle('logo-active');
    });
    
    navLink.addEventListener('click', ()=>{  
       
        menu.classList.toggle('nav-active');
    hamburger.classList.toggle('burger-active');
    blackout.classList.toggle('blackout-active');
    bodyTeg.classList.toggle('look');
    logo.classList.toggle('logo-active');
    } );

    const mediaQueryTablet = window.matchMedia('(max-width: 1279px)');
    const mediaQueryMobile = window.matchMedia('(max-width: 767px)');
 
 const arrayDesktop=[[0, 1, 2, 3, 4, 5, 6, 7], 
                    [7, 6, 5, 4, 3, 2, 1, 0],   
                    [5, 3, 4, 0, 2, 6, 7, 1],
                    [2, 7, 0, 6, 1, 3, 5, 4],
                    [3, 4, 7, 5, 0, 1, 2, 6],
                    [1, 5, 3, 2, 6, 4, 0, 7],
                 ] ;
const   arrayTablet= [[0,1,2,3,4,5],
                      [5,0,1,2,3,4],
                    [4,5,0,6,2,7],
                    [3,4,5,6,1,7],
                    [2,3,4,7,6,1],
                    [6,2,3,7,5,0],
                    [1,6,0,7,4,5],
                    [7,2,6,0,1,3]]  ;
const arrayMobile= [[1,	3,	4],
                    [1,	6,	7],
                    [0,	4,	7],
                    [2,	5,	7],
                    [2,	3,	4],
                    [1,	5,	7],
                    [0,	3,	5],
                    [0,	6,	7],
                    [2,	3,	6],
                    [1,	2,	3],
                    [0,	4,	5],
                    [1,	4,	5],
                    [0,	3,	6],
                    [2,	6,	7],
                    [1,	5,	6],
                    [0,	2,	4]];
let maxNumber;
function  choiceArray(){  
     if (mediaQueryMobile.matches) {maxNumber=arrayMobile.length;
                                     return arrayMobile}
    else if (mediaQueryTablet.matches) {maxNumber=arrayTablet.length;
                                        return arrayTablet}
    else {maxNumber=arrayDesktop.length;
        return arrayDesktop};
    };

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
    let selectArray=choiceArray();
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
    blackout.classList.add('blackout-active');
    bodyTeg.classList.add('look');
   };


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

 container.addEventListener("click", popOpen);
 closePopBtn.addEventListener("click", popClose);

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











