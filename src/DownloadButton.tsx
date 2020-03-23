import React from 'react';
import { Preset, ISODependentKeys, ISODependentXMLKeys, isISODependentProperty, sortISODependents } from './Types';
import xml from 'xml';

interface Props {
  preset: Preset
};

function download(preset: Preset, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  preset.isoDependents = sortISODependents(preset.isoDependents);
  let xmlData = {
    'x:xmpmeta': [
      {
        '_attr': {
          'xmlns:x': 'adobe:ns:meta/',
          'x:xmptk': 'Adobe XMP Core 5.6-c140 79.160451, 2017/05/06-01:08:21        ',
        },
      },
      {
        'rdf:RDF': [
          {
            '_attr': {
              'xmlns:rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
            }
          },
          {
            'rdf:Description': [
              {
                '_attr': {
                  'rdf:about': '',
                  'xmlns:crs': 'http://ns.adobe.com/camera-raw-settings/1.0/',
                  'crs:PresetType': preset.presetType,
                  'crs:Cluster': preset.cluster,
                  'crs:UUID': preset.uuid,
                  'crs:SupportsAmount': preset.supportsAmount ? 'True' : 'False',
                  'crs:SupportsColor': preset.supportsColor ? 'True' : 'False',
                  'crs:SupportsMonochrome': preset.supportsMonochrome ? 'True' : 'False',
                  'crs:SupportsHighDynamicRange': preset.supportsHighDynamicRange ? 'True' : 'False',
                  'crs:SupportsNormalDynamicRange': preset.supportsNormalDynamicRange ? 'True' : 'False',
                  'crs:SupportsSceneReferred': preset.supportsSceneReferred ? 'True' : 'False',
                  'crs:SupportsOutputReferred': preset.supportsOutputReferred ? 'True' : 'False',
                  'crs:CameraModelRestriction': preset.cameraModelRestriction,
                  'crs:Copyright': preset.copyright,
                  'crs:ContactInfo': preset.contactInfo,
                  'crs:Version': preset.version,
                  'crs:HasSettings': preset.hasSettings ? 'True' : 'False',
                }
              },
              {
                'crs:Name': [
                  {
                    'rdf:Alt': [
                      {
                        'rdf:li': [
                          { '_attr': {'xml:lang': 'x-default'} },
                          preset.name,
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            'crs:ISODependent': [
              {
                'rdf:Seq':
                  preset.isoDependents.filter(r => r.iso !== '').map(isoDependent => {
                    let h: any = {};
                    const keys = ISODependentKeys();
                    const xmlKeys = ISODependentXMLKeys();
                    for (let i=0; i<keys.length; i++) {
                      const key = keys[i];
                      const xmlKey = xmlKeys[i];
                      if (isISODependentProperty(key)) {
                        if (isoDependent[key] !== '') {
                          h[`crs:${xmlKey}`] = isoDependent[key];
                        }
                      }
                    }

                    return {
                      'rdf:li': [
                        {
                          '_attr': h
                        }
                      ]
                    }
                  })
              }
            ]
          }
        ]
      }
    ]
  };

  const xmlStr = xml(xmlData, {indent: '  '});

  const blob = new Blob([ xmlStr ], { "type" : "application/octet-stream" });
  const filename = `${preset.name}.xmp`
  if (window.navigator.msSaveBlob) {
    // for IE
    window.navigator.msSaveBlob(blob, filename);
  } else {
    e.currentTarget.download = filename;
    e.currentTarget.href = window.URL.createObjectURL(blob);
  }
}

export function DownloadButton(props: Props) {
  return (
    <a className="btn btn-primary" href="#" onClick={(e) => download(props.preset, e)}>Download</a>
  );
}