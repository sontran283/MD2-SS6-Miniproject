import { useState } from "react";
import Form from "./Form";
import FormEdit from "./FormEdit";
// import FormEdit from "./FormEdit";

function ListUser() {
    const [show, setShow] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [idEdit, setIdEit] = useState("")

    const [listStudent, setLishStudent] = useState(() => {
        // sau khi handleSubmit ben Form.jsx xong, thi lay giu lieu danh sach student tu local ve
        const students = JSON.parse(localStorage.getItem('students')) || []
        return students;
        // xong buoc nay render ra ngoai giao dien, luot xuong duoi tbody
    })

    // ham hien form
    const handleShowForm = () => {
        //  set lai trang thai tu false thanh true
        setShow(true)
    }

    // ham dong form
    const handleCloseForm = () => {
        setShow(false)
    }

    // ham load giu lieu
    const loadData = (newStudent) => {
        setLishStudent(newStudent)
    }



    // ham XOA thong tin student theo id
    const handleDelete = (id) => {
        // b1: loc ra mang moi co cac student co id khac voi id can xoa
        const newLishStudent = listStudent.filter((st) => st.studentId !== id)
        // b2: luu giu lieu len local
        localStorage.setItem('students', JSON.stringify(newLishStudent))
        // b3: load lai giu lieu bang cach cap nhat lai state
        setLishStudent(newLishStudent);
    }



    //  ham hien thi form EDIT
    const handleShowEdit = (id) => {
        //  tao ra mot state moi de luu tru id can cap nhat, va can truyen xuong con
        setIdEit(id)
        setShowEdit(true)
    }

    //  ham dong formedit
    const handleCloseEdit = () => {
        setShowEdit(false)
    }




    return (
        <>
            {/* listStudent={listStudent}   xong buoc nay thi chuyen qua file con Form.jsx, */}
            {show ? (
                <Form
                    handleCloseForm={handleCloseForm}
                    listStudent={listStudent}
                    loadData={loadData}
                />
            ) : (
                <></>
            )}



            {/* component formEdit se nam o day */}
            {showEdit ? (
                <FormEdit
                    handleCloseEdit={handleCloseEdit}
                    idEdit={idEdit}
                    listStudent={listStudent}  // cap nhat lai giu lieu
                    loadData={loadData}
                />
            ) : (
                <></>
            )}



            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Quản lý sinh viên</h2>
                                </div>
                                <div className="col-sm-6" onClick={handleShowForm}>
                                    <a
                                        href="#addEmployeeModal"
                                        className="btn marker:  btn-success"
                                        data-toggle="modal"
                                    >
                                        <i

                                            className="material-icons"></i>
                                        <span>Thêm mới sinh viên</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <span className="custom-checkbox">
                                            <input type="checkbox" id="selectAll" />
                                            <label htmlFor="selectAll" />
                                        </span>
                                    </th>
                                    <th>Tên sinh viên</th>
                                    <th>Email</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listStudent.length === 0 ? (
                                    <>
                                        {/* neu nhu ko co giu lieu thi in ra cai nay */}
                                        <tr>không có giữ liệu</tr>
                                    </>
                                ) : (
                                    <>
                                        {listStudent.map((st) => (   //  neu nhu co giu lieu thi in ra tr 
                                            <tr>
                                                <td>
                                                    <span className="custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            id="checkbox5"
                                                            name="options[]"
                                                            defaultValue={1}
                                                        />
                                                        <label htmlFor="checkbox5" />
                                                    </span>
                                                </td>
                                                <td>{st.studentName}</td>
                                                <td>{st.email}</td>
                                                <td>{st.address}</td>
                                                <td>{st.phoneNumber}</td>
                                                <td>
                                                    <a
                                                        href="#editEmployeeModal"
                                                        className="edit"
                                                        data-toggle="modal"
                                                        onClick={() => handleShowEdit(st.studentId)}>
                                                        <i
                                                            className="material-icons"
                                                            data-toggle="tooltip"
                                                            title="Edit"
                                                        >
                                                            
                                                        </i>
                                                    </a>
                                                    <a
                                                        href="#deleteEmployeeModal"
                                                        className="delete"
                                                        data-toggle="modal"
                                                        onClick={() => handleDelete(st.studentId)}
                                                    >
                                                        <i
                                                            className="material-icons"
                                                            data-toggle="tooltip"
                                                            title="Delete"
                                                        >
                                                            
                                                        </i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </>)}

                            </tbody>
                        </table>
                        <div className="clearfix">
                            <div className="hint-text">
                                Hiển thị <b>5</b>/<b>10 </b>bản ghi
                            </div>
                            <ul className="pagination">
                                <li className="page-item disabled">
                                    <a href="#">Trước</a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link">
                                        1
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link">
                                        2
                                    </a>
                                </li>
                                <li className="page-item active">
                                    <a href="#" className="page-link">
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link">
                                        4
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link">
                                        5
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link">
                                        Sau
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}

export default ListUser;