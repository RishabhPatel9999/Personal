import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/globalContext"; // import context

function Login() {
  let [data, setData] = useState({});
  let [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(userContext); // get login function from context

  function formData(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  async function formHandler(event) {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login", data);
      if (res.data.success) {
        login(res.data.token, res.data.user); // call context login
        navigate("/dash");
      } else {
        setMsg(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={formHandler}>
        <table className="table table-bordered w-50 table-success mx-auto mt-5">
          <tbody>
            <tr>
              <td>Email</td>
              <td>
                <input type="email" name="mailId" onInput={formData} />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input type="password" name="pwd" onInput={formData} />
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit" name="subBtn" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {msg && <p className="alert alert-success w-50 mx-auto">{msg}</p>}
    </>
  );
}

export default Login;
