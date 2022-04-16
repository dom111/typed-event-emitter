export type EventMap = {
  [key: string]: any[];
};

type Handler<A extends any[]> = (...args: A) => void;

type HandlerStack<E extends EventMap> = {
  [K in keyof E]?: Handler<E[K]>[];
};

export interface ITypedEventEmitter<
  T extends EventMap,
  E extends EventMap = T & EventMap
> {
  on<K extends keyof E>(event: K, handler: Handler<E[K]>): void;
  once<K extends keyof E>(event: keyof E, handler: Handler<E[K]>): void;
  off<K extends keyof E>(event: keyof E, handler: Handler<E[K]>): void;
  emit<K extends keyof E>(event: keyof E, ...args: E[K]): void;
}

export class EventEmitter<
  T extends EventMap = EventMap,
  E extends EventMap = T & EventMap
> implements ITypedEventEmitter<E>
{
  #handlers: HandlerStack<E> = {};

  public on<K extends keyof E>(event: K, handler: Handler<E[K]>): void {
    if (!(event in this.#handlers)) {
      this.#handlers[event] = [];
    }

    this.#handlers[event]!.push(handler);
  }

  public once<K extends keyof E>(event: K, handler: Handler<E[K]>): void {
    const onceHandler: Handler<E[K]> = (...args) => {
      handler(...args);

      this.off(event, onceHandler);
    };

    this.on(event, onceHandler);
  }

  public off<K extends keyof E>(event: K, handler: Handler<E[K]>): void {
    if (!(event in this.#handlers)) {
      return;
    }

    const index = this.#handlers[event]!.indexOf(handler);

    if (index === -1) {
      return;
    }

    this.#handlers[event]!.splice(index, 1);
  }

  public emit<K extends keyof E>(event: keyof E, ...args: E[K]): void {
    if (!(event in this.#handlers)) {
      return;
    }

    this.#handlers[event]!.forEach((handler) => handler(...args));
  }
}

export default EventEmitter;
