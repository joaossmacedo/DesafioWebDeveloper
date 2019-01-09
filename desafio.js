var roster = [];

// pega os valores dados pela API e cria uma table(Figura 1)
$.ajax({
  url: 'https://randomuser.me/api/?results=25&noinfo',
  dataType: 'json',
  success: function(data) {
    roster = data.results;
    console.log(roster);
    construct_table();
  }
});

// constroi a table usando os valores fornecidos pela API
function construct_table(){
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
  console.log(pos);
});
