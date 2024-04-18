import * as React from "react";
import { useEditor } from "@grapesjs/react";
import { type Trait } from "grapesjs";
import { PopoverPicker } from "./PopoverPicker";
import { Dropdown, Checkbox } from "flowbite-react";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  trait: Trait;
}

export default function TraitPropertyField({
  trait,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    trait.setValue(value);
  };

  const onChange = (ev: any, value?: any) => {
    handleChange(value || value == "" ? value : ev.target.value);
  };

  const handleButtonClick = () => {
    const command = trait.get("command");
    if (command) {
      typeof command === "string"
        ? editor.runCommand(command)
        : command(editor, trait);
    }
  };

  const type = trait.getType();
  const defValue = trait.getDefault() || trait.attributes.placeholder;
  const value = trait.getValue();
  const valueWithDef = typeof value !== "undefined" ? value : defValue;

  let inputToRender = (
    <input
      placeholder={defValue}
      value={value}
      type="text"
      onChange={onChange}
    />
  );

  switch (type) {
    case "select":
      {
        const traitProps = trait;

        inputToRender = (
          <Dropdown
            label={traitProps.attributes.name}
            value={traitProps.getOptionId(valueWithDef)}
          >
            {traitProps.getOptions() &&
              traitProps.getOptions().map((e) =>
                e.label || (e.name as string) || (e.value as string) || e.id ? (
                  <Dropdown.Item
                    className={
                      traitProps?.getOptionId(valueWithDef) == e?.label ||
                      traitProps?.getOptionId(valueWithDef) == e?.name ||
                      traitProps?.getOptionId(valueWithDef) == e?.id
                        ? "active-drop"
                        : ""
                    }
                    onClick={() => onChange("select", e.value)}
                    key={e.id}
                    value={e.id || (e.value as string) || ""}
                  >
                    {e.label ||
                      (e.name as string) ||
                      (e.value as string) ||
                      e.id}
                  </Dropdown.Item>
                ) : (
                  <></>
                )
              )}
          </Dropdown>
        );
      }
      break;
    case "color":
      {
        inputToRender = (
          <PopoverPicker
            color={value}
            onChange={(v: string) => handleChange(v)}
          />
        );
      }
      break;
    case "checkbox":
      {
        inputToRender = (
          <Checkbox
            checked={value}
            onChange={(ev) => trait.setValue(ev.target.checked)}
          />
        );
      }
      break;
    case "button":
      {
        inputToRender = (
          <button onClick={handleButtonClick}>{trait.getLabel()}</button>
        );
      }
      break;
  }

  return (
    <div {...rest} className="trait-box mb-3 px-1 w-full flex">
      <div className="capitalize">{trait.getLabel()}</div>
      {inputToRender}
    </div>
  );
}
