pipeline {
     agent {
        docker {
          image 'node:10.11.0-alpine'
        }
     }
    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing Dependencies'
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                echo 'Build Starts'
                sh 'npm run build'
                echo 'Build Ends'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing'
                sh 'npm run test'
                echo 'End'
            }
        }
    }
}
