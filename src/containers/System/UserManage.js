import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers , createNewUser ,deleteUser ,updateUser} from '../../services/userSevice';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModelUser: false,
            isOpenModelEditUser: false,
            userEdit:{},
        }
    } 

    // state = {

    // }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.user
            })
        }
    }


    handleAddNewUser = () =>{
        this.setState({
            isOpenModelUser: true,
        })
    }

    handleEditUser = (user) =>{
        this.setState({
            isOpenModelEditUser: true,
            userEdit: user
        })
    }

    toggleUserModal = () =>{
        this.setState({
            isOpenModelUser: !this.state.isOpenModelUser,
        })
    }

    toggleUserEditModal = () =>{
        this.setState({
            isOpenModelEditUser: !this.state.isOpenModelEditUser,
        })
    }
    
    createNewUser = async (data) => {
        try {
           let response = await createNewUser(data);
           if(response && response.errCode !== 0){
                alert(response.message);
           }else{
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModelUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
           }
        } catch (e) {
            console.log(e);
        }
       
    }
    doEditUser = async (user) =>{
        try {
            let response = await updateUser(user);
            if(!response || response.errCode !==0){
                alert(response.errMessage);
            }else{
                this.setState({
                    isOpenModelEditUser: false,
                })
                await this.getAllUsersFromReact();
            }
        } catch (e) {
            console.log(e);
        }
        
    }


    handleDeleteUser = async (user) =>{
        let response = await deleteUser(user.id);
        try {
            if(!response || response.errCode !==0){
                alert(response.errMessage);
            }else{

                await this.getAllUsersFromReact();
            }
        } catch (e) {
            console.log(e)
        }
            
    }
    render() {
        console.log(this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModelUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModelEditUser &&
                    <ModalEditUser
                    isOpen={this.state.isOpenModelEditUser}
                    toggleFromParent={this.toggleUserEditModal}
                    User={this.state.userEdit}
                    doEditUser={this.doEditUser}
                     />
                }
                
                <div className='title text-center'>
                    manage user with DD
                </div>
                <div className='mx-1'>
                    <button 
                    className='btn btn-primary px-3'
                    onClick={() => this.handleAddNewUser()}
                    
                    > 
                    <i className="fas fa-plus px-3"></i> Add New Users</button>
                </div>
                <div className='user-table mt-4 mx-2'>
                <table id="customers">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    
                        {
                            arrUsers && arrUsers.map((item, index) => {
                                console.log(item,index)
                                return(
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>
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
