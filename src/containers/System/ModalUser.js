import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUSer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      lastName: '',
      firstName: '',
      address: '',

    }
  }

  componentDidMount() {
  }

  toggle = () => {
    this.props.toggleModelUser();
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
    let arrInput = ['email', 'password', 'lastName', 'firstName', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
  handleAddNewUser = () => {
    let isValid = this.checkValidate();
    if (isValid === true) {
      this.props.createNewUser(this.state)
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
        <ModalHeader toggle={() => { this.toggle() }}>Create User</ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
            <div className='input-container'>
              <label>Email</label>
              <input
                type='text'
                onChange={(event) => { this.handleOnChange(event, 'email') }}
                value={this.state.email}
              />
            </div>
            <div className='input-container'>
              <label>Password</label>
              <input
                type='password'
                onChange={(event) => { this.handleOnChange(event, 'password') }}
                value={this.state.password}
              />
            </div>
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
          <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>
            Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUSer);


