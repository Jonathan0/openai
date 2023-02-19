const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl : 'https://sonarcloud.io',
    token : process.env.OPENAI_SONAR_TOKEN,
    options: {
      'sonar.projectName': 'openai',
      'sonar.projectKey': 'jonathan0_openai',
      'sonar.organization': 'jonathan0',
      'sonar.projectDescription': 'Description for "OpenAI" project!',
      'sonar.sources': 'pages,cypress',
    }
  },
  () => process.exit()
)