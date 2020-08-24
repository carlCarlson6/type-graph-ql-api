at ./source create file etherealEmailAccount.ts with the following code:

    export default {
        name: '<name>',
        user: '<userName>',
        pass: '<password>'
    }

get and account from [ethereal mail](https://ethereal.email/)

======================================================

at ./ create file ormconfig.json with the following code:

    {
        "type": "postgres",
        "host": "<host>",
        "port": 5432,
        "synchronize": true,
        "logging": true,
        "url": "<url>",
        "entities": ["*/entities/*.*"],
        "ssl": true,
        "extra": {
            "ssl": {
                "rejectUnauthorized": false
            }
        }
    }

======================================================

get redis from [here](https://github.com/ServiceStack/redis-windows) 3rd option

run by executing the redis-server.exe file