import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddUser } from "../Redux/actions/Action";
import { toast } from "react-toastify";
const Adduser = () => {
    const [name, namechange] = useState('');
    const [email, emailchange] = useState('');
    const [course, coursechange] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handlesubmit = (e) => {
        e.preventDefault();

        if (name.trim() === '' || email.trim() === '') {
            toast.error('You must fill all blanks');
        } else {
            const userobj = { name, email, course };
            dispatch(FunctionAddUser(userobj));
            navigate('/user');
        }
    }


    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Add User</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Course</label>
                                    <select value={course} onChange={e => coursechange(e.target.value)} className="form-control">
                                        <option value="IT">IT</option>
                                        <option value="Math">Math</option>
                                        <option value="History">History</option>
                                        <option value="English">English</option>
                                        <option value="Music">Music</option>
                                        <option value="Literature">Literature</option>
                                        <option value="Geographic">Geographic</option>
                                        <option value="Arts">Arts</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Chemistry">Chemistry</option>
                                        <option value="Biology">Biology</option>

                                    </select>

                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit" style={{ marginRight: '10px' }}>Submit</button>
                        <Link className="btn btn-danger" to={'/user'}>Back</Link>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default Adduser;