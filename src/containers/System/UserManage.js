import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser, createNewUserApi, deleteUserApi, editUserApi } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter'
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUser('all');
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.data,
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserApi(data);
            if (response && response.mess.errCode !== 0) {
                alert(response.mess.mess)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }

    saveEditUser = async (data) => {
        try {
            let response = await editUserApi(data)
            if (response && response.messErr.errCode !== 0) {
                alert(response.messErr.mess)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalEditUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);

        }
    }

    handleDeleteUSer = async (data) => {
        try {
            let response = await deleteUserApi(data.id);
            if (response && response.mess.errCode !== 0) {
                alert(response.mess.mess)
            } else {
                await this.getAllUsersFromReact();
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let arrUsers = this.state.arrUser;
        return (
            <div className='user-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleModalUser={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleModalEditUser={this.toggleModalEditUser}
                        dataUser={this.state.userEdit}
                        saveEditUser={this.saveEditUser}
                    />
                }
                <div className="title text-center">Manage Users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}><i className="fas fa-plus"></i> Add new user</button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUSer(item)}><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
