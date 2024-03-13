import { toast } from "../render.js";
import { getCep } from "./request.js";

export const handleModalClick = () => {
  const termsButton = document.getElementById('term__button');
  const termsController = document.getElementById('terms__modal__controller');
  const planController = document.getElementById('plan__modal__controller');
  const xButtons = document.querySelectorAll('.modal__close-button');
  
  termsButton.addEventListener('click', (event) => {
    event.preventDefault();
    termsController.showModal();
  });

  xButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      termsController.close();
      planController.close();
      event.stopPropagation();
    });
  });

  const handleOutClick = (modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.close();
        event.stopPropagation();
      }
    });
  };
  handleOutClick(termsController);
  handleOutClick(planController);
};

export const renderPlanModal =  (card, name, price) => {
  const modalPlanCard = document.getElementById('modal__plan__card');
  const modalPrice = document.getElementById('checkout__plan--price');
  const modalName = document.getElementById('checkout__plan--name');

  while (modalPlanCard.firstChild) {
    modalPlanCard.removeChild(modalPlanCard.firstChild);
  };
  const newCard = card.cloneNode(true);
  newCard.id = 'modal__plan__card--new';
  modalPlanCard.appendChild(newCard);
  modalPrice.textContent = price;
  modalName.textContent = name;
};

export const handleLabels = () => {
  const inputs = document.querySelectorAll(
    ".partner__register input, .partner__register select"
  );

  inputs.forEach((input) => {
    if (input.type !== "checkbox") {
      input.addEventListener("focus", () => {
        input.previousElementSibling.style.visibility = "visible";
      });
      input.addEventListener("blur", () => {
        input.previousElementSibling.style.visibility = "hidden";
      });
    }
  });
};

export const handleCep = () => {

const inputElement = document.getElementById("register__address--cep");
inputElement.addEventListener("input", async (event) => {
  const numericValue = event.target.value.replace(/\D/g, "");
  const formattedValue = numericValue.slice(0, 8);
  const formattedText = formattedValue.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3");
  const uf = document.querySelector('#register__address--uf');
  const city = document.querySelector('#register__address--city');
  const neighbornhood = document.querySelector('#register__address--neighbornhood');
  const street = document.querySelector('#register__address--street');

  event.target.value = formattedText;
  if(formattedValue.length === 8) {
    let cep = {}
    try {
      //add loading
      inputElement.disabled = true;
      cep = await getCep(formattedValue);
      if (cep.erro === true) {
        throw new Error('Cep não encontrado');
      }

      uf.value = cep.uf;
      city.value = cep.localidade
      neighbornhood.value = cep.bairro
      street.value = cep.logradouro

    } catch (error) {
      uf.value = '';
      city.value = '';
      neighbornhood.value = '';
      street.value = '';
      toast('red', 'Cep não encontrado');
    } finally {
      //end loading
      inputElement.disabled = false;
    }
    return cep;
  } else {
    uf.value = '';
    city.value = '';
    neighbornhood.value = '';
    street.value = '';
  };
});

}

export const handleFileDrop = () => {
  const setupDragAndDrop = (area, input) => {
    const dropArea = document.getElementById(area);
    const image = document.querySelector(`#${area} img`);
    const text = document.querySelectorAll(`#${area} p`);
    const firstLine = text[0];
    const secondLine = text[1];
    const inputFile = document.getElementById(input);

    dropArea.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropArea.classList.add("drag-over");
    });

    dropArea.addEventListener("dragleave", () => {
      dropArea.classList.remove("drag-over");
    });

    dropArea.addEventListener("drop", (event) => {
      event.preventDefault();
      dropArea.classList.remove("drag-over");
  
      handleFiles(event.dataTransfer.files);
    });

    inputFile.addEventListener("change", (event) => {
      handleFiles(event.target.files);
    });

    const handleFiles = (files) => {
      const maxFileSize = 2 * 1024 * 1024;
      const allowedExtensions = [".png", ".jpeg", ".jpg", ".gif"];
      
      if (!files || !files.length) {
          toast("red", "Nenhum arquivo foi detectado!");
          return;
      }

      const fileExtension = files[0].name.toLowerCase().slice(-4);
  
      if (fileExtension === ".txt" || files[0].size > maxFileSize || !allowedExtensions.includes(fileExtension)) {
          toast("red", "Arquivo inválido!");
          return;
      } else {
          inputFile.files = files;
          image.src = "../src/image/icons/success.svg";
          firstLine.style.display = "none";
          secondLine.innerText = files[0].name;
      }
    };
  };
  setupDragAndDrop("custom-file-upload", "partner__fileInput");
  setupDragAndDrop("custom-doc-upload", "partner__docInput");
};

