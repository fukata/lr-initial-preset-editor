import React, { ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Preset, ISODependent, newPreset, newISODependent, sortISODependents } from './Types';
import { PresetMainForm } from './PresetMainForm';
import { ISODependentForm } from './ISODependentForm';
import { DownloadButton } from './DownloadButton';

interface Props{
}

interface State {
  preset: Preset
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      preset: newPreset(),
    };

    this.addISODependent = this.addISODependent.bind(this);
    this.sortByISO = this.sortByISO.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeISODependentField = this.onChangeISODependentField.bind(this);
    this.onDeleteISODependent = this.onDeleteISODependent.bind(this);
  }

  componentDidMount() {
    this.restoreLocal();
  }

  saveLocal() {
    window.localStorage.setItem('current.preset', JSON.stringify(this.state.preset));
  }

  restoreLocal() {
    try {
      const saved = window.localStorage.getItem('current.preset');
      if (saved) {
        const restored = JSON.parse(saved);
        this.setState({preset: restored});
      }
    } catch(e) {
      console.log(e);
    }
  }

  addISODependent() {
    this.state.preset.isoDependents.push(newISODependent());
    this.setState({ preset: this.state.preset });
  }

  sortByISO() {
    const preset = this.state.preset;
    preset.isoDependents = sortISODependents(preset.isoDependents);
    this.setState({ preset: preset });
  }

  onChangeField(preset: Preset, field: string, e: ChangeEvent<HTMLInputElement>) {
    if (field === 'name') {
      preset.name = e.target.value;
    } else if (field === 'uuid') {
      preset.uuid = e.target.value;
    } else if (field === 'supportsAmount') {
      preset.supportsAmount = !preset.supportsAmount;
    } else if (field === 'supportsColor') {
      preset.supportsColor = !preset.supportsColor;
    } else if (field === 'supportsMonochrome') {
      preset.supportsMonochrome = !preset.supportsMonochrome;
    } else if (field === 'supportsHighDynamicRange') {
      preset.supportsHighDynamicRange = !preset.supportsHighDynamicRange;
    } else if (field === 'supportsNormalDynamicRange') {
      preset.supportsNormalDynamicRange = !preset.supportsNormalDynamicRange;
    } else if (field === 'supportsSceneReferred') {
      preset.supportsSceneReferred = !preset.supportsSceneReferred;
    } else if (field === 'supportsOutputReferred') {
      preset.supportsOutputReferred = !preset.supportsOutputReferred;
    } else if (field === 'cameraModelRestriction') {
      preset.cameraModelRestriction = e.target.value;
    } else if (field === 'copyright') {
      preset.copyright = e.target.value;
    } else if (field === 'contactInfo') {
      preset.contactInfo = e.target.value;
    } else if (field === 'version') {
      preset.version = e.target.value;
    } else if (field === 'luminanceSmoothing') {
      preset.luminanceSmoothing = e.target.value;
    } else if (field === 'hasSettings') {
      preset.hasSettings = !preset.hasSettings;
    } else {
      console.error(`onChangeField unknown field=${field}`);
    }

    this.setState({ preset: preset });
    this.saveLocal();
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
    this.saveLocal();
  }

  onDeleteISODependent(isoDependent: ISODependent, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const idx = this.state.preset.isoDependents.indexOf(isoDependent);
    if (idx > -1) {
      this.state.preset.isoDependents.splice(idx, 1);
      this.setState({ preset: this.state.preset });
    }
  }

  render() {

    let index = 0;
    const isoDependents = this.state.preset.isoDependents.map(isoDependent => {
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
                  <a href="https://helpx.kadobe.com/jp/lightroom-classic/help/raw-defaults.html" className="nav-link" target="_blank" rel="noopener noreferrer">
                    Raw 初期設定の調整
                  </a>
                </li>
                <li className="nav-item">
                  <a href="https://github.com/fukata/lr-preset-editor" className="nav-link" target="_blank" rel="noopener noreferrer">
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <main className="container">
          <div id="editor">
            <PresetMainForm preset={this.state.preset} onChange={this.onChangeField} />
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
            <DownloadButton preset={this.state.preset} />
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
