import { SelectorsResultProps } from "@grapesjs/react";
import { FaPlus } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";

export default function SelectorManager({
  selectors,
  selectedState,
  states,
  targets,
  setState,
  addSelector,
  removeSelector,
}: Omit<SelectorsResultProps, "Container">) {
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    const keys = inputVal.split(" ");
    keys.pop();
    if (selectors.length !== keys.length) {
      selectors.forEach((e) => removeSelector(e));
      keys.forEach((e) => e && addSelector({ name: e, label: e }));
    }
  }, [inputVal]);

  const targetStr = targets.join(", ");

  useEffect(() => {
    setInputVal(selectors.join(" ").replaceAll(".", "") + " ");
  }, [targetStr]);

  return (
    <div id="selector-manager" className="p-2 flex flex-col gap-2 text-left">
      <div className="flex items-center">
        <p className="flex-grow">Selectors</p>
        <Dropdown label={selectedState || "Default"} value={selectedState}>
          {states.map((e) => (
            <Dropdown.Item
              className={selectedState == e.id.toString() ? "active-drop" : ""}
              onClick={() => setState(e.id.toString())}
              key={e.id}
              value={e.id}
            >
              {e.getName()}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      <div className="name">Class names</div>
      {selectors && targetStr ? (
        <input
          placeholder="Class name"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      ) : (
        <div className="opacity-70">Select a component</div>
      )}
      {selectors[0] && <div className="classbox">
        <div className="selectors">
          {selectors.map((selector) => (
            <div key={selector.toString()} className="selector-badge">
              <div>{selector.getLabel()}</div>
              <button type="button" onClick={() => removeSelector(selector)}>
                <CgClose />
              </button>
            </div>
          ))}
        </div>
      </div>}
      <hr />
    </div>
  );
}
