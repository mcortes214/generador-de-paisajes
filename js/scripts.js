//Variables generales

var anchoCanvas = innerWidth;
var altoCanvas = innerHeight;



var flagGrabarCapa = false;

var alturaActual = 200;
var cantidadPuntos = 200;
var pendiente = Math.round(Math.random()*altoCanvas/20);
var elevacion = 0; //suma o resta a la altura del perfil completo.
var opacidad = 60;

colorBackgroundR = Math.round(Math.random()*255);
colorBackgroundG = Math.round(Math.random()*255);
colorBackgroundB = Math.round(Math.random()*255);

var perfil = [alturaActual];
var capas = [];

function generarPerfil(){
  for(var i=1; i<anchoCanvas; i++){
    perfil[i] = perfil[i-1]  + Math.random()*100-50;
  }
}

function grabarPerfil(){
  flagGrabarCapa = true;
}



generarPerfil();


// INTERFAZ

const contenedorInterfaz = document.querySelector('.container-interfaz');

const sliderPendiente = document.getElementById('slider-pendiente');
const sliderCantidadPuntos = document.getElementById('slider-cantidad-puntos');
const sliderElevacion = document.getElementById('slider-elevacion');
const sliderOpacidad = document.getElementById('slider-opacidad');



const botonGenerarPerfil = document.getElementById('generar-perfil');
const botonGrabarPerfil = document.getElementById('grabar-perfil');
const botonVisibilidadInterfaz = document.querySelector('.boton-visibilidad-interfaz');

const sliderBgR = document.getElementById('slider-bg-R');
const sliderBgG = document.getElementById('slider-bg-G');
const sliderBgB = document.getElementById('slider-bg-B');

  //Pendiente
  noUiSlider.create(sliderPendiente, {
      start: [pendiente],
      step: 0.1,
      range: {
          'min': 0,
          'max': altoCanvas/20,
      }
  });

  //Cantidad de puntos
  noUiSlider.create(sliderCantidadPuntos, {
      start: [cantidadPuntos],
      step: 1,
      range: {
          'min': 2,
          'max': anchoCanvas,
      }
  });

  //Elevación
  noUiSlider.create(sliderElevacion, {
      start: [elevacion],
      step: 1,
      range: {
          'min': -altoCanvas/2,
          'max': altoCanvas/2,
      }
  });
  //Opacidad
  noUiSlider.create(sliderOpacidad, {
      start: [opacidad],
      step: 1,
      range: {
          'min': 0,
          'max': 255,
      }
  });




  //Color de background

  noUiSlider.create(sliderBgR, {
      start: [colorBackgroundR],
      step: 1,
      range: {
          'min': 0,
          'max': 255,
      }
  });
  noUiSlider.create(sliderBgG, {
      start: [colorBackgroundG],
      step: 1,
      range: {
          'min': 0,
          'max': 255,
      }
  });
  noUiSlider.create(sliderBgB, {
      start: [colorBackgroundB],
      step: 1,
      range: {
          'min': 0,
          'max': 255,
      }
  });


  //EVENT BINDING

  botonGenerarPerfil.addEventListener('click', function(){
    generarPerfil();
  });

  botonGrabarPerfil.addEventListener('click', function(){
    grabarPerfil();
  });



  botonVisibilidadInterfaz.addEventListener('click', function(){
    contenedorInterfaz.classList.toggle('interfaz--hidden');
  });

  sliderPendiente.noUiSlider.on('slide', function () {
    pendiente = sliderPendiente.noUiSlider.get();
  });
  sliderCantidadPuntos.noUiSlider.on('slide', function () {
    cantidadPuntos = sliderCantidadPuntos.noUiSlider.get();
  });
  sliderElevacion.noUiSlider.on('slide', function () {
    elevacion = parseInt(sliderElevacion.noUiSlider.get());
  });
  sliderOpacidad.noUiSlider.on('slide', function () {
    opacidad = parseInt(sliderOpacidad.noUiSlider.get());

  });

  sliderBgR.noUiSlider.on('slide', function () {
    colorBackgroundR = sliderBgR.noUiSlider.get();
  });
  sliderBgG.noUiSlider.on('slide', function () {
    colorBackgroundG = sliderBgG.noUiSlider.get();
  });
  sliderBgB.noUiSlider.on('slide', function () {
    colorBackgroundB = sliderBgB.noUiSlider.get();
  });













//Dibujo del paisaje

let pg; //objeto de gráficos actual
let pgCapas;

function setup() {
  createCanvas(anchoCanvas, altoCanvas);
  pg = createGraphics(anchoCanvas, altoCanvas);
  pgCapas = createGraphics(anchoCanvas, altoCanvas);
}



function draw() {

  background(colorBackgroundR, colorBackgroundG, colorBackgroundB);

  if(flagGrabarCapa){
    let capaNueva = createGraphics(width,height);
    dibujarPerfil(capaNueva);
    capas.push(capaNueva);
    pgCapas.image(capaNueva, 0, 0);
    flagGrabarCapa = false;
  }

  image(pgCapas, 0,0); //Dibujar fondo

  dibujarPerfil(pg);
  image(pg, 0, 0);

}

function dibujarPerfil(grafico){
    grafico.noStroke();
    grafico.clear();
    grafico.fill(0, opacidad);
      grafico.beginShape();
        grafico.vertex(0, height);
        // grafico.vertex(0, alturaActual - elevacion);
        for(var i=0; i<=cantidadPuntos; i++){
          grafico.vertex(width/cantidadPuntos*i, height/2 + perfil[i]/50*pendiente - elevacion);
        }
        grafico.vertex(width, height);
      grafico.endShape(CLOSE);
}

