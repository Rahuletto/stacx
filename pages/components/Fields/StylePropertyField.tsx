
import { Property, PropertyComposite, PropertyRadio, PropertySelect, PropertySlider, PropertyStack } from "grapesjs";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import Dropdown, { Option } from "react-dropdown";

import "react-dropdown/style.css";
import { PopoverPicker } from "./PopoverPicker";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
    prop: Property;
}

export default function StylePropertyField({
    prop,
    ...rest
}: StylePropertyFieldProps) {
    const handleChange = (value: string) => {
        prop.setValue(value.toLowerCase());
    };

    const onChange = (ev: any, value?: any) => {
        handleChange(value || value == '' ? value : ev.target.value);
    };


    const type = prop.getType();
    const defValue = prop.getDefaultValue();
    const canClear = prop.canClear();
    const hasValue = prop.hasValue();
    const value = prop.getValue();
    const valueString = hasValue ? value : '';
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
        case 'radio':
            {
                const radioProp = prop as PropertyRadio;
                inputToRender = (
                    <fieldset className="radios">
                        {radioProp.getOptions().map((option) => (
                            <button
                                onClick={(e) => onChange(e, radioProp.getOptionId(option))}
                                className={radioProp.getOptionId(option) == radioProp.getValue() ? "active" : ""}
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
        case 'select':
            {
                const selectProp = prop as PropertySelect;
                const options: Option[] = []
                selectProp.getOptions().map(e => {
                    options.push({ label: e.label || e.name|| e.id, value: e.id || e.value || '' })
                })
                console.log(selectProp.getOptions())
                inputToRender = (
                    <Dropdown
                        options={options}
                        value={selectProp.getOptionLabel(valueWithDef)}
                        onChange={(values) => onChange(values, values.value)}
                    />

                );
            }
            break;
        case 'color':
            {
                inputToRender = (
                    <PopoverPicker color={valueString} onChange={(v: string) => handleChange(v)} />
                );
            }
            break;
        case 'slider':
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
        case 'composite':
            {
                const compositeProp = prop as PropertyComposite;
                inputToRender = (
                    <div
                        className={'flex flex-wrap composite'}
                    >
                        {compositeProp.getProperties().map((prop) => (
                            <StylePropertyField key={prop.getId()} prop={prop} />
                        ))}
                    </div>
                );
            }
            break;
        case 'stack':
            {
                const stackProp = prop as PropertyStack;
                const layers = stackProp.getLayers();
                inputToRender = (

                    <div
                        className={
                            'flex flex-col composite'
                        }
                    >
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
                                    >
                                    </div>
                                    <button onClick={() => layer.remove()}>
                                        <FaTrash style={{color: 'var(--red)'}} />
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

    return (
        prop.getLabel() == 'Text shadow' ? <></> :
            <div
                {...rest}
                className={['mb-3 px-1', prop.isFull() ? 'w-full' : ''].join(' ')}
            >
                <div className={['flex mb-2 items-center justify-between', canClear && 'text-red-500'].join(' ')}>
                    <div className="name">{prop.getLabel()}</div>
                    {canClear && (
                        <button onClick={() => prop.clear()}>
                            <GrPowerReset />
                        </button>
                    )}
                    {type === 'stack' && (
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