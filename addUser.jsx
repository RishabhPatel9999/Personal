import axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "../context/globalContext";

function AddUser() {
  const { header } = useContext(userContext);
  let [data, setData] = useState({});
  let [file, setFile] = useState(null);
  let [msg, setMsg] = useState("");

  function formDataHandler(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  function fileHandler(event) {
    setFile(event.target.files[0]); // store file
  }

  async function formHandler(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("unm", data.unm);
    formData.append("pwd", data.pwd);
    formData.append("mailId", data.mailId);
    formData.append("profilePic", file); // 👈 must match backend field name

    try {
      const res = await axios.post(
        "http://localhost:8000/api/admin/addUser",
        formData,header );
      setMsg(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={formHandler}>
        <table className="table table-bordered w-50 table-info mx-auto">
          <tbody>
            <tr>
              <td>User Name</td>
              <td>
                <input type="text" name="unm" onChange={formDataHandler} />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input type="password" name="pwd" onChange={formDataHandler} />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input type="email" name="mailId" onChange={formDataHandler} />
              </td>
            </tr>
            <tr>
              <td>Profile Picture</td>
              <td>
                <input type="file" name="profilePic" onChange={fileHandler} />
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit" value="Submit" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {msg && <p className="alert alert-success">{msg}</p>}
    </>
  );
}

export default AddUser;











