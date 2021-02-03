import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { createPost, getPostById, updatePostById } from './../redux/actions/postsActionCreators';

const EditPostPage = ({ match, history, dispatchCreatePostAction, dispatchGetPostByIdAction, dispatchUpdatePostAction }) => {

    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [daylog, setDaylog] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState({ title: false, company: false, daylog: false, category: false });

    useEffect(() => {
        const { postId } = match.params;
        if (postId) {
            dispatchGetPostByIdAction(postId, ({ title, company, daylog, category }) => {
                setTitle(title);
                setCompany(company);
                setDaylog(daylog);
                setCategory(category);
            });
        }
    }, [dispatchGetPostByIdAction, match.params]);

    const handleOnSubmit = event => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();
        else {
            const { postId } = match.params;
            const data = { title, company, daylog, category };
            if (postId) {
                dispatchUpdatePostAction(postId, data, () => {
                    toast.success('Post updated Successfully!');
                    history.replace('/posts');
                }, (message) => toast.error(`Error: ${message}`));
            } else {
                dispatchCreatePostAction(data, () => {
                    toast.success('post created Successfully!');
                    history.replace('/posts');
                }, (message) => toast.error(`Error: ${message}`));
            }
        }
    };

    const isFormInvalid = () => (!title.trim() || !company.trim() || !daylog.trim() || !category);

    const updateErrorFlags = () => {
        const errObj = { title: false, company: false, daylog: false, category: false };
        if (!title.trim()) errObj.title = true;
        if (!company.trim()) errObj.company = true;
        if (!daylog.trim()) errObj.daylog = true;
        if (!category) errObj.category = true;
        setError(errObj);
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <h2>Edit daylog</h2>
                </div>
            </div>
            <div className="row align-items-center mt-4">
                <div className="col-9">
                    <form noValidate onSubmit={handleOnSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input noValidate id="title"
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`form-control ${error.title ? 'is-invalid' : ''}`} />
                            <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input noValidate id="company"
                                type="text"
                                placeholder="Company"
                                name="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className={`form-control ${error.company ? 'is-invalid' : ''}`} />
                            <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="daylog">Daylog</label>
                            <textarea noValidate id="daylog"
                                type="text"
                                placeholder="Daylog"
                                name="daylog"
                                value={daylog}
                                onChange={(e) => setDaylog(e.target.value)}
                                className={`form-control ${error.daylog ? 'is-invalid' : ''}`} />
                            <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select noValidate id="category"
                                name="category"
                                className={`form-control ${error.category ? 'is-invalid' : ''}`}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="SOLVED">Solved</option>
                                <option value="UNSOLVED">Unsolved</option>
                                <option value="UNKNOWN">Unknown</option>
                            </select>
                            <p className="invalid-feedback">Required</p>
                        </div>

                        <div className="mt-5">
                            <button type="submit" className="btn btn-dark mr-2 ">
                                Save | <i className="fas fa-save"></i>
                            </button>
                            <button type="button"
                                onClick={() => history.replace("/posts")}
                                className="btn btn-warning ">
                                Cancel | <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchCreatePostAction: (data, onSuccess, onError) =>
        dispatch(createPost(data, onSuccess, onError)),
    dispatchUpdatePostAction: (postId, data, onSuccess, onError) =>
        dispatch(updatePostById(postId, data, onSuccess, onError)),
    dispatchGetPostByIdAction: (postId, onSuccess) =>
        dispatch(getPostById(postId, onSuccess))
});
export default connect(null, mapDispatchToProps)(EditPostPage);
