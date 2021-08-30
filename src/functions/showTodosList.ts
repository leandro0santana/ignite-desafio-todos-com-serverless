import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document.query({
    TableName: "todos_list",
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id
    }
  }).promise();

  const userTodoList = response.Items;

  if(userTodoList) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        userTodoList,
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "User does not have todos registration!",
    })
  }
}