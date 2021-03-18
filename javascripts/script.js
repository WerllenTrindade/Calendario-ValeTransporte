const date = new Date();

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const renderCalendar = () => {

  
  const monthDays = document.querySelector(".days");

  date.setDate(1);

  //obter ultimo dia do mes
  const lasDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  // h1 Header Fevereiro
  document.querySelector(".date h1").innerHTML = months[date.getMonth()];
  // h5 SubTitle
  document.querySelector(".date p").innerHTML = historicoData();

  function historicoData(date) {
    var dataAtual = new Date();

    var dia = dataAtual.getDate();
    var mes = dataAtual.toLocaleString("default", { month: "short" });
    var ano = dataAtual.getFullYear();

    date = `Dia ${dia} de ${mes} de ${ano}`;

    return date;
  }

  // Incrementar os dias responsivos no calendario

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date>${prevLastDay - x + 1}</div>"`;
  }


  // Identificar e inserir o color no dia atual
  for (let i = 1; i <= lasDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }
  // identnficar e modificar os dias que não são do mês atual
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }



};

const CalcularValeTransporte = () => {
  // Obter todos os dias do mes
  function getDaysInMonth() {
    var date = new Date();
    const anoAtual = date.getFullYear();
    const mesAtual = date.getMonth();

    const dateCompleto = new Date(anoAtual, mesAtual, 1);
    const days = [];

    while (dateCompleto.getMonth() === mesAtual) {
      days.push(new Date(dateCompleto));
      dateCompleto.setDate(dateCompleto.getDate() + 1);
    }
    return days;
  }
  
  // deixar os domingos como false
  function eDomingo(date) {
    const diasDaSemana = new Array(7);

    diasDaSemana[0] = "domingo";
    diasDaSemana[1] = "segunda";
    diasDaSemana[2] = "terça";
    diasDaSemana[3] = "quarta";
    diasDaSemana[4] = "quinta";
    diasDaSemana[5] = "sexta";
    diasDaSemana[6] = "sabado";

    return diasDaSemana[date.getDay()] === "domingo" ? true : false;
  }

  // Dias ulteis do mês
  function diasUteis() {
    const totalDeDiasUteis = getDaysInMonth().filter((date) => !eDomingo(date));
    return totalDeDiasUteis;
  }

  // obter os primeiros a data final dos primeiro 15 dias Uteis
  function primeirosQuinzeDias() {
    const quinzeDias = diasUteis().filter((item) => item < diasUteis()[15]);

    return quinzeDias;
  }

  // FORMATADO O MES 1/MES CONTANDO 15 DIAS 
  function PrimeiraQuinzena(resultado){ 

    let data1 = primeirosQuinzeDias().pop().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
    let data2 = primeirosQuinzeDias().shift().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
  
    resultado = `Referente ao dia <span>${data2}</span> ao <span>${data1}</span>`
  
    return resultado
  }

  // Gerador de valores do primeiros 15 dias trabalhados
  // 01/mes contar 15 dias trabalhos.
  function calcularValorApagar() {
    var dias = primeirosQuinzeDias().length;
    var valor = 7.6 * dias;
    const formatReal = valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return `<p><span>${formatReal}</span></p> <h6>Valor total</h6>`;
  }
   document.querySelector('.moneyMes1').innerHTML = calcularValorApagar()

  // Gerador de valores da segunda quinzena trabalhada
    function calcularORestoDoMes( valor) {
      var QuinzeDias = primeirosQuinzeDias().length // obter valor 15
      var DiasUteis = diasUteis().length; // obter valor 27
      var valorValeTransp = 7.6;
  
      valor = (DiasUteis - QuinzeDias) * valorValeTransp
      
      const formatReal = valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
  
      return `<p><span>${formatReal}</span></p> <h6>Valor total</h6>`;
    }

    document.querySelector('.moneyMes2').innerHTML = calcularORestoDoMes()
    
    function MesAtualidade(){
    const MesAtualidade = months[date.getMonth()]
    var MesAtual = months.filter( valor => valor == MesAtualidade)
      
    return `<p><strong>${MesAtual}</strong></p>`
   
  }

  document.querySelector('.mes-header').innerHTML = MesAtualidade()

  // function para subtrair feriado
const btn = document.querySelector('#btn')
.addEventListener('click', e => {
    e = document.querySelector('.screen').value
    var QuinzeDias = primeirosQuinzeDias().length // obter valor 15
    var DiasUteis = diasUteis().length; // obter valor 27
    var valorValeTransp = 7.6;

    valor = (DiasUteis - QuinzeDias) * valorValeTransp

    const Valorextraidabox =  valor - (e * 7.6) 

    const formatReal = Valorextraidabox.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      return document.querySelector('.moneyMes2').innerHTML = `<p><span>${formatReal}</p></span><h6>Valor total</h6>`
})

};

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});




renderCalendar();
CalcularValeTransporte();






function pad(s) { /* Completa com zeros numeros com 1 digito */
  return (s < 10) ? '0' + s : s;
}

function newData(){ /* Obter a hora e aplica ao objeto*/
var date = new Date();
hora.innerHTML=[date.getHours(), date.getMinutes(),date.getSeconds()].map(pad).join(':');
}

setInterval(function(){ /* Atualizar a hora em tempo real */
newData();
},500);