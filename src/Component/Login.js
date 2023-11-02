import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:3000/account")
                .then((res) => res.json())
                .then((userList) => {
                    const user = userList.find((u) => u.username === username);
                    if (!user) {
                        toast.error('Please Enter valid username');
                    } else {
                        if (user.password === password) {
                            if (user.role === "admin" || user.role === "normal") {
                                toast.success('Admin Login Success');
                                sessionStorage.setItem('username', username);
                                sessionStorage.setItem('userrole', user.role);
                                usenavigate('/user');
                            } else {
                                toast.error('You do not have permission to access this page.');
                            }
                        } else {
                            toast.error('Please Enter valid credentials');
                        }
                    }
                })
                .catch((err) => {
                    toast.error('Login Failed due to: ' + err.message);
                });
        }
    }

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            // Fetch the account data
            fetch("http://localhost:3000/account")
                .then((res) => res.json())
                .then((accountList) => {
                    const account = accountList.find((a) => a.username === username);
                    if (!account) {
                        toast.error('Please Enter valid username');
                    } else {
                        if (account.password === password) {
                            toast.success('Success');
                            sessionStorage.setItem('username', username);
                            usenavigate('/');
                        } else {
                            toast.error('Please Enter valid credentials');
                        }
                    }
                })
                .catch((err) => {
                    toast.error('Login Failed due to: ' + err.message);
                });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header text-center">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;