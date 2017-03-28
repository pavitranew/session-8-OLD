// import { _ } from 'lodash'
import { uniq } from 'lodash'

function component () {
  var element = document.createElement('div');

  const ages = [1,1,4,5,6,6,7] 
  element.innerHTML = (uniq(ages));

  return element;
}

document.body.appendChild(component());