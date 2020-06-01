import React from 'react';
import AttributeInput from './AttributeInput';

class SPCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      omegaClone: true,
      primaryAttribute: 17,
      secondaryAttribute: 17,
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
      <section>
        <h2>SPCalculator</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              id='omegaClone'
              type='checkbox'
              name='omegaClone'
              checked={omegaClone}
              onChange={this.handleChange}
            />
            <label htmlFor='omegaClone'>Omega Clone</label>
          </p>
          <p>
            <AttributeInput
              name='primaryAttribute'
              label='Primary Attribute'
              value={primaryAttribute}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <AttributeInput
              name='secondaryAttribute'
              label='Secondary Attribute'
              value={secondaryAttribute}
              onChange={this.handleChange}
            />
          </p>
          <span className='validity'></span>
          <p>
            <button type='submit'>Calculate</button>
          </p>
        </form>
        <p>SP/minute = {spPerMinute}</p>
        <p>SP/day = {spPerDay}</p>
        <p>SP/month = {spPerMonth}</p>
      </section>
    );
  }
}

export default SPCalculator;
