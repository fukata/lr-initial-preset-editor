import React, { ChangeEvent } from 'react';
import { ISODependent } from './Types';

interface Props {
  isoDependent: ISODependent
  onChange: (isoDependent: ISODependent, field: string, event: ChangeEvent<HTMLInputElement>) => any
  onDelete: (isoDependent: ISODependent, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}

export function ISODependentForm(props: Props) {
  const isoDependent = props.isoDependent;
  return (
    <div className="iso-dependent">
      <div className="row">
        <div className="form-group col-md-3">
          <label>ISO</label>
          <input type="number" min="0" className="form-control" value={isoDependent.iso} onChange={(e) => props.onChange(isoDependent, 'iso', e)} />
        </div>
        <div className="form-group col-md-3">
          <label>LuminanceSmoothing</label>
          <input type="number" className="form-control" value={isoDependent.luminanceSmoothing} onChange={(e) => props.onChange(isoDependent, 'luminanceSmoothing', e)} />
        </div>
        <div className="form-group col-md-3">
          <label>ColorNoiseReduction</label>
          <input type="number" className="form-control" value={isoDependent.colorNoiseReduction} onChange={(e) => props.onChange(isoDependent, 'colorNoiseReduction', e)} />
        </div>
        <div className="form-group col-md-3">
          <label>SharpenEdgeMasking</label>
          <input type="number" className="form-control" value={isoDependent.sharpenEdgeMasking} onChange={(e) => props.onChange(isoDependent, 'sharpenEdgeMasking', e)} />
        </div>
        <div className="form-group col-md-3">
          <label>ColorNoiseReductionSmoothness</label>
          <input type="number" className="form-control" value={isoDependent.colorNoiseReductionSmoothness} onChange={(e) => props.onChange(isoDependent, 'colorNoiseReductionSmoothness', e)} />
        </div>
        <div className="form-group col-md-3">
          <label>Blacks2012</label>
          <input type="number" className="form-control" value={isoDependent.blacks2012} onChange={(e) => props.onChange(isoDependent, 'blacks2012', e)} />
        </div>
        <div className="form-group col-md-3">
          <label>Clarity2012</label>
          <input type="number" className="form-control" value={isoDependent.clarity2012} onChange={(e) => props.onChange(isoDependent, 'clarity2012', e)} />
        </div>
      </div>

      <div className="text-right">
        <button className="btn btn-danger" onClick={(e) => props.onDelete(isoDependent, e)}>DELETE</button>
      </div>
    </div>
  );
}