		function createChart(elements, width, height, color) {
			var chart = document.createElement('div');

			chart.style.position = 'relative';
			chart.style.width = width + 'px';
			chart.style.height = height + 'px';
			chart.style.margin = '20px auto';

			//finding max value
			var max = Number.NEGATIVE_INFINITY;
			for (var i = 0; i < elements.length; i++) {
				if (elements[i] > max) max = elements[i];
			}

			var scale = height/max,	
				width = width/elements.length;

			//creating bars
			for (var i = 0; i < elements.length; i++) {
				bar = document.createElement('div');
				bar.style.position = 'absolute';
				bar.style.backgroundColor = color;
				bar.style.width = width - 4 + 'px';
				bar.style.left = width * i + 'px';
				bar.style.bottom = '0px';
				bar.style.height = elements[i] * scale + 'px';

				chart.appendChild(bar);
			}

			return chart;
		}