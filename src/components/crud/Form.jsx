import { useState } from "react";
import { v4 as uuid } from "uuid";

function Form(props) {
    //  lay prop tu cha
    const handleCloseForm = props.handleCloseForm;
    const listStudent = props.listStudent;
    const loadData = props.loadData;
    // chuyen props, sau do xuong ham  handleSubmit

    //  ham dong form
    const handleClose = () => {
        handleCloseForm()
    }

    //  khai bao state
    const [student, setStudent] = useState({
        studentName: '',
        email: '',
        address: '',
        phoneNumber: '',
    })

    // ham lang nghe va lay giu lieu tu cac o input
    const handleChange = (e) => {
        //  lay value va name cua tung o input khi nhap
        //  cach 1:
        const name = e.target.name;
        const value = e.target.value;

        //  cach 2:
        // const { name, value } = e.target

        // set lai state cho tung student
        setStudent({ ...student, [name]: value })
    }

    const handleSubmit = (e) => {
        // b1: ngan chan su kien mac dinh cua form
        e.preventDefault()

        // b2: tao doi tuong moi
        const newStudent = { ...student, studentId: uuid() }

        // Ở đây:
        const newLishStudent = [...listStudent, newStudent ]

        // b3: day giu lieu len loco
        localStorage.setItem('students', JSON.stringify(newLishStudent))

        // b4: dong form
        handleClose()
        // NOTE: xong buoc nay thi chuyen qua file LishUser

        // tai lai du lieu bang cach chuyen props nguoc tu con len cha
        loadData(newLishStudent)
    }

    return (
        <>
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <form onSubmit={handleSubmit}>

                            <div className="modal-header">
                                <h4 className="modal-title">Thêm mới sinh viên</h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-hidden="true"
                                    onClick={handleClose}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Tên sinh viên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required=""
                                        onChange={handleChange}
                                        name="studentName" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        required=""
                                        onChange={handleChange}
                                        name="email" />
                                </div>
                                <div className="form-group">
                                    <label>Địa chỉ</label>
                                    <textarea
                                        className="form-control"
                                        required=""
                                        defaultValue={""}
                                        onChange={handleChange}
                                        name="address" />
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required=""
                                        onChange={handleChange}
                                        name="phoneNumber" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input
                                    type="button"
                                    className="btn btn-default"
                                    data-dismiss="modal"
                                    defaultValue="Cancel"
                                    onClick={handleClose}
                                />
                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    defaultValue="Add"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Form;
