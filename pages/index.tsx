import Image from "next/image";
import { Inter } from "next/font/google";

import { useEffect } from "react";
import gjspresetwebpage from 'grapesjs-preset-webpage';
import gjsblockbasic from 'grapesjs-blocks-basic'
import plugin from 'grapesjs-style-bg';
import 'grapick/dist/grapick.min.css';

const inter = Inter({ subsets: ["latin"] });

import grapesjs, { Editor } from 'grapesjs';
import GjsEditor, { Canvas } from '@grapesjs/react';

const escapeName = (name: string) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-');

export default function DefaultEditor() {
  const onEditor = (editor: Editor) => {
    console.log('Editor loaded', { editor });
  };

  return (
    <main>
      <link href="https://unpkg.com/grapesjs-rte-extensions/dist/grapesjs-rte-extensions.min.css" rel="stylesheet" />

      <link href="https://unpkg.com/grapesjs-plugin-toolbox/dist/grapesjs-plugin-toolbox.min.css" rel="stylesheet" />
      <GjsEditor
        grapesjs={grapesjs}
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        plugins={[
          {
            id: 'grapesjs-tabs',
            src: 'https://unpkg.com/grapesjs-tabs'
          },
          {
            id: 'grapesjs-tailwind',
            src: 'https://unpkg.com/grapesjs-tailwind'
          },
          {
            id: 'grapesjs-script-editor',
            src: 'https://unpkg.com/grapesjs-script-editor'
          },
          {
            id: 'grapesjs-style-gpickr',
            src: 'https://unpkg.com/grapesjs-style-gpickr'
          },
          {
            id: 'grapesjs-ui-suggest-classes',
            src: 'https://unpkg.com/grapesjs-ui-suggest-classes'
          },
          {
            id: '@silexlabs/grapesjs-fonts',
            options: {
              api_key: 'AIzaSyD2qWk4zs9jAzAu5qH2z-Q4IJ5EbBGeJUE'
            },
            src: 'https://unpkg.com/@silexlabs/grapesjs-fonts'
          },
          {
            id: 'grapesjs-code-editor',
            src: 'https://unpkg.com/grapesjs-code-editor'
          },
          {
            id: 'grapesjs-rte-extensions',
            src: 'https://unpkg.com/grapesjs-rte-extensions'
          }
        ]}
        options={{
          height: '100vh',
          storageManager: false,
          selectorManager: { escapeName },
          plugins: [gjspresetwebpage, gjsblockbasic, plugin]
        }}
        onEditor={onEditor}
      >

      </GjsEditor>
    </main>
  );
}