let socket = io();

let label = $("#lblNuevoTicket");

//conection server
socket.on("connect", function () {
    console.log("Conectado al servidor");
});

socket.on("disconnect", function () {
    console.log("Desconecto del servidor");
});

socket.on("estadoActual", (resp) => {
    label.text(resp.actual);
});

$("button").on('click', function () {
    socket.emit("siguienteTicket", null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });
});