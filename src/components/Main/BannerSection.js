import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getEquipmentRequest} from "../../store/actions/products";
import Preloader from "../../svg/preloader.svg";
import classNames from "classnames";
import LazyLoad from "react-lazyload";
import {withRouter} from "react-router-dom";

class BannerSection extends Component {

  componentDidMount() {
    const query = {s: 'секция комплектация'}
    this.props.getEquipmentRequest(query);
  }

  handleClick = (attr) => {
    this.props.history.push(`shop?комплектация=${attr}`)
  }

  render() {
    const {equipment} = this.props;

    if (!equipment) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }


    // let className = 'ol-lg-12';
    //
    // if (equipment.length === 2) {
    //   className = 'ol-lg-6'
    // } else if (equipment.length === 3) {
    //   className = 'ol-lg-4'
    // }

    const direction = process.env.REACT_APP_API_URL;

    return (
      <div className="banner-section container-fluid">
        <h4 className="compTitle" style={{margin: 0}}>ВЫБЕРИТЕ КОМПЛЕКТАЦИЮ</h4>
        <div className="banners">
          {equipment?.map(p => <div key={p.id} className="single-banner">
            <img src={`${direction}/productImage/${p.id}/${p?.images[0]?.path}`} alt={`image_${p.id}`}/>
            {p.attributes.filter(a => a.attributeKey === 'секция комплектация').map(a =>
              <div key={a.id} className="inner-text">
                <h4 onClick={() => this.handleClick(a.attributeValue)}>{a.attributeValue}</h4>
              </div>)}
          </div>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  equipment: state.products.equipment,
});
const mapDispatchToProps = {
  getEquipmentRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BannerSection));

export default Container;
