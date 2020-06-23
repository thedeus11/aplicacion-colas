const { io } = require('../server');
const { TicketControl } = require("../classes/ticket-control");
let ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on("siguienteTicket", (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "El escritorio es necesario"
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //Actualizar/ notificar cambios en los ultimos 4
        client.broadcast.emit("ultimos4", {
            ultimos4: ticketControl.getUltimos4()
        });
    });

    client.emit("estadoActual", {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });
});