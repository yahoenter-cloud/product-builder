let round = 0;

function getColorClass(num) {
  if (num <= 10) return 'range-1';
  if (num <= 20) return 'range-2';
  if (num <= 30) return 'range-3';
  if (num <= 40) return 'range-4';
  return 'range-5';
}

function drawLotto() {
  const btn = document.getElementById('drawBtn');
  btn.disabled = true;

  const pool = Array.from({ length: 45 }, (_, i) => i + 1);
  const picked = [];
  for (let i = 0; i < 7; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }

  const main = picked.slice(0, 6).sort((a, b) => a - b);
  const bonus = picked[6];

  const container = document.getElementById('balls');
  container.innerHTML = '';

  let delay = 0;
  main.forEach((num, i) => {
    const ball = document.createElement('div');
    ball.className = 'ball ' + getColorClass(num);
    ball.textContent = num;
    ball.style.opacity = '0';
    container.appendChild(ball);

    setTimeout(() => {
      ball.style.opacity = '1';
      ball.classList.add('pop');
    }, delay);
    delay += 300;
  });

  setTimeout(() => {
    const sep = document.createElement('span');
    sep.className = 'bonus-separator';
    sep.textContent = '+';
    container.appendChild(sep);

    const bonusBall = document.createElement('div');
    bonusBall.className = 'ball ' + getColorClass(bonus);
    bonusBall.textContent = bonus;
    bonusBall.style.opacity = '0';
    container.appendChild(bonusBall);

    setTimeout(() => {
      bonusBall.style.opacity = '1';
      bonusBall.classList.add('pop');
      btn.disabled = false;
    }, 300);
  }, delay);

  round++;
  addHistory(round, main, bonus);
}

function addHistory(r, main, bonus) {
  const list = document.getElementById('historyList');
  const li = document.createElement('li');

  let html = '<span class="round">#' + r + '</span> ';
  main.forEach(num => {
    html += '<span class="mini-ball ' + getColorClass(num) + '">' + num + '</span> ';
  });
  html += '<span class="mini-sep">+</span> ';
  html += '<span class="mini-ball ' + getColorClass(bonus) + '">' + bonus + '</span>';

  li.innerHTML = html;
  list.insertBefore(li, list.firstChild);
}
