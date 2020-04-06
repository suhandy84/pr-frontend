import React, { Component } from 'react';
import { Table, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../supports/ApiUrl';
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// import {changetoRupiah} from '../supports/changeToRp'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class ManageAdmin extends Component {
    state = {
        videos: [],
        isModaladdOpen: false,
        isModaleditOpen: false,
        indexedit: 0,
        indexdelete: -1,
        categories: [],
        subcategories: []
    }

    componentDidMount() {
        Axios.get(`${API_URL}/videos?_expand=kategori&_expand=subkategori`)
            .then((res) => {
                Axios.get(`${API_URL}/kategoris`)
                    .then((kategoris) => {
                        Axios.get(`${API_URL}/subkategoris`)
                            .then((subkategoris) => {
                                this.setState({ videos: res.data, categories: kategoris.data, subcategories: subkategoris.data })
                            })
                        // this.setState({ videos: res.data, categories: kategoris.data})
                    })
            }).catch((err) => {
                console.log(err)
            })
    }

    toggleadd = () => {
        this.setState({ isModaladdOpen: !this.state.isModaladdOpen })
    }
    toggleedit = () => {
        this.setState({ isModaleditOpen: !this.state.isModaleditOpen })
    }

    onSaveadddataClick = () => {
        var namaadd = this.refs.namaadd.value
        var videoadd = this.refs.videoadd.value
        var videotypeadd = this.refs.videotypeadd.value
        var categoryadd = parseInt(this.refs.categoryadd.value)
        var subcategoryadd = parseInt(this.refs.subcategoryadd.value)
        var viewadd = this.refs.viewadd.value
        var uploadtimeadd = this.refs.uploadtimeadd.value
        var obj = {
            name: namaadd,
            video: videoadd,
            videotype: videotypeadd,
            kategoriId: categoryadd,
            subkategoriId: subcategoryadd,
            view: viewadd,
            uploadtime: uploadtimeadd
        }
        Axios.post(`${API_URL}/videos`, obj)
            .then((res) => {
                console.log(res.data)
                Axios.get(`${API_URL}/videos?_expand=kategori&_expand=subkategori`)
                    .then((resakhir) => {
                        this.setState({ videos: resakhir.data, isModaladdOpen: false })
                    }).catch((err) => {
                        console.log(err)
                    })
            }).catch((err) => {
                console.log(err)
            })
    }

    deleteconfirm = (index, id) => {
        Swal.fire({
            title: `Are you sure wanna delete ${this.state.videos[index].name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Axios.delete(`${API_URL}/videos/${id}`)
                    .then((res) => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then((result) => {
                            if (result.value) {
                                Axios.get(`${API_URL}/videos?_expand=kategori&_expand=subkategori`)
                                    .then((res1) => {
                                        this.setState({ videos: res1.data })
                                    })
                            }
                        })

                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
    }

    onsavEeditClick = () => {
        var namaedit = this.refs.namaedit.value
        var videoedit = this.refs.videoedit.value
        var videotypeedit = this.refs.videotypeedit.value
        var categoryedit = parseInt(this.refs.categoryedit.value)
        var subcategoryedit = parseInt(this.refs.subcategoryedit.value)
        var viewedit = this.refs.viewedit.value
        var uploadtimeedit = this.refs.uploadtimeedit.value
        var obj = {
            name: namaedit,
            video: videoedit,
            videotype: videotypeedit,
            kategoriId: categoryedit,
            subkategoriId: subcategoryedit,
            view: viewedit,
            uploadtime: uploadtimeedit
        }
        var id = this.state.videos[this.state.indexedit].id
        console.log(obj, id)
        Axios.put(`${API_URL}/videos/${id}`, obj)
            .then((res) => {
                // console.log(res.data)
                Axios.get(`${API_URL}/videos?_expand=kategori&_expand=subkategori`)
                    .then((resakhir) => {
                        this.setState({ videos: resakhir.data, isModaleditOpen: false })
                    }).catch((err) => {
                        console.log(err)
                    })
            })
    }

    onEditClick = (index) => {
        this.setState({ indexedit: index, isModaleditOpen: true })
    }

    renderVideos = () => {
        const { videos } = this.state
        return videos.map((val, index) => {
            return (
                <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{val.name}</td>
                    <td>
                        <iframe className='embed-responsive-item img-responsive rounded-lg' src={val.video} frameBorder="0" allowFullScreen></iframe>
                    </td>
                    <td>{val.videotype}</td>
                    <td>{val.kategori.nama}</td>
                    <td>{`${val.view} views`}</td>
                    <td>{`${val.uploadtime} ago`}</td>
                    <td>
                        <button className='btn btn-primary btn-sm' onClick={() => this.onEditClick(index)}>Edit</button>
                        <button className='btn btn-danger btn-sm' onClick={() => this.deleteconfirm(index, val.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    rendercategorytoadd = () => {
        return this.state.categories.map((val, index) => {
            return <option key={index} value={val.id}>{val.nama}</option>
        })
    }

    rendersubcategorytoadd = () => {
        return this.state.subcategories.map((val, index) => {
            return <option key={index} value={val.id}>{val.nama}</option>
        })
    }

    render() {
        const { videos, indexedit } = this.state
        if (this.props.User.role === 'admin') {

            return (
                <div className='pt-5'>
                    <Modal isOpen={this.state.isModaladdOpen} toggle={this.toggleadd}>
                        <ModalHeader toggle={this.toggleadd}>Add data</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='namaadd' placeholder='Product name' className='form-control mt-2' />
                            <input type="text" ref='videoadd' placeholder='Url Video' className='form-control mt-2' />
                            <input type="text" ref='videotypeadd' placeholder='Video Type: free atau premium' className='form-control mt-2' />
                            <select ref='categoryadd' className='form-control mt-2'>
                                <option value="" hidden>Pilih category</option>
                                {this.rendercategorytoadd()}
                            </select>
                            <select ref='subcategoryadd' className='form-control mt-2'>
                                <option value="" hidden>Pilih subcategory</option>
                                {this.rendersubcategorytoadd()}
                            </select>
                            <input type="text" ref='viewadd' placeholder='Jumlah View' className='form-control mt-2' />
                            <input type="text" ref="uploadtimeadd" className='form-control mt-2' placeholder='Waktu Upload'></input>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onSaveadddataClick}>Save</Button>
                            <Button color="secondary" onClick={this.toggleadd}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    {
                        this.state.videos.length ?
                            <Modal isOpen={this.state.isModaleditOpen} toggle={this.toggleedit}>
                                <ModalHeader toggle={this.toggleedit}>Edit data {videos[indexedit].name}</ModalHeader>
                                <ModalBody>
                                    <input type="text" ref='namaedit' defaultValue={videos[indexedit].name} placeholder='Video Name' className='form-control mt-2' />
                                    <input type="text" ref='videoedit' defaultValue={videos[indexedit].video} placeholder='Url video' className='form-control mt-2' />
                                    <input type="text" ref='videotypeedit' defaultValue={videos[indexedit].videotype} placeholder='Video type: premium atau free' className='form-control mt-2' />
                                    <select ref='categoryedit' defaultValue={videos[indexedit].kategoriId} className='form-control mt-2'>
                                        {this.rendercategorytoadd()}
                                    </select>
                                    <select ref='subcategoryedit' defaultValue={videos[indexedit].subkategoriId} className='form-control mt-2'>
                                        {this.rendersubcategorytoadd()}
                                    </select>
                                    <input type="text" ref='viewedit' defaultValue={videos[indexedit].view} placeholder='Jumlah View' className='form-control mt-2' />
                                    <input type="text" ref="uploadtimeedit" className='form-control mt-2' defaultValue={videos[indexedit].uploadtime} placeholder='Waktu Upload' cols="20" rows="5"></input>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.onsavEeditClick}>Save</Button>
                                    <Button color="secondary" onClick={this.toggleedit}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                            :
                            null
                    }
                    <button className='btn btn-primary mt-5' onClick={this.toggleadd}>Add data</button>
                    <Table striped>
                        <thead style={{ textAlign: "center" }}>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>video</th>
                                <th>videotype</th>
                                <th>Category</th>
                                <th>view</th>
                                <th>uploadtime</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderVideos()}
                        </tbody>
                    </Table>
                </div>
            );
        } else {
            return <Redirect to='/notfound' />
        }
    }
}

const MapstatetoProps = (state) => {
    return {
        User: state.Auth
    }
}

export default connect(MapstatetoProps)(ManageAdmin);