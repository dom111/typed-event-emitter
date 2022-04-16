import EventEmitter from './EventEmitter';

const handler = new EventEmitter<{
  load: [];
  start: [Window];
  end: [number, number, boolean];
}>();

// When opened in your IDE you should see typehints in the below:
handler.on('load', () => {});
handler.on('start', (win) => {});
handler.on('end', (x, y) => {});
handler.on('end', (x, y, success) => {});
handler.on('fizz', (arg1, arg2) => {}); // except this one that isn't defined
