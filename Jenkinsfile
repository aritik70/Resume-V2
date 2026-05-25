pipeline {
  agent {
    label "ritik"
  }
  
  stages{
    stage('Code checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/aritik70/Resume-V2'
      }
    }
    stage('Install dependency') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Docker build'){
      steps {
        sh 'docker build -t first .'
      }
    }
  }
}
