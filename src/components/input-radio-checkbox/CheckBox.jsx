import { useState } from "react";

function Checkbox() {
    const lishJob = [
        {
            id: 0,
            job: " Java",
        },
        {
            id: 1,
            job: " Javascript",
        },
        {
            id: 2,
            job: "Ruby",
        },
        {
            id: 3,
            job: " Python",
        },
    ]
    //  mảng chứa danh sách công việc được chọn
    const [selectedJob, setSelectedJob] = useState([])
    console.log('selectedJob', selectedJob);

    // hàm xử lý checkbox
    // thì trong cái hàm này mk đã lấy được id rồi. mk sẽ lấy cái mảng của mk, mk kiểm tra xem cái id đấy có tồn tại hay ko
    const handleCheck = (id) => {
        // kiểm tra xem id đã tồn tại trong mảng hay chưa
        // includes kiểm tra xem phần tử đó có tồn tại trong mảng hay không
        // includes mặc định trả về true hoặc false
        if (selectedJob.includes(id)) {
            //  nếu như id đã tồn tại trong mảng, thì lọc ra những giá trị khác với id được check
            setSelectedJob(selectedJob.filter((job) => job !== id))
        } else {
            //  nếu ko tồn tại thì bảo lưu giá trị cũ, push giá trị mới vào trong mảng
            setSelectedJob([...selectedJob, id])
        }
    }

    return (
        <>
            <div style={{ margin: 200 }}>
                {lishJob.map((j) => (
                    <div>
                        <input
                            type="checkbox"
                            //  do thằng này nó chọn nhiều, mảng selectedJob chấm đến cái includes
                            //  kiểm tra xem trong mảng của mk, thằng nào đã tồn tại rồi, thì cho phép nó check
                            checked={selectedJob.includes(j.id)}
                            onChange={() => handleCheck(j.id)}
                        //  khi mình onchange, thì nó sẽ gọi đến hàm handleCheck, và nó sẽ truyền theo id cái thằng mk đang check vào
                        //  kiem tra xem thang nap da ton tai trong mang thi cho no check
                        />
                        {j.job}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Checkbox;