import React from 'react';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.css';

class ToDosId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      error: null
    };
  }

  listOfToDos = (data) => {
    console.log(data);
    this.setState({
      list: data,
      error: null
    })
  }

  componentDidMount() {
    let url = "https://jsonplaceholder.typicode.com/todos?userId=" + this.props.match.params.userId;
    console.log("ID Child: " + this.props.match.params.userId);
    fetch(url)
      .then(response => response.json())
      .then(this.listOfToDos)
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    return (
      <div>
        <Header />
        <h3 className="App-header">Name: {this.props.location.state.name}</h3>
        {this.state.list.length === 0 &&
          <h1 className="error">To Dos List is Empty</h1>}
        {this.state.list.length > 0 &&
          this.state.list.map((item) => (
            <div key={item.id} className="card bg-light m-1">
              <div className="card-body p-2">
                <div className="d-flex p-2">
                  <div className="justify-content-start">
                    <h5 className="card-title">Title: {item.title}</h5>
                    {item.completed &&
                      <p className="card-text">Completed: true</p>}
                    {!item.completed &&
                      <p className="card-text">Completed: false</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        {this.state.error &&
          <h3 className="error">{this.state.error}</h3>}
      </div>
    );
  }
}

export default ToDosId;