import React from "react";
import { Modal } from "bootstrap";
import { start } from "@popperjs/core";
import axios from "axios"
class Paket extends React.Component {
    constructor() {
        super()
        this.state = {

            pakets: [
                {
                    id_paket: "1", jenis_paket: "Selimut",
                    harga: "5000"
                },
                {
                    id_paket: "2", jenis_paket: "Bed Cover",
                    harga: "7000"
                },
                {
                    id_paket: "3", jenis_paket: "Boneka",
                    harga: "4000"
                }
            ],

            id_paket: "",
            jenis_paket: "",
            harga: "",
            action: ""
        }
    }

    tambahData() {
        this.modalPaket = new Modal(document.getElementById("modal_paket"))
        this.modalPaket.show() // menampilkan modal

        // reset state untuk form user
        this.setState({
            action: "tambah",
            id_paket: Math.random(1, 100000),
            jenis_paket: "Selimut",
            harga: "",
        })
    }

    ubahData(id_paket) {
        this.modalPaket = new Modal(document.getElementById("modal_paket"))
        this.modalPaket.show() // menampilkan modal

        // mencari index posisi dari data paket yang akan diubah
        let index = this.state.pakets.findIndex(
            paket => paket.id_paket === id_paket
        )

        // reset state untuk form paket
        this.setState({
            action: "ubah",
            id_paket: id_paket,
            jenis_paket: this.state.pakets[index].jenis_paket,
            harga: this.state.pakets[index].paket,
        })
    }
    simpanData(event) {
        event.preventDefault();
        // preventDefault -> mencegah aksi default dari form submit

        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/api/paket"
            // menampung data isian dari paket
            let data = {
                id_paket: this.state.id_paket,
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }

            // tambahkan ke state pakets (array)
            //let temp = this.state.pakets
            //temp.push(data) // menambah data pada array
            //this.setState({ pakets: temp })
            axios.post(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            // menghilangkan modal
            this.modalPaket.hide()
        } else if (this.state.action === "ubah") {
            let endpoint = "http://localhost:8000/api/paket/" + this.state.id_member

            let data = {
                id_paket: this.state.id_paket,
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }

            axios.put(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))


            // let temp = this.state.pakets
            // let index = temp.findIndex(
            //    paket => paket.id_paket === this.state.id_paket
            // )

            // temp[index].jenis_paket = this.state.jenis_paket
            // temp[index].harga = this.state.harga

            // this.setState({ pakets: temp })

            // this.modalPaket.hide()
        }
    }

    hapusData(id_paket) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // mecari posisi index dari data yang dihapus
            let temp = this.state.pakets
            let index = temp.findIndex(paket => paket.id_paket === id_paket)

            // dihapus data pada array
            temp.splice(index, 1)

            this.setState({ pakets: temp })
        }
    }

    getData() {
        let endpoint = "http://localhost:8000/api/paket"
        // method = GET
        axios.get(endpoint)
            .then(response => {
                this.setState({ pakets: response.data })
            })
            .catch(error => console.log(error))
    }
    componentDidMount() {
        // fungsi ini dijalankan setelah fungsi render berjalan
        this.getData()
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header bg-success">
                        <h3 className="text-white">
                            List of Paket
                        </h3>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.pakets.map(paket => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <small className="text-info">Jenis Paket</small> <br />
                                        <h5>{paket.jenis_paket}</h5>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-info">Harga</small> <br />
                                        <h5>{paket.harga}</h5>
                                    </div>
                                    <div className="col-lg-1">
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-warning"
                                                onClick={() => this.ubahData(paket.id_paket)}>
                                                Edit
                                            </button>
                                        </div>

                                        <div className="col-lg-1">
                                            <div className="d-grid gap-2">
                                                <button className="btn btn-danger"
                                                    onClick={() => this.hapusData(paket.id_paket)}>
                                                    Delete
                                                </button>
                                                <div className="d-grip gad-2">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </li>
                        ))}
                    </ul>

                    <button className="btn btn-success btn-sm my-2"
                        onClick={() => this.tambahData()}>
                        Tambah Data Paket
                    </button>
                </div>

                {/* form modal paket */}
                <div className="modal" id="modal_paket">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form Data Paket
                                </h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Jenis Paket
                                    <select className="form-control mb-2"
                                        value={this.state.jenis_paket}
                                        onChange={(ev) => this.setState({ jenis_paket: ev.target.value })}>
                                        <option value="Selimut">Selimut</option>
                                        <option value="Bed Cover">Bed Cover</option>
                                        <option value="Boneka">Boneka</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                    Harga
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.harga}
                                        onChange={(ev) => this.setState({ harga: ev.target.value })} />

                                    

                                    <button className="btn btn-success" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        )

    }
}
export default Paket