
// Fvento para ao clicar no botão do whatsapp ele carregar a conversa
document.addEventListener('DOMContentLoaded', async () => {
   try{
    const res= (await fetch('/api/whats')) // Captura a requisição  
    const data = await res.json() // Captura o json dentro da requisição

    const zap = document.querySelector('#whatsapp'); // Captura o botão do Html
        
      if (zap && data.link) { // Condição para que se exista ele faça os itens abaixo
          zap.setAttribute('href', data.link); // Adiciona um link, e depois adiciona o link correspondente capturado em data.link
          zap.setAttribute('target', '_blank');// Adiciona Target Blank
        }
    }
      catch(err){
      (console.error('Erro ao buscar link', err));
      }
}); // Final do evento Whatsapp


//Seleciona os elementos do formulário
const form = document.querySelector('#form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let message = document.getElementById('message');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  let formData = {
    name: name.value,
    email: email.value,
    message: message.value
  };

  const sendMail = async () => {
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const resJson = await res.text(); 

      const isValid = validEmail(formData.email);
      const resultMessage = document.getElementById('result-message');

      if (resJson.trim() === 'success'&& isValid) {
        resultMessage.innerText = 'Email enviado com sucesso';
        resultMessage.style.color = 'green';
        form.reset();
        setTimeout(() => {
        resultMessage.innerText = '';

        }, 5000);

      } 
      else{
        resultMessage.innerText = 'Email Inválido';
        resultMessage.style.color = 'red';
        form.reset();
        setTimeout(() => {
        resultMessage.innerText = ''
        }, 5000);
      }
    } catch (err) {
      console.error(err);
      alert("Erro na requisição: " + err.message);
    }
  };

  sendMail();
});

const validEmail = (email)=>{
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Seleciona os elementos do dialog de orçamento
const formDialog = document.getElementById('budget')

let budgetName = document.getElementById('budget-name');
let budgetEmail = document.getElementById('budget-email');
let budgetPhone = document.getElementById('budget-phone');
let budgetMessage = document.getElementById('budget-message');
let optionServices = document.getElementById('options-services');


formDialog.addEventListener('submit',(e)=>{

  e.preventDefault();
  let budget = {
    name: budgetName.value,
    email: budgetEmail.value,
    service: optionServices.value,
    phone: budgetPhone.value,
    message: budgetMessage.value
  };

  const sendBudget = async () => {
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(budget)
      });

      const resJson = await res.text(); 
      const resultMessage = document.getElementById('result-message-budget');

      const isValid = validEmail(budget.email);

      if (resJson.trim() === 'success'&& isValid) {
        resultMessage.innerText = 'Email enviado com sucesso';
        resultMessage.style.color = 'green';
        formDialog.reset();
        setTimeout(() => {
        resultMessage.innerText = '';

        }, 3000);

      } else {
        resultMessage.innerText = 'Email Invalido';
        resultMessage.style.color = 'red';
        setTimeout(() => {
        resultMessage.innerText = '';

        }, 3000);

      }
    } catch (err) {
      console.error(err);
      alert("Erro na requisição: " + err.message);
    }
  };

  sendBudget();
});

//Efeito Scroll

const target = document.querySelectorAll('[data-anime]');
const animateClass = 'animate';

function animeScroll (){
  const widownTop = window.scrollY + (window.innerHeight * 0.75);
  target.forEach(element => {
    if(widownTop > element.offsetTop){
      element.classList.add(animateClass)
    }
    else{
      element.classList.remove(animateClass);
    }
  });
}
animeScroll();
window.addEventListener('scroll', animeScroll);

// Menu burguer
const links = document.querySelectorAll('.navbar a');
const burger = document.querySelector('#burguer');
const main = document.querySelector('.main')
const navBar = document.querySelector('.navbar');
function toggleMenu(){
navBar.classList.toggle('active')


if(navBar.classList.contains('active')){
  main.classList.add('active')
  burger.style.opacity =  0.5;
}
else{
   main.classList.remove('active')
   burger.style.opacity =  1;
}
}

// Função para ao clicar no menu responsivo retornar aos estilos anteriores
function clickNavbar (e){
  if(e.target.tagName === 'A'){
    main.classList.remove('active')
    navBar.classList.remove('active')
    burger.style.opacity = 1;
    }
}

links.forEach(link=>{
  link.addEventListener('click', clickNavbar)
})

burger.addEventListener('click', toggleMenu);

// Modal de orçamento
  const contentButton = document.querySelector('.content-button')
  const dialogBudget = document.querySelector('.dialog-budget');
  const closeBtn = document.querySelector('.close-btn')


  function openModal(){
    dialogBudget.showModal();
  }

  function closeModal(){
    dialogBudget.close();
  }
contentButton.addEventListener('click', openModal)


closeBtn.addEventListener('click', closeModal)

//Modais do Footer
const footerPayments = document.querySelector('.footer-payments')
const dialogPayments = document.querySelector('.dialog-payments')


const footerContact = document.querySelector('.footer-contact')
const dialogContact = document.querySelector('.dialog-contact')
const closeBtnPayments = document.querySelector('.close-btn-payments')
const closeBtnContact = document.querySelector('.close-btn-contact')



footerPayments.addEventListener('click', () =>{
  dialogPayments.showModal();
})

function closeModalPayments(){
  dialogPayments.close();
}

footerContact.addEventListener('click',()=>{
  dialogContact.showModal();
})

function closeModalContact(){
  dialogContact.close();
}

closeBtnPayments.addEventListener('click', closeModalPayments)
closeBtnContact.addEventListener('click', closeModalContact)


