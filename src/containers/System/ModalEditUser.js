import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
class ModalEditUSer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      firstName: '',
      address: '',
      id: '',
    }
  }

  componentDidMount() {
    let user = this.props.dataUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        address: user.address,
      })
    }
  }

  toggle = () => {
    this.props.toggleModalEditUser();
  }
  handleOnChange = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState
    })
  }
  checkValidate = () => {
    let isValid = true;
    let arrInput = ['lastName', 'firstName', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
  handleSaveUser = () => {
    let isValid = this.checkValidate();
    if (isValid === true) {
      this.props.saveEditUser(this.state)
    }
  }
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => { this.toggle() }}
        className='modal-user-container'
        size='lg'
        centered
      >
        <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
            <div className='input-container'>
              <label>First Name</label>
              <input
                type='text'
                onChange={(event) => { this.handleOnChange(event, 'firstName') }}
                value={this.state.firstName}
              />
            </div>
            <div className='input-container'>
              <label>Last Name</label>
              <input
                type='text'
                onChange={(event) => { this.handleOnChange(event, 'lastName') }}
                value={this.state.lastName}
              />
            </div>
            <div className='input-container max-width-input'>
              <label>Address</label>
              <input
                type='text'
                onChange={(event) => { this.handleOnChange(event, 'address') }}
                value={this.state.address}
              />
            </div>
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>
            Save
          </Button>{' '}
          <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUSer);


