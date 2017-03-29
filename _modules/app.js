// import { _ } from 'lodash'
import { uniq } from 'lodash'
import greetings from './robot.js'
import styles from './styles.css'
import { url, sayHi } from './config.js'
sayHi('Name')

function component () {
	var element = document.createElement('div');

	const ages = [1,1,4,5,6,6,7] 
  // element.innerHTML = (uniq(ages));
  element.innerHTML = `
  <div class="ages">
  ${(uniq(ages))}
  </div>
  `;

  document.write(greetings("Affirmative", "Dave"));

  console.log((uniq(ages)))

  return element;
}

document.body.appendChild(component());






