build-dev:
	docker build -t mern-dev -f Dockerfile.dev .
run-dev:
	docker run -p3000:3000 -d mern-dev



build-prod:
	docker build -t mern-ude-insnap -f Dockerfile .
run-prod:
	docker run -p 3000:3000 -e DATABASE='mongodb+srv://basic:Amol%40123@basic.35bfx.mongodb.net/udemy?retryWrites=true&w=majority' -e JWTSEC='this secret for the udemy mern traversy media' mern-ude-insnap