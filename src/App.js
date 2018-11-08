import React, { Component } from "react";
import firebaseConfig from "./config";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { form: [], alert: false, alertData: {} };
    this.submitMessage = this.submitMessage.bind(this);
  }

  submitMessage(e) {
    e.preventDefault();
    const params = {
      name: this.inputName.value,
      email: this.inputEmail.value,
      city: this.inputCity.value,
      age: this.inputAge.value
    };
    if (params.name && params.email && params.city && params.age) {
      firebaseConfig
        .database()
        .ref("form")
        .push(params)
        .then(() => {
          this.alertMessage("success", "Message sent successfully");
          console.log(params);
        })
        .catch(() => {
          this.alertMessage("danger", "Message not sent ");
        });
      this.resetForm();
    } else {
      this.alertMessage("warning", "Please fill the form");
    }
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  alertMessage(type, message) {
    this.setState({
      alert: true,
      alertData: { type, message }
    });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 4000);
  }

  componentWillMount() {
    let formRef = firebaseConfig
      .database()
      .ref("form")
      .orderByKey()
      .limitToLast(6);
    formRef.on("child_added", snap => {
      const { name, email, city, age } = snap.val();
      const data = { name, email, city, age };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  render() {
    const { form, alert, alertData } = this.state;
    return (
      <div>
        <div className="container">
          <div
            className="row"
            style={{
              height: "40px",
              backgroundColor: "#232323",
              color: "white",
              textAlign: "center",
              fontSize: "20px"
            }}
          >
            User
          </div>
          <div className="container" style={{ padding: `10px 0px` }} />

          <div className="row">
            <div className="col-sm-4">
              {alert && (
                <div className={`alert alert-${alertData.type}`} role="alert">
                  <div className="container">{alertData.message}</div>
                </div>
              )}
              <h2>Contact Form</h2>
              <form onSubmit={this.submitMessage} ref="contactForm">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    ref={name => (this.inputName = name)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emai1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    ref={email => (this.inputEmail = email)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <select
                    className="form-control"
                    id="city"
                    ref={city => (this.inputCity = city)}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Japan">Japan</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    placeholder="Age"
                    ref={age => (this.inputAge = age)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </div>
            <div className="col-sm-1" />
            <div className="col-sm-7">
              <div className="row">
                <h2>User Info</h2>
                {form.map(info => (
                  <div
                    className="col-sm-6"
                    key={info.name}
                    style={{ margin: `0px 0px 30px 0px` }}
                  >
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">{info.name}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {form.city}
                        </h6>
                        <p className="card-text">{info.age}</p>
                        <a href={`mailto:${info.email}`} className="card-link">
                          {info.email}
                        </a>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
