

export class EventEmitter<Events extends Record<any, any>> {
    private events: { [EventName in keyof Events]?: (...args: Events[EventName]) => void } = {}
    public addEventListener<EventName extends keyof Events>(name: EventName, callback: (...args: Events[EventName]) => void) {
        const currentCallback = this.events[name];

        this.events[name] = async (...args) => {
            if (currentCallback) {
                await currentCallback(...args);
            }
            await callback(...args);
        }
    }
    public async dispatchEvent<EventName extends keyof Events>(name: EventName, ...args: Events[EventName]) {
        const currentEventCall = this.events[name];
        if (currentEventCall) {
            await currentEventCall(...args);
        }
    }
}
