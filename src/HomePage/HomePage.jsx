import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

function HomePage() {
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const data = {
        file: null,
        preview: null,
        imageArray: [],
        currentIndex: 1,
        pageCount: 0,
        public_id: [],
        pages: []
    }
    
    const [inputs, setInputs] = useState(data);
    useEffect(() => {
    }, [inputs]);

    const prev = (() => {
        if(inputs.currentIndex <= 1) return
        inputs.currentIndex -= 1
        inputs.preview = `https://res.cloudinary.com/dghqhkadc/image/upload/q_auto,dn_50,w_350,h_400,c_fill,pg_${inputs.currentIndex}/${inputs.public_id[0]}.jpg`
    })

    const next = (() => {
        if(inputs.currentIndex >= inputs.pageCount) return
        inputs.currentIndex += 1
        inputs.preview = `https://res.cloudinary.com/dghqhkadc/image/upload/q_auto,dn_50,w_350,h_400,c_fill,pg_${data.currentIndex}/${data.public_id[0]}.jpg`
    })

    const uploadWidget = (e) => {
        e.preventDefault();
        cloudinary.openUploadWidget(
            { 
                cloud_name: 'dghqhkadc', 
                upload_preset: 'psmnhilv',
                sources: [
                    'local',
                    'url',
                    'camera',
                ],
                tags:['pdf','png']
            },
            function(error, result) {
                    const file = result.info
                    const pageCount = result.info.pages
                    let newPages = [];
                    const preview = `https://res.cloudinary.com/dghqhkadc/image/upload/q_auto,dn_50,w_350,h_400,c_fill,pg_1/${file.public_id[0]}.jpg`;

                    for(let i=1; i<= pageCount; i++) {
                        const pageData = {
                            url: `https://res.cloudinary.com/dghqhkadc/image/upload/q_auto,dn_50,w_200,h_250,c_fill,pg_${i}/${file.public_id}.jpg`,
                            page: i
                        };
                        newPages.push(pageData)
                    }
                    setInputs(inputs => ({ ...inputs, pages: newPages}))
            }
        ); 
    }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3 ">
            <a className="navbar-brand" href="#">Presenter</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand justify-content-right ml-3" href="#"><Link to="/login">Logout</Link></a>
        </nav>
        <div className="container">
                <div className="row">
                    <div className="col-sm left">
                    <div className="card register-card mx-auto card-default align-item-center justify-content-center">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="p-2">
                                    <h3 className="card-title text-center justify-content-center">Create a Presentation</h3>
                                </div>
                            </div>
                            <div className="container-sm">
                            <form noValidate>
                                    <div>
                                        <div className="form-group ">
                                            <label >Title</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="email"
                                                name="email"
                                                autoComplete="on"
                                                aria-describedby="emailHelp"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Description</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="password"
                                                name="password"
                                                autoComplete="on"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="upload">
                                            <button onClick={(e) => uploadWidget(e)} className="btn btn-warning text-white font-weight-bold">
                                                Add Image
                                            </button>
                                        </div>
                                        <div className="p-2">
                                            <button type="submit" id="signinButton" name="submit" value="Sign In" className="btn btn-danger text-white font-weight-bold me-auto pull-right">
                                                {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
                <ToastContainer />
            </div>

            <div className="col offset-sm-2 mx-auto mt-3 mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm left">
                            <div className="card register-card mx-auto card-default align-item-center justify-content-center">
                                <div className="container-sm">
                                    <ul>
                                        {inputs.pages.length > 0 ? 
                                            inputs.pages.map(page => {
                                                <li>{page.url}</li>
                                        })
                                    : <div>loading pages....</div>}
                                    </ul>
                                </div>
                                <div className="card-body mx-auto">
                                    <button type="submit" onClick={prev()} className="btn btn-danger text-white font-weight-bold ml-3 mr-3">
                                        {'<'}
                                    </button>
                                    <button type="submit" onClick={next()} className="btn btn-danger text-white font-weight-bold ml-3">
                                        {'>'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { HomePage };