import Main from './components/Main.svelte';
import { registerServiceWorker } from './config';

const app = new Main({
  target: document.body
});

registerServiceWorker();

export default app;
