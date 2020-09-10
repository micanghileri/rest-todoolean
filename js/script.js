$(document).ready(function() {
  getData();
  $(document).on('click','.remove', function(){
    var elemento= $(this).parent().attr("data-id");
    elimina(elemento);
  });

  $(".btn").click(function(){
    var newIt=$("#newItem").val();
    create(newIt);
  });
  $(document).on('change','.hide',function(event){
        var change=$(this).val();
        var id= $(this).parent().attr("data-id");
        modify(change,id);
   })
   $(document).on('click', '.fra', function(){
     $(this).children().show();
     $(this).mouseleave(function(){
       $(this).children().hide();
     });
   });
});

// *****funzioni******
function handleIt(risposta) {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  for ( var i = 0; i < risposta.length ; i++){
    var dati ={
      "text": risposta[i].text,
      "id" : risposta[i].id,
    }
    var html = template(dati);
    $(".items").append(html);
  }
}

function create(risposta) {
  $.ajax(
    {
      url: 'http://157.230.17.132:3002/todos/',
      method : 'POST',
      data: {
        text : risposta
      },
      success : function(){
        $(".items").empty();
        getData();
      },
      error: function(){
        alert("Si è verificato un errore");
      }
    }
  );
}

function modify(risposta,id){
  $.ajax(
    {
      url: 'http://157.230.17.132:3002/todos/'+id,
      method : 'PUT',
      data: {
        text : risposta
      },
      success : function(){
        $(".items").empty();
        getData();
      },
      error: function(){
        alert("Si è verificato un errore");
      }
    }
  );
}

function elimina(risposta){
  $.ajax(
    {
      url:'http://157.230.17.132:3002/todos/'+risposta,
      method: 'DELETE',
      success: function(risposta){
        $(".items").empty();
        getData();
      },
      error: function(){
        alert("Si è verificato un errore");
      }
    }
  );
}

function getData(){
  $.ajax(
    {
      url: 'http://157.230.17.132:3002/todos',
      success: function(risposta){
        handleIt(risposta);
      },
      error: function(){
        alert("errore");
      }
    }
  );
}
