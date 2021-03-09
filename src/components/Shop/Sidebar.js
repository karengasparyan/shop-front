import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Slider from "./SliderPrice";
import {
  getFilterListRequest,
  getProductsRequest,
  getSidebarTitlesRequest,
} from "../../store/actions/products";
import _ from "lodash";
import memoizeOne from "memoize-one";
import queryString from 'query-string';
import Utils from "../../helpers/Utils";
import { setPage } from "../../store/actions/reduxSetState";

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
    setPage(1);
    if (query) {
      this.setState({ search: query.s })
      this.props.getProductsRequest({...query, page: 1});
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
    if (params){
      // window.scrollTo(0, 150)
      let query = queryString.parse(window.location.search, { arrayFormat: 'comma' });
      this.props.getProductsRequest({ ...query, page: 1 });
    }
  }, _.isEqual)

  changeFilter = (key, value) => {

    let { history, setPage } = this.props;

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

    if (query) {
      delete query.price;
    }

    const str = queryString.stringify(query, { arrayFormat: 'comma' });

    history.replace('?' + str)

    setPage(1);
  }

  handleChange = (value) => {
    let { history, setPage } = this.props
    const [min, max] = value;
    let query = queryString.parse(window.location.search,);
    if (query) {
      query.min = min;
      query.max = max;
      history.replace('?' + queryString.stringify(query));
      setPage(1);
    }
  }

  inputChange = (ev, index) => {

    let { history, setPage } = this.props;
    let query = queryString.parse(window.location.search);

    if (index === 0) {
      query.min = +ev.target.value;
    } else {
      query.max = +ev.target.value;
    }
    history.replace('?' + queryString.stringify(query));
    setPage(1);
  }

  render() {
    const { attributeFilter, sidebarTitles, price, products } = this.props;

    let filter = [];
    if (!_.isEmpty(sidebarTitles)) {
      this.initTitles(sidebarTitles)
      filter = _.uniqBy(attributeFilter, 'attributeKey')
    }

    let query = queryString.parse(window.location.search, { arrayFormat: 'comma' });

    const { min = price[0], max = price[1] } = query;

    this.initProductsRequest(query)
    return (
      <div style={{ width: '100%' }} className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
        {Utils.filterArrayOrder(sidebarTitles, filter, products).map(f => <div key={f.id} className="filter-widget">
          <p className="fw-title">{f.attributeKey || ''}</p>
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
        <div className="filter-widget">
          <h4 className="fw-title">Цена</h4>
          <div className="filter-range-wrap">
            <Slider
              value={[min, max]}
              inputChange={(ev, i) => this.inputChange(ev, i)}
              onChange={this.handleChange} />
          </div>
          {/*<Link className="filter-btn">Фильтр</Link>*/}
        </div>
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
  price: state.products.price,
});
const mapDispatchToProps = {
  getFilterListRequest,
  getSidebarTitlesRequest,
  getProductsRequest,
  setPage,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Sidebar));

export default Container;
