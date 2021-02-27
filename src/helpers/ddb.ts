import { DynamoDB } from 'aws-sdk';
import { Auth } from 'aws-amplify';
import { ExpressionAttributeNameMap } from 'aws-sdk/clients/dynamodb';

export const deleteItem = async (
    tableName: string,
    key: Record<string, string|number>,
) => {
    const client = new DynamoDB.DocumentClient({
        region: process.env.REACT_APP_REGION!,
        ...await Auth.currentUserCredentials(),
    });

    return client.delete({
        TableName: `${process.env.REACT_APP_STAGE}-${tableName}`,
        Key: key,
    }).promise();
};

export const updateItem = async (
    tableName: string,
    key: Record<string, string|number>,
    data?: Record<string, string|number>,
) => {
    const client = new DynamoDB.DocumentClient({
        region: process.env.REACT_APP_REGION!,
        ...await Auth.currentUserCredentials(),
    });
    const ExpressionAttributeNames: ExpressionAttributeNameMap = {};
    const ExpressionAttributeValues: Record<string, string|number> = {};
    let UpdateExpression;

    if (data) {
        const keys = Object.keys(data);
        // eslint-disable-next-line
        for (const i in keys) {
            ExpressionAttributeNames[`#${keys[i]}`] = keys[i];
            ExpressionAttributeValues[`:${keys[i]}`] = data[keys[i]];
        }
        UpdateExpression = `SET ${Object.keys(data).map(((name) => `#${name} = :${name}`)).join(',')}`;
    }

    await client.update({
        TableName: `${process.env.REACT_APP_STAGE}-${tableName}`,
        Key: key,
        ExpressionAttributeNames: data ? ExpressionAttributeNames : undefined,
        ExpressionAttributeValues: data ? ExpressionAttributeValues : undefined,
        UpdateExpression: data ? UpdateExpression : undefined,
    }).promise();
};

export const query = async (
    tableName: string,
    condition: Record<string, string|number>,
    indexName?: string,
) => {
    const client = new DynamoDB.DocumentClient({
        region: process.env.REACT_APP_REGION!,
        ...await Auth.currentUserCredentials(),
    });

    const ExpressionAttributeNames: ExpressionAttributeNameMap = {};
    const ExpressionAttributeValues: Record<string, string|number> = {};
    const keys = Object.keys(condition);
    // eslint-disable-next-line
    for (const i in keys) {
        ExpressionAttributeNames[`#${keys[i]}`] = keys[i];
        ExpressionAttributeValues[`:${keys[i]}`] = condition[keys[i]];
    }
    const KeyConditionExpression = `${Object.keys(condition).map(((name) => `#${name} = :${name}`)).join(',')}`;

    const { Items } = await client.query({
        TableName: `${process.env.REACT_APP_STAGE}-${tableName}`,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        KeyConditionExpression,
        IndexName: indexName,
    }).promise();

    return Items;
};