export const handlePartnerForm = () => {
  const step1 = document.querySelector(".step-1");
  const step2 = document.querySelector(".step-2");
  const step3 = document.querySelector(".step-3");
  const step4 = document.querySelector(".step-4");

  //step 1
  const name = document.getElementById("register__document--owner-name");
  const email = document.getElementById("register__document--owner-email");
  const phone = document.getElementById("register__document--owner-phone");
  const password = document.getElementById(
    "register__document--owner-password"
  );
  const confirm = document.getElementById("register__document--owner-confirm");
  const buttonStep1 = document.getElementById("partner--button-step1");

  buttonStep1.addEventListener("click", (event) => {
    event.preventDefault();
    try {
      if (name.value.length <= 3){
        throw new Error('Não deixe o Nome em branco!');
      }
      if (email.value.length <= 3 || !email.value.includes('@')){
        throw new Error('e-mail inválido!');
      }
      if (phone.value.length <= 3){
        throw new Error('Não deixe o Telefone em branco!');
      }
      if (password.value.length <= 3){
        throw new Error('Não deixe a senha em branco!');
      }
      if (password.value !== confirm.value){
        throw new Error('Confirmação de senha falhou!');
      }
    } catch (error) {
      toast('red', error.message);
      return;
    }

    step1.classList.toggle("hidden");
    step1.classList.toggle("show");
    step2.classList.toggle("hidden");
    step2.classList.toggle("show");
  });

  //step2
  const documentType = document.querySelector("#register__document");
  const doc = document.querySelector("#register__document--input");
  const companyName = document.querySelector("#register__document--name");
  const companyFantasy = document.querySelector("#register__document--fantasy");
  const companyCpf = document.querySelector("#register__document--cpf");
  const companyCategory = document.querySelector(
    "#register__document--category"
  );
  const contract = document.querySelector("#register__document--contract");
  const image = document.querySelector("#partner__fileInput");
  const docFile = document.querySelector("#partner__docInput");
  const buttonStep2 = document.querySelector("#partner--button-step2");

  documentType.addEventListener("change", (event) => {
    const label = document.querySelector("#register__document--input-label");

    if (event.target.value === "cpf") {
      label.textContent = "CPF";
      doc.placeholder = "Digite o número do seu CPF";
      doc.disabled = false;
    } else if (event.target.value === "cnpj") {
      label.textContent = "CNPJ";
      doc.placeholder = "Digite o número do seu CNPJ";
      doc.disabled = false;
    } else {
      label.textContent = "Selecione um tipo de documento";
      doc.placeholder = "Selecione um tipo de documento";
      doc.value = "";
      doc.disabled = true;
    }
  });

  buttonStep2.addEventListener("click", (event) => {
    event.preventDefault();
    try {
      if (doc.value.length <= 3) {
        throw new Error("Não deixe o Documento em branco!");
      }
      if (companyName.value.length <= 3) {
        throw new Error("Não deixe o nome da empresa em branco!");
      }
      if (companyFantasy.value.length <= 3) {
        throw new Error("Não deixe o nome fantasia em branco!");
      }
      if (companyCpf.value.length <= 3) {
        throw new Error("Não deixe o cpf em branco!");
      }
      if (companyCategory.value.length <= 3) {
        throw new Error("Não deixe a categoria em branco!");
      }
      if (contract.checked === false) {
        throw new Error("Leia o contrato para continuar!");
      }
      if (!image.files || !image.files.length) {
        throw new Error("Coloque uma imagem!");
      }

      if (!docFile.files || !docFile.files.length) {
        throw new Error("Coloque o arquivo da CDN Federal!");
      }
    } catch (error) {
      toast("red", error.message);
      return;
    };

    step2.classList.toggle("hidden");
    step2.classList.toggle("show");
    step3.classList.toggle("hidden");
    step3.classList.toggle("show");
  });

  //step3
  const cep = document.querySelector('#register__address--cep');
  const uf = document.querySelector('#register__address--uf');
  const city = document.querySelector('#register__address--city');
  const neighbornhood = document.querySelector('#register__address--neighbornhood');
  const street = document.querySelector('#register__address--street');
  const number = document.querySelector('#register__address--number');
  const complement = document.querySelector('#register__address--complement');
  const buttonStep3 = document.querySelector('#partner--button-step3');

  buttonStep3.addEventListener('click', (event) => {
    event.preventDefault();
    try {
      if (cep.value.length <= 8 || uf.value.length !== 2){
        throw new Error('Preencha o endereço da sua empresa');
      }
      if (cep.value.length === 0){
        throw new Error('Preencha o número da sua empresa');
      }
    } catch (error) {
        toast('red', error.message);
        return;
    };

    step3.classList.toggle("hidden");
    step3.classList.toggle("show");
    step4.classList.toggle("show");
    step4.classList.toggle("hidden");
  });

  //step 4
  const basicPlanButton = document.getElementById('plan-btn--basic');
  const advancedPlanButton = document.getElementById('plan-btn--advanced');
  const modalController = document.getElementById('plan__modal__controller');
  const cardBasic = document.getElementById('card--basic');
  const cardAdvanced = document.getElementById('card--advanced');

  const handlePlanButton = (btn, card, name, price) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      modalController.showModal();
      renderPlanModal(card, name, price);
    });
  };
  handlePlanButton(basicPlanButton, cardBasic, 'Básico', 'R$ 120,00');
  handlePlanButton(advancedPlanButton, cardAdvanced, 'Avançado', 'R$ 150,00');

  //checkout

  const submitButton = document.getElementById('checkout__button');
  
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const cardNumber = document.getElementById('checkout__card_number');
    const cvv = document.getElementById('checkout__card_cvv');
    const cardDate = document.getElementById('checkout__card_date');
    const cardName = document.getElementById('checkout__card_name');

    try {
      if (cardNumber.value.length < 3){
        throw new Error('Preencha o número do cartão');
      }
      if (cvv.value.length < 3){
        throw new Error('Preencha o código cvv');
      }
      if (cardDate.value.length < 3){
        throw new Error('Preencha data de expiração');
      }
      if (cardName.value.length < 3){
        throw new Error('Preencha o nome do proprietário');
      }
    } catch (error) {
        toast('red', error.message, modalController);
        return;
    };

    const creditData = {
      number: cardNumber.value,
      cvv: cvv.value,
      date: cardDate.value,
      name: cardName.value
    }
    //api request para o meio de pagamento
    //colocar condição caso a compra seja concluida
    
    const registerData = {
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      companyName: companyName.value,
      fantasyName: companyFantasy.value,
      category: companyCategory.value,
      image: image.files[0].name,
      companyDocument: {
        cnpj: doc.value,
        cpf: companyCpf.value,
      },
      address: {
        cep: cep.value,
        street: street.value,
        number: number.value,
        complement: complement.value,
        neighborhood: neighbornhood.value,
        city: city.value,
        uf: uf.value,
      }
    }

    // registrar conta na API com estes dados
    console.log(registerData); //fins de teste, remover.

    toast('green', 'assinatura concluída com sucesso', modalController);
    setTimeout( () => {
      location.replace('./login.html');
    }, 2000)
  });
};
