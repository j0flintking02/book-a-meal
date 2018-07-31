import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Menu from './Menu';
import Button from '../util/Button';
import Footer from '../util/Footer';
import SetupMenu from './SetupMenu';
import UpdateMenu from './UpdateMenu';
import errorHandler from '../util/errorHandler';

class ConnectedMenus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      updating: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleMenuUpdate = this.handleMenuUpdate.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleMenuUpdate() {
    this.setState({ updating: true });
    this.handleOpenModal();
  }

  render() {
    const modalStyle = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '20rem',
        width: '60%',
      },
    };

    const btnContainerStyle = {
      backgroundColor: '#f0f1f2',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem 4rem 0 4rem',
    };

    const MenuWithErrorHandling = errorHandler(Menu, 'Error fetching menu');
    const SetupMenuWithErrorHandling =
      errorHandler(
        SetupMenu,
        'Error fetching meals, Please close the modal dialog and try again',
      );
    const UpdateMenuWithErrorHandling =
      errorHandler(
        UpdateMenu,
        'Error fetching meals, Please close the modal dialog and try again',
      );

    return (
      <div>
        <div style={btnContainerStyle}>
          <Button
            className="btn btn-default"
            style={{ margin: '1rem 1rem 1rem 0' }}
            value="Set Up Menu"
            onClick={this.handleOpenModal}
            disabled={this.props.isSet}
          />
          <Button
            className="btn btn-default"
            style={{ margin: '1rem 0 1rem 0' }}
            value="Update Menu"
            onClick={this.handleMenuUpdate}
            disabled={!this.props.isSet}
          />
        </div>
        <main
          className="bg-light main"
          style={{ minHeight: 'calc(100vh - 240px)' }}
        >
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Menu"
            style={modalStyle}
          >
            <Button
              value="&times;"
              onClick={this.handleCloseModal}
              className="close"
            />
            {!this.state.updating
              ? <SetupMenuWithErrorHandling />
              : <UpdateMenuWithErrorHandling />}
          </Modal>
          <MenuWithErrorHandling error={this.props.fetchMenuError} />
        </main>
        <Footer />
      </div>
    );
  }
}

ConnectedMenus.propTypes = {
  /* eslint react/require-default-props: 0 */
  fetchMenuError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  isSet: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  fetchMenuError: state.menus.fetchError,
  isSet: state.menus.isSet,
});

const Menus = connect(mapStateToProps)(ConnectedMenus);

export default Menus;