import React, { useState, useEffect, Component} from "react";
import { useHistory } from 'react-router-dom';
import "./profile.scss";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useForm, Controller, set} from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button} from 'react-bootstrap';

toast.configure()
function Profile(){
    const history = useHistory();
    const [date_of_birth, setSelectedDate] = useState(null);
    const [gender, setGender] = useState(null);
    const [civil_status, setCivilStatus] = useState(null);
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState(null);
    const [middle_name, setMiddleName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [zip_code, setZipCode] = useState(null);
    const [field, setField] = useState(true);
    const [buttonEdit, setButtonEdit] = useState(false);
    const [buttonClose, setButtonClose] = useState(true);
    const [buttonSave, setButtonSave] = useState(true);
    const [user, setUser] = useState([]);
    const [contacts, setContact] = useState([]);
    const [addContacts, setAddContact] = useState();
    const [profile, setProfile] = useState([]);
    const [toggleState, setToggleState] = useState(1);
    const [editIsOpen, setEditIsOpen] = useState(false);

    const toggleTab = (index) => {
        setToggleState(index);
      };

    let values = '';
    useEffect(() => {
        if(localStorage.getItem('user-info')){
            let id = JSON.parse(localStorage.getItem('user-info'));
            fetch(`/users/profile/${id.user_id}`)
            .then(async response => {
                    const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('user-profile-info',JSON.stringify(data))
                    values = JSON.parse(localStorage.getItem('user-profile-info'));
                    setProfile(values.profile);
                    setContact(values.contacts);
                }
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
        }  
        else history.push("/login");
    },[])

    function logout(){
        localStorage.clear();
        history.push("/login");
    }

    function edit(){
        setField(false);
        setButtonClose(false);
        setButtonSave(false);
        setButtonEdit(true);
    }

    function close(){
        setField(true);
        setButtonClose(true);
        setButtonSave(true);
        setButtonEdit(false);
    }

    async function save(){
        setField(true);
        setButtonClose(true);
        setButtonSave(true);
        setButtonEdit(false);

        let item = {
            date_of_birth,
            gender,
            civil_status,
            first_name,
            last_name,
            middle_name,
            address,
            city,
            zip_code
        };
        let id = JSON.parse(localStorage.getItem('user-info'));
        let result = await fetch(`/users/editprofile/${id.user_id}`,{
            method: 'PUT',
            body: JSON.stringify(item),
            headers : {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        console.log(JSON.stringify(item))
        result = await result.json();
        console.warn(result)
        if(result.status){
            toast.success(result.message,{autoClose:4000})
        }
        else(
            toast.warn(
                "Each field must contain a value!"
                ,{autoClose:4000})
        )
        history.push("/profile")
    }

    function editContact(){
           setEditIsOpen(true);
        return(
            <div className="edit-modal">
                <Modal isOpen={editIsOpen}>
                    <h2>boday</h2>
                </Modal>
            </div>
        )
    }

    async function addContact(){
        console.log("hello")
        let contact_number = {
            addContacts
        };
        let item = {
            contact_number
        };
        try{
            let result = await fetch("/users/addcontact",{
                method: 'POST',
                body: JSON.stringify(item),
                headers : {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                }
            });
            result = await result.json();
            console.warn(result)
            if(result.status){
                toast.success(result.message,{autoClose:4000})
                window.location.reload();
            }
            else(
                toast.warn(
                    result.message
                    ,{autoClose:4000})
            )
        }
        catch(e){
            console.log(e)
        }
    }

    function genderSelect(){
        if(profile.gender == "Male"){
            return(
                <select className="custom-2"
                    disabled={ field }
                    onChange={(e)=>setGender(e.target.value)}
                >
                <option selected value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
                </select>
            );
        }
        if(profile.gender == "Female"){
            return(
                <select className="custom-2"
                    disabled={ field }
                    onChange={(e)=>setGender(e.target.value)}
                >
                <option value="Male">Male</option>
                <option selected value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
                </select>
            );
        }
        if(profile.gender == "Other"){
            return(
                <select className="custom-2"
                    disabled={ field }
                    onChange={(e)=>setGender(e.target.value)}
                >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option selected value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
                </select>
            );
        }
        if(profile.gender == "Prefer not to say"){
            return(
                <select className="custom-2"
                    disabled={ field }
                    onChange={(e)=>setGender(e.target.value)}
                >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option selected value="Prefer not to say">Prefer not to say</option>
                </select>
            );
        }
    }

    function selectCivilStatus(){
        if(profile.civil_status == "Single"){
            return(
                <div className="form-group">
                <select className="custom-2"
                disabled={ field }
                onChange={(e)=>setCivilStatus(e.target.value)}>
                <option selected value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorsed">Divorsed</option>
                <option value="Separated">Separated</option>
                <option value="Widowed">Widowed</option>
                </select>
                </div>
            )
        }
        if(profile.civil_status == "Married"){
            return(
                <div className="form-group">
                <select className="custom-2"
                disabled={ field }
                onChange={(e)=>setCivilStatus(e.target.value)}>
                <option value="Single">Single</option>
                <option selected value="Married">Married</option>
                <option value="Divorsed">Divorsed</option>
                <option value="Separated">Separated</option>
                <option value="Widowed">Widowed</option>
                </select>
                </div>
            )
        }
        if(profile.civil_status == "Divorsed"){
            return(
                <div className="form-group">
                <select className="custom-2"
                disabled={ field }
                onChange={(e)=>setCivilStatus(e.target.value)}>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option selected value="Divorsed">Divorsed</option>
                <option value="Separated">Separated</option>
                <option value="Widowed">Widowed</option>
                </select>
                </div>
            )
        }
        if(profile.civil_status == "Separated"){
            return(
                <div className="form-group">
                <select className="custom-2"
                disabled={ field }
                onChange={(e)=>setCivilStatus(e.target.value)}>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorsed">Divorsed</option>
                <option selected value="Separated">Separated</option>
                <option value="Widowed">Widowed</option>
                </select>
                </div>
            )
        }
        if(profile.civil_status == "Widowed"){
            return(
                <div className="form-group">
                <select className="custom-2"
                disabled={ field }
                onChange={(e)=>setCivilStatus(e.target.value)}>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorsed">Divorsed</option>
                <option value="Separated">Separated</option>
                <option selected value="Widowed">Widowed</option>
                </select>
                </div>
            )
        }
    }

    const updateFieldChanged = index => e => {
        let newArr = [...contacts];
        newArr[index] = e.target.value;
        setContact(newArr);
    }

    async function deleteContact(input) {
        try{
            let result = await fetch(`/users/deletecontact/${input}`,{
                method: 'DELETE',
            });
            result = await result.json();
            console.warn(result)
            if(result.status){
                toast.success(result.message,{autoClose:4000})
            }
            else(
                toast.warn(
                    result.message
                    ,{autoClose:4000})
            )
            window.location.reload();
        }
        catch(e){
            console.log(e);
        }
        console.log(input);
    }

    return(
        <div className= "container"> 

            <div className= "base-container-profile">
                <div className= "header-profile">
                    <div className="footer-3">
                        <button type="button" className="btn-logout" onClick={logout}>
                            Logout
                        </button>
                    </div>
                    <table>
                        <tr>
                            <td>
                                <img className="image"
                                src='./profile.jpg'
                                />
                            </td>
                            <td>
                                <div className="header-content">
                                    <div className="text" >Hi! I'm {profile.first_name} {profile.last_name}
                                    </div>
                                    <h3>Welcome to my profile!</h3>
                                    
                                </div>
                            </td>
                        </tr>
                    </table>
                    <br/><br/>
                        <table className="table">
                            <tr>
                                <td>
                                    <div className="bookmarks">
                                    <a href="#PROFILE">PROFILE</a>
                                    </div>
                                    
                                </td>
                                <td>
                                <div className="bookmarks">
                                    <a href="#CONTACTS">CONTACTS</a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                </div>
                <div className="content-profile">
                    <h3 id="PROFILE">MY PROFILE</h3>
                    <div className="form">
                    <div className="footer-3">
                        <button type="button" className="btn-edit" onClick={edit} hidden={ buttonEdit }>
                            Edit
                        </button>
                    </div>
                    <div className="footer-3">
                        <button type="button" className="btn-save" onClick={save} hidden={ buttonSave }>
                            Save
                        </button>
                        <button type="button" className="btn-close" onClick={close} hidden={ buttonClose }>
                            Close
                        </button>
                    </div>
                    <table>
                        <tr>
                            <td>
                                <h5>Username</h5>
                            </td>
                                <td>
                                <div className="form-group">
                                    <input type="text"
                                    className="username"
                                    defaultValue={profile.user_name}
                                    disabled="true"
                                    onChange={(e)=>setUsername(e.target.value)}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h5>First name</h5>
                            </td>
                                <td>
                                    {field}
                                <div className="form-group">
                                    <input type="text"
                                    className="firstname"
                                    defaultValue={profile.first_name}
                                    disabled={ field }
                                    onChange={(e)=>setFirstName(e.target.value)}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h5>Last name</h5>
                            </td>
                                <td>
                                <div className="form-group">
                                    <input type="text"
                                    className="lastname"
                                    defaultValue={profile.last_name}
                                    disabled={ field }
                                    onChange={(e)=>setLastName(e.target.value)}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h5>Middle name</h5>
                            </td>
                                <td>
                                <div className="form-group">
                                    <input type="text"
                                    className="middlename"
                                    defaultValue={profile.middle_name}
                                    disabled={ field }
                                    onChange={(e)=>setMiddleName(e.target.value)}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h5>Gender</h5>
                            </td>
                                <td>
                                    {genderSelect()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h5>Birthdate</h5>
                            </td>
                            <td>
                                <DatePicker 
                                    className="custom-2"
                                    placeholderText={profile.date_of_birth}
                                    dateFormat="yyyy-MM-dd"
                                    selected={date_of_birth}
                                    disabled={ field }
                                    onChange={(date)=>setSelectedDate(date)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h5>Civil Status</h5>
                            </td>
                            <td>
                                {selectCivilStatus()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h5>Address</h5>
                            </td>
                            <td>
                            <div className="form-group">
                                    <input
                                    type="text"
                                    className="address"
                                    defaultValue={profile.address}
                                    disabled={ field }
                                    onChange={(e)=>setAddress(e.target.value)}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h5>City</h5>
                            </td>
                            <td>
                            <   div className="form-group">
                                    <input type="text"
                                    className="city"
                                    defaultValue={ profile.city }
                                    disabled={ field }
                                    onChange={(e)=>setCity(e.target.value)}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h5>Zip Code</h5>
                            </td>
                            <td>
                            <   div className="form-group">
                                    <input type="text"
                                    className="zipcode"
                                    defaultValue={profile.zip_code}
                                    disabled={ field }
                                    onChange={(e)=>setZipCode(e.target.value)}
                                    />
                                </div>
                            </td>
                        </tr>
                    </table>
                    </div>
                    <br/>
                <h3 id="CONTACTS">MY CONTACTS</h3>
                <div className="form"> 
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Contact Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        { contacts.map((con, index) =>(
                            <tbody>
                                <tr>
                                    <td>
                                        <h5>{con.id}</h5>
                                    </td>
                                    <td>
                                        <div className="form-group-2">
                                            <input
                                            type="text"
                                            className="contact"
                                            value={con.contact}
                                            onChange={(e)=>setContact(updateFieldChanged(con.id))}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="footer-3">
                                            <button type="button" className="btn-edit-2" value={con.id} onClick={()=>setEditIsOpen(true)}>
                                                Edit
                                            </button>
                                            <button type="button" className="btn-delete" value={con.id} onClick={(e) => deleteContact(e.target.value)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                <div className="form-group">
                    <table>
                        <tr>
                            <td>
                            <div className="footer-3">
                                <button type="button" className="btn-add" onClick={addContact}>
                                    Add
                                </button>
                                </div>
                            </td>
                            <td>
                                <input
                                type="text"
                                className="contactnumber"
                                placeholder="Enter new contact number"
                                onChange={(e)=>setAddContact(e.target.value)}
                                />
                            </td>
                        </tr>
                    </table>
                </div><br/>
                </div>
            </div>
        </div>
        
    );
}

export default Profile;