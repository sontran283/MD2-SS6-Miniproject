import { useState } from "react";

function Radio() {
    const lishGender = [
        {
            id: 0,
            title: 'nam',
        },
        {
            id: 1,
            title: 'nu',
        },
        {
            id: 2,
            title: 'khac',
        },
    ]
    const [value, setValue] = useState()  // useState khong de gi thi mac dinh la undifine
    console.log("value", value);

    const handleCheck = (id) => {
        setValue(id)
    }

    return (
        <>
            <div style={{ margin: 200 }}>
                {lishGender.map(gender => (
                    <div>
                        <label htmlFor="">{gender.title}</label>
                        <input
                            type="radio"
                            checked={value === gender.id}
                            onChange={(e) => handleCheck(gender.id)} />
                    </div>
                ))}

                {/* <div>
                    <label htmlFor="">nữ</label>
                    <input type="radio" id="female" name="gender" />
                </div>
                <div>
                    <label htmlFor="">khác</label>
                    <input type="radio" id="other" name="gender" />
                </div> */}

            </div>
        </>
    );
}

export default Radio;