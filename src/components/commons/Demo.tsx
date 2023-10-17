import React, { FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

const Demo = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target.email.value);
    console.log(e.target.password.value);
    console.log(e.target.cb.value);
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control id="email" type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control id="password" type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label htmlFor="cb">
            Password
            <Form.Check id="cb" type="checkbox" value={"ZA001"} />
          </Form.Label>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default Demo;

// import React, { FormEvent } from "react";
// import { Button, Form } from "react-bootstrap";

// const Demo = () => {
//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     console.log(e.target);

//     console.log(e.target.email.value);
//     console.log(e.target.password.value);
//     console.log(e.target.cb1.value);
//     console.log(e.target.cb2);
//   };

//   return (
//     <React.Fragment>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email address
//           </label>
//           <input type="email" className="form-control" id="email" />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input type="password" className="form-control" id="password" />
//         </div>
//         <div className="mb-3 form-check">
//           <div className="form-group" id="cb">
//             <label className="form-check-label" htmlFor="cb1">
//               Check me out 1
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id="cb1"
//                 value="ZA001"
//               />
//             </label>

//             <label className="form-check-label" htmlFor="cb2">
//               Check me out 2
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id="cb2"
//                 value="ZA002"
//               />
//             </label>
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </React.Fragment>
//   );
// };

// export default Demo;
