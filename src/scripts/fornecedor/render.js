import { toast } from "../render.js";
import { getCep } from "./request.js";

export const handleLabels = () => {
  const inputs = document.querySelectorAll(
    ".supplier__register input, .supplier__register select"
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
      console.log(cep);
      if (cep.erro === 'true') {
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
  
      const files = event.dataTransfer.files;
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
          document.getElementById(input).files = files;
          image.src = "../src/image/icons/success.svg";
          firstLine.style.display = "none";
          secondLine.innerText = files[0].name;
      }
  });
  
  };
  setupDragAndDrop("custom-file-upload", "supplier__fileInput");
  setupDragAndDrop("custom-doc-upload", "supplier__docInput");
};

export const handleSuplierForm = () => {
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
  const buttonStep1 = document.getElementById("supplier--button-step1");

  buttonStep1.addEventListener("click", (event) => {
    event.preventDefault();
    // try {
    //   if (name.value.length <= 3){
    //     throw new Error('Não deixe o Nome em branco!');
    //   }
    //   if (email.value.length <= 3 || !email.value.includes('@')){
    //     throw new Error('e-mail inválido!');
    //   }
    //   if (phone.value.length <= 3){
    //     throw new Error('Não deixe o Telefone em branco!');
    //   }
    //   if (password.value.length <= 3){
    //     throw new Error('Não deixe a senha em branco!');
    //   }
    //   if (password.value !== confirm.value){
    //     throw new Error('Confirmação de senha falhou!');
    //   }
    // } catch (error) {
    //   toast('red', error.message);
    //   return;
    // }

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
  const image = document.querySelector("#supplier__fileInput");
  const docFile = document.querySelector("#supplier__docInput");
  const buttonStep2 = document.querySelector("#supplier--button-step2");

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
    // try {
    //   if (doc.value.length <= 3) {
    //     throw new Error("Não deixe o Documento em branco!");
    //   }
    //   if (companyName.value.length <= 3) {
    //     throw new Error("Não deixe o nome da empresa em branco!");
    //   }
    //   if (companyFantasy.value.length <= 3) {
    //     throw new Error("Não deixe o nome fantasia em branco!");
    //   }
    //   if (companyCpf.value.length <= 3) {
    //     throw new Error("Não deixe o cpf em branco!");
    //   }
    //   if (companyCategory.value.length <= 3) {
    //     throw new Error("Não deixe a categoria em branco!");
    //   }
    //   if (contract.checked === false) {
    //     throw new Error("Leia o contrato para continuar!");
    //   }
    //   if (!image.files || !image.files.length) {
    //     throw new Error("Coloque uma imagem!");
    //   }

    //   if (!docFile.files || !docFile.files.length) {
    //     throw new Error("Coloque o arquivo da CDN Federal!");
    //   }
    // } catch (error) {
    //   toast("red", error.message);
    //   return;
    // };

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
  const buttonStep3 = document.querySelector('#supplier--button-step3');

  buttonStep3.addEventListener('click', (event) => {
    event.preventDefault();
    // try {
    //   if (cep.value.length <= 8 || uf.value.length !== 2){
    //     throw new Error('Preencha o endereço da sua empresa');
    //   }
    //   if (cep.value.length === 0){
    //     throw new Error('Preencha o número da sua empresa');
    //   }
    // } catch (error) {
    //     toast('red', error.message);
    //     return;
    // };

    step3.classList.toggle("hidden");
    step3.classList.toggle("show");
    step4.classList.toggle("show");
    step4.classList.toggle("hidden");
  });
};
