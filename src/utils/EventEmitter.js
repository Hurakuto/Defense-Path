export class EventEmitter {
    #events;
    constructor() {
        this.#events = new Map();
    }
    // S'abonner à un événement
    on(eventName, callback) {
        if (!this.#events.has(eventName)) {
            this.#events.set(eventName, []);
        }
        this.#events.get(eventName).push(callback);
    }
    // Émettre un événement
    emit(eventName, data) {
        if (!this.#events.has(eventName)) return;
        this.#events.get(eventName).forEach((callback) => {
            callback(data);
        });
    }
    // Se désabonner d'un événement
    off(eventName, callback) {
        if (!this.#events.has(eventName)) return;
        this.#events.set(
            eventName,
            this.#events.get(eventName).filter((cb) => cb !== callback),
        );
    }
}
