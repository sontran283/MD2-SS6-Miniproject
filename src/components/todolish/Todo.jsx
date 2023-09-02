import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Todo() {
    const [jobs, setJobs] = useState(() => {
        const listJobs = JSON.parse(localStorage.getItem("jobs")) || [];
        return listJobs;
    });

    const [job, setJob] = useState("");
    const jobRef = useRef();
    const [nameEdit, setNameEdit] = useState("");

    const handleAddJob = (e) => {
        e.preventDefault();
        const newJob = {
            id: uuidv4(),
            status: false,
            nameJob: job,
            isEdit: false,
        };
        const newJobs = [...jobs, newJob];
        localStorage.setItem("jobs", JSON.stringify(newJobs));
        setJobs(newJobs);
        setJob("");
        jobRef.current.focus();
    };

    const handleCheck = (id) => {
        const updatedJobs = jobs.map((job) => {
            if (job.id === id) {
                return { ...job, status: !job.status };
            }
            return job;
        });

        localStorage.setItem("jobs", JSON.stringify(updatedJobs));
        setJobs(updatedJobs);
    };

    const handleDelete = (id) => {
        const newJob = jobs.filter((job) => job.id !== id);
        localStorage.setItem("jobs", JSON.stringify(newJob));
        setJobs(newJob);
        jobRef.current.focus();
    };

    const handleShowEdit = (j) => {
        setNameEdit(j.nameJob); // Thiết lập giá trị ban đầu cho editName
        setJobs((prevJobs) => {
            return prevJobs.map((job) => {
                if (job.id === j.id) {
                    return { ...job, isEdit: true };
                }
                return job;
            });
        });
    };

    const handleCancel = (id) => {
        setJobs((prevJobs) => {
            return prevJobs.map((job) => {
                if (job.id === id) {
                    return { ...job, isEdit: false };
                }
                return job;
            });
        });
    };

    const handleChaneInput = (e) => {
        const { value } = e.target;
        setNameEdit(value);
    };

    const handleSave = (id) => {
        const updatedJobs = jobs.map((job) => {
            if (job.id === id) {
                return { ...job, nameJob: nameEdit, isEdit: false };
            }
            return job;
        });

        localStorage.setItem("jobs", JSON.stringify(updatedJobs));
        setJobs(updatedJobs);
    };

    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card">
                                <div className="card-body p-5">
                                    <h3 style={{ textAlign: "center", marginBottom: 40 }}>
                                        MINI PROJECT TODO LIST
                                    </h3>
                                    <form
                                        onSubmit={handleAddJob}
                                        className="d-flex justify-content-center align-items-center mb-4"
                                    >
                                        <div className="flex-fill">
                                            <input
                                                ref={jobRef}
                                                value={job}
                                                onChange={(e) => setJob(e.target.value)}
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập tên công việc"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-info ms-2">
                                            Thêm
                                        </button>
                                    </form>
                                    {/* Tabs navs */}
                                    <ul
                                        className="nav nav-tabs mb-4 pb-2"
                                        id="ex1"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active">Tất cả công việc</a>
                                        </li>
                                    </ul>
                                    {/* Tabs navs */}
                                    {/* Tabs content */}
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active">
                                            <ul className="list-group mb-0">
                                                {jobs.map((job) => (
                                                    <>
                                                        {job.isEdit ? (
                                                            <>
                                                                <li
                                                                    key={job.id}
                                                                    className="list-group-item d-flex align-items-center border-0 mb-2 rounded justify-content-between"
                                                                    style={{ backgroundColor: "#f4f6f7" }}
                                                                >
                                                                    <div>
                                                                        <input
                                                                            value={nameEdit}
                                                                            onChange={handleChaneInput}
                                                                            name="nameEdit"
                                                                            className="form-control "
                                                                            type="text"
                                                                            style={{ width: "500px" }}
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex gap-2">
                                                                        <button
                                                                            onClick={() => handleSave(job.id)}
                                                                            className="btn btn-warning"
                                                                        >
                                                                            Cập nhật
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleCancel(job.id)}
                                                                            className="btn btn-danger"
                                                                        >
                                                                            Hủy
                                                                        </button>
                                                                    </div>
                                                                </li>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <li
                                                                    key={job.id}
                                                                    className="list-group-item d-flex align-items-center border-0 mb-2 rounded justify-content-between"
                                                                    style={{ backgroundColor: "#f4f6f7" }}
                                                                >
                                                                    <div>
                                                                        <input
                                                                            className="form-check-input me-2"
                                                                            type="checkbox"
                                                                            checked={job.status === true}
                                                                            onChange={() => handleCheck(job.id)}
                                                                        />
                                                                        {job.status ? (
                                                                            <>
                                                                                <s>{job.nameJob}</s>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <span>{job.nameJob}</span>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <a
                                                                            onClick={(e) => handleShowEdit(job)}
                                                                            className="text-info"
                                                                            title="Sửa công việc"
                                                                        >
                                                                            <i className="fas fa-pencil-alt me-3" />
                                                                        </a>
                                                                        <a
                                                                            onClick={() => handleDelete(job.id)}
                                                                            className="text-danger"
                                                                            title="Xóa công việc"
                                                                        >
                                                                            <i className="fas fa-trash-alt" />
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                            </>
                                                        )}
                                                    </>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Tabs content */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}