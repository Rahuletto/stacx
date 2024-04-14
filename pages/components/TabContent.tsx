import { BlocksProvider, LayersProvider, StylesProvider, useEditor } from "@grapesjs/react";
import { useEffect, useState } from "react";
import { FaPaintRoller, FaGear } from "react-icons/fa6";
import { BsLayersHalf, BsFillGrid1X2Fill } from "react-icons/bs";
import StyleManager from "./Managers/StyleManager";
import LayerManager from "./Managers/LayerManager";
import BlockManager from "./Managers/BlockManager";

const tabItems = [{
    id: 'style',
    i: 0,
    icon: FaPaintRoller
}, {
    id: 'layers',
    i: 1,
    icon: BsLayersHalf
}, {
    id: 'settings',
    i: 2,
    icon: FaGear
}, {
    id: 'add',
    i: 3,
    icon: BsFillGrid1X2Fill
}]

export default function Tabs({
    className
}: React.HTMLAttributes<HTMLDivElement>) {
    const [tab, setTab] = useState(0);


    return (
        <>
            <div className="tabbar">
                {tabItems.map((cmd, i) => (
                    <button
                        key={i}
                        id={cmd.id}
                        type="button"
                        className={
                            tab === cmd.i ? 'active' : ''
                        }
                        onClick={(e) =>
                            setTab(cmd.i)
                        }
                    >
                        <cmd.icon />
                    </button>
                ))}
            </div>

            {tab == 0 ?
                <>
                    <StylesProvider>
                        {(props) => <StyleManager {...props} />}
                    </StylesProvider>
                </>
                :
                tab == 1 ?
                    <>
                        <LayersProvider>
                            {(props) => <LayerManager {...props} />}
                        </LayersProvider>
                    </> : tab == 2 ? <></> : tab == 3 ? <BlocksProvider>
                        {(props) => <BlockManager {...props} />}
                    </BlocksProvider> : <></>
            }



        </>
    );
}
