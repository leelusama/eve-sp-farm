import React from 'react';
import SPCalculatorForm from '../SPCalculatorForm';
import Eve from '../../constants';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      omegaClone: true,
      primaryAttribute: 32,
      secondaryAttribute: 26,
      largeSkillInjectorPrice: 736,
      skillExtractorPrice: 289,
      plexPrice: 2.609,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const fetchs = [];
    fetchs.push(
      fetch(
        `https://esi.evetech.net/latest/markets/${Eve.region['the forge']}/history/?datasource=tranquility&type_id=${Eve.type['large skill injector']}`
      )
        .then((response) => response.json())
        .then((data) => {
          const last = data.pop();
          if (last) {
            this.setState({
              largeSkillInjectorPrice: last.average / 1000000,
            });
          }
        })
    );
    fetchs.push(
      fetch(
        `https://esi.evetech.net/latest/markets/${Eve.region['the forge']}/history/?datasource=tranquility&type_id=${Eve.type['skill extractor']}`
      )
        .then((response) => response.json())
        .then((data) => {
          const last = data.pop();
          if (last) {
            this.setState({
              skillExtractorPrice: last.average / 1000000,
            });
          }
        })
    );

    fetchs.push(
      fetch(
        `https://esi.evetech.net/latest/markets/${Eve.region['the forge']}/history/?datasource=tranquility&type_id=${Eve.type['plex']}`
      )
        .then((response) => response.json())
        .then((data) => {
          const last = data.pop();
          if (last) {
            this.setState({
              plexPrice: last.average / 1000000,
            });
          }
        })
    );

    Promise.all(fetchs).catch(() =>
      this.setState({ error: 'Did not get some prices. Check manually.' })
    );
  }

  handleChange(e) {
    const { name, value, checked } = e.target;
    switch (name) {
      case 'omegaClone':
        this.setState({ omegaClone: checked });
        break;
      case 'primaryAttribute':
      case 'secondaryAttribute':
      case 'largeSkillInjectorPrice':
      case 'skillExtractorPrice':
      case 'plexPrice':
        this.setState({ [name]: Number(value) });
        break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  calculate() {
    const {
      omegaClone,
      primaryAttribute,
      secondaryAttribute,
      largeSkillInjectorPrice,
      skillExtractorPrice,
      plexPrice,
    } = this.state;

    const omegaMod = omegaClone ? 1 : 0.5;
    const spPerMinute =
      (primaryAttribute + secondaryAttribute * 0.5) * omegaMod;
    const spPerDay = spPerMinute * 60 * 24;
    const spPerMonth = spPerDay * 30;

    const injectorsPerMonth = spPerMonth / (500 * 1000);

    const benefit =
      (largeSkillInjectorPrice - skillExtractorPrice) * injectorsPerMonth -
      plexPrice * 500;

    return { spPerMinute, spPerDay, spPerMonth, benefit };
  }
  render() {
    const { omegaClone, primaryAttribute, secondaryAttribute } = this.state;
    const { spPerMinute, spPerDay, spPerMonth, benefit } = this.calculate();

    return (
      <div>
        <h1>App</h1>
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
        <p>SP/minute = {spPerMinute}</p>
        <p>SP/day = {spPerDay}</p>
        <p>SP/month = {spPerMonth}</p>
        <p>Benefit = {benefit.toFixed()}</p>
        <SPCalculatorForm
          omegaClone={omegaClone}
          primaryAttribute={primaryAttribute}
          secondaryAttribute={secondaryAttribute}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />

        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Prices (millions):</legend>
            <p>
              <label htmlFor='largeSkillInjectorPrice'>
                Large Skill Injector:
              </label>
              <input
                id='largeSkillInjectorPrice'
                type='number'
                name='largeSkillInjectorPrice'
                value={this.state.largeSkillInjectorPrice}
                onChange={this.handleChange}
              />
            </p>
            <p>
              <label htmlFor='skillExtractorPrice'>Skill Extractor:</label>
              <input
                id='skillExtractorPrice'
                type='number'
                name='skillExtractorPrice'
                value={this.state.skillExtractorPrice}
                onChange={this.handleChange}
              />
            </p>
            <p>
              <label htmlFor='plexPrice'>Plex:</label>
              <input
                id='plexPrice'
                type='number'
                name='plexPrice'
                value={this.state.plexPrice}
                onChange={this.handleChange}
              />
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default App;
