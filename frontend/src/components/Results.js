import React from "react";
import { Result, Button } from "antd";

function Results(props) {
  console.log("result", props);
  return (
    <div>
      <Result
        status="success"
        title={"Successfully Login, Welcom! " + props.user.firstname}
        subTitle={
          "Order number : " +
          props.user._id +
          " Cloud server configuration takes 1-5 minutes, please wait."
        }
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>
        ]}
      />
    </div>
  );
}

export default Results;
