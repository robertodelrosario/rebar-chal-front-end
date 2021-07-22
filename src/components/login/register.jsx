import React, { useState, useEffect, Component } from "react";
import { useHistory } from 'react-router-dom';
import "./styleRegister.scss";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useForm, Controller} from 'react-hook-form';
import Select from 'react-select';

function Register(){
    const history = useHistory();
    const [date_of_birth, setSelectedDate] = useState(null);
    const [gender, setGender] = useState(null);
    const [civil_status, setCivilStatus] = useState(null);
    const [user_name, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [middle_name, setMiddleName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [contact_number, setContactNumber] = useState(null);
    const [zip_code, setZipCode] = useState(null);
    const [error, setError] = useState([]);
    useEffect(() => {
        if(localStorage.getItem('user-info')){
            history.push("/profile")
        }
    }, [])

    async function register(){
        if (inputValidation()) return;
        let item = {
            password,
            user_name,
            date_of_birth,
            gender,
            civil_status,
            first_name,
            last_name,
            middle_name,
            address,
            city,
            zip_code,
            contact_number
        };
        console.log(item)
        let result = await fetch("/users/register",{
            method: 'POST',
            body: JSON.stringify(item),
            headers : {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        console.log(JSON.stringify(item))
        result = await result.json();
        console.warn(result)
        localStorage.setItem('user-info',JSON.stringify(result))
        const data = JSON.parse(localStorage.getItem('user-info'));
        if(data.status){
            history.push("/profile");
        }
        else{
            alert(data.message);
            history.push("/register")
        }
    }

    function inputValidation(){
        let count_error = 0;
        let firstname="";
        let lastname="";
        let username = "";
        let pass = "";
        let birthdate = "";
        let gen = "";
        let civilstatus = "";
        let add = "";
        let ct = "";
        let zipcode = "";
        let contactnumber = "";
        if(!first_name){
            firstname="Required";
            count_error++;
        }
        if(!last_name){
            lastname = "Required";
            count_error++;
        }
        if(!user_name){
            username = "Required";
            count_error++;
        }
        else{
            if(!(/[a-zA-Z0-9]/).test(user_name)){
                 username = "Must contain alphanumeric";
                 count_error++;
            }
            else{
                if(!(/[|!@#$%&*\\/=?,;.:\\-_+~^\\\\]/.test(user_name))){
                    username = "Must contain special characters";
                    count_error++;
                }
            }

        }
        if(!password){
            pass="Required";
            count_error++;
        }
        else
            {
                if(password.length < 8){
                pass = "Password must be 8 characters!";
                count_error++;
                }
                else{
                    if(!(/[a-z]/).test(password)){
                        pass = "Must contain at least 1 lower case!";
                        count_error++;
                    }
                    else{
                        if(!(/[A-Z]/).test(password)){
                            pass = "Must contain at least 1 Upper case!";
                            count_error++;
                        }
                        else{
                            if(!(/[0-9]/).test(password)){
                                pass = "Must contain at least 1 number!";
                                count_error++;
                            }
                            else{
                                if(!(/[|!@#$%&*\\/=?,;.:\\-_+~^\\\\]/).test(password)){
                                pass = "Must contain at least 1 special character!";
                                count_error++;
                               }
                           }
                       }
                   }
                }
            }
        if(!date_of_birth){
            birthdate = "Required";
            count_error++;
        }
        if(!gender){
            gen = "Required";
            count_error++;
        }
        if(!civil_status){
            civilstatus="Required";
            count_error++;
        }
        if(!address){
            add = "Required";
            count_error++;
        }
        if(!city){
            ct = "Required";
            count_error++;
        }
        if(!zip_code){
            zipcode = "Required";
            count_error++;
        }
        if(!contact_number){
            contactnumber = "Required";
            count_error++;
        }
        const errors = {
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "password": pass,
            "civilstatus": civilstatus,
            "gender": gen,
            "birthdate": birthdate,
            "address": add,
            "city": ct,
            "zipcode": zipcode,
            "contactnumber": contactnumber,
        }
        setError(errors);
        if(count_error>0) return false;
    }


    return(
        <div className= "container">  
            <div className= "base-container">
                <div className="header">Register</div>
                <div className="content">
                    <div className="form">
                        <table>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <input type="text" className="firstname" placeholder="First name (required)" onChange={(e)=>setFirstName(e.target.value)}/>
                                        <div className="error">{error.firstname}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="text" className="middlename" placeholder="Middle name" onChange={(e)=>setMiddleName(e.target.value)}/>
                                        <div className="error"></div>
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <input type="text" className="lastname" placeholder="Last name (required)" onChange={(e)=>setLastName(e.target.value)}/>
                                        <div className="error" >{error.lastname}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <select className="custom"
                                        onChange={(e)=>setGender(e.target.value)}
                                        placeholder="Gender">
                                        <option selected disabled>Gender (required)</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                        </select>
                                        <div className="error">{error.gender}</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <DatePicker 
                                    placeholderText="Birthdate (required)"
                                    selected={date_of_birth}
                                    dateFormat="yyyy-MM-dd"
                                    onChange={date => setSelectedDate(date)}
                                    />
                                    <div className="error">{error.birthdate}</div>
                                </td>
                                <td>
                                    <div className="form-group">
                                    <select className="custom"
                                        onChange={(e)=>setCivilStatus(e.target.value)}
                                        placeholder="Civil Status ">
                                        <option selected disabled>Civil Status (required)</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorsed">Divorsed</option>
                                        <option value="Separated">Separated</option>
                                        <option value="Widowed">Widowed</option>
                                    </select>
                                    <div className="error">{error.civilstatus}</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <input type="text" className="address" placeholder="Address(required)" onChange={(e)=>setAddress(e.target.value)}/>
                                        <div className="error">{error.address}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="text" className="city" placeholder="City (required)" onChange={(e)=>setCity(e.target.value)}/>
                                        <div className="error">{error.city}</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <input type="text" className="zipcode" placeholder="Zip Code (required)" onChange={(e)=>setZipCode(e.target.value)}/>
                                        <div className="error">{error.zipcode}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="text" className="contactnumber" placeholder="Contact number (required)" onChange={(e)=>setContactNumber(e.target.value)}/>
                                        <div className="error">{error.contactnumber}</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <div className="instructions">Alphanumeric with special characters</div>
                                        <input type="text" className="user_name" placeholder="Username " onChange={(e)=>setUsername(e.target.value)}/>
                                        <div className="error">{error.username}</div>
                                    </div>
                                </td>
                                <td>
                                <div className="instructions">Alphanumeric, with special characters, and minimum of 8 char</div>
                                    <div className="form-group">
                                        <input type="password" className="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                                        <div className="error">{error.password}</div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div> 
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={register}>
                        Register
                    </button>
                </div>
            </div>
        </div>
        );
}

export default Register;