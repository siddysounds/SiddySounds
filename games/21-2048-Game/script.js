// Original game layout retained; merge rules and redraws are event driven.
function merge2048Line(values) {
  const tiles = values.filter(Boolean);
  const output = [];
  let gained = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === tiles[i + 1]) { const value = tiles[i] * 2; output.push(value); gained += value; i++; }
    else output.push(tiles[i]);
  }
  while (output.length < 4) output.push(0);
  return { values: output, gained };
}
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const result = document.getElementById('result');
  const board = Array(16).fill(0);
  let score = 0;
  let finished = false;
  const cells = board.map(() => { const cell = document.createElement('div'); grid.appendChild(cell); return cell; });
  const colors = {0:'#afa192',2:'#eee4da',4:'#ede0c8',8:'#f2b179',16:'#ffcea4',32:'#e8c064',64:'#ffab6e',128:'#fd9982',256:'#ead79c',512:'#76daff',1024:'#beeaa5',2048:'#d7d4f0'};
  function render() {
    cells.forEach((cell, i) => { cell.textContent = board[i] || ''; cell.style.backgroundColor = colors[board[i]] || '#d7d4f0'; cell.setAttribute('aria-label', board[i] ? String(board[i]) : 'empty'); });
    scoreDisplay.textContent = score;
  }
  function generate() {
    const empty = board.map((value, index) => value === 0 ? index : -1).filter(index => index >= 0);
    if (empty.length) board[empty[Math.floor(Math.random() * empty.length)]] = Math.random() < 0.9 ? 2 : 4;
  }
  function canMove() {
    return board.some((value, index) => value === 0 || (index % 4 < 3 && value === board[index + 1]) || (index < 12 && value === board[index + 4]));
  }
  function move(direction) {
    if (finished) return;
    const before = board.join(',');
    for (let line = 0; line < 4; line++) {
      let indices = Array.from({length:4}, (_, offset) => direction === 'left' || direction === 'right' ? line * 4 + offset : offset * 4 + line);
      if (direction === 'right' || direction === 'down') indices.reverse();
      const merged = merge2048Line(indices.map(index => board[index]));
      indices.forEach((index, offset) => { board[index] = merged.values[offset]; });
      score += merged.gained;
    }
    if (board.includes(2048)) { finished = true; result.textContent = 'You WIN! Refresh to play again.'; }
    else {
      if (before !== board.join(',')) generate();
      if (!canMove()) { finished = true; result.textContent = 'You LOSE. Refresh to play again.'; }
    }
    render();
  }
  const directions = {ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};
  document.addEventListener('keydown', event => {
    if (event.target.closest('input,textarea,button,dialog')) return;
    if (directions[event.key]) { event.preventDefault(); move(directions[event.key]); }
  });
  let touchStart;
  grid.style.touchAction = 'none';
  grid.addEventListener('pointerdown', event => { touchStart = [event.clientX, event.clientY]; grid.setPointerCapture(event.pointerId); });
  grid.addEventListener('pointerup', event => {
    if (!touchStart) return;
    const dx = event.clientX - touchStart[0]; const dy = event.clientY - touchStart[1]; touchStart = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) > 20) move(Math.abs(dx) > Math.abs(dy) ? dx > 0 ? 'right' : 'left' : dy > 0 ? 'down' : 'up');
  });
  generate(); generate(); render();
});
