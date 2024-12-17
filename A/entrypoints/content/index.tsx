import { createRoot } from 'react-dom/client';
import '@/assets/css/index.css';
import App from './App';
import { StrictMode } from 'react';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  runAt: 'document_end',
  async main(ctx) {
    console.log('run A main');
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'inline',
      onMount: (uiContainer) => {
        console.log('run A onMount');
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
        console.log('run A unmount');
        root?.unmount();
      },
    });
    ui.mount();
  },
});
