if (window.File && window.FileReader && window.FileList && window.Blob) {
  console.log('That is a nice computer. File APIs supported.')
} else {
  alert('The File APIs are not fully supported in this browser.');
}

let files = document.querySelector('#files')
let body = document.querySelector('#body')

files.addEventListener('change', handleFileSelect, false)
files.addEventListener('change', handleFileSelect2, false)

function handleFileSelect(evt) {
  let result = ""
  let evtFiles = evt.target.files
  for(let i = 0; i < evtFiles.length; i++) {
    let reader = new FileReader()
    reader.readAsText(evtFiles[i], 'application/json')
    reader.onload = (evt) => {
      let newFiles = JSON.parse(evt.target.result)
      newFiles.forEach(ele => {
        console.log(ele)
        result += helper(ele)
      })
      body.innerHTML = result
    }
  }
}

function handleFileSelect2(evt) {
    let filesTest = evt.target.files
    var output = [];
    for (var i = 0, f; f = filesTest[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function helper(ele) {
  let openTag = `<${ele.tag}>`
  let closeTag = `</${ele.tag}>`
  let strIntrpltn = ""
  if (typeof ele.content === "object" && ele.content.length) {
    strIntrpltn += ele.content.map(e => helper(e)).join('')
  } else if (typeof ele.content === 'object') {
    strIntrpltn += helper(ele.content)
  } else {
    console.log('meow',ele.content)
    strIntrpltn += `${ele.content}`
  }
  return `${openTag} ${strIntrpltn} ${closeTag}`
}
