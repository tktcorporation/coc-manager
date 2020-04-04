PROJECT_NAME=coc-manager
AWS_REGION=ap-northeast-1
ENV=dev

default:
	cd ./app && make

validate:
	sam validate

package:
	echo "package cloudformation template..."
	aws cloudformation package \
		--template-file template.yml \
		--output-template-file packaged.yml \
		--s3-bucket "${PROJECT_NAME}-${ENV}" \
		--s3-prefix sam

deploy:
	echo "deploy stack ${PROJECT_NAME}-${ENV}..."
	sam deploy \
		--template-file packaged.yml \
		--stack-name "${PROJECT_NAME}-${ENV}" \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

local-package: validate
	cd ./app && make package

deploy-stack: create-s3-bucket local-package package deploy

local-api: local-package
	sam local start-api --debug
	# --docker-network sam-app-net

test: validate
	cd app && make test

create-s3-bucket:
	aws cloudformation deploy \
	--parameter-overrides \
		S3BucketName="${PROJECT_NAME}-${ENV}" \
	--stack-name "${PROJECT_NAME}-${ENV}-s3" \
	--template cloudformation/s3.yml \
	--region ${AWS_REGION} \
	--no-fail-on-empty-changeset

