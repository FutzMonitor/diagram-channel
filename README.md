<!-- PROJECT LOGO -->
<br />
<div align="center" class="top">
  <a href="https://github.com/FutzMonitor/diagram-channel">
    <img src="discord-bot/media/diagram_channel.png" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center"><b>Diagram Channel</b></h3>

  <p align="center">
    A Discord bot that uses MermaidAPI to generate diagrams for users.
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a> -->
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

This project serves as the <b>BSF</b> (Build-something-fun) aspect of my senior capestone project at Dickinson College. Discord is a large instant messaging and social playform [(wiki)](https://en.wikipedia.org/wiki/Discord). Many tech savy users build bot applications to automate essential and nonessential functionality for management of large servers, entertainment, or other peersonal reasons. As an avid Discord user, and with the relative support and size of MermaidJS, I would have thought that a bot application for MermaidJS would have already been built by someone by now. However, I could only find two bots: Yash-Singh1's [mermaidjs-discord](https://github.com/Yash-Singh1/mermaidjs-discord) and ttakami-42's [Mermaider](https://github.com/ttakami-42/Mermaider). Since both don't quite reach the desired functionality I seek, this project seeks to bridge that personal gap. 

__Goals__:
- [x] Create a `generate.js` slash command that uses MermaidJS API to generate diagrams for the user.

- [ ] Host the bot someplace to have permanent presence on Discord (instead of solely being online when I run it locally). 


<details>
  <summary><b>Demo</b></summary>
  <video width="800" height="600" controls>
  <source src="discord-bot/media/bot-demo.mp4" type="video/mp4">
</video>
</details>

<!-- <p align="right">(<a href="#top">back to top</a>)</p> -->

### Built With

This project is built with the following technologies, languages, and frameworks.

* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?logo=javascript&logoColor=%23F7DF1E&style=for-the-badge)
* ![Node.js](https://img.shields.io/badge/node.js-%2343853d.svg?logo=node.js&logoColor=white&style=for-the-badge)
* ![env](https://img.shields.io/badge/.env-%23ecd53f.svg?logo=dotenv&logoColor=%23333333&style=for-the-badge)
* ![vscode](https://img.shields.io/badge/visual%20studio%20code-%230078d7.svg?logo=visual-studio-code&logoColor=white&style=for-the-badge)

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> --> 

<!-- GETTING STARTED -->
## Getting Started

There are two options available for running this bot. You could either run it locally or you can run it as a docker container. 

### Local Installation

#### Prerequisites
There are some JavaScript dependencies that need to be installed before running the bot.
Running the following command should install all of the dependencies:
```
npm install
```

Make sure that the [Node.js](https://nodejs.org/en/download/package-manager) is installed and running the previously listed command in the `discord-bot` directory.

#### Running the bot
Ensure that you're inside of the `src` directory. Run the following commands:
```
node deploy-commands.js
node index.js
```
The first command will register all slash application commands inside of the `commands/utility` directory and the second command will run the bot. The bot should now be online!

### Docker Container
Make sure you have Docker installed on your machine. Run the following command to build the docker image 
```
docker build . -t diagram-channel
```
And to run your bot simply run the image from Docker Hub or execute the command below
```
docker run diagram-channel
```
Your bot should now be running!
<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->


<!-- USAGE EXAMPLES 
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- ROADMAP 
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->


<!-- LICENSE 
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTACT -->
## Contact

Christian - gonzalec@dickinson.edu

Project Link: [https://github.com/FutzMonitor/diagram-channel](https://github.com/FutzMonitor/diagram-channel)

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> --> 



<!-- ACKNOWLEDGMENTS 
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->


