import React, {Component, Fragment} from 'react';
import InputRange from 'react-input-range';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {getPriceMinMaxRequest} from "../../store/actions/products";
import {connect} from "react-redux";


class SliderPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: [],
    };
  }

  componentDidMount() {
    this.props.getPriceMinMaxRequest()
  }

  handleChange = (ev) => {
    if (this.props.onChange) {
      this.props.onChange(ev);
    }
  }

  inputHandleChange = (ev,i) => {

    if (this.props.inputChange) {
      this.props.inputChange(ev,i);
    }
  }

  render() {
    const {price, value} = this.props;

    return (
      <Fragment>
        <div className="range-slider">
          <div className="price-input">
            {value.map((v,i) => <Fragment><span>₽ </span>
              <input
                onChange={(ev)=>this.inputHandleChange(ev,i)}
                value={v}
                type="number"
                name="price"
              /></Fragment>)}
          </div>
        </div>
        <Range
          onChange={this.handleChange}
          min={price[0]}
          max={price[1]}
          value={value}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  price: state.products.price,
});
const mapDispatchToProps = {
  getPriceMinMaxRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SliderPrice);

export default Container;