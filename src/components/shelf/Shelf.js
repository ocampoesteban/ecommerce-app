import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchProducts } from '../../store/actions/productActions';
import { addProduct } from '../../store/actions/floatCartActions';

import Product from './Product';
import Filter from './Filter';
import ShelfHeader from './ShelfHeader';
import BreadcrumbComponent from '../breadcrumb/BreadcrumbComponent';


class Shelf extends Component {

  // Call fecth data on init
  componentWillMount() {
    this.props.fetchProducts();
  }

  componentWillReceiveProps(nextProps) {
    const { filters, sort } = nextProps;

    if (filters !== this.props.filters){
      this.handleFilter(filters);
    }
    if (sort !== this.props.sort) {
      this.handleSort(sort);
    }
  }

  handleFilter = (filters) => {
    this.props.fetchProducts(filters);
  }

  handleSort = (sort) => {
    this.props.fetchProducts(this.props.filters, sort);
  }

  get route() {
    return ['Male','T-shirt'];
  }

  render() {
    const { products, addProduct } = this.props;
    const p = products.map(p => {
      return (
        <Product
          product={p}
          addProduct={addProduct}
          key={p.id}
        />
      );
    });

    return (
      <React.Fragment>
        <Filter />  
        <div className="shelf-container">
          <BreadcrumbComponent paths={this.route}/>
          <ShelfHeader productsLength={products.length}/>
          {p}
        </div>
      </React.Fragment>
    )
  }
}

Shelf.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
  filters: PropTypes.array,
  sort: PropTypes.string,
}

const mapStateToProps = state => ({
  products: state.products.items,
  filters: state.filters.items,
  sort: state.sort.item,
})

export default connect(mapStateToProps, { fetchProducts, addProduct })(Shelf);