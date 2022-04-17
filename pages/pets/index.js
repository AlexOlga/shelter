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
        console.log('clic');
        menu.classList.toggle('nav-active');
    hamburger.classList.toggle('burger-active');
    blackout.classList.toggle('blackout-active');
    bodyTeg.classList.toggle('look');
    logo.classList.toggle('logo-active');
    } );