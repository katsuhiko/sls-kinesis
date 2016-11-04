# Sls Kinesis

To use the Kinesis Stream in Serverless Framework.

## Installation

Make sure that you use Serverless v1.

1. Run `serverless install --url https://github.com/katsuhiko/sls-kinesis` to install the service in your current working directory
2. Next up cd into the service with `cd sls-kinesis`
3. Run `npm install`
4. Deploy with `serverless deploy`

## How to use

Simply perform requests against the exposed endpoints:

### Create

```bash
curl -X POST https://XXXX.execute-api.ap-northeast-1.amazonaws.com/dev/todos --data '{ "content" : "Learn Serverless" }'
```

### Update

```bash
curl -X PATCH https://XXXX.execute-api.ap-northeast-1.amazonaws.com/dev/todos/<id> --data '{ "content" : "Understand Serverless" }'
```

### Delete

```bash
curl -X DELETE https://XXXX.execute-api.ap-northeast-1.amazonaws.com/dev/todos/<id>
```
