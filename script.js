// Creare un calendario dinamico con le festività. Partiamo dal gennaio 2018 dando
//  la possibilità di cambiare mese, gestendo il caso in cui l’API non possa
//  ritornare festività. Il calendario partirà da gennaio 2018 e si concluderà a
//  dicembre 2018 (unici dati disponibili sull’API).
// Sarà indispensabile sia per la parte obbligatoria, che per quella facoltativa,
// l’utilizzo di momentjs e dell’API holiday

function stampaMeseCorrente(giornoInizio) {
    var nomeMese = giornoInizio.format('MMMM YYYY');

    var htmlTemplate = $('#mese-template').html();
    var template = Handlebars.compile(htmlTemplate);

    var context = {
        month: nomeMese
    };

    $('#mese_corrente').append(template(context));


    htmlTemplate = $('#giorno-template').html();
    template = Handlebars.compile(htmlTemplate);

    var giorniMeseCorrente = giornoInizio.daysInMonth();
    for (var i = 0; i < giorniMeseCorrente; i++) {
        var giornoCorrente = moment(giornoInizio);
        giornoCorrente.add(i, 'days');
        // console.log(giornoInizio.format('DD/mm/yyyy'));
        // console.log(giornoCorrente.format('DD/mm/yyyy'));
        // Il giorno della settimana
        var nomeGiornoDellaSettimana = giornoCorrente.format('dddd');
        // Il numero del giorno del mese
        var giornoNumeroMese = giornoCorrente.format('D');
        var dataCompleta = giornoCorrente.format('YYYY-MM-DD');
        var context = {
            date: giornoNumeroMese,
            name: nomeGiornoDellaSettimana,
            complete_date:dataCompleta
        };
        $('#giorni_mese').append(template(context));
    }
};

$(document).ready(function() {
    // VARIABILI
    // La data completa
    var dataMeseCorrente = moment('2018-01-01');

    stampaMeseCorrente(dataMeseCorrente);

    $.ajax({
        url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
        method:"GET",
        success:function(data){
            console.log(data.response);
        },
        error:function(){
            alert('Errore');
        }

    });

});
