let body = document.querySelector('body');
let h1 = document.querySelector('h1');
body.addEventListener('click', function (event) {
	for (let i = 0; i < 80; i++) {
		let spark = document.createElement('i');
		spark.style.top = event.clientY - body.offsetTop + 'px';
		spark.style.left = event.clientX - body.offsetLeft + 'px';

		let randomX = ((Math.random() - 0.5) * window.innerWidth) / 1.5;
		let randomY = ((Math.random() - 0.5) * window.innerHeight) / 1.5;

		spark.style.setProperty('--randomX', randomX + 'px');
		spark.style.setProperty('--randomY', randomY + 'px');

		let randomSize = Math.random() * 30 + 2;
		spark.style.width = randomSize + 'px';
		spark.style.height = randomSize + 'px';
		let duration = Math.random() * 2 + 0.5;
		spark.style.animation = `animate  ${duration}s ease-out forwards`;

		let colors = [
			'Aqua',
			'Cornflower',
			'Blue',
			'Crimson',
			'DodgerBlue',
			'Lime',
			'Magenta',
			'OrangeRed',
			'Salmon',
			'Teal',
			'Thistle',
			'LightSteelBlue',
			'DarkSeaGreen',
			'Yellow',
		];
		let randomColor = colors[Math.floor(Math.random() * colors.length)];
		spark.style.background = randomColor;

		h1.style.color = randomColor;

		body.appendChild(spark);

		setTimeout(function () {
			spark.remove();
		}, 3000);
	}
});