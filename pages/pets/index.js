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
function  choiceArray(){  
     if (mediaQueryMobile.matches) {return arrayMobile}
    else if (mediaQueryTablet.matches) {return arrayTablet}
    else {return arrayDesktop};
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
                    };

const container=document.querySelector('.cards_container');
console.log('contener',container);
async function getPage(numberPage) {  
    const quotes = '../../assets/pets.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    let selectArray=choiceArray();
    console.log('array',selectArray);
    let item= selectArray[numberPage];
    console.log('item',item);
    item.forEach((elem)=>{
        let infoCard=data[elem];
        console.log(infoCard);
        creatCard (infoCard, container);
    });   
   };

                
window.addEventListener('load',getPage(0)) ;











