# openai
React Open AI Demo tests

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