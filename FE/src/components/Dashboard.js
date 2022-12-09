import React, { useState, useEffect } from "react";
import axios from "axios";

import "../css/dashboard.css";

function Dashboard() {
  const [data, getData] = useState([]); //to store responce data
  useEffect(() => {
    axios
      .get("http://localhost:5000/") //backend url to get data
      .then((v) => {
        getData(v.data.data);
        console.log(v.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div id="main">
        <div>
          <h2>Dashboard</h2>
        </div>
        <tbody>
          <tr>
            <th>deviceId</th>
            <th>clientIp</th>
            <th>hostname</th>
            <th>download</th>
            <th>upload</th>
            <th>usageSeconds</th>
            <th>createdAt</th>
          </tr>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.deviceId}</td>
              <td>{item.clientIp}</td>
              <td>{item.hostName}</td>
              <td>{item.download}</td>
              <td>{item.upload}</td>
              <td>{item.useageSeconds}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
}

export default Dashboard;
