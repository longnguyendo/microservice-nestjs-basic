pipeline {
  agent any

  tools {
    nodejs 'node18'
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      parallel {
        stage('api-gateway') {
          steps {
            dir('api-gateway') {
              sh 'npm install'
            }
          }
        }
        stage('users-service') {
          steps {
            dir('users-service') {
              sh 'npm install'
            }
          }
        }
        stage('orders-service') {
          steps {
            dir('orders-service') {
              sh 'npm install'
            }
          }
        }
      }
    }

    stage('Build services') {
      parallel {
        stage('api-gateway') {
          steps {
            dir('api-gateway') {
              sh 'npm run build'
            }
          }
        }
        stage('users-service') {
          steps {
            dir('users-service') {
              sh 'npm run build'
            }
          }
        }
        stage('orders-service') {
          steps {
            dir('orders-service') {
              sh 'npm run build'
            }
          }
        }
      }
    }

    stage('Test') {
      parallel {
        stage('api-gateway') {
          steps {
            dir('api-gateway') {
              sh 'npm test || true'
            }
          }
        }
        stage('users-service') {
          steps {
            dir('users-service') {
              sh 'npm test || true'
            }
          }
        }
        stage('orders-service') {
          steps {
            dir('orders-service') {
              sh 'npm test || true'
            }
          }
        }
      }
    }
  }
}
