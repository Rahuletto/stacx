import { useState, useEffect } from "react";
import plugin from "grapesjs-style-bg";
import "grapick/dist/grapick.min.css";

import { FaTablet, FaMobile, FaLaptop } from "react-icons/fa6";

import grapesjs, { Editor } from "grapesjs";
import forms from "grapesjs-plugin-forms";
import GjsEditor, { Canvas } from "@grapesjs/react";
import TopbarButtons from "../components/TopBarButtons";
import Tabs from "../components/TabContent";
import {
  TbClick,
  TbH1,
  TbH2,
  TbH3,
  TbLayoutSidebarRightExpandFilled,
  TbRectangleFilled,
  TbRectangleVerticalFilled,
} from "react-icons/tb";
import { renderToString } from "react-dom/server";
import { RiInputCursorMove } from "react-icons/ri";
import { PiColumnsFill, PiTextTBold } from "react-icons/pi";
import { BiLink } from "react-icons/bi";
import { IoImage } from "react-icons/io5";
import { BsBlockquoteLeft } from "react-icons/bs";

import { RxMargin } from "react-icons/rx";
import Head from "next/head";

const escapeName = (name: string) =>
  `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, "-");

export default function DefaultEditor() {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [active, setActive] = useState("Desktop");

  const [mode, setMode] = useState<"desktop" | "mobile" | "tablet">("desktop");

  useEffect(() => {
    setMode(device());

    function device() {
      const screenWidth = document.body.clientWidth;

      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipod|android|windows phone/g.test(userAgent);
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (screenWidth < 768 || isMobile) {
        return "mobile";
      } else if ((screenWidth >= 768 && screenWidth <= 1024) || isTablet) {
        return "tablet";
      } else {
        return "desktop";
      }
    }
    const handleResize = () => {
      const newDeviceType = device();
      if (mode != newDeviceType) setMode(newDeviceType);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mode]);

  const onEditor = (e: Editor) => {
    e.StyleManager.removeProperty("decorations", "background-color");
    e.StyleManager.removeProperty("decorations", "background");
    e.StyleManager.removeProperty("decorations", "text-shadow");

    e.Panels.addPanel({
      id: "basic-actions",
      el: "add",
      buttons: [
        {
          id: "create-button",
          label: "Open font dialog",
          command(editor: any) {
            editor.runCommand("open-fonts");
          },
        },
      ],
    });

    e.StyleManager.addProperty(
      "decorations",
      {
        name: "Background Color",
        property: "background",
        type: "color",
        defaults: "none",
      },
      { at: 0 }
    );

    setEditor(e);
    console.log("Editor loaded", { e });
  };

  function changeDevice(dev: "Desktop" | "Mobile portrait" | "Tablet") {
    editor?.setDevice(dev);
    setActive(dev);
  }

  const [menu, setMenu] = useState(true);

  return mode === "desktop" ? (
    <main id="root">
      <Head>
        <title>Stacx</title>

        <link rel="icon" href="/stacx.png" />
      </Head>
      {editor && (
        <div
          dangerouslySetInnerHTML={{
            __html: editor.runCommand("get-fonts-html"),
          }}
        />
      )}
      <link
        href="https://unpkg.com/grapesjs-rte-extensions/dist/grapesjs-rte-extensions.min.css"
        rel="stylesheet"
      />
      <link
        href="https://unpkg.com/grapesjs-plugin-toolbox/dist/grapesjs-plugin-toolbox.min.css"
        rel="stylesheet"
      />
      <script src="https://cdn.tailwindcss.com" async />
      <GjsEditor
        grapesjs={grapesjs}
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        plugins={[
          {
            id: "grapesjs-tabs",
            src: "https://unpkg.com/grapesjs-tabs",
          },
          {
            id: "grapesjs-style-easing",
            src: "https://unpkg.com/grapesjs-style-easing",
          },
          {
            id: "grapesjs-script-editor",
            src: "https://unpkg.com/grapesjs-script-editor",
          },
          {
            id: "grapesjs-ui-suggest-classes",
            src: "https://unpkg.com/grapesjs-ui-suggest-classes",
          },
          {
            id: "@silexlabs/grapesjs-fonts",
            options: {
              api_key: "AIzaSyD2qWk4zs9jAzAu5qH2z-Q4IJ5EbBGeJUE",
            },
            src: "https://unpkg.com/@silexlabs/grapesjs-fonts",
          },
          {
            id: "grapesjs-code-editor",
            src: "https://unpkg.com/grapesjs-code-editor",
          },
          {
            id: "grapesjs-rte-extensions",
            src: "https://unpkg.com/grapesjs-rte-extensions",
          },
        ]}
        options={{
          height: "100vh",
          showOffsets: true,
          fromElement: true,
          canvas: {
            scripts: ["https://cdn.tailwindcss.com"],
          },
          storageManager: {
            type: "local",
            autosave: true,
            autoload: true,
            stepsBeforeSave: 1,
          },
          layerManager: {
            sortable: true,
          },
          selectorManager: { escapeName, componentFirst: true },
          plugins: [plugin, forms],
          blockManager: {
            blocks: [
              {
                id: "heading1",
                label: "Heading 1",
                content:
                  "<h1>Heading</h1><style>h1 { font-size: 32px; font-weight: 700;}</style>",
                category: "Heading",
                media: renderToString(<TbH1 />),
              },
              {
                id: "heading2",
                label: "Heading 2",
                content:
                  "<h2>Heading</h2><style>h2 { font-size: 26px; font-weight: 600;}</style>",
                category: "Heading",
                media: renderToString(<TbH2 />),
              },
              {
                id: "heading3",
                label: "Heading 3",
                content:
                  "<h3>Heading</h3><style>h3 { font-size: 20px; font-weight: 500;}</style>",
                category: "Heading",
                media: renderToString(<TbH3 />),
              },
              {
                id: "input",
                label: "Input",
                content:
                  "<input></input><style>input { background: #f6f6f6; border: 1px solid #0e0e0e; }</style>",
                category: "Basic",
                media: renderToString(<RiInputCursorMove />),
              },
              {
                id: "text",
                label: "Text",
                content: "<p>Insert Text</p>",
                category: "Basic",
                media: renderToString(<PiTextTBold />),
              },
              {
                id: "space",
                label: "Space",
                content: "<br />",
                category: "Basic",
                media: renderToString(<RxMargin />),
              },
              {
                id: "link",
                label: "Link",
                content:
                  "<a href='#'>Link</a><style>a { color: var(--accent); }</style>",
                category: "Basic",
                media: renderToString(<BiLink />),
              },
              {
                id: "button",
                label: "Button",
                content:
                  "<button>Button</button><style>button { padding: 4px 8px; background: #efefef; }</style>",
                category: "Basic",
                media: renderToString(<TbClick />),
              },
              {
                id: "image",
                label: "Image",
                content: "<img src='' />",
                category: "Basic",
                media: renderToString(<IoImage />),
              },
              {
                id: "block",
                label: "Blockquote",
                content:
                  "<blockquote>Blockquote</blockquote><style>blockquote { background: #f6f6f6; border-left: 5px solid #efefef; padding: 6px 8px;}</style>",
                category: "Basic",
                media: renderToString(<BsBlockquoteLeft />),
              },

              {
                id: "col1",
                label: "Column 1",
                content: {
                  tagName: "div",
                  attributes: { class: "gjs-row" },
                  components: [
                    {
                      type: "cell",
                      tagName: "div",
                      attributes: { class: "gjs-cell" },
                    },
                    `<style>
                    .gjs-row{
                      display:flex;
                      justify-content:flex-start;
                      align-items:stretch;
                      flex-wrap:nowrap;
                      padding:10px;
                    }
                    .gjs-cell{
                      min-height:75px;
                      flex-grow:1;
                      flex-basis:100%;
                    }
                    @media (max-width: 768px){
                      .gjs-row{
                        flex-wrap:wrap;
                      }
                    }              
                    
                    </style>`,
                  ],
                },
                category: "Blocks",
                media: renderToString(<TbRectangleVerticalFilled />),
              },

              {
                id: "col2",
                label: "Column 2",
                content: {
                  tagName: "div",
                  attributes: { class: "gjs-row" },
                  components: [
                    {
                      type: "cell",
                      tagName: "div",
                      attributes: { class: "gjs-cell" },
                    },
                    {
                      type: "cell",
                      tagName: "div",
                      attributes: { class: "gjs-cell" },
                    },
                    `<style>
                    .gjs-row{
                      display:flex;
                      justify-content:flex-start;
                      align-items:stretch;
                      flex-wrap:nowrap;
                      padding:10px;
                    }
                    .gjs-cell{
                      min-height:75px;
                      flex-grow:1;
                      flex-basis:100%;
                    }
                    @media (max-width: 768px){
                      .gjs-row{
                        flex-wrap:wrap;
                      }
                    }              
                    
                    </style>`,
                  ],
                },
                category: "Blocks",
                media: renderToString(<PiColumnsFill />),
              },

              {
                id: "cell",
                label: "Cell",
                content: {
                  tagName: "div",
                  attributes: { class: "gjs-cell" },
                  components: [
                    `<style>
                    .gjs-cell{
                      min-height:75px;
                      flex-grow:1;
                      flex-basis:100%;
                    }
                    </style>`,
                  ],
                },
                category: "Blocks",
                media: renderToString(<TbRectangleFilled />),
              },
            ],
          },
        }}
        onEditor={onEditor}
      >
        <div className="cont">
          {editor && (
            <div className="header">
              <span />
              <div className="buttons">
                <button
                  className={active === "Desktop" ? "active" : "button"}
                  onClick={() => changeDevice("Desktop")}
                >
                  <FaLaptop />
                </button>
                <button
                  className={active === "Tablet" ? "active" : "button"}
                  onClick={() => changeDevice("Tablet")}
                >
                  <FaTablet />
                </button>
                <button
                  className={active === "Mobile portrait" ? "active" : "button"}
                  onClick={() => changeDevice("Mobile portrait")}
                >
                  <FaMobile />
                </button>
              </div>

              <TopbarButtons>
                <button
                  className={menu ? "active" : ""}
                  onClick={() => setMenu((e) => !e)}
                >
                  <TbLayoutSidebarRightExpandFilled />
                </button>
              </TopbarButtons>
            </div>
          )}

          <Canvas />
        </div>
        <div className={`props ${menu ? "active-menu" : ""}`}>
          {editor && <Tabs />}
        </div>
      </GjsEditor>
    </main>
  ) : (
    <main
      style={{ display: "flex", justifyItems: "center", alignItems: "center", height: '100vh' }}
      id="root"
    >
      <h1 style={{ color: "#FFF", fontSize: 24, textAlign: "center", fontWeight: 700 }}>
        Oops. This only works in desktop at the moment.
      </h1>
    </main>
  );
}
