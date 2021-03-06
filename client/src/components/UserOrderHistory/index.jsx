import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import ConnectedOrderHistory from './OrderHistory';
import { fetchUserOrders } from '../../actions/orderActions';
import Loading from '../util/Loading';
import Footer from '../util/Footer';
import Pagination from '../util/Paginate';
import errorHandler from '../util/errorHandler';
import {
  getCurrentPageUrl, getNextPageUrl,
  getPreviousPageUrl,
} from '../../reducers/paginationReducer';
import ErrorBoundary from '../util/ErrorBoundary';

export class UserOrderHistory extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleRetry = this.handleRetry.bind(this);
  }

  componentDidMount() {
    this.handlePageChange(this.props.currentUrl);
  }

  handlePageChange(url) {
    this.props.fetchUserOrders(url);
  }

  handleRetry() {
    this.handlePageChange(this.props.currentUrl);
  }

  render() {
    const { isFetching, error } = this.props;

    const OrderHistoryWithErrorHandling =
      errorHandler(ConnectedOrderHistory, 'Error fetching orders');

    if (isFetching) {
      return (
        <div className="loader-container">
          <Loading text="fetching orders...">
            <Preloader flashing size="medium" />
          </Loading>
        </div>
      );
    }

    return (
      <ErrorBoundary>
        <div>
          <main
            className="bg-light order-history-main text-center"
            style={{ minHeight: 'calc(100vh - 151px)' }}
          >
            <h4>Order history</h4>
            <section className="card order-history">
              <OrderHistoryWithErrorHandling error={error} />
              <Pagination
                onPageChange={this.handlePageChange}
                nextUrl={this.props.nextUrl}
                previousUrl={this.props.previousUrl}
                style={{ marginTop: '0' }}
              />
            </section>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    );
  }
}

UserOrderHistory.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  fetchUserOrders: PropTypes.func.isRequired,
  currentUrl: PropTypes.string.isRequired,
  nextUrl: PropTypes.string,
  previousUrl: PropTypes.string,
};

const mapStateToProps = state => ({
  isFetching: state.orders.isFetching,
  error: state.orders.fetchError,
  nextUrl: getNextPageUrl(state.pagination.orders),
  currentUrl: getCurrentPageUrl(state.pagination.orders),
  previousUrl: getPreviousPageUrl(state.pagination.orders),
});

export default connect(mapStateToProps, { fetchUserOrders })(UserOrderHistory);
