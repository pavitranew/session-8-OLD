// import _ from 'lodash'
require('./styles.css');
import { uniq } from 'lodash'

function component () {
  const element = document.createElement('div');

  const ages = [1,1,4,5,6,6,7] 
  element.innerHTML = `
	<div class="ages">
  ${(uniq(ages))}
  </div>
  `;

  console.log(uniq(ages))

  return element;
}

document.body.appendChild(component());





