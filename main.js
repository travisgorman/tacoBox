console.log('hello Taco!')
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];

function addItem(e) {
	e.preventDefault()
	const text = this.querySelector('[name=item]').value;
	const item = {text, done: false }
	items.push(item)
	populateList(items, itemsList)
	this.reset()
	console.log('item:', item )
	console.table( items )
};

// takes an array of items and an HTML element
function populateList(plates=[], platesList ) {
	platesList.innerHTML = plates.map((plate, i) =>{
		return `
		<li>
			<label for="">${plate.text}</label>
		</li>
		`;
	}).join('')
}



addItems.addEventListener('submit', addItem);