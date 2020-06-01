import React from 'react';
import SPCalculatorForm from '../SPCalculatorForm';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      omegaClone: true,
      primaryAttribute: 32,
      secondaryAttribute: 26,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value, checked } = e.target;
    switch (name) {
      case 'omegaClone':
        this.setState({ omegaClone: checked });
        break;
      case 'primaryAttribute':
      case 'secondaryAttribute':
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
    const { omegaClone, primaryAttribute, secondaryAttribute } = this.state;
    const omegaMod = omegaClone ? 1 : 0.5;
    const spPerMinute =
      (primaryAttribute + secondaryAttribute * 0.5) * omegaMod;
    const spPerDay = spPerMinute * 60 * 24;
    const spPerMonth = spPerDay * 30;

    return [spPerMinute, spPerDay, spPerMonth];
  }
  render() {
    const { omegaClone, primaryAttribute, secondaryAttribute } = this.state;
    const [spPerMinute, spPerDay, spPerMonth] = this.calculate();

    return (
      <div>
        <h1>App</h1>
        <SPCalculatorForm
          omegaClone={omegaClone}
          primaryAttribute={primaryAttribute}
          secondaryAttribute={secondaryAttribute}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <p>SP/minute = {spPerMinute}</p>
        <p>SP/day = {spPerDay}</p>
        <p>SP/month = {spPerMonth}</p>
      </div>
    );
  }
}

export default App;
