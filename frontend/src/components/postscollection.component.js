import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { deletePostById } from '../redux/actions/postsActionCreators';

const PostsCollection = ({ posts, dispatchDeleteAction }) => {

    const [selectedPost, setSelectedPost] = useState('');

    const showConfirmationModal = (event, postId) => {
        event.preventDefault();
        setSelectedPost(postId);
        window.$('#confirmationModal').modal('show');
    };

    const handleOnDelete = () => {
        dispatchDeleteAction(selectedPost, () => {
            window.$('#confirmationModal').modal('hide');
            toast.success('Post deleted Successfully!');
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            toast.error(`Error: ${message}`);
        });
    };

    return (
        <React.Fragment>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Company</th>
                        <th scope="col">Daylog</th>
                        <th scope="col">Date</th>
                        <th scope="col">Category</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map(item => (
                            <tr key={item._id}>
                                <td>
                                    <Link to={`/edit-post/${item._id}`}>
                                        {item.title}
                                    </Link>
                                </td>
                                <td>{item.company}</td>
                                <td>{item.daylog}</td>
                                <td>{item.date}</td>
                                <td>{item.category}</td>
                                
                                <td>
                                    <a href="/" onClick={(e) => showConfirmationModal(e, item._id)}>
                                        <i className="fas fa-window-close fa-2x text-warning"></i>
                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Modal handleOnDelete={handleOnDelete} />
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchDeleteAction: (postId, onSuccess, onError) =>
        dispatch(deletePostById(postId, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(PostsCollection);

const Modal = ({ handleOnDelete }) => (
    <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this post ?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" className="btn btn-secondary">
                        No
                    </button>
                    <button type="button" data-dismiss="modal" onClick={handleOnDelete} className="btn btn-primary">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </div>
);
