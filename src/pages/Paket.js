import React from 'react'
import { Modal } from "bootstrap"
import axios from "axios"
import { authorization, baseUrl, formatNumber } from '../config'

class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            pakets: [],
            id_paket: "",
            jenis_paket: "",
            harga: "",
            role: "",
            visible: true,
            action: ""
        }
        if (!localStorage.getItem("token")) {
            window.location.href = "/login"
        }
    }
    getData() {
        let endpoint = "http://localhost:8000/api/paket"
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ pakets: response.data })
            })
            .catch(error => console.log(error))
    }
    tambahData() {
        //Memunculkan Modal
        this.modalPaket = new Modal(document.getElementById("tambah-modal"))
        this.modalPaket.show()

        //Mengosongkan input
        this.setState({
            id_paket: Math.random(1, 100), jenis_paket: "", harga: "", action: "tambah"
        })
    }
    ubahData(id_paket) {
        this.modalPaket = new Modal(document.getElementById("tambah-modal"))
        this.modalPaket.show()

        //mencari posisi index dari data member berdasarkan id_paket pada array members
        let index = this.state.pakets.findIndex(paket => paket.id_paket === id_paket)

        this.setState({
            id_paket: this.state.pakets[index].id_paket,
            jenis_paket: this.state.pakets[index].jenis_paket,
            harga: this.state.pakets[index].harga,
            action: "ubah"
        })
    }
    simpanData(ev) {
        ev.preventDefault() // untuk mencegah berjalannya aksi default dari form submit

        //Menghilangkan modal
        this.modalPaket.hide()

        //cek aksi tambah atau ubah
        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/api/paket"
            //Menampung data
            let newPaket = {
                id_paket: this.state.id_paket,
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }
            axios.post(endpoint, newPaket, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "ubah") {
            this.modalPaket.hide()

            let endpoint = "http://localhost:8000/api/paket/" + this.state.id_paket
            let data = {
                id_paket: this.state.id_paket,
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }
            axios.put(endpoint, data, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }
    hapusData(id_paket) {
        if (window.confirm("Apakah anda yakin menghapus data ini?")) {
            let endpoint = "http://localhost:8000/api/paket/" + id_paket

            axios.delete(endpoint, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }
    componentDidMount() {
        this.getData()
        let user = JSON.parse(localStorage.getItem("user"))
        this.setState({ role: user.role })

        if (user.role === "Admin") {
            this.setState({ visible: true })
        } else {
            this.setState({ visible: false })
        }
    }
    render() {
        return (
            <div className="paket-page">
                <div className="main-content">
                    <div className="container">
                        <div className="title-section row">
                            <div className="col-lg-5">
                                <h3 className="mt-3">Choose Your Packets Here</h3>
                                <div className="">
                                    <button class={`btn btn-primary me-md-2 my-3 ${this.state.visible ? `` : `d-none`}`} type="button" onClick={() => this.tambahData()}>Tambah Paket</button>
                                </div>
                            </div>
                            <div className="col-lg-2"></div>
                        </div>
                    </div>
                    <div className="main-data">
                        <div className="container">
                            <h3>Data Paket</h3>
                            <ul className="list-group">
                                {this.state.pakets.map(paket => (
                                    <li className="list-group-item data-list py-3">
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <small className="text-secondary">ID</small>
                                                <h6>{paket.id_paket}</h6>
                                            </div>
                                            <div className="col-lg-3">
                                                <small className="text-secondary">Kategori</small>
                                                <h6>{paket.jenis_paket}</h6>
                                            </div>
                                            <div className="col-lg-4">
                                                <small className="text-secondary">Harga</small>
                                                <h6>Rp {formatNumber(paket.harga)}</h6>
                                            </div>
                                            <div className="btn-group col-lg-2">
                                                <button className={`btn btn-info btn-sm text-white mt-1 mx-2 ${this.state.visible ? `` : `d-none`}`} onClick={() => this.ubahData(paket.id_paket)}>Edit</button>
                                                <button className={`btn btn-danger btn-sm mt-1 ${this.state.visible ? `` : `d-none`}`} onClick={() => this.hapusData(paket.id_paket)}>Hapus</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="modal fade" id="tambah-modal" tabIndex="-1" aria-labelledby="tambah-modal-label" aria-hidden="true">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header bg-primary">
                                    <h5 className="modal-title" id="tambah-modal-label">Form Data Paket</h5>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.simpanData(ev)}>
                                        <div className="form-group">
                                            <label>Kategori</label>
                                            <input type="text" className="form-control mb-2" value={this.state.jenis_paket} onChange={ev => this.setState({ jenis_paket: ev.target.value })} required></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Harga</label>
                                            <input type="text" className="form-control mb-2" value={this.state.harga} onChange={ev => this.setState({ harga: ev.target.value })}></input>
                                        </div>
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Batal</button>
                                            <button type="submit" className="btn btn-primary btn-sm">Simpan</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Paket