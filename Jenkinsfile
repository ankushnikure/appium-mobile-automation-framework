
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Verify Environment') {
            steps {
                sh '''
                    node --version
                    npm --version
                    java -version
                    adb devices
                    npx appium --version
                '''
            }
        }

        stage('Run Appium Tests') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'qa-login-credentials',
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD'
                    )
                ]) {
                    sh '''
                        set +x
                        trap 'rm -f .env.qa' EXIT
                        printf 'USERNAME=%s\\nPASSWORD=%s\\n' "$USERNAME" "$PASSWORD" > .env.qa
                        npm test
                    '''
                }
            }
        }
    }
}
