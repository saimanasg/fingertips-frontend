pipeline {
    agent { label 'k3s-cluster' }
    environment {
        ECR_REPO = "038462758464.dkr.ecr.us-east-1.amazonaws.com/frontend"
        K8S_NAMESPACE = "webapp"
    }
    
    stages {
        stage("Docker Build") {
            steps {
                sh "docker build -t ${ECR_REPO}:latest ."
            }
        }

        stage("ECR Push") {
            steps {
                sh """
                    docker login -u AWS -p \$(aws ecr get-login-password --region us-east-1) ${ECR_REPO}
                    docker push ${ECR_REPO}:latest
                """
            }
        }

        stage("Delete Existing Secrets and Create New") {
            steps {
                script {
                    sh "kubectl delete secret ecr-secret -n ${K8S_NAMESPACE} --ignore-not-found"
                    
                    def ecrPassword = sh(script: "aws ecr get-login-password --region us-east-1", returnStdout: true).trim()
                    sh """
                        kubectl create secret docker-registry ecr-secret \
                            --docker-server=038462758464.dkr.ecr.us-east-1.amazonaws.com \
                            --docker-username=AWS \
                            --docker-password=${ecrPassword} \
                            --docker-email=our-email@example.com \
                            --namespace=${K8S_NAMESPACE}
                    """
                }
            }
        }

        stage("Kubernetes Deployment") {
            steps {
                script {
                    sh "kubectl replace --force -f ./manifest/"
                }
            }
        }
    }
}

