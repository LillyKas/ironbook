import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import users from "./users";

function App() {
  const [user, setSearchUsers] = useState(users);
  const [title, setTitle] = useState("");
  const [selectedCampus, setCampus] = useState("");

  const [isTeacher, setTeacher] = useState("");
  const [isStudent, setStudent] = useState("");

  const styleImg = { width: "20px", height: "auto" };

  const handleSearch = (event) => {
    setTitle(event.target.value);
  };

  const handleCampus = (event) => {
    console.log(event.target.value);
    setCampus(event.target.value);
  };

  const handleTeacher = (event) => {
    setTeacher(event.target.checked);
  };

  const handleStudent = (event) => {
    setStudent(event.target.checked);
  };

  let filter = users.filter(
    (element) =>
      element.firstName.toLowerCase().includes(title.toLowerCase()) ||
      element.lastName.toLowerCase().includes(title.toLowerCase()) 
  );

  if (isTeacher || isStudent) {
    filter = filter.filter(
      (element) =>
        (element.role === "student" && isStudent) ||
        (element.role === "teacher" && isTeacher)
    );
  }

  if(selectedCampus !== "") {  filter = filter.filter(element => element.campus === selectedCampus )  }
 

  const campus = users.map((user) => user.campus);
  const campusCleaned = campus.filter(
    (item, index) => campus.indexOf(item) === index
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>IronBook</h1>

        <form>
       
          <input type="text" value={title} onChange={handleSearch} />
        <div>
          <input type="checkbox" checked={isTeacher} onChange={handleTeacher} />
          <label htmlFor="">Student</label>
          <input type="checkbox" checked={isStudent} onChange={handleStudent} />
          <label htmlFor="">Campus</label>
          <select value={selectedCampus} onChange={handleCampus}>
            {campusCleaned.map((campus) => {
              return <option>{campus}</option>;
            })}
          </select>
          </div>
        </form>

        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Links</th>
            </tr>
          </thead>

          <tbody>
            {filter.map((user) => {
              return (
                <tr>
                  <td>
                    <p> {user.firstName} </p>
                  </td>
                  <td>
                    <p> {user.lastName} </p>
                  </td>
                  <td>
                    <p> {user.campus} </p>
                  </td>
                  <td>
                    <p> {user.role} </p>
                  </td>
                  <td>
                    {user.linkedin !== undefined && (
                      <a href={user.linkedin}>
                        <img
                          style={styleImg}
                          src="src/linkedin.png"
                          alt=" "
                        ></img>
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
