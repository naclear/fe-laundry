import React from "react";
import { Modal } from "bootstrap";
import { start } from "@popperjs/core";
import axios from "axios"
class Member extends React.Component {
    constructor() {
        super()
        this.state = {

            members: [
                {
                    id_member: "1", nama: "John Cena",
                    alamat: "Sekarpuro", jenis_kelamin: "Pria",
                    telepon: "0987654321"
                },
                {
                    id_member: "2", nama: "Ashley",
                    alamat: "Sawojajar", jenis_kelamin: "Pria",
                    telepon: "0998765432"
                },
                {
                    id_member: "3", nama: "Caitlin",
                    alamat: "Glagah", jenis_kelamin: "Wanita",
                    telepon: "0999876543"
                }
            ],

            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            telepon: "",
            action: ""
        }
    }

    tambahData() {
        this.modalMember = new Modal(document.getElementById("modal_member"))
        this.modalMember.show() // menampilkan modal

        // reset state untuk form member
        this.setState({
            action: "tambah",
            id_member: Math.random(1, 100000),
            nama: "",
            alamat: "",
            jenis_kelamin: "Wanita",
            telepon: ""
        })
    }

    ubahData(id_member) {
        this.modalMember = new Modal(document.getElementById("modal_member"))
        this.modalMember.show() // menampilkan modal

        // mencari index posisi dari data member yang akan diubah
        let index = this.state.members.findIndex(
            member => member.id_member === id_member
        )

        // reset state untuk form member
        this.setState({
            action: "ubah",
            id_member: id_member,
            nama: this.state.members[index].nama,
            alamat: this.state.members[index].alamat,
            jenis_kelamin: this.state.members[index].jenis_kelamin,
            telepon: this.state.members[index].telepon
        })
    }
    simpanData(event) {
        event.preventDefault();
        // preventDefault -> mencegah aksi default dari form submit

        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/api/member"
            // menampung data isian dari user
            let data = {
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                jenis_kelamin: this.state.jenis_kelamin,
                telepon: this.state.telepon
            }

            // tambahkan ke state members (array)
            //let temp = this.state.members
            //temp.push(data) // menambah data pada array
            //this.setState({ members: temp })
            axios.post(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            // menghilangkan modal
            this.modalMember.hide()
        } else if (this.state.action === "ubah") {
            let endpoint = "http://localhost:8000/api/member/" + this.state.id_member

            let data = {
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                jenis_kelamin: this.state.jenis_kelamin,
                telepon: this.state.telepon
            }

            axios.put(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))


            // let temp = this.state.members
            // let index = temp.findIndex(
            //    member => member.id_member === this.state.id_member
            // )

            // temp[index].nama = this.state.nama
            // temp[index].alamat = this.state.alamat
            // temp[index].jenis_kelamin = this.state.jenis_kelamin
            // temp[index].telepon = this.state.telepon

            // this.setState({ members: temp })

            // this.modalMember.hide()
        }
    }

    hapusData(id_member) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // mecari posisi index dari data yang dihapus
            let temp = this.state.members
            let index = temp.findIndex(member => member.id_member === id_member)

            // dihapus data pada array
            temp.splice(index, 1)

            this.setState({ members: temp })
        }
    }

    getData() {
        let endpoint = "http://localhost:8000/api/member"
        // method = GET
        axios.get(endpoint)
            .then(response => {
                this.setState({ members: response.data })
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
                            List of Member
                        </h3>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.members.map(member => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <small className="text-info">Nama</small> <br />
                                        <h5>{member.nama}</h5>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-info">Jenis Kelamin</small> <br />
                                        <h5>{member.jenis_kelamin}</h5>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="text-info">Telepon</small> <br />
                                        <h5>{member.telepon}</h5>
                                    </div>
                                    <div className="col-lg-10">
                                        <small className="text-info">Alamat</small> <br />
                                        <h5>{member.alamat}</h5>
                                    </div>
                                    <div className="col-lg-1">
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-warning"
                                                onClick={() => this.ubahData(member.id_member)}>
                                                Edit
                                            </button>
                                        </div>

                                        <div className="col-lg-1">
                                            <div className="d-grid gap-2">
                                                <button className="btn btn-danger"
                                                    onClick={() => this.hapusData(member.id_member)}>
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
                        Tambah Data Member
                    </button>
                </div>

                {/* form modal member */}
                <div className="modal" id="modal_member">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form Data Member
                                </h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Nama
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={(ev) => this.setState({ nama: ev.target.value })} />

                                    Alamat
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.alamat}
                                        onChange={(ev) => this.setState({ alamat: ev.target.value })} />

                                    Jenis Kelamin
                                    <select className="form-control mb-2"
                                        value={this.state.jenis_kelamin}
                                        onChange={(ev) => this.setState({ jenis_kelamin: ev.target.value })}>
                                        <option value="Wanita">Wanita</option>
                                        <option value="Pria">Pria</option>
                                    </select>

                                    Telepon
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.telepon}
                                        onChange={(ev) => this.setState({ telepon: ev.target.value })} />

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
export default Member