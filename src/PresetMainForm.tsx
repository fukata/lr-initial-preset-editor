import React, { ChangeEvent } from 'react';
import {Preset} from './Types'

interface Props {
  preset: Preset
  onChange: (preset: Preset, field: string, event: ChangeEvent<HTMLInputElement>) => any
}

export function PresetMainForm(props: Props) {
  const preset = props.preset;
  const onChange = props.onChange;
  return (
    <div>
      <div className="form-group">
        <label>UUID</label>
        <input type="text" className="form-control" value={preset.uuid} onChange={(e) => onChange(preset, 'uuid', e)} />
      </div>

      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" value={preset.name} onChange={(e) => onChange(preset, 'name', e)} placeholder="Name" />
      </div>

      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="supportsAmount" checked={preset.supportsAmount} onChange={(e) => onChange(preset, 'supportsAmount', e)} />
        <label className="form-check-label" htmlFor="supportsAmount">SupportsAmount</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="supportsColor" checked={preset.supportsColor} onChange={(e) => onChange(preset, 'supportsColor', e)} />
        <label className="form-check-label" htmlFor="supportsColor">SupportsColor</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="supportsMonochrome" checked={preset.supportsMonochrome} onChange={(e) => onChange(preset, 'supportsMonochrome', e)} />
        <label className="form-check-label" htmlFor="supportsMonochrome">SupportsMonochrome</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="supportsHighDynamicRange" checked={preset.supportsHighDynamicRange} onChange={(e) => onChange(preset, 'supportsHighDynamicRange', e)} />
        <label className="form-check-label" htmlFor="supportsHighDynamicRange">SupportsHighDynamicRange</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="supportsNormalDynamicRange" checked={preset.supportsNormalDynamicRange} onChange={(e) => onChange(preset, 'supportsNormalDynamicRange', e)} />
        <label className="form-check-label" htmlFor="supportsNormalDynamicRange">SupportsNormalDynamicRange</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="supportsSceneReferred" checked={preset.supportsSceneReferred} onChange={(e) => onChange(preset, 'supportsSceneReferred', e)} />
        <label className="form-check-label" htmlFor="supportsSceneReferred">SupportsSceneReferred</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="supportsOutputReferred" checked={preset.supportsOutputReferred} onChange={(e) => onChange(preset, 'supportsOutputReferred', e)} />
        <label className="form-check-label" htmlFor="supportsOutputReferred">SupportsOutputReferred</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="hasSettings" checked={preset.hasSettings} onChange={(e) => onChange(preset, 'hasSettings', e)} />
        <label className="form-check-label" htmlFor="hasSettings">HasSettings</label>
      </div>

      <div className="form-group">
        <label>Copyright</label>
        <input type="text" className="form-control" value={preset.copyright} onChange={(e) => onChange(preset, 'copyright', e)} placeholder="Copyright" />
      </div>
      <div className="form-group">
        <label>Contact Info</label>
        <input type="text" className="form-control" value={preset.contactInfo} onChange={(e) => onChange(preset, 'contactInfo', e)} placeholder="ContactInfo" />
      </div>
      <div className="form-group">
        <label>CameraModelRestriction</label>
        <input type="text" className="form-control" value={preset.cameraModelRestriction} onChange={(e) => onChange(preset, 'cameraModelRestriction', e)} placeholder="CameraModelRestriction" />
      </div>
      <div className="form-group">
        <label>Version</label>
        <input type="text" className="form-control" value={preset.version} onChange={(e) => onChange(preset, 'version', e)} placeholder="Version" />
      </div>
    </div>
  );
}