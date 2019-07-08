
var params = new URLSearchParams(window.location.search);

var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var btnMessage = $('#btnMessage');
var txtMessage = $('#txtMessage');
var divChatbox = $('#divChatbox');

// Funciones para renderizar usuarios
function renderUsers(people) {  
  console.log('DEBUG', 'renderUsers');
  var html = '';
  html += `<li>`;
  html += `<a href="javascript:void(0)" class="active"> Chat de <span> ${params.room}</span></a>`;
  html += `</li>`;
  
  people.forEach(person => {
    html += `<li>`;
    html += `<a data-id="${person.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ${person.name} <small class="text-success">online</small></span></a>`;
    html += `</li>`;
  });
  
  divUsuarios.html(html);
}

function renderMessage(message, me) {
  var html = '';
  var date = new Date(message.date);
  var hora = date.getHours() + ':' + date.getMinutes();

  var adminClass = 'info';
  if (message.user === 'Admin') {
    adminClass = 'danger';
  }

  if (me) {
    html += '<li class="reverse">';
    html +=   '<div class="chat-content">';
    html +=     '<h5>'+ message.name +'</h5>';
    html +=     '<div class="box bg-light-inverse">'+ message.message +'</div>';
    html +=   '</div>';
    html +=   '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
    html +=   '<div class="chat-time">' + hora + '</div>';
    html += '</li>';
  } else {
    html += '<li class="animated fadeIn">';
    if (message.user !== 'Admin') {
      html += '  <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    }
    html += '  <div class="chat-content">';
    html += '      <h5>'+ message.name +'</h5>';
    html += '      <div class="box bg-light-'+adminClass+'">'+ message.message +'</div>';
    html += '  </div>';
    html += '  <div class="chat-time">' + hora + '</div>';
    html += '</li>';
  }

  divChatbox.append(html);
}


// =========
// Listeners
// =========

divUsuarios.on('click', 'a', function(){
  var id = $(this).data('id');
  if (id) {
    console.log(id);
  }
});

formEnviar.on('submit', function(e) {
  e.preventDefault();

  let message = txtMessage.val().trim()
  if (message.length === 0) {
    return;
  }

  socket.emit('createMessage', {
    nombre: params.name,
    message: message
  }, function(message) {
    txtMessage.val('').focus();
    renderMessage(message, true);
    scrollBottom();
  });

});
