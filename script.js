// Creare un calendario dinamico con le festività.
// Partiamo dal gennaio 2018 dando la possibilità di cambiare mese,
// gestendo il caso in cui l’API non possa ritornare festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
// (unici dati disponibili sull’API).

// Sarà indispensabile sia per la parte obbligatoria, che per quella facoltativa,
// l’utilizzo di momentjs e
// dell’API holiday https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
// Link al documento con le specifiche:
// https://docs.google.com/document/d/1OcSGrT3Snh_DXrDZ82DVY59eqvzNb_Nh_Db5z3qq2_k/edit

// Consigli:
// 	1- Facciamo prima il mese di gennaio lasciandoci le parti opzionali per la fine
// 	2- Andiamo avanti passo passo, sfruttando la documentazione di momentjs
// per capire se e come momentjs può aiutarmi a risolvere un determinato problema.
// Analizzare inoltre, prima di scrivere codice, l’API delle festività
// Buon lavoro!

$(document).ready(function () {


  // funzione che al click scorre i mesi
  $('.next').click(function () {


    var meseCorrente = $('#mese-corrente').attr('data-mese-corrente');

    var momentMeseCorrente = moment(meseCorrente);
    var meseSuccessivo = momentMeseCorrente.add(1, 'months');

    if (meseSuccessivo.year() === 2018) {

      generaMese(momentMeseCorrente);
      festivita(momentMeseCorrente);

    } else {
      alert('puoi scorrere solo nei mesi del 2018');
    }

  });

  // funzione che al click scorre i mesi
  $('.prev').click(function () {

    var meseCorrente = $('#mese-corrente').attr('data-mese-corrente');

    var momentMeseCorrente = moment(meseCorrente);
    var mesePrecedente = momentMeseCorrente.subtract(1, 'months');

    if (mesePrecedente.year() === 2018) {

      generaMese(momentMeseCorrente);
      festivita(momentMeseCorrente);

    } else {
      alert('puoi scorrere solo nei mesi del 2018');
    }

  });

  // oggetto da passare nelle funzioni
  // --> restituisce il primo giorno del mese di gennaio

  // var prova = moment('2018-01-01');
  // console.log(prova);

  var dataMeseCorrente = moment({
    days: 01,
    month: 00,
    years: 2018
  });

  generaMese(dataMeseCorrente);
  festivita(dataMeseCorrente);
  console.log(dataMeseCorrente);


}); // end document ready

function generaMese(giornoDaImmettere) {

  $('#lista-giorni').html('');
  $('#mese-corrente').html('');


  // inizializziamo una variabile in cui cambiamo il formato
  var nomeMese = giornoDaImmettere.format('MMMM YYYY');

  // Handlebars
  var htmlTemplate = $('#mese-template').html();
  var template = Handlebars.compile(htmlTemplate);

  var context = {
    month: nomeMese
  };

  $('#mese-corrente').append(template(context));

  $('#mese-corrente').attr('data-mese-corrente', giornoDaImmettere.format('YYYY-MM-DD'));



  htmlTemplate = $('#giorni-template').html();
  template = Handlebars.compile(htmlTemplate);

  // calcolo il numero di giorni per ogni mese
  var giorniMeseCorrente = giornoDaImmettere.daysInMonth();

  // ciclo for
  for (var i = 0; i < giorniMeseCorrente; i++) {

    var giornoCorrente = moment(giornoDaImmettere);

    giornoCorrente.add(i, 'days');

    var giornoNumeroMese = giornoCorrente.format('D');
    var dataCompleta = giornoCorrente.format('YYYY-MM-DD');
    var mese = giornoCorrente.format('MMMM');

    context = {
      date: giornoNumeroMese,
      name: mese,
      data_completa: dataCompleta
    };

    $('#lista-giorni').append(template(context));


  }

} // fine funzione generaMese



function festivita(feste) {

  // chiamata ajax
  $.ajax({

    // url api
    url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    method: "GET",

    data: {
      year: feste.year(),
      month: feste.month()
    },

    success: function (data) {

      console.log(data.response);

      if (data.success === true) {

        var vacanze = data.response;

        for (var i = 0; i < vacanze.length; i++) {

          var vacanzaCorrente = vacanze[i];

          var thisDataElem = $('[data-date = " ' + vacanzaCorrente.date + ' "]');

          thisDataElem.addClass('red');

          thisDataElem.append(' - ' + vacanzaCorrente.name);
        }
      }

    },

    error: function () {
      alert('qualcosa non va');
    }
  });


}
