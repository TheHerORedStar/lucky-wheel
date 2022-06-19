# app-BE

## Developers

If you want to run the latest code from git, here's how to get started:

1.  Clone the code:

        git clone https://github.com/

2.  Install the dependencies

        npm install

3.  Run

        Run dev:
         - Run: npm run dev
         - Open <http://localhost:8701/api>

        Run prod:
         - Run: npm start
         - Open <http://localhost:8601/api>

## Deploy local

If you want to deploy the latest code from git into your local, here's how to get started:

1.  Clone the code:

        git clone https://github.com

2.  Build image

- Build be:

        sudo docker build -t be:local -f Dockerfile .
        sudo docker rm -f  be 2> /dev/null || true

3.  Run services

        docker-compose -f docker-compose.yml up -d
        Open BE <http://{your host}:8601/api>
