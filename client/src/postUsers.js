import React, { Component } from "react";
import axios from "axios";

class postUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      pass: null,
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:5000/api/users")
      .then((response) => {
        console.log(response.data);
        this.setState({ responseData: response.data });
      })
      .catch((err) => console.log("err", err));
  }

  render() {
    const { responseData, error } = this.state;
    return <div></div>;
  }
}
