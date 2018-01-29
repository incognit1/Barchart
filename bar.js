	function createSVGChart(elements, width, height, color) {
    	var chart = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    		isMax;

    	chart.setAttribute('id', 'chartbar');
		chart.style.width = width + 'px';
		chart.style.height = height + 'px';
		chart.style.margin = '20px auto';
	
		var maxI = findMax();
		var max = elements[maxI];

		var scale = height/max,	
			width = Math.floor(width/elements.length);

		//creation of rect elements
		for (var i = 0; i < elements.length; i++) {
			var	rect = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
		        text = document.createElementNS("http://www.w3.org/2000/svg", "text");

		    draw(i, rect, text);
		    text.onclick  = textListener;

			chart.appendChild(rect);
			chart.appendChild(text);
		}

		function textListener(e){
			var arrRect = document.getElementsByTagName('rect'),
			    arrText = document.getElementsByTagName('text');

			var oldValue = e.target.textContent,
				newValue = prompt("Хотите изменить значение?", e.target.textContent);
				item = Number(e.target.getAttribute('id').replace(/\D+/g,""));

			//check for input
			if (!newValue || !~newValue.search(/\d+/g)) return;
			newValue = newValue.replace(/\D+/g,"");
			e.target.textContent = newValue;

			//save to array
			elements[item] = newValue;

			//is it element with max value?
			isMax = maxI == item;
			if (isMax && +newValue < +oldValue) {
				maxI = findMax();
				max = elements[maxI]; 
				scale = height/max;
			}

			//if new value > max
			if (+newValue > +max) {
				maxI = item;
				max = newValue; 
				scale = height/max;
			}

			for (var i = 0; i < elements.length; i++) {
				draw(i, arrRect[i], arrText[i]);
			}
		}


		function findMax(){
			var max = Number.NEGATIVE_INFINITY,
				n;

			for (var i = 0; i < elements.length; i++) {
				if (elements[i] > max) {
					max = elements[i];
					n = i;
				}
			}
			return n;
		}

		function draw(i, rect, text) {
			var textPos = 25,
				textColor = '#f3f3f3';
				rect.setAttribute('width', width - 4 + 'px');
				rect.setAttribute('height', elements[i] * scale + 'px');
				rect.setAttribute('fill', color);
			    rect.setAttribute('y', height - elements[i] * scale + 'px');
			    rect.setAttribute('x', width * i + 'px');
			    console.log('-------------------------')
			    console.log('max = ', max);
			    console.log(+elements[i] < +max/10);
			    if (+elements[i] < +max/9){ 
			    	textPos = -15; 
			    	textColor = '#5f5f5f'; 
			    }
			    

			    text.setAttribute('id', 'text-' + i)
			    text.setAttribute('y', height - elements[i] * scale + textPos + 'px');
			    text.setAttribute('x', width * i + width/2.1 + 'px' );
				text.setAttribute('fill', textColor);
			    text.setAttribute('text-anchor', 'middle' );
			    text.innerHTML = elements[i];
		}

		return chart;
	}




//first try to div implementation
	// function createDIVChart(elements, width, height, color) {
	// 		var chart = document.createElement('div');

	// 		chart.style.position = 'relative';
	// 		chart.style.width = width + 'px';
	// 		chart.style.height = height + 'px';
	// 		chart.style.margin = '20px auto';

	// 		//finding max value
	// 		var max = Number.NEGATIVE_INFINITY;
	// 		for (var i = 0; i < elements.length; i++) {
	// 			if (elements[i] > max) max = elements[i];
	// 		}

	// 		var scale = height/max,	
	// 			width = width/elements.length;

	// 		//creating bars
	// 		for (var i = 0; i < elements.length; i++) {
	// 			bar = document.createElement('div');
	// 			bar.style.position = 'absolute';
	// 			bar.style.backgroundColor = color;
	// 			bar.style.width = width - 4 + 'px';
	// 			bar.style.left = width * i + 'px';
	// 			bar.style.bottom = '0px';
	// 			bar.style.height = elements[i] * scale + 'px';

	// 			chart.appendChild(bar);
	// 		}

	// 		return chart;
	// }