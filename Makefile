# Define variables
CONTAINER_NAME=my_mono_container
PORT=3000

# Build targets
build_my_first_three_project_with_nuxt:
	docker build -t my_mono_my_first_three_project_with_nuxt -f ./devOps/dockerfile_my_first_three_project_with_nuxt .

build_react_next_practice:
	docker build -t my_mono_react_next_practice -f ./devOps/dockerfile_react_next_practice .

build_redux_saga-nextjs-app:
	docker build -t my_mono_redux_saga-nextjs-app -f ./devOps/dockerfile_redux_saga-nextjs-app .

build_trying_express-zod-api_with-socket-chat:
	docker build -t my_mono_trying_express-zod-api_with-socket-chat -f ./devOps/dockerfile_trying_express-zod-api_with-socket-chat .

build_ts_pratice_script:
	docker build -t my_mono_ts_pratice_script -f ./devOps/dockerfile_ts_pratice_script .

# Run targets
run_my_first_three_project_with_nuxt:
	docker run -it --rm -p $(PORT):$(PORT) --name $(CONTAINER_NAME) my_mono_my_first_three_project_with_nuxt

run_react_next_practice:
	docker run -it --rm -p $(PORT):$(PORT) --name $(CONTAINER_NAME) my_mono_react_next_practice

run_redux_saga-nextjs-app:
	docker run -it --rm -p $(PORT):$(PORT) --name $(CONTAINER_NAME) my_mono_redux_saga-nextjs-app

run_trying_express-zod-api_with-socket-chat:
	docker run -it --rm -p $(PORT):$(PORT) --name $(CONTAINER_NAME) my_mono_trying_express-zod-api_with-socket-chat

run_ts_pratice_script:
	docker run -it --rm -p $(PORT):$(PORT) --name $(CONTAINER_NAME) my_mono_ts_pratice_script

# Clean up Docker containers and images
clean:
	docker rm -f $(CONTAINER_NAME) || true
	docker rmi my_mono_my_first_three_project_with_nuxt || true
	docker rmi my_mono_react_next_practice || true
	docker rmi my_mono_redux_saga-nextjs-app || true
	docker rmi my_mono_trying_express-zod-api_with-socket-chat || true
	docker rmi my_mono_ts_pratice_script || true