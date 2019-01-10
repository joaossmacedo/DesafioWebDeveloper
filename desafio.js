// guarda os valores dos individuos fornecidos pela API
var roster = [];

// pega os valores dados pela API e cria a table(Figura 1)
$.ajax({
  url: 'https://randomuser.me/api/?results=25&noinfo',
  dataType: 'json',
  success: function(data) {
    roster = data.results;
    // cria a table e a sua thead
    $("body .container").append('<table id="tbl"><thead><tr><th>Nome</th><th>Email</th><th>Telefone</th></tr></thead></table>');

    // popula a table
    populateTable();
  },
  error: function() {
    $("#title").html("Não há conexão à internet");
  }
});

// constroi a table usando os valores fornecidos pela API(guardada no roster)
function populateTable(){
  $("table").append("<tbody></tbody>")

  // coloca os valores na table
  for (i = 0; i < 25; i++) {
    var name = roster[i].name.first;
    var email = roster[i].email;
    var phone = roster[i].phone;
    $("table tbody").append("<tr><td>" + name + "</td><td>" + email + "</td><td>" + phone + "</td></tr>");
  }
}

// deleta a table
function deleteTable() {
  table = document.getElementById('tbl');
  // o uso do index e necessario visto que getElementsByClassName retorna HTMLCollection
  doc = document.getElementsByClassName('container')[0];
  doc.removeChild(table);
}

// reconstroi a table
function recreateTable() {
  $("body .container").append('<table id="tbl"><thead><tr><th>Nome</th><th>Email</th><th>Telefone</th></tr></thead></table>');
  populateTable();
}

// permite ao clicar em um tr, mostrar mais dados(Figura 2)
$('body').on('click','tr', function() {
  var all_tr = $('table tr');
  // acha a posicao do tr clicado em relacao aos outros tr
  for (var i = 0; i < all_tr.length; i++) {
    if(all_tr[i] == this){
      break;
    }
  }

  var pos = i - 1
  // checa se a posicao e maior que -1 para nao contar com o thead
  if(pos > -1){
    // recebe nome, foto, email, telefone, aniversario e endereco
    var photo = roster[pos].picture.medium;
    var name = roster[pos].name.first + ' ' + roster[pos].name.last;
    var email = roster[pos].email;
    var bday = roster[pos].dob.date;
    var phone = roster[pos].phone;
    var adress = roster[pos].location.street;

    // adiciona nome, foto, email, telefone, aniversario e endereco
    $("body .container").append('<div id="info"><h3 id="name">' + name +
    '</h3><div class="grid"><div><img src="' + photo +
    '"></div><div><p>' + email + '</p><p>' + phone + '</p></div><div><p>' +
    bday + '</p><p>' + adress + '</p></div></div></div>');

    // adiciona o botao de voltar
    $("body .container #info").append('<button id="go-back" type="button" class="btn btn-danger">Voltar</button>');

    // deleta a table
    deleteTable();

  }
});

// ao clicar no botao retorna para a pagina inicial(com a table)(Figura 1)
$('body').on('click','#go-back', function() {
  info = document.getElementById('info');
  // o uso do index e necessario visto que getElementsByClassName retorna HTMLCollection
  doc = document.getElementsByClassName('container')[0];
  doc.removeChild(info);

  recreateTable();
});
