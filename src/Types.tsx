import {v4 as uuidv4} from 'uuid';

export interface Preset {
  name: string
  uuid: string
  presetType: string
  cluster: string
  supportsAmount: boolean
  supportsColor: boolean
  supportsMonochrome: boolean
  supportsHighDynamicRange: boolean
  supportsNormalDynamicRange: boolean
  supportsSceneReferred: boolean
  supportsOutputReferred: boolean
  cameraModelRestriction: string
  copyright: string
  contactInfo: string
  version: string
  luminanceSmoothing: string
  hasSettings: boolean
  isoDependents: ISODependent[]
}

export interface ISODependent {
  iso: string
  luminanceSmoothing: string
  colorNoiseReduction: string
  sharpenEdgeMasking: string
  colorNoiseReductionSmoothness: string
  blacks2012: string
  clarity2012: string
}

export function newPreset() {
  return {
    name: 'DefaultRaw',
    uuid: uuidv4().toString().replace(/-/g, '').toUpperCase(),
    presetType: 'Normal',
    cluster: '',
    supportsAmount: false,
    supportsColor: true,
    supportsMonochrome: true,
    supportsHighDynamicRange: true,
    supportsNormalDynamicRange: true,
    supportsSceneReferred: true,
    supportsOutputReferred: true,
    cameraModelRestriction: '',
    copyright: '',
    contactInfo: '',
    version: '13.0',
    luminanceSmoothing: '0',
    hasSettings: true,
    isoDependents: [
      newISODependent(),
    ],
  };
}

export function isISODependentProperty(value: string): value is (keyof ISODependent){
  return ISODependentKeys().includes(value);
}

export function ISODependentKeys() {
  return [
    'iso',
    'luminanceSmoothing',
    'colorNoiseReduction',
    'sharpenEdgeMasking',
    'colorNoiseReductionSmoothness',
    'blacks2012',
    'clarity2012',
  ]
}

export function ISODependentXMLKeys() {
  return [
    'ISO',
    'LuminanceSmoothing',
    'ColorNoiseReduction',
    'SharpenEdgeMasking',
    'ColorNoiseReductionSmoothness',
    'Blacks2012',
    'Clarity2012',
  ]
}

export function newISODependent() {
  return {
    iso: '',
    luminanceSmoothing: '',
    colorNoiseReduction: '',
    sharpenEdgeMasking: '',
    colorNoiseReductionSmoothness: '',
    blacks2012: '',
    clarity2012: '',
  }
}

export function sortISODependents(isoDependents: ISODependent[]) {
  return isoDependents.sort((a, b) => {
    if (a.iso > b.iso) return 1;
    if (b.iso > a.iso) return -1;
    return 0;
  });
}
