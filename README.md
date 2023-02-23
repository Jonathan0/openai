# openai
React Open AI Demo tests

[![CircleCI](https://dl.circleci.com/status-badge/img/null/Jonathan0/openai/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/null/Jonathan0/openai/tree/main)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jonathan0_openai&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jonathan0_openai)

1. Install the requirements

   ```bash
   $ npm install
   ```

2. Run the app

   ```bash
   $ npm run dev
   ```
   
3. Run the cypress UI test

   ```bash
   $ npm run test
   ```

4. To deploy into firebase
   ```bash
   $ npm run build
   ```

   ```bash
   $ npm run deploy
   ```

5. [SonarCloud Scan the repo](https://www.npmjs.com/package/sonarqube-scanner)
   First setup the environment variable `OPENAI_SONAR_TOKEN`, then run: 
   ```bash
   $ npm run sonar
   ```