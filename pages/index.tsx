import { useState } from "react";
import gjsblockbasic from 'grapesjs-blocks-basic'
import plugin from 'grapesjs-style-bg';
import 'grapick/dist/grapick.min.css';

import { FaDesktop, FaTablet, FaMobile, FaLaptop } from 'react-icons/fa6'

import grapesjs, { Editor } from 'grapesjs';
import GjsEditor, { Canvas } from '@grapesjs/react';
import TopbarButtons from "../components/TopBarButtons";
import Tabs from "../components/TabContent";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

const escapeName = (name: string) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-');

export default function DefaultEditor() {
  const [editor, setEditor] = useState<Editor | null>(null)
  const [active, setActive] = useState('Desktop')

  const onEditor = (e: Editor) => {

    e.StyleManager.removeProperty('decorations', 'background-color')
    e.StyleManager.removeProperty('decorations', 'background')
    e.StyleManager.removeProperty('decorations', 'text-shadow')

    e.Panels.addPanel({
      id: "basic-actions",
      el: "add",
      buttons: [
        {
          id: "create-button",
          label: "Open font dialog",
          command(editor: any) {
            editor.runCommand("open-fonts");
          }
        }
      ]
    });

    e.StyleManager.addProperty('decorations', {
      name: 'Background Color',
      property: 'background',
      type: 'color',
      defaults: 'none',
    }, { at: 0 })

    setEditor(e)
    console.log('Editor loaded', { e });
  };

  function changeDevice(dev: 'Desktop' | 'Mobile portrait' | 'Tablet') {
    editor?.setDevice(dev)
    setActive(dev)
  }

  const [menu, setMenu] = useState(true)


  return (
    <main id="root">
      {editor && <div dangerouslySetInnerHTML={{ __html: editor.runCommand('get-fonts-html') }} />}
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
          height: '100vh', showOffsets: true,
          fromElement: true,
          storageManager: {
            type: "local",
            autosave: true,
            autoload: true,
            stepsBeforeSave: 1
          },
          selectorManager: { escapeName, componentFirst: true },
          plugins: [gjsblockbasic, plugin]
        }}

        onEditor={onEditor}
      >
        <div className="cont">
          {editor &&
            <div className="header">
            <span />
              <div className="buttons">
                <button className={active === 'Desktop' ? "active" : 'button'} onClick={() => changeDevice('Desktop')}>
                  <FaLaptop />
                </button>
                <button className={active === 'Tablet' ? "active" : 'button'} onClick={() => changeDevice('Tablet')}>
                  <FaTablet />
                </button>
                <button className={active === 'Mobile portrait' ? "active" : 'button'} onClick={() => changeDevice('Mobile portrait')}>
                  <FaMobile />
                </button>
              </div>

              <TopbarButtons>
                <button className={menu ? "active" : ""} onClick={() => setMenu((e) => !e)}><TbLayoutSidebarRightExpandFilled /></button>
              </TopbarButtons>
            </div>
          }

          <Canvas />
        </div>
        <div className={`props ${menu ? "active-menu" : ""}`}>
          {editor && <Tabs />}
        </div>
      </GjsEditor>
    </main>
  );
}