import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserList, Removeuser } from "../Redux/actions/Action";

const Userlisting = (props) => {
    useEffect(() => {
        props.loaduser();
    }, [])
    const handledelete = (code) => {
        if (window.confirm('Do you want to remove?')) {
            props.removeuser(code);
            props.loaduser();
            toast.success('User removed successfully.')
        }
    }
    const handleLinkClick = (e, isAdmin) => {
        if (!isAdmin) {
            e.preventDefault();
            toast.error("You do not have permission to perform this action");
        }
    }
    const isAdmin = sessionStorage.getItem('userrole') === 'admin';
    return (
        props.user.loading ? <div><h2>Loading...</h2></div> :
            props.user.errmessage ? <div><h2>{props.user.errmessage}</h2></div> :

                <div>
                    <div className="card">
                        <div className="card-header" >
                            {isAdmin ? (
                                <Link to={'/user/add'} className="btn btn-success">Add User [+]</Link>
                            ) : (
                                <button onClick={() => { toast.error("You do not have permission to perform this action") }} className="btn btn-success">
                                    Add User [+]
                                </button>
                            )}
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Course</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.user.userlist && props.user.userlist.map(item =>
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.course}</td>
                                                <td>
                                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                                        <Link to={'/user/edit/' + item.id} className="btn btn-primary" onClick={(e) => handleLinkClick(e, isAdmin)}>
                                                            {isAdmin ? "Edit" : "Edit"}
                                                        </Link>
                                                        <span style={{ margin: "0 10px" }}></span>
                                                        {isAdmin ? (
                                                            <button onClick={() => { handledelete(item.id) }} className="btn btn-danger">
                                                                Delete
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => { toast.error("You do not have permission to perform this action") }} className="btn btn-danger">
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    }

                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loaduser: () => dispatch(FetchUserList()),
        removeuser: (code) => dispatch(Removeuser(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);