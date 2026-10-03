pipeline {
    agent any
 
    tools {
        nodejs 'node20'
    }
 
    triggers {
        // Check GitHub for new commits roughly every 2 minutes
        pollSCM('H/2 * * * *')
    }
 
    environment {
        SELENIUM_URL          = 'http://selenium:4444/wd/hub'
        APP_URL               = 'http://jenkins:3000'
        JEST_JUNIT_OUTPUT_DIR = 'reports'
    }
 
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
 
        stage('Unit Test') {
            steps {
                sh 'JEST_JUNIT_OUTPUT_NAME=unit.xml npm test'
            }
        }
 
        stage('UI Test') {
            steps {
                sh '''
                    node src/app.js > app.log 2>&1 &
                    APP_PID=$!
                    sleep 3
 
                    STATUS=0
                    JEST_JUNIT_OUTPUT_NAME=e2e.xml npm run test:e2e || STATUS=$?
 
                    kill $APP_PID
                    exit $STATUS
                '''
            }
        }
    }
 
    post {
        always {
            junit 'reports/*.xml'
        }
    }
}
