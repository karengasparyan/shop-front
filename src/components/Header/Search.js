import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import 'react-pro-sidebar/dist/css/styles.css';
import {getProductsRequest, getSidebarTitlesRequest} from "../../store/actions/products";
import Preloader from "../../svg/preloader2.svg"
import {AnimateGroup} from "react-animation";
import _ from "lodash";
import {Link, withRouter} from "react-router-dom";
import queryString from 'query-string';
import Utils from "../../helpers/Utils";

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      showSearch: false,
      page: 1,
      attributes: [],
    }
    this.searchListRef = React.createRef();
  }

  componentDidMount() {
    let query = queryString.parse(window.location.search, {arrayFormat: 'comma'});
    if (query) {
      this.setState({search: query.s})
      this.props.getProductsRequest(query);
    }
    this.props.getSidebarTitlesRequest();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (event.target.className !== 'searchLists') {
      this.setState({showSearch: false})
    }
  }

  showSearch = () => {
    const {search} = this.state;
    let query = {}
    if (search) {
      query.s = search
      this.props.getProductsRequest(query);
    }
    this.setState({showSearch: true})
  }

  onChangeSearch = (ev) => {
    const {value} = ev.target;
    const {history} = this.props;

    let query = queryString.parse(window.location.search);

    if (value === '') {
      this.setState({page: 1})
    }

    if (query) {
      query.s = value;
      delete query.page;
      delete query.price;
      history.replace(`?${queryString.stringify(query)}`);
      this.setState({search: query.s});
    }
    this.props.getProductsRequest(query);
  }

  changeRequest = () => {
    return
    const {current} = this.searchListRef
    let {search, page} = this.state
    const {productCount, history} = this.props
    let query = queryString.parse(window.location.search);

    if (current?.offsetHeight + current?.scrollTop >= current?.scrollHeight - 100) {
      if (+page < +productCount) {
        page++;
        this.setState({page})

        query.s = search;

        history.replace(`?${queryString.stringify({...query, page})}`)
        this.props.getProductsRequest(query)
      }
    }
  }

  render() {
    const {products, productsRequestStatus, match: {path}} = this.props;
    let {showSearch} = this.state;
    let query = queryString.parse(window.location.search);
    if (!products) {
      return <img src={Preloader} width="40px" height="40px"/>;
    }

    const direction = process.env.REACT_APP_API_URL;

    return (
      <div
        className="col-lg-5 col-md-7 searchContainer">
        <div className="advanced-search">
          {/*<div className="category-btn">КАТЕГОРИИ</div>*/}
          <div className="input-group">
            <input
              type="text"
              placeholder="Что вам нужно?"
              value={query.s}
              onChange={this.onChangeSearch}
              onClick={this.showSearch}
            />
            {/*<button type="button"><i className="ti-search"/></button>*/}
          </div>
        </div>
        <AnimateGroup durationIn={200} animation="bounce">
          {showSearch && path !== '/shop' &&
          <ul onScroll={this.changeRequest} ref={this.searchListRef} className="searchLists">
            <AnimateGroup durationIn={200} animation="bounce">
              {_.isEmpty(products) ? <p>Поиск не дал результатов</p> :
                products.map(p => <li key={p.id}>
                  <Link to={`/product/${p.id}`} style={{display: 'flex'}}>
                    <img
                      width={100}
                      height={100}
                      src={`${direction}/productImage/${p.id}/${p.images[0].path}`}
                      alt={`image_${p.id}`}/>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                      <span>{Utils.sliceText(p.name, 25)},</span>
                      {p.attributes.map(a => <Fragment key={a.key}>
                        <span>{a.attributeKey} - </span>
                        <span>{a.attributeValue},</span>
                      </Fragment>)}
                    </div>
                  </Link>
                  <hr/>
                </li>)}
              {productsRequestStatus === 'request' && <li><img src={Preloader} width="50px"/></li>}
            </AnimateGroup>
          </ul>}
        </AnimateGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  productCount: state.products.productCount,
  productsRequestStatus: state.products.productsRequestStatus,
});
const mapDispatchToProps = {
  getProductsRequest,
  getSidebarTitlesRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Search));

export default Container;
