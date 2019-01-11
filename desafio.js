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
    populateTable(roster);
  },
  error: function() {
    $("#title").html("Não há conexão à internet");
  }
});

// constroi a table usando os valores fornecidos pela API(guardada no roster)
function populateTable(people){
  $("table").append("<tbody></tbody>")

  // coloca os valores na table
  for (i = 0; i < people.length; i++) {
    var name = people[i].name.first + ' ' + people[i].name.last;
    var email = people[i].email;
    var phone = people[i].phone;
    $("table tbody").append("<tr><td>" + name + "</td><td>" + email + "</td><td>" + phone + "</td></tr>");
  }
}

// reconstroi a table
function recreateTable(people) {
  $("body .container").append('<table id="tbl"><thead><tr><th>Nome</th><th>Email</th><th>Telefone</th></tr></thead></table>');
  populateTable(people);
}

// adiciona botao para voltar a tela inicial
function addGoBack() {
  if(!($("body .container").has("#go-back").length)){
    $("body .container").append('<button id="go-back" type="button" class="btn btn-danger">Voltar</button>');
  }
}

// deleta a table
function deleteTable() {
  table = document.getElementById('tbl');
  // o uso do index e necessario visto que getElementsByClassName retorna HTMLCollection
  doc = document.getElementsByClassName('container')[0];
  if(($("body .container").has("table").length)){
    doc.removeChild(table);
  }
}

// deleta o botao de voltar
function deleteGoBack() {
  doc = document.getElementsByClassName('container')[0];
  if(($("body .container").has("#go-back").length)){
    goBackFilter = document.getElementById('go-back')
    doc.removeChild(goBackFilter);
  }
}

// deleta as info extras
function deleteInfo() {
  info = document.getElementById('info');
  // o uso do index e necessario visto que getElementsByClassName retorna HTMLCollection
  doc = document.getElementsByClassName('container')[0];
  if(($("body .container").has("#info").length)){
    doc.removeChild(info);
  }
}

// permite ao clicar em um tr, mostrar info extra(Figura 2)
$('body').on('click','tr', function() {
  var all_tr = $('table tr');
  // acha a posicao do tr clicado em relacao aos outros tr
  for (var i = 0; i < all_tr.length; i++) {
    if(all_tr[i] == this){
      break;
    }
  }
  // posicao relativa aos tr
  var pos_tr = i - 1

  // checa se a posicao e maior que -1 para nao contar com o thead
  if(pos_tr > -1){
    // pega o nome direto da table e achar a posicao do usuario em relacao ao roster
    var name = $('table tr td')[pos_tr * 3].innerHTML;
    for (var i = 0; i < roster.length; i++) {
      if(roster[i].name.first + ' ' + roster[i].name.last == name){
        break;
      }
    }
    // posicao relativa ao roster
    var pos = i;

    // recebe foto, email, telefone, aniversario e endereco
    var photo = roster[pos].picture.medium;
    var email = roster[pos].email;
    // aniversario vem acompanhado de uma hora logo eu estou seperando da hora
    var bdayNotFormated = roster[pos].dob.date.split('T')[0];
    // agora estou formatando o aniversario para o padrao DD/MM/YYYY
    var day = bdayNotFormated.split('-')[2];
    var month = bdayNotFormated.split('-')[1];
    var year = bdayNotFormated.split('-')[0];

    var bday = day + "/" + month + "/" + year
    var phone = roster[pos].phone;
    var adress = roster[pos].location.street;

    // adiciona nome, foto, email, telefone, aniversario e endereco
    $("body .container").append('<div id="info"><h3 id="name">' + name +
    '</h3><div class="grid"><div><img src="' + photo +
    '"></div><div><p>' + email + '</p><p>' + phone + '</p></div><div><p>' +
    bday + '</p><p>' + adress + '</p></div></div></div>');

    // garante que o botao de voltar sempre esteja embaixo
    deleteGoBack();
    // adiciona o botao de voltar
    addGoBack();
    // deleta a table
    deleteTable();

  }
});

// ao clicar no botao filtra os nomes de acordo com o valor passado
$('body').on('click','#btn-filter-name', function() {
  deleteInfo();
  newList = [];
  // palavra pesquisada
  word = document.getElementById("input-filter-name").value;
  // filtra os nomes que contem a palavra pesquisada
  for (var i = 0; i < roster.length; i++) {
    var name = roster[i].name.first + ' ' + roster[i].name.last;
    if(name.includes(word)){
      newList.push(roster[i]);
    }
  }

  deleteTable();

  recreateTable(newList);

  // adiciona o botao de voltar
  addGoBack();
});

// ao clicar no botao filtra os emails de acordo com o valor passado
$('body').on('click','#btn-filter-email', function() {
  deleteInfo();
  newList = [];
  // palavra pesquisada
  word = document.getElementById("input-filter-email").value;
  // filtra os nomes que contem a palavra pesquisada
  for (var i = 0; i < roster.length; i++) {
    var email = roster[i].email;
    if(email.includes(word)){
      newList.push(roster[i]);
    }
  }

  deleteTable();

  recreateTable(newList);

  // adiciona o botao de voltar
  addGoBack();
});

// ao clicar no botao retorna para a pagina inicial(com a table)(Figura 1)
$('body').on('click','#go-back', function() {
  deleteInfo();
  deleteTable();
  deleteGoBack();

  recreateTable(roster);
});
