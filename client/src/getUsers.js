import React, { Component } from "react";
import axios from "axios";

class getUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: null, // Изначально данные пустыми
      error: null, // Изначально ошибки нет
    };
  }

  componentDidMount() {
    // Выполнение GET-запроса
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        // Обработка успешного ответа
        console.log("Успешный GET-запрос", response.data);
        this.setState({ responseData: response.data });
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка GET-запроса", error);
        this.setState({ error: error });
      });
  }

  render() {
    const { responseData, error } = this.state;

    return (
      <div>
        <h2>Результат GET-запроса</h2>
        {error ? (
          <p>Произошла ошибка при выполнении GET-запроса: {error.message}</p>
        ) : responseData ? (
          <div>
            {Object.keys(responseData).map((userId) => (
              <div key={userId}>
                <p>ID: {responseData[userId].id}</p>
                <p>Name: {responseData[userId].name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Загрузка данных...</p>
        )}
      </div>
    );
  }
}

export default getUsers;
