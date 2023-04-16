const buttonsSection = document.getElementById("seccion-botones")
const contenedorBotones = document.getElementById("botones-valores")
const botonValorDiferente = document.getElementById("solicitar-valor-diferente")
const valueSection = document.getElementById("seccion-valor")
const b = document.getElementById("boton")
const m = document.getElementById("monto")
const resultado = document.getElementById("operacion")

let disponible
let dinero
let papeles
let calcCantidad
let denominaciones
let caja = []
let botones = []
let entregado = []



class Billete {
  constructor(nombre, valor, cantidad) {
    this.nombre = nombre
    this.valor = valor
    this.cantidad = cantidad
  }
}

let diez = new Billete("diez", 10000, 10)
let veinte = new Billete("veinte", 20000, 10)
let cincuenta = new Billete("cincuenta", 50000, 10)
let cien = new Billete("cien", 100000, 10)

caja.push(diez, veinte, cincuenta, cien)

//Impresión de los botones con las denominaciones
mostrarBotones()
function mostrarBotones() {
  buttonsSection.style.display = "block"
  valueSection.style.display = "none"
  caja.forEach((plata) => {
    denominaciones = `
      <button id=${plata.nombre} class="denominacion BPlata">${plata.valor}</button>    
    `
    contenedorBotones.innerHTML += denominaciones
  })
  botones = document.querySelectorAll(".BPlata")
  detectarMonto()
  botonValorDiferente.addEventListener("click", saldoDiferente)
}

//Clicks dinamicos para identificar el contenido de los botones de valores
function detectarMonto() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "10000") {
        dinero = parseInt("10000")
      } else if (e.target.textContent === "20000") {
        dinero = parseInt("20000")
      } else if (e.target.textContent === "30000") {
        dinero = parseInt("30000")
      } else if (e.target.textContent === "50000") {
        dinero = parseInt("50000")
      } else if (e.target.textContent === "80000") {
        dinero = parseInt("80000")
      } else if (e.target.textContent === "100000") {
        dinero = parseInt("100000")
      }
      contarMonto(dinero)
    })
  })
}
//Función para  el conteo del monto seleccionado
function contarMonto(dinero) {
  for (let d of caja) {
    if (dinero > 0) {
      calcCantidad = Math.floor(dinero / d.valor)    
      if (calcCantidad > d.cantidad) {
          papeles = d.cantidad
      } else {
          papeles = calcCantidad
          d.cantidad = d.cantidad - papeles
      }
      entregado.push(new Billete(d.nombre, d.valor, papeles))
      dinero = dinero - (d.valor * papeles)
      console.log("Cantidad: " + papeles, "Dinero: " + dinero)
      entregarMonto(dinero)
    }
  }
}
//Función para entregar el monto solicitado
function entregarMonto(dinero) {
  if (dinero > 0) {
    resultado.innerHTML = "!Monto insuficiente¡"
  } else {
    for (let e of entregado) {
      if (e.cantidad > 0) {
        resultado.innerHTML += e.cantidad + " billetes de $ " + e.valor + " pesos<br>"
      }       
    }
  }
} 
//Función para mostrar el botón de saldo diferente
function saldoDiferente() {
  valueSection.style.display = "block"
  buttonsSection.style.display = "none"
  b.addEventListener("click", ingresarSaldo)
}
//Función calcular el saldo distinto
function ingresarSaldo() {
  dinero = parseInt(m.value)
  contarMonto(dinero)
  verificarValor(dinero)
}
//Función para entregar el saldo solicitado por el usuario
function verificarValor(dinero) {
  if (dinero === 0) {
    resultado.innerHTML = "Valor incorrecto. <br>Por favor digite un saldo.</br>"
  } else if(dinero < 0) { //Si se introduce un valor negativo.
    resultado.innerHTML = "Valor incorrecto. <br>Por favor digite un saldo.</br>"
  }
}
  




