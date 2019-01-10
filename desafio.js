var roster = [];

// pega os valores dados pela API e cria uma table(Figura 1)
$.ajax({
  url: 'https://randomuser.me/api/?results=25&noinfo',
  dataType: 'json',
  success: function(data) {
    roster = data.results;
    // cria a table e a sua head
    $("body .container").append("<table><thead><tr><th>Nome</th><th>Email</th><th>Telefone</th></tr></thead></table>")
    console.log(roster);
    // popula a table
    populate_table();
  }
});

// constroi a table usando os valores fornecidos pela API
function populate_table(){
  $("table").append("<tbody></tbody>")

  for (i = 0; i < 25; i++) {
    var name = roster[i].name.first;
    var email = roster[i].email;
    var phone = roster[i].phone;
    $("table tbody").append("<tr><td>" + name + "</td><td>" + email + "</td><td>" + phone + "</td></tr>");
  }
}

// permite ao clicar em um tr, criar uma nova pagina em que sao mostrados mais dados(Figura 2)
$('body').on('click','tr', function() {
  var all_tr = $('table tr');
  for (var i = 0; i < all_tr.length; i++) {
    if(all_tr[i] == this){
      break;
    }
  }
  var pos = i - 1
  if(pos > -1){
    var photo = roster[pos].picture.medium;
    var name = roster[pos].name.first + ' ' + roster[pos].name.last;
    var email = roster[pos].email;
    var bday = roster[pos].dob.date;
    var phone = roster[pos].phone;
    var adress = roster[pos].location.street;

    console.log(photo);
    console.log(name);
    console.log(email);
    console.log(bday);
    console.log(phone);
    console.log(adress);

    // <div class="grid-container">
    // <div class="grid-item">1</div>
    // <div class="grid-item">2</div>
    // <div class="grid-item">3</div>
    // </div>

    // adiciona nome, foto, email, telefone, aniversario e endereco
    $("body .container").append('<h3>' + name +
    '</h3><div class="grid"><div><img src="' + photo +
    '"></div><div><p>' + email + '</p><p>' + phone + '</p></div><div><p>' +
    bday + '</p><p>' + adress + '</p></div></div>')

    console.log(pos);
  }
});
