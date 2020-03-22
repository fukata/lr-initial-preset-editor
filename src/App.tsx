import React, { ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ISODependent, newISODependent, ISODependentKeys, ISODependentXMLKeys, isISODependentProperty } from './Types';
import { ISODependentForm } from './ISODependentForm';

import {v4 as uuidv4} from 'uuid';
import xml from 'xml';

interface Props {
}

interface State {
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

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
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

    this.addISODependent = this.addISODependent.bind(this);
    this.sortByISO = this.sortByISO.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeISODependentField = this.onChangeISODependentField.bind(this);
    this.onDeleteISODependent = this.onDeleteISODependent.bind(this);
    this.downloadXMP = this.downloadXMP.bind(this);
  }

  addISODependent() {
    const isoDependents = this.state.isoDependents;
    isoDependents.push( newISODependent() );
    this.setState({
      isoDependents: isoDependents,
    })
  }

  sortISODependents() {
    return this.state.isoDependents.sort((a, b) => {
      if (a.iso > b.iso) return 1;
      if (b.iso > a.iso) return -1;
      return 0;
    });
  }

  sortByISO() {
    this.setState({ isoDependents: this.sortISODependents() })
  }

  onChangeField(field: string, e: ChangeEvent<HTMLInputElement>) {
    if (field === 'name') {
      this.setState({'name': e.target.value});
    } else if (field === 'uuid') {
      this.setState({'uuid': e.target.value});
    } else if (field === 'supportsAmount') {
      this.setState({'supportsAmount': !this.state.supportsAmount});
    } else if (field === 'supportsColor') {
      this.setState({'supportsColor': !this.state.supportsColor});
    } else if (field === 'supportsMonochrome') {
      this.setState({'supportsMonochrome': !this.state.supportsMonochrome});
    } else if (field === 'supportsHighDynamicRange') {
      this.setState({'supportsHighDynamicRange': !this.state.supportsHighDynamicRange});
    } else if (field === 'supportsNormalDynamicRange') {
      this.setState({'supportsNormalDynamicRange': !this.state.supportsNormalDynamicRange});
    } else if (field === 'supportsSceneReferred') {
      this.setState({'supportsSceneReferred': !this.state.supportsSceneReferred});
    } else if (field === 'supportsOutputReferred') {
      this.setState({'supportsOutputReferred': !this.state.supportsOutputReferred});
    } else if (field === 'cameraModelRestriction') {
      this.setState({'cameraModelRestriction': e.target.value});
    } else if (field === 'copyright') {
      this.setState({'copyright': e.target.value});
    } else if (field === 'contactInfo') {
      this.setState({'contactInfo': e.target.value});
    } else if (field === 'version') {
      this.setState({'version': e.target.value});
    } else if (field === 'luminanceSmoothing') {
      this.setState({'luminanceSmoothing': e.target.value});
    } else if (field === 'hasSettings') {
      this.setState({'hasSettings': !this.state.hasSettings});
    } else {
      console.error(`onChangeField unknown field=${field}`);
    }
  }

  onChangeISODependentField(isoDependent: ISODependent, field: string, e: ChangeEvent<HTMLInputElement>) {
    if (field === 'iso') {
      isoDependent.iso = e.target.value;
    } else if (field === 'luminanceSmoothing') {
      isoDependent.luminanceSmoothing = e.target.value;
    } else if (field === 'colorNoiseReduction') {
      isoDependent.colorNoiseReduction = e.target.value;
    } else if (field === 'sharpenEdgeMasking') {
      isoDependent.sharpenEdgeMasking = e.target.value;
    } else if (field === 'colorNoiseReductionSmoothness') {
      isoDependent.colorNoiseReductionSmoothness = e.target.value;
    } else if (field === 'blacks2012') {
      isoDependent.blacks2012 = e.target.value;
    } else if (field === 'clarity2012') {
      isoDependent.clarity2012 = e.target.value;
    } else {
      console.error(`onChangeISODependent unknown field=${field}`);
    }
    this.setState({});
  }

  onDeleteISODependent(isoDependent: ISODependent, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const idx = this.state.isoDependents.indexOf(isoDependent);
    if (idx > -1) {
      this.state.isoDependents.splice(idx, 1);
      this.setState({ isoDependents: this.state.isoDependents });
    }
  }

  downloadXMP(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
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
                    'crs:PresetType': this.state.presetType,
                    'crs:Cluster': this.state.cluster,
                    'crs:UUID': this.state.uuid,
                    'crs:SupportsAmount': this.state.supportsAmount ? 'True' : 'False',
                    'crs:SupportsColor': this.state.supportsColor ? 'True' : 'False',
                    'crs:SupportsMonochrome': this.state.supportsMonochrome ? 'True' : 'False',
                    'crs:SupportsHighDynamicRange': this.state.supportsHighDynamicRange ? 'True' : 'False',
                    'crs:SupportsNormalDynamicRange': this.state.supportsNormalDynamicRange ? 'True' : 'False',
                    'crs:SupportsSceneReferred': this.state.supportsSceneReferred ? 'True' : 'False',
                    'crs:SupportsOutputReferred': this.state.supportsOutputReferred ? 'True' : 'False',
                    'crs:CameraModelRestriction': this.state.cameraModelRestriction,
                    'crs:Copyright': this.state.copyright,
                    'crs:ContactInfo': this.state.contactInfo,
                    'crs:Version': this.state.version,
                    'crs:HasSettings': this.state.hasSettings ? 'True' : 'False',
                  }
                },
                {
                  'crs:Name': [
                    {
                      'rdf:Alt': [
                        {
                          'rdf:li': [
                            { '_attr': {'xml:lang': 'x-default'} },
                            this.state.name,
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
                    this.sortISODependents().filter(r => r.iso !== '').map(isoDependent => {
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
    console.log(xmlStr);

    const blob = new Blob([ xmlStr ], { "type" : "application/octet-stream" });
    const filename = `${this.state.name}.xmp`
    if (window.navigator.msSaveBlob) {
      // for IE
      window.navigator.msSaveBlob(blob, filename);
    } else {
      e.currentTarget.download = filename;
      e.currentTarget.href = window.URL.createObjectURL(blob);
    }

    this.setState({ isoDependents: this.sortISODependents() });
  }

  render() {

    let index = 0;
    const isoDependents = this.state.isoDependents.map(isoDependent => {
      return (
        <ISODependentForm isoDependent={isoDependent} onChange={this.onChangeISODependentField} onDelete={this.onDeleteISODependent} key={index++} />
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Lightroom Preset Editor</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a href="https://helpx.kadobe.com/jp/lightroom-classic/help/raw-defaults.html" target="_blank" rel="noopener noreferrer">
                    Raw 初期設定の調整
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <main className="container">
          <div id="editor">
            <div className="form-group">
              <label>UUID</label>
              <input type="text" className="form-control" value={this.state.uuid} onChange={(e) => this.onChangeField('uuid', e)} />
            </div>

            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.onChangeField('name', e)} placeholder="Name" />
            </div>

            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="supportsAmount" checked={this.state.supportsAmount} onChange={(e) => this.onChangeField('supportsAmount', e)} />
              <label className="form-check-label" htmlFor="supportsAmount">SupportsAmount</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="supportsColor" checked={this.state.supportsColor} onChange={(e) => this.onChangeField('supportsColor', e)} />
              <label className="form-check-label" htmlFor="supportsColor">SupportsColor</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="supportsMonochrome" checked={this.state.supportsMonochrome} onChange={(e) => this.onChangeField('supportsMonochrome', e)} />
              <label className="form-check-label" htmlFor="supportsMonochrome">SupportsMonochrome</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="supportsHighDynamicRange" checked={this.state.supportsHighDynamicRange} onChange={(e) => this.onChangeField('supportsHighDynamicRange', e)} />
              <label className="form-check-label" htmlFor="supportsHighDynamicRange">SupportsHighDynamicRange</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="supportsNormalDynamicRange" checked={this.state.supportsNormalDynamicRange} onChange={(e) => this.onChangeField('supportsNormalDynamicRange', e)} />
              <label className="form-check-label" htmlFor="supportsNormalDynamicRange">SupportsNormalDynamicRange</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="supportsSceneReferred" checked={this.state.supportsSceneReferred} onChange={(e) => this.onChangeField('supportsSceneReferred', e)} />
              <label className="form-check-label" htmlFor="supportsSceneReferred">SupportsSceneReferred</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="supportsOutputReferred" checked={this.state.supportsOutputReferred} onChange={(e) => this.onChangeField('supportsOutputReferred', e)} />
              <label className="form-check-label" htmlFor="supportsOutputReferred">SupportsOutputReferred</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="hasSettings" checked={this.state.hasSettings} onChange={(e) => this.onChangeField('hasSettings', e)} />
              <label className="form-check-label" htmlFor="hasSettings">HasSettings</label>
            </div>

            <div className="form-group">
              <label>Copyright</label>
              <input type="text" className="form-control" value={this.state.copyright} onChange={(e) => this.onChangeField('copyright', e)} placeholder="Copyright" />
            </div>
            <div className="form-group">
              <label>Contact Info</label>
              <input type="text" className="form-control" value={this.state.contactInfo} onChange={(e) => this.onChangeField('contactInfo', e)} placeholder="ContactInfo" />
            </div>
            <div className="form-group">
              <label>CameraModelRestriction</label>
              <input type="text" className="form-control" value={this.state.cameraModelRestriction} onChange={(e) => this.onChangeField('cameraModelRestriction', e)} placeholder="CameraModelRestriction" />
            </div>
            <div className="form-group">
              <label>Version</label>
              <input type="text" className="form-control" value={this.state.version} onChange={(e) => this.onChangeField('version', e)} placeholder="Version" />
            </div>

            <section className="iso-dependents-wrapper">
              <h2>ISO Dependent</h2>

              <div className="iso-dependents">
                { isoDependents }
              </div>
              <div className="buttons text-right">
                <button className="btn btn-warning" onClick={this.sortByISO}>Sort</button>
                <button className="btn btn-info" onClick={this.addISODependent}>Add</button>
              </div>
            </section>
          </div>

          <div className="footer">
            <a className="btn btn-primary" href="#" onClick={this.downloadXMP}>Download</a>
          </div>
        </main>

        <footer className="page-footer text-white bg-dark">
          <div className="container-fluid text-center text-md-left">
          </div>

          <div className="footer-copyright text-center py-3">
            © 2020 Copyright: <a href="https://fukata.dev/">fukata.dev</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
