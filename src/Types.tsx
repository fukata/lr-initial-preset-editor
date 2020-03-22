
export interface ISODependent {
  iso: string
  luminanceSmoothing: string
  colorNoiseReduction: string
  sharpenEdgeMasking: string
  colorNoiseReductionSmoothness: string
  blacks2012: string
  clarity2012: string
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
