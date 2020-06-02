const uuid = require("uuid");
const EventEmitter = require("events");

class Events extends EventEmitter{
    Log(msg){
        this.emit("event", { id: uuid.v4(), msg });
    }
}

module.exports = Events;