import { handleFornecedorHeader, supplierRouteProtection, toast } from "../render.js";

supplierRouteProtection("open");

const handleRecovery = () => {
  const submit = document.querySelector("#recovery--button");
  const step1 = document.querySelector(".step-1");
  const step2 = document.querySelector(".step-2");
  const step3 = document.querySelector(".step-3");
  const emailInput = document.querySelector(".step-1 > input");
  const codeInput = document.querySelector(".step-2 > input");
  const passInputs = document.querySelectorAll(".step-3 > input");
  const password = passInputs[0];
  const confirm = passInputs[1];

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    const getCurrentStep = (step) => {
        if (step){
            if (step.classList.contains("show")) {
              return step;
            }   
        }
        return false;
    };

    const currentStep =
      getCurrentStep(step1) || getCurrentStep(step2) || getCurrentStep(step3);
    switch (currentStep) {
      case step1:
        //adicionar requisição de recuperação
        if (emailInput.value !== "") {
          console.log(emailInput.value);
          toast("green", "Email enviado com sucesso");
          step1.classList.toggle("show");
          step1.classList.toggle("hidden");
          step2.classList.toggle("show");
          step2.classList.toggle("hidden");
        } else {
          toast("red", "Email não encontrado");
        }
        break;
      case step2:
        //adicionar requisição de recuperação
        if (codeInput.value === "123456") {
          console.log(codeInput.value);
          step2.classList.toggle("show");
          step2.classList.toggle("hidden");
          step3.classList.toggle("show");
          step3.classList.toggle("hidden");
        } else {
          toast("red", "Código inválido");
        }
        break;
      case step3:
        //adicionar requisição de recuperação
        if (password.value !== "" && password.value === confirm.value) {
          console.log(password.value);
          step3.classList.toggle("hidden");
          step3.classList.toggle("show");
          step1.classList.toggle("show");
          step1.classList.toggle("hidden");
          toast("green", "Senha alterada com sucesso");
          setTimeout(() => {
            location.replace("./login.html");
          }, 2000);
        } else {
          toast("red", "Senha inválida");
        }
        break;
      default:
        break;
    }
  });
};

handleFornecedorHeader();
handleRecovery();
