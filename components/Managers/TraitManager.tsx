import * as React from 'react';
import { TraitsResultProps } from '@grapesjs/react';
import TraitPropertyField from '@/components/Fields/TraitPropertyField';

export default function TraitManager({ traits }: Omit<TraitsResultProps, 'Container'>) {
    return (
      <div id="trait-manager" className="text-left mt-3 p-1">
        {
        !traits.length ?
            <div>No properties available</div>
        :
        traits.map(trait => (
            <TraitPropertyField key={trait.getId()} trait={trait}/>
        ))}
      </div>
    );
  }