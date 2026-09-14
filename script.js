// Game constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 8;
const PADDLE_SPEED = 6;
const BALL_SPEED = 5;
const AI_SPEED = 4;
const WIN_SCORE = 11;

// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
const game = {
    playerScore: 0,
    computerScore: 0,
    gameActive: true
};

// Player paddle
const player = {
    x: 10,
    y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dy: 0,
    speed: PADDLE_SPEED
};

// Computer paddle
const computer = {
    x: CANVAS_WIDTH - PADDLE_WIDTH - 10,
    y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    speed: AI_SPEED
};

// Ball
const ball = {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    size: BALL_SIZE,
    dx: BALL_SPEED,
    dy: BALL_SPEED,
    speed: BALL_SPEED
};

// Input handling
const keys = {};
const mouse = {
    y: CANVAS_HEIGHT / 2
};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.y = e.clientY - rect.top;
});

// Update player paddle position
function updatePlayer() {
    // Mouse control (priority)
    if (mouse.y >= 0 && mouse.y <= canvas.getBoundingClientRect().height) {
        const rect = canvas.getBoundingClientRect();
        const canvasScale = canvas.height / rect.height;
        player.y = (mouse.y - rect.top) * canvasScale - PADDLE_HEIGHT / 2;
    }
    
    // Keyboard control (if mouse not used)
    if (keys['ArrowUp']) {
        player.y -= player.speed;
    }
    if (keys['ArrowDown']) {
        player.y += player.speed;
    }
    
    // Constrain player paddle to canvas
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > CANVAS_HEIGHT) {
        player.y = CANVAS_HEIGHT - player.height;
    }
}

// Update computer AI
function updateComputer() {
    const computerCenter = computer.y + computer.height / 2;
    const ballCenter = ball.y;
    
    // Simple AI: follow the ball
    if (computerCenter < ballCenter - 35) {
        computer.y += computer.speed;
    } else if (computerCenter > ballCenter + 35) {
        computer.y -= computer.speed;
    }
    
    // Constrain computer paddle to canvas
    if (computer.y < 0) computer.y = 0;
    if (computer.y + computer.height > CANVAS_HEIGHT) {
        computer.y = CANVAS_HEIGHT - computer.height;
    }
}

// Update ball position
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Wall collision (top and bottom)
    if (ball.y - ball.size < 0) {
        ball.y = ball.size;
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.size > CANVAS_HEIGHT) {
        ball.y = CANVAS_HEIGHT - ball.size;
        ball.dy = -ball.dy;
    }
    
    // Paddle collision detection
    // Player paddle
    if (
        ball.x - ball.size < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height &&
        ball.dx < 0
    ) {
        ball.dx = -ball.dx;
        ball.x = player.x + player.width + ball.size;
        
        // Add spin based on where ball hits paddle
        const hitPos = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
        ball.dy += hitPos * 3;
    }
    
    // Computer paddle
    if (
        ball.x + ball.size > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height &&
        ball.dx > 0
    ) {
        ball.dx = -ball.dx;
        ball.x = computer.x - ball.size;
        
        // Add spin based on where ball hits paddle
        const hitPos = (ball.y - (computer.y + computer.height / 2)) / (computer.height / 2);
        ball.dy += hitPos * 3;
    }
    
    // Score points
    if (ball.x < 0) {
        game.computerScore++;
        resetBall();
    }
    if (ball.x > CANVAS_WIDTH) {
        game.playerScore++;
        resetBall();
    }
    
    // Check win condition
    if (game.playerScore >= WIN_SCORE || game.computerScore >= WIN_SCORE) {
        game.gameActive = false;
    }
}

// Reset ball to center
function resetBall() {
    ball.x = CANVAS_WIDTH / 2;
    ball.y = CANVAS_HEIGHT / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * BALL_SPEED;
    ball.dy = (Math.random() - 0.5) * BALL_SPEED * 2;
}

// Draw functions
function drawPaddle(x, y, width, height) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, width, height);
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.shadowBlur = 10;
}

function drawBall() {
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'rgba(255, 107, 107, 0.8)';
    ctx.shadowBlur = 15;
}

function drawCenterLine() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    
    const winner = game.playerScore >= WIN_SCORE ? 'Player Wins!' : 'Computer Wins!';
    ctx.fillText(winner, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
    
    ctx.font = '24px Arial';
    ctx.fillText('Final Score: ' + game.playerScore + ' - ' + game.computerScore, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
    ctx.fillText('Refresh to play again', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70);
}

// Main render function
function render() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.shadowColor = 'transparent';
    
    // Draw center line
    drawCenterLine();
    
    // Draw paddles
    drawPaddle(player.x, player.y, player.width, player.height);
    drawPaddle(computer.x, computer.y, computer.width, computer.height);
    
    // Draw ball
    drawBall();
    
    // Draw game over screen if needed
    if (!game.gameActive) {
        drawGameOver();
    }
}

// Update score display
function updateScoreDisplay() {
    document.getElementById('playerScore').textContent = game.playerScore;
    document.getElementById('computerScore').textContent = game.computerScore;
}

// Main game loop
function gameLoop() {
    if (game.gameActive) {
        updatePlayer();
        updateComputer();
        updateBall();
    }
    
    updateScoreDisplay();
    render();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();