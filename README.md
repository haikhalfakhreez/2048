# The Classic **2048** Game!

[Play it here](https://haikhalfakhreez.github.io/2048/)

This game codes were inspired from **Ania Kubów** with some modifications to make it my own, so definitely check out her YouTube channel.

- [Code with Ania Kubów #JavaScriptGames](https://www.youtube.com/watch?v=aDn2g8XfSMc)
- [Her GitHub](https://github.com/kubowania)

## What I added/changed on my own:

- Styling using CSS
- Responsive design
- New JavaScript function
    - Change color tiles based on its number
    - Make zeros invisible

### Skills used in making of this game:

- Using **JavaScript** to make game logic - purely using JS
- CSS3 - inlcude google fonts integration
- HTML5
- Git & GitHub

#### Flaws:
There's some game logic that doesn't really follow the vanilla game rules ([see notes on bugs](#bugs)). However, it requires a highly advanced understanding on JavaScript to fix. Until I have some more skill on JS and other technologies (frameworks etc.), this game will remain as it is.

#### Bugs:

1. Let say we only use the right direction key; the game will continue to generate new number 2 randomly even though the tiles are all placed to one side and there's no possible combination can occur. Vanilla game logic requires the tiles to be moved in other direction first before creating new number 2.
2. Win/lose logic is not correct. The game will end when there's no zeros anymore. 

    **Correct logic**: game will end when there's no possible combination can occur, not when there's no zero anymore.

### MIT License

Copyright (c) 2020 Haikhal Fakhreez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

In other words, you are free to use this as long as you referenced it!

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.