import * as React from 'react';
import { useEditor } from '@grapesjs/react';

import type { Component } from 'grapesjs';
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';

import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa6';

export declare interface LayerItemProps
    extends React.HTMLProps<HTMLDivElement> {
    component: Component;
    level: number;
    draggingCmp?: Component;
    dragParent?: Component;
}

const itemStyle = { maxWidth: `100%` };

export default function LayerItem({
    component,
    draggingCmp,
    dragParent,
    ...props
}: LayerItemProps) {
    const editor = useEditor();
    const { Layers } = editor;
    const layerRef = useRef<HTMLDivElement>(null);
    const [layerData, setLayerData] = useState(Layers.getLayerData(component));
    const { open, selected, hovered, components, visible, name } = layerData;
    const componentsIds = components.map((cmp) => cmp.getId());
    const isDragging = draggingCmp === component;
    const cmpHash = componentsIds.join('-');
    const level = props.level + 1;
    const isHovered = hovered || dragParent === component;

    useEffect(() => {
        level === 0 && setLayerData(Layers.getLayerData(component));
        if (layerRef.current) {
            (layerRef.current as any).__cmp = component;
        }
    }, [component]);

    useEffect(() => {
        const up = (cmp: Component) => {
            cmp === component && setLayerData(Layers.getLayerData(cmp));
        };
        const ev = Layers.events.component;
        editor.on(ev, up);

        return () => {
            editor.off(ev, up);
        };
    }, [editor, Layers, component]);

    const cmpToRender = useMemo(() => {
        return components.map((cmp) => (
            <LayerItem
                key={cmp.getId()}
                component={cmp}
                level={level}
                draggingCmp={draggingCmp}
                dragParent={dragParent}
            />
        ));
    }, [cmpHash, draggingCmp, dragParent]);

    const toggleOpen = (ev: MouseEvent) => {
        ev.stopPropagation();
        Layers.setLayerData(component, { open: !open });
    };

    const toggleVisibility = (ev: MouseEvent) => {
        ev.stopPropagation();
        Layers.setLayerData(component, { visible: !visible });
    };

    const select = (event: MouseEvent) => {
        event.stopPropagation();
        Layers.setLayerData(component, { selected: true }, { event });
    };

    const hover = (hovered: boolean) => {
        if (!hovered || !draggingCmp) {
            Layers.setLayerData(component, { hovered });
        }
    };

    const wrapperCls = [
        `layer-item rounded-none flex flex-col ml-[${level * 18}px] border-l-2`,
        (!visible || isDragging) && 'opacity-60'
    ].join(' ')

    return (
        <div className={wrapperCls}>
            <div
                onClick={select}
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
                className="group max-w-full"
                data-layer-item
                ref={layerRef}
            >
                <div
                    className={[
                        'layer flex items-center gap-1',
                        isHovered && 'layer-item-hover',
                        selected && 'layer-item-select'
                    ].join(' ')}                >
                    <div
                        style={{ marginLeft: `${level * 2}px` }}
                        className={[
                            'cursor-pointer',
                            !components.length && 'pointer-events-none hidden'
                        ].join(' ')}
                        onClick={toggleOpen}
                    >
                        <FaAngleDown />
                    </div>
                    <div className="truncate flex-grow" style={itemStyle}>
                        {name}
                    </div>
                    <div
                        className={[
                            'group-hover:opacity-100 cursor-pointer',
                            visible ? 'opacity-0' : 'opacity-100'
                        ].join(' ')}
                        onClick={toggleVisibility}
                    >
                        {visible ? <BsEyeFill /> : <BsEyeSlash />}
                    </div>
                </div>
            </div>
            {!!(open && components.length) && (
                <div className={['max-w-full', !open && 'hidden'].join(' ')}>{cmpToRender}</div>
            )}
        </div>
    );
}
