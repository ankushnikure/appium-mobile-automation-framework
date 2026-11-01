
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

        stage('Clean Previous Artifacts') {
            steps {
                sh '''
                    rm -rf artifacts
                    rm -rf allure-results
                    rm -rf allure-report
                '''
            }
        }

        stage('Run Appium Tests') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'mydemoapp-login-credentials',
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

    post {
        always {
            script {
                sh '''
                    if [ -d allure-results ] && [ "$(find allure-results -type f | wc -l)" -gt 0 ]; then
                        npx allure generate allure-results --clean -o allure-report || true
                    fi
                '''
            }

            archiveArtifacts(
                artifacts: 'artifacts/**/*, allure-results/**/*, allure-report/**/*',
                allowEmptyArchive: true
            )
        }
    }
}
