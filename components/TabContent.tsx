import {
  BlocksProvider,
  LayersProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from "@grapesjs/react";
import { useState } from "react";
import { FaPaintRoller, FaGear } from "react-icons/fa6";
import { BsLayersHalf, BsFillGrid1X2Fill } from "react-icons/bs";
import StyleManager from "./Managers/StyleManager";
import LayerManager from "./Managers/LayerManager";
import BlockManager from "./Managers/BlockManager";
import SelectorManager from "./Managers/SelectorManager";
import TraitManager from "./Managers/TraitManager";

const tabItems = [
  {
    id: "style",
    i: 0,
    icon: FaPaintRoller,
  },
  {
    id: "layers",
    i: 1,
    icon: BsLayersHalf,
  },
  {
    id: "settings",
    i: 2,
    icon: FaGear,
  },
  {
    id: "add",
    i: 3,
    icon: BsFillGrid1X2Fill,
  },
];

export default function Tabs({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [tab, setTab] = useState(3);

  return (
    <>
      <div className="tabbar">
        {tabItems.map((cmd, i) => (
          <button
            key={i}
            id={cmd.id}
            type="button"
            className={tab === cmd.i ? "active" : ""}
            onClick={(e) => setTab(cmd.i)}
          >
            <cmd.icon />
          </button>
        ))}
      </div>

      <div style={tab == 0 ? { display: "inherit" } : { display: "none" }}>
        <SelectorsProvider>
          {(props) => <SelectorManager {...props} />}
        </SelectorsProvider>
        <StylesProvider>
          {(props) => <StyleManager {...props} />}
        </StylesProvider>
      </div>

      <div style={tab == 1 ? { display: "inherit" } : { display: "none" }}>
        <LayersProvider>
          {(props) => <LayerManager {...props} />}
        </LayersProvider>
      </div>

      <div style={tab == 2 ? { display: "inherit" } : { display: "none" }}>
        <TraitsProvider>
          {(props) => <TraitManager {...props} />}
        </TraitsProvider>
      </div>
      
      <div style={tab == 3 ? { display: "inherit" } : { display: "none" }}>
        <BlocksProvider>
          {(props) => <BlockManager {...props} />}
        </BlocksProvider>
      </div>
    </>
  );
}
