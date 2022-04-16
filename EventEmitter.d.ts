export declare type EventMap = {
  [key: string]: any[];
};
declare type Handler<A extends any[]> = (...args: A) => void;
export interface ITypedEventEmitter<
  T extends EventMap,
  E extends EventMap = T & EventMap
> {
  on<K extends keyof E>(event: K, handler: Handler<E[K]>): void;
  once<K extends keyof E>(event: keyof E, handler: Handler<E[K]>): void;
  off<K extends keyof E>(event: keyof E, handler: Handler<E[K]>): void;
  emit<K extends keyof E>(event: keyof E, ...args: E[K]): void;
}
export declare class EventEmitter<
  T extends EventMap = EventMap,
  E extends EventMap = T & EventMap
> implements ITypedEventEmitter<E>
{
  #private;
  on<K extends keyof E>(event: K, handler: Handler<E[K]>): void;
  once<K extends keyof E>(event: K, handler: Handler<E[K]>): void;
  off<K extends keyof E>(event: K, handler: Handler<E[K]>): void;
  emit<K extends keyof E>(event: keyof E, ...args: E[K]): void;
}
export default EventEmitter;
