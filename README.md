# node_assignment

### Node Version
v8.16.2

### Setup

Install node modules dependencies
```
npm install
```
Create new database in MySQL with database name:

```
node_mysql
```

Run migration scripts to create tables in database
```
npm run upsDevelopment
```

Start application
```
npm run start
```
OR
```
npm run nodemon
```

### API Response example

Endpoint: GET /api/commonstudents

• Success response status: HTTP 200

• Request example 1: GET /api/commonstudents?teacher=teacherken%40example.com

• Success response body 1:
```
{
    "status": 200,
    "message": "Successfully retrieved common students list",
    "data": {
        "students": [
            "studenthon@example.com",
            "studentjon@example.com"
        ]
    }
}
```

### Testing framework

Mocha and Chai


