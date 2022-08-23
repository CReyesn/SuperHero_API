$('.tarjeta').css('display','none')

$(document).ready(function () {
   
  $('button').click(function(){
      limpiarTarjeta()
      let id=$('#id').val()        
      obtenerSuperHero(id) 
      limpiarInput() 
      

  })
  
 
})

function grafica(superHero) {
  var listaPoderes=[]
  var Poderes=superHero.powerstats;
  
  for (const poder in Poderes) {
      
      listaPoderes.push({ "y": Poderes[poder], "label": poder })
  }
 
  console.log(superHero.powerstats)
  var chart = new CanvasJS.Chart("chartContainer", {
      theme: "dark2", // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      animationEnabled: true,
      title: {
          text: "Estadisticas de Poder para "+superHero.name
      },
      data: [{
          type: "pie",
          startAngle: 25,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}",
          dataPoints: listaPoderes
      }]
  })
  chart.render();
  
};


function obtenerSuperHero(id) {
  $.ajax({
      type: "GET",
      url: "https://www.superheroapi.com/api.php/4905856019427443/"+id,
      dataType: "json",
      success: function (datos) {
          grafica(datos); 
          obtenerTarjeta(datos)           
      },
      error: function () {
          $('.resultado').append(`<p>Error</p>`)
      }
  })
}

function obtenerTarjeta(superHero){
    $('.tarjeta').css('display','block')
    var url=superHero.image.url
    $('#foto2').attr('src',url);
    $('.card-title').append(`Nombre: ${superHero.name}`)
    $('#conexiones').append(`Conexiones: ${superHero.connections.relatives}`)
    $('#publicado').append(`Publicado por: ${superHero.name}`)
    $('#ocupacion').append(`Ocupacción: ${superHero.work.occupation}`)
    $('#aparicion').append(`Primera Aparicion: ${superHero.biography.publisher}`)
    $('#altura').append(`Altura: ${superHero.appearance.height}`)
    $('#peso').append(`Peso: ${superHero.appearance.weight}`)
    $('#alianza').append(`Alianzas: ${superHero.biography.aliases}`)

}



function limpiarInput(){
    $('input').val('');
}

function limpiarTarjeta(){
    $('.card-title, .card-text').html("");
}