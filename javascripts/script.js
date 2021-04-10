const date = new Date();

const valorTransporte = 7.6;

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

const exibirMesAtual = () => months[date.getMonth()];

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  //obter ultimo dia do mes
  const lasDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // obtem Number 28
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  // obtem o primeiro dia do mes return 1
  const firstDayIndex = date.getDay();

  // obtem mes em number
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  function historicoData(date) {
    var dataAtual = new Date();

    var dia = dataAtual.getDate();
    var mes = dataAtual.toLocaleString("default", { month: "short" });
    var ano = dataAtual.getFullYear();

    date = `Dia ${dia} de ${mes} de ${ano}`;

    return date;
  }

  // h1 Header Fevereiro
  document.querySelector(".date h1").innerHTML = exibirMesAtual();
  // h5 SubTitle
  document.querySelector(".date p").innerHTML = historicoData();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
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

function CalcularValeTransporte () {

  // Obter todos os dias do mes
  function getDaysInMonth() {
    const anoAtual = date.getFullYear();
    const mesAtual = date.getMonth();

    const dateCompleto = new Date(anoAtual, mesAtual, 1);
    const arrdays = []; // array para dias

    while (dateCompleto.getMonth() === mesAtual) {
      arrdays.push(new Date(dateCompleto));
      dateCompleto.setDate(dateCompleto.getDate() + 1);
    }
    return arrdays;
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
  const diasUteis = () => getDaysInMonth().filter((date) => !eDomingo(date));

  // obter os primeiros a data final dos primeiro 15 dias Uteis
  const primeirosQuinzeDias = () =>
    diasUteis().filter((item) => item < diasUteis()[15]);

  // Mascara para transf meoda em Real(R$)
  const transformaValorEmMoeda = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Mascara para o bloco html
  const renderValorTotalHTML = (valor) =>
    `<p><span>${transformaValorEmMoeda(valor)}</span></p> <h6>Valor total</h6>`;

  // Gerador de valores do primeiros 15 dias trabalhados
  // 01/mes contar 15 dias trabalhos.
  function calcularValorApagar() {
    var dias = primeirosQuinzeDias().length;
    var valor = valorTransporte * dias;

    return renderValorTotalHTML(valor);
  }

  // Gerar segundo valor do vale
  function calcularORestoDoMes() {
    const quinzeDias = primeirosQuinzeDias().length; // obter valor 15
    const totalDiasUteis = diasUteis().length; // obter valor 27
    const valor = (totalDiasUteis - quinzeDias) * valorTransporte;

    return renderValorTotalHTML(valor);
  }

  const btn = document.querySelector("#btn");

  //subtrair feriado
  btn.addEventListener("click", e => {
    e = document.querySelector(".screen").value;

    const QuinzeDias = primeirosQuinzeDias().length; // obter valor 15
    const DiasUteis = diasUteis().length; // obter valor 27
    const valor = (DiasUteis - QuinzeDias - e) * valorTransporte;

    return (document.querySelector(
      ".moneyMes2"
    ).innerHTML = `<p><span class="addColor">${transformaValorEmMoeda(
      valor
    )}</p></span ><h6>Valor total</h6>`);
  });

  document.querySelector(".mes-header").innerHTML = `<p><strong>${exibirMesAtual()}</strong></p>`;
  document.querySelector(".moneyMes1").innerHTML = calcularValorApagar();
  document.querySelector(".moneyMes2").innerHTML = calcularORestoDoMes();
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
CalcularValeTransporte();
