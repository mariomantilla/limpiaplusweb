serve:
	-docker kill server
	-docker rm server
	docker run --name server -d -v ${PWD}/_site:/var/www:ro -p 0.0.0.0:4000:8080 trinitronx/python-simplehttpserver
	docker run --rm --volume="${PWD}:/srv/jekyll:Z" jekyll/jekyll jekyll build --watch;

down:
	docker kill server
	docker rm server