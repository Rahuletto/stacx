import {
  Property,
  PropertyComposite,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from "grapesjs";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { Dropdown } from "flowbite-react";

import "react-dropdown/style.css";
import { PopoverPicker } from "./PopoverPicker";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property;
  hideLabel?: boolean;
}

export default function StylePropertyField({
  prop,
  hideLabel,
  ...rest
}: StylePropertyFieldProps) {
  const handleChange = (value: string) => {
    prop.setValue(value);
  };

  const onChange = (ev: any, value?: any) => {
    handleChange(value || value == "" ? value : ev.target.value);
  };

  const type = prop.getType();
  const defValue = prop.getDefaultValue();
  const canClear = prop.canClear();
  const hasValue = prop.hasValue();
  const value = prop.getValue();
  const valueString = hasValue ? value : "";
  const valueWithDef = hasValue ? value : defValue;

  let inputToRender = (
    <input
      placeholder={defValue}
      value={valueString}
      type="text"
      onChange={onChange}
    />
  );

  switch (type) {
    case "radio":
      {
        const radioProp = prop as PropertyRadio;
        inputToRender = (
          <fieldset className="radios">
            {radioProp.getOptions().map((option) => (
              <button
                onClick={(e) => onChange(e, radioProp.getOptionId(option))}
                className={
                  radioProp.getOptionId(option) == radioProp.getValue()
                    ? "active"
                    : ""
                }
                key={radioProp.getOptionId(option)}
                title={radioProp.getOptionLabel(option)}
              >
                {radioProp.getOptionLabel(option)}
              </button>
            ))}
          </fieldset>
        );
      }
      break;
    case "select":
      {
        const selectProp = prop as PropertySelect;
        console.log(selectProp.getOptions());
        inputToRender = (
          <Dropdown
            label={selectProp.getOptionLabel(valueWithDef)}
            value={selectProp.getOptionLabel(valueWithDef)}
          >
            {selectProp.getOptions().map((e) => (
              <Dropdown.Item
                className={
                  selectProp?.getOptionLabel(valueWithDef) == e.label ||
                  selectProp?.getOptionLabel(valueWithDef) == e.name ||
                  selectProp?.getOptionLabel(valueWithDef) == e.id
                    ? "active-drop"
                    : ""
                }
                onClick={() => onChange("select", e.id || e.value)}
                key={e.id || e.value}
                value={e.id || e.value || ""}
              >
                {e.label || e.name || e.id}
              </Dropdown.Item>
            ))}
          </Dropdown>
        );
      }
      break;
    case "color":
      {
        inputToRender = (
          <PopoverPicker
            color={valueString}
            onChange={(v: string) => handleChange(v)}
          />
        );
      }
      break;
    case "slider":
      {
        const sliderProp = prop as PropertySlider;
        inputToRender = (
          <input
            type="range"
            value={parseFloat(value)}
            min={sliderProp.getMin()}
            max={sliderProp.getMax()}
            step={sliderProp.getStep()}
            onChange={onChange}
          />
        );
      }
      break;
    case "composite":
      {
        const compositeProp = prop as PropertyComposite;
        const name = compositeProp.getName();
        const props = compositeProp.getProperties();
        if (props[0].getLabel().includes("Top"))
          inputToRender = (
            <div className={"box-composite"}>
              {name == "border-radius"
                ? [
                    props[0],
                    null,
                    props[1],
                    null,
                    null,
                    null,
                    props[3],
                    null,
                    props[2],
                  ].map((prop, i) =>
                    prop ? (
                      <StylePropertyField
                        key={prop.getId()}
                        prop={prop}
                        hideLabel={true}
                      />
                    ) : (
                      <span
                        key={i}
                        className={i == 4 ? "w-full center-block" : ""}
                      />
                    )
                  )
                : [
                    null,
                    props[0],
                    null,
                    props[3],
                    null,
                    props[1],
                    null,
                    props[2],
                    null,
                  ].map((prop, i) =>
                    prop ? (
                      <StylePropertyField
                        key={prop.getId()}
                        prop={prop}
                        hideLabel={true}
                      />
                    ) : (
                      <span
                        key={i}
                        className={i == 4 ? "w-full center-block" : ""}
                      />
                    )
                  )}
            </div>
          );
        else
          inputToRender = (
            <div className={"flex flex-wrap composite"}>
              {compositeProp.getProperties().map((prop) => (
                <StylePropertyField key={prop.getId()} prop={prop} />
              ))}
            </div>
          );
      }
      break;
    case "stack":
      {
        const stackProp = prop as PropertyStack;
        const layers = stackProp.getLayers();
        inputToRender = (
          <div className={"flex flex-col composite"}>
            {layers.map((layer) => (
              <div key={layer.getId()} className="stack-layer">
                <div className="flex gap- px-2 py-1 items-center">
                  <button className="flex-grow" onClick={() => layer.select()}>
                    {layer.getLabel()}
                  </button>
                  <div
                    style={layer.getStylePreview({
                      number: { min: -3, max: 3 },
                      camelCase: true,
                    })}
                  ></div>
                  <button onClick={() => layer.remove()}>
                    <FaTrash style={{ color: "var(--red)" }} />
                  </button>
                </div>
                {layer.isSelected() && (
                  <div className="p-2 flex flex-wrap">
                    {stackProp.getProperties().map((prop) => (
                      <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      break;
  }

  const label: string = prop.getLabel();

  return label == "Text shadow" ? (
    <></>
  ) : (
    <div
      {...rest}
      className={[
        "field-box",
        hideLabel ? "" : "mb-3 px-1",
        prop.isFull() ? "w-full" : "",
      ].join(" ")}
    >
      <div
        className={[
          hideLabel ? "" : "flex mb-2 items-center justify-between",
          canClear && "text-red-500",
        ].join(" ")}
      >
        <div className="name">{hideLabel ? "" : label}</div>
        {canClear && (
          <button onClick={() => prop.clear()}>
            <GrPowerReset />
          </button>
        )}
        {type === "stack" && (
          <button
            className="!ml-2"
            onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}
          >
            <FaPlus />
          </button>
        )}
      </div>
      {inputToRender}
    </div>
  );
}
