import React, { useState, useEffect } from "react";
import { csv } from "d3-request";

import "../css/dashboard.css";
import url from "../assets/dashboard-1.csv";

function Dashboard() {
  const [data, getData] = useState([]);
  useEffect(() => {
    csv(url, function (err, data) {
      getData(data);
      console.log(data[1]);
    });
  }, []);
  return (
    <div>
      <div id="main">
        <div>Dashboard</div>
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
