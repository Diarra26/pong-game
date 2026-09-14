# Pong Game

A classic Pong game built with HTML5, CSS3, and vanilla JavaScript. Play against an AI opponent!

## Features

✨ **Gameplay**
- Player vs Computer AI
- Smooth paddle movement
- Physics-based ball collision with spin mechanics
- Scoreboard tracking
- Win condition (first to 11 points)

🎮 **Controls**
- **Mouse**: Move your paddle by moving your mouse up and down
- **Arrow Keys**: Alternative keyboard control (Up/Down arrows)
- Left paddle is yours, right paddle is the computer

🎨 **Design**
- Beautiful gradient background
- Glowing effects on paddles and ball
- Responsive design
- Clean and modern UI

## How to Play

1. Open `index.html` in a web browser
2. Move your left paddle using your mouse or arrow keys
3. Bounce the ball past the computer's paddle to score
4. First player to 11 points wins!

## Game Mechanics

- **Ball Physics**: The ball bounces off walls and paddles with realistic physics
- **Spin**: Hitting the ball at different points on your paddle adds spin
- **AI Difficulty**: The computer opponent has adjustable difficulty (currently set to medium)
- **Collision Detection**: Precise collision detection for paddles and walls

## File Structure

```
pong-game/
├── index.html    # HTML structure
├── style.css     # Styling and layout
├── script.js     # Game logic and controls
└── README.md     # Documentation
```

## Customization

You can easily adjust game parameters in `script.js`:

- `PADDLE_SPEED`: How fast the player paddle moves
- `BALL_SPEED`: Initial ball velocity
- `AI_SPEED`: How fast the computer paddle moves
- `WIN_SCORE`: Points needed to win (default: 11)
- `CANVAS_WIDTH/HEIGHT`: Game arena size

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Canvas
- CSS3 Gradients
- ES6 JavaScript

Enjoy the game! 🎮