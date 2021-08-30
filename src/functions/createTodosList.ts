import { APIGatewayProxyHandler } from "aws-lambda";
import {  v4 as uuidv4 } from "uuid";

import { document } from "../utils/dynamodbClient";

interface ICreateTodoList {
  title: string;
  deadline: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const { title, deadline } = JSON.parse(event.body) as ICreateTodoList;

  await document.put({
    TableName: "todos_list",
    Item: {
      id: uuidv4(),
      user_id,
      title,
      done: false,
      deadline,
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created!"
    }),
    headers: {
      "Content-type": "application/json"
    }
  }
};