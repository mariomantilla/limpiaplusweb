serve:
	-docker kill server
	-docker rm server
	docker run --rm -d -v ${PWD}/_site:/serve -p 80:8000 jdkelley/simple-http-server:latest
	docker run --rm --volume="${PWD}:/srv/jekyll:Z" jekyll/jekyll jekyll build --watch;

test:
	docker run --name server -d -v ${PWD}/_site:/var/www:ro -p 0.0.0.0:4000:8080 jdkelley/simple-http-server:latest

down:
	docker kill server
	docker rm server