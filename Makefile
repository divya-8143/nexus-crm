# NexusCRM Build and Execution Automation Makefile

.PHONY: all install build dev test clean docker-build docker-up

all: install build test

install:
	@echo "Installing root, backend, and frontend dependencies..."
	npm --prefix shared install
	npm --prefix backend install
	npm --prefix frontend install

build:
	@echo "Building frontend and backend packages..."
	npm run build

dev:
	@echo "Starting local development server on port 3000..."
	npm --prefix frontend run dev

test:
	@echo "Running automated test suites..."
	node backend/tests/runner.js

docker-build:
	@echo "Building container image..."
	docker build -t nexus-crm:latest .

docker-up:
	@echo "Starting container stack..."
	docker compose up -d

clean:
	@echo "Cleaning temporary files..."
	rm -rf dist build
