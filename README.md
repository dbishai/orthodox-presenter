# orthodox-presenter
Free and open-source web app for use in Coptic Orthodox church services

## Setup
```
npm install
npm start
```
I recommend installing the npm package, `local-web-server`, and starting it up in `/orthodox-presenter`.

#### Ubuntu instructions
```
sudo -H npm install -g local-web-server
cd orthodox-presenter
ws
```

## Background
Orthodox Presenter is being designed from the ground up for speed, scalability, and ease of use. It features a responsive interface that can scale to fit any size screen.

Orthodox Presenter can run on any device with a modern web browser. It can also be run offline with a local web server.

## Technology Stack

Orthodox Presenter is built upon React using Flux to handle state. Bootstrap is used for responsive resizing and [startbootstrap-simple-sidebar](https://github.com/BlackrockDigital/startbootstrap-simple-sidebar) is used for the sidebar. Documents are stored in the JSON format.