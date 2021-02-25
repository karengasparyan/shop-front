import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import Slider from "./SliderPrice";
import {
  getFilterListRequest,
  getProductsRequest,
  getSidebarTitlesRequest,
} from "../../store/actions/products";
import _ from "lodash";
import memoizeOne from "memoize-one";
import queryString from 'query-string';
import {object} from "prop-types";

class Sidebar extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
      search: '',
      value: [0, 0],
    }
  }

  componentDidMount() {
    let query = queryString.parse(window.location.search, { arrayFormat: 'comma' });
    if (query) {
      this.setState({ search: query.s })
      this.props.getProductsRequest(query);
    }
    this.props.getSidebarTitlesRequest();
  }

  initTitles = memoizeOne((title) => {
    if (title) {
      let titlesArray = [];
      title.map(t => titlesArray.push(t.title))
      this.props.getFilterListRequest(titlesArray)
    }
  }, _.isEqual)

  initProductsRequest = memoizeOne((params) => {
    window.scrollTo(0, 150)
    let query = queryString.parse(window.location.search, { arrayFormat: 'comma' });
    if (_.isEmpty(params)) {
      this.props.getProductsRequest(query);
    }
  }, _.isEqual)

  changeFilter = (key, value) => {

    let { history } = this.props;

    let query = queryString.parse(window.location.search, { arrayFormat: 'comma' });

    if (!query[key]) {
      query[key] = [];
    }
    query[key] = _.isArray(query[key]) ? query[key] : [query[key]]

    const i = query[key].indexOf(value)
    if (i > -1) {
      query[key].splice(i, 1)
    } else {
      query[key].push(value)
    }

    if (query){
      delete query.price;
    }

    const str = queryString.stringify(query, { arrayFormat: 'comma' });

    history.replace('?' + str)

    this.props.getProductsRequest(query)

  }

  handleChange = (value) => {
    let { history } = this.props

    let query = queryString.parse(window.location.search, );
    if (query) {
      query.price = value;
      history.replace('?' + queryString.stringify(query, ))
      this.props.getProductsRequest(query)
      this.setState({ value })
    }
  }

  inputChange = (ev, index) => {
    let { value } = this.state;
    let { history } = this.props;
    for (let i = 0; i < value.length; i++) {
      if (+ev.target.value !== -1) {
        value[index] = +ev.target.value;
      }
    }
    let query = queryString.parse(window.location.search);
    if (query) {
      query.price = value;
      history.replace('?' + queryString.stringify(query))
    }

    this.props.getProductsRequest(query)

    this.setState({ value })
  }

  render() {
    const { attributeFilter, sidebarTitles, products } = this.props;
    const { value } = this.state;
    let filter = [];
    if (!_.isEmpty(sidebarTitles)) {
      this.initTitles(sidebarTitles)
      filter = _.uniqBy(attributeFilter, 'attributeKey')
    }

    let query = queryString.parse(window.location.search, { arrayFormat: 'comma' });

    const { s, price, ...a } = query;

    this.initProductsRequest(a)

    // console.log(filter.map(f=> f.name === sidebarTitles)sidebarTitles)

    console.log(sidebarTitles)
    console.log(filter)

    return (
      <div style={{width:'100%'}} className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
        <div className="filter-widget">
          <h4 className="fw-title">Цена</h4>
          <div className="filter-range-wrap">
            <Slider value={value} inputChange={(ev, i) => this.inputChange(ev, i)} onChange={this.handleChange} />
          </div>
          {/*<Link className="filter-btn">Фильтр</Link>*/}
        </div>
        {(filter).map(f => <div key={f.id} className="filter-widget">
          <h4 className="fw-title">{f.attributeKey || ''}</h4>
          <ul className="filter-catagories">
            {(attributeFilter.filter(a => a.attributeKey === f.attributeKey) || []).map(c =>
              <li key={c.id}>
                <div className="fw-brand-check">
                  <div className="bc-item">
                    <label htmlFor={`c_${c.id}`}>
                      {c.attributeValue}
                      <input
                        onChange={() => this.changeFilter(c.attributeKey, c.attributeValue)}
                        type="checkbox"
                        id={`c_${c.id}`}
                        checked={_.isArray(query[c.attributeKey]) ? query[c.attributeKey]?.includes(c.attributeValue) : query[c.attributeKey] === c.attributeValue}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
              </li>)}
          </ul>
        </div>)}
        {/*<div className="filter-widget">*/}
        {/*  <h4 className="fw-title">{filter[1]?.attributeKey || ''}</h4>*/}
        {/*  <div className="fw-brand-check">*/}
        {/*    {(attributeFilter.filter(a => a.attributeKey === filter[1]?.attributeKey) || []).map(c => <div className="bc-item">*/}
        {/*      <label htmlFor={`c_${c.id}`}>*/}
        {/*        {c.attributeValue}*/}
        {/*        <input type="checkbox" id={`c_${c.id}`}/>*/}
        {/*        <span className="checkmark"/>*/}
        {/*      </label>*/}
        {/*    </div>)}*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="filter-widget">*/}
        {/*  <h4 className="fw-title">Цена</h4>*/}
        {/*  <div className="filter-range-wrap">*/}
        {/*    <Slider/>*/}
        {/*  </div>*/}
        {/*  <a href="#" className="filter-btn">Фильтр</a>*/}
        {/*</div>*/}
        {/*<div className="filter-widget">*/}
        {/*  <h4 className="fw-title">{filter[2]?.attributeKey || ''}</h4>*/}
        {/*  <div className="fw-brand-check">*/}
        {/*    {(attributeFilter.filter(a => a.attributeKey === filter[2]?.attributeKey) || []).map(c => <div className="bc-item">*/}
        {/*      <label htmlFor={`c_${c.id}`}>*/}
        {/*        {c.attributeValue}*/}
        {/*        <input type="checkbox" id={`c_${c.id}`}/>*/}
        {/*        <span className="checkmark"/>*/}
        {/*      </label>*/}
        {/*    </div>)}*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="filter-widget">*/}
        {/*  <h4 className="fw-title">{filter[3]?.attributeKey || ''}</h4>*/}
        {/*  <div className="fw-brand-check">*/}
        {/*    {(attributeFilter.filter(a => a.attributeKey === filter[3]?.attributeKey) || []).map(c => <div className="bc-item">*/}
        {/*      <label htmlFor={`c_${c.id}`}>*/}
        {/*        {c.attributeValue}*/}
        {/*        <input type="checkbox" id={`c_${c.id}`}/>*/}
        {/*        <span className="checkmark"/>*/}
        {/*      </label>*/}
        {/*    </div>)}*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="filter-widget">*/}
        {/*  <h4 className="fw-title">{filter[4]?.attributeKey || ''}</h4>*/}
        {/*  <div className="fw-brand-check">*/}
        {/*    {(attributeFilter.filter(a => a.attributeKey === filter[4]?.attributeKey) || []).map(c => <div className="bc-item">*/}
        {/*      <label htmlFor={`c_${c.id}`}>*/}
        {/*        {c.attributeValue}*/}
        {/*        <input type="checkbox" id={`c_${c.id}`}/>*/}
        {/*        <span className="checkmark"/>*/}
        {/*      </label>*/}
        {/*    </div>)}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  attributeFilter: state.products.attributeFilter,
  sidebarTitles: state.products.sidebarTitles,
  products: state.products.products,
});
const mapDispatchToProps = {
  getFilterListRequest,
  getSidebarTitlesRequest,
  getProductsRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Sidebar));

export default Container;
