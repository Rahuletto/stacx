import { StylesResultProps } from '@grapesjs/react';
import StylePropertyField from '../Fields/StylePropertyField';

export default function StyleManager({ sectors }: StylesResultProps) {
    function handlePanel(e: any, str: string) {
        const panel = document.getElementById(str)
        if (panel) {
            (e.target as HTMLElement).classList.toggle("active");

            if (panel.style.maxHeight && panel.style.maxHeight !== '0px') {
                panel.style.maxHeight = '0px';
            } else {
                panel.style.maxHeight = "max-content";
            }

        }
    }

    return (<div id="style-manager">
        {sectors.map((sector) => (
            <div key={sector.getId()} id={sector.getId()} className='category'>
                <span className='accordion' onClick={(e) => handlePanel(e, sector.getId() + '-panel')}>{sector.getName()}</span>
                <div className={`flex flex-wrap panel`} id={sector.getId() + '-panel'}>
                    {sector.getProperties().map((prop) => (
                        <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                </div>
            </div>
        ))}
    </div>)
}