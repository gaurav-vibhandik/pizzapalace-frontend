import React, { FormEvent, useEffect, useState } from "react";
import { Button, Form, FormLabel } from "react-bootstrap";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

const Demo = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((item) => item !== value)
      );
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target.checked);
  };

  const toppings = ["veg1", "veg2", "veg3"];

  useEffect(() => {
    selectedCheckboxes.forEach((cb) => console.log(cb));
  }, [selectedCheckboxes]);

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        {toppings.map((t) => (
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                name="ip"
                type="checkbox"
                value={t}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="ip">
                {t}
              </label>
            </div>
          </div>
        ))}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default Demo;

// import React, { FormEvent } from "react";
// import { Button, Form, FormLabel } from "react-bootstrap";
// import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

// const Demo = () => {
//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     console.log(e.target.checked);
//   };

//   const toppings = ["veg1", "veg2", "veg3"];
//   return (
//     <React.Fragment>
//       <Form onSubmit={handleSubmit}>
//         {toppings.map((t) => (
//           <div>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 name="ip"
//                 type="checkbox"
//                 value={t}
//               />
//               <label className="form-check-label" htmlFor="ip">
//                 {t}
//               </label>
//             </div>
//           </div>
//         ))}

//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </React.Fragment>
//   );
// };

// export default Demo;
