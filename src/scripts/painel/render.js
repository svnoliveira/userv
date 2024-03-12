import { historyFromSupplier } from "../../data/history.js";
import { supplierList } from "../../data/suppliers.js";
import { formatPrice } from "../render.js";

export const handleCalendar = () => {
    let nav = 0
    let clicked = null
    let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []
    
    
    // variavel do modal:
    const newEvent = document.getElementById('newEventModal')
    const deleteEventModal = document.getElementById('deleteEventModal')
    const backDrop = document.getElementById('modalBackDrop')
    const eventTitleInput = document.getElementById('eventTitleInput')
    // --------
    const calendar = document.getElementById('calendar') // div calendar:
    const weekdays = ['domingo','segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'] //array with weekdays:
    
    //funções
    
    function openModal(date){
      clicked = date
      const eventDay = events.find((event)=>event.date === clicked)
     
    
      if (eventDay){
       document.getElementById('eventText').innerText = eventDay.title
       deleteEventModal.style.display = 'block'
    
    
      } else{
        newEvent.style.display = 'block'
    
      }
    
      backDrop.style.display = 'block'
    }
    
    //função load() será chamada quando a pagina carregar:
    
    function load (){ 
      const date = new Date() 
      
    
      //mudar titulo do mês:
      if(nav !== 0){
        date.setMonth(new Date().getMonth() + nav) 
      }
      
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
    
      
      
      const daysMonth = new Date (year, month + 1 , 0).getDate()
      const firstDayMonth = new Date (year, month, 1)
      
    
      const dateString = firstDayMonth.toLocaleDateString('pt-br', {
        weekday: 'long',
        year:    'numeric',
        month:   'numeric',
        day:     'numeric',
      })
      
    
      const paddinDays = weekdays.indexOf(dateString.split(', ') [0])
      
      //mostrar mês e ano:
      document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br',{month: 'long'})}, ${year}`
    
      
      calendar.innerHTML =''
    
      // criando uma div com os dias:
    
      for (let i = 1; i <= paddinDays + daysMonth; i++) {
        const dayS = document.createElement('div')
        dayS.classList.add('day')
    
        const dayString = `${month + 1}/${i - paddinDays}/${year}`
    
        //condicional para criar os dias de um mês:
         
        if (i > paddinDays) {
          dayS.innerText = i - paddinDays
          
    
          const eventDay = events.find(event=>event.date === dayString)
          
          if(i - paddinDays === day && nav === 0){
            dayS.id = 'currentDay'
          }
    
    
          if(eventDay){
            const eventDiv = document.createElement('div')
            eventDiv.classList.add('event')
            eventDiv.innerText = eventDay.title
            dayS.appendChild(eventDiv)
    
          }
    
          dayS.addEventListener('click', ()=> openModal(dayString))
    
        } else {
          dayS.classList.add('padding')
        }
    
        
        calendar.appendChild(dayS)
      }
    }
    
    function closeModal(){
      eventTitleInput.classList.remove('error')
      newEvent.style.display = 'none'
      backDrop.style.display = 'none'
      deleteEventModal.style.display = 'none'
    
      eventTitleInput.value = ''
      clicked = null
      load()
    
    }
    function saveEvent(){
      if(eventTitleInput.value){
        eventTitleInput.classList.remove('error')
    
        events.push({
          date: clicked,
          title: eventTitleInput.value
        })
    
        localStorage.setItem('events', JSON.stringify(events))
        closeModal()
    
      }else{
        eventTitleInput.classList.add('error')
      }
    }
    
    function deleteEvent(){
    
      events = events.filter(event => event.date !== clicked)
      localStorage.setItem('events', JSON.stringify(events))
      closeModal()
    }
    
    // botões 
    
    function buttons (){
      document.getElementById('backButton').addEventListener('click', ()=>{
        nav--
        load()
        
      })
    
      document.getElementById('nextButton').addEventListener('click',()=>{
        nav++
        load()
        
      })
    
      document.getElementById('saveButton').addEventListener('click',()=> saveEvent())
    
      document.getElementById('cancelButton').addEventListener('click',()=>closeModal())
    
      document.getElementById('deleteButton').addEventListener('click', ()=>deleteEvent())
    
      document.getElementById('closeButton').addEventListener('click', ()=>closeModal())
      
    }
    buttons()
    load()
};

export const renderHistory = () => {
  const tableBody = document.querySelector('.styled-table tbody');

  historyFromSupplier.map((entry) => {
    const tableRow = document.createElement('tr');
    const date = document.createElement('td');
    const client = document.createElement('td');
    const service = document.createElement('td');
    const price = document.createElement('td');
    const status = document.createElement('td');

    date.innerText = new Date(entry.date).toLocaleDateString('pt-br');
    client.innerText = entry.client;
    service.innerText = entry.service;
    price.innerText = formatPrice(entry.price);
    status.innerText = entry.status ? 'Concluído' : 'Pendente';
    status.classList.add(entry.status ? 'done' : 'pending');

    tableRow.append(date, client, service, price, status);
    tableBody.appendChild(tableRow);
  });
};

export const renderProfile = () => {
  const name = document.querySelector('.profile__container h1');
  const address = document.querySelector('.profile__container p');
  const heroImage = document.querySelector('.profile__main img');
  const officialName = document.querySelector('#official-name');
  const adminName = document.querySelector('#admin-name');
  const adminEmail = document.querySelector('#admin-email');
  const category = document.querySelector('#admin-category');
  const phone = document.querySelector('#admin-phone');
  const price = document.querySelector('#admin-price');
  const profilePictures = document.querySelector('.profile__pictures');

  //api request para pegar o usuário logado
  const user = supplierList[0];

  name.innerText = user.name;
  address.innerText = `${user.address.city}, ${user.address.uf}, ${user.address.street}, ${user.address.number}`;
  heroImage.src = '../src/image/colaboradores/base-wide.png'; //url de uma imagem em alta resolução;
  heroImage.alt = 'Imagem principal da empresa, ou logo';
  officialName.innerText = user.fantasyName;
  adminName.innerText = user.name;
  adminEmail.innerText = user.email;
  category.innerText = user.category;
  phone.innerText = user.phone;
  price.innerText = formatPrice(user.startingPrice);
  user.services.map((service) => {
    //lista de fotos da empresa, aqui usando a chave de serviços apenas como exemplo
    const picture = document.createElement('img');
    picture.src = user.image
    picture.alt = 'Imagem de um serviço da empresa, ou logo';
    profilePictures.appendChild(picture);
  });
};

export const renderServices = () => {
  const serviceContainer = document.querySelector('.alternating-colors');

  //api request para pegar os services do usuário logado 
  const services = supplierList[0].services;

  services.map((service) => {
    const serviceCard = document.createElement('li');
    const serviceName = document.createElement('strong');
    const serviceDescription = document.createElement('p');

    serviceName.innerText = service.entry
    serviceDescription.innerText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."

    serviceCard.append(serviceName, serviceDescription);
    serviceContainer.appendChild(serviceCard);
  });
};