#!/bin/bash
set -uo pipefail
set +e

FAILURE=false

echo "safety"
safety check -r requirements.txt -r requirements-dev.txt || FAILURE=true # printf "safety failed...\n" && FAILURE=true

echo "pylint"
pylint api || FAILURE=true # printf "pylint failed...\n" && FAILURE=true

echo "pycodestyle"
pycodestyle api || FAILURE=true # printf "pycodestyle failed...\n" && FAILURE=true

echo "mypy"
mypy api || FAILURE=true # printf "mypy failed...\n" && FAILURE=true

echo "bandit"
bandit -ll -r api || FAILURE=true # printf "bandit failed...\n" && FAILURE=true


if [ "$FAILURE" = true ]; then 
  echo "Linting failed"
  exit 1
fi

echo "Linting passed"
exit 0