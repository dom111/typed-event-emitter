var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EventEmitter_handlers;
export class EventEmitter {
    constructor() {
        _EventEmitter_handlers.set(this, {});
    }
    on(event, handler) {
        if (!(event in __classPrivateFieldGet(this, _EventEmitter_handlers, "f"))) {
            __classPrivateFieldGet(this, _EventEmitter_handlers, "f")[event] = [];
        }
        __classPrivateFieldGet(this, _EventEmitter_handlers, "f")[event].push(handler);
    }
    once(event, handler) {
        const onceHandler = (...args) => {
            handler(...args);
            this.off(event, onceHandler);
        };
        this.on(event, onceHandler);
    }
    off(event, handler) {
        if (!(event in __classPrivateFieldGet(this, _EventEmitter_handlers, "f"))) {
            return;
        }
        const index = __classPrivateFieldGet(this, _EventEmitter_handlers, "f")[event].indexOf(handler);
        if (index === -1) {
            return;
        }
        __classPrivateFieldGet(this, _EventEmitter_handlers, "f")[event].splice(index, 1);
    }
    emit(event, ...args) {
        if (!(event in __classPrivateFieldGet(this, _EventEmitter_handlers, "f"))) {
            return;
        }
        __classPrivateFieldGet(this, _EventEmitter_handlers, "f")[event].forEach((handler) => handler(...args));
    }
}
_EventEmitter_handlers = new WeakMap();
export default EventEmitter;
//# sourceMappingURL=EventEmitter.js.map