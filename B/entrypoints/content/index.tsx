import { createRoot } from 'react-dom/client';
import '@/assets/css/index.css';
import App from './App';
import { StrictMode } from 'react';

export default defineContentScript({
  matches: ['<all_urls>'],
  async main(ctx) {
    console.log('run B main');
    const ui = await createIntegratedUi(ctx, {
      position: 'inline',
      onMount: (uiContainer) => {
        console.log('run B onMount');
        const app = document.createElement('div');
        uiContainer.append(app);
        const root = createRoot(app);
        root.render(
          <StrictMode>
            <App></App>
          </StrictMode>,
        );
        return root;
      },
      onRemove: (root) => {
        console.log('run B unmount');
        root?.unmount();
      },
    });
    ui.mount();
  },
});
