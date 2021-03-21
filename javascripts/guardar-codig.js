
  // FORMATADO O MES 1/MES CONTANDO 15 DIAS colocar no codigo
  function PrimeiraQuinzena(resultado){ 

    let data1 = primeirosQuinzeDias().pop().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
    let data2 = primeirosQuinzeDias().shift().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
  
    resultado = `Referente ao dia <span>${data2}</span> ao <span>${data1}</span>`
  
    return resultado
  }