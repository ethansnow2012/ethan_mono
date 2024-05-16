type Listener = () => void;

let count: number = 0;
let text: string = 'text...';
const listeners: Set<Listener> = new Set();

function getState(): number {
  return count;
}

function setState(newCount: number, _text?:string): void {
  count = newCount;
  if(_text) {
    text = _text;
  }
  listeners.forEach(listener => listener());
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export { getState, setState, subscribe };