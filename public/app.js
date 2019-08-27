const XMLHttpRequestOpen = XMLHttpRequest.prototype.open

XMLHttpRequest.prototype.open = function () {
  const path = arguments[1]

  if (path.match(/\/coins/)) {
    this.addEventListener('readystatechange', function (event) {
      if (this.readyState === 4) {
        const originalResponse = this.response
        
        const response = '{"response": "hijacked"}'

         Object.defineProperty(this, 'response', {writable: true})
         Object.defineProperty(this, 'responseText', {writable: true})
         Object.defineProperty(this, 'originalResponse', {writable: true})
         
         this.response = this.responseText = response
         this.originalResponse = originalResponse
      }
   });
  }

  return XMLHttpRequestOpen.apply(this, arguments)
}

window.onload = function () {
  const fire = new XMLHttpRequest()

  fire.open("GET", "/coins")
  fire.send()

  fire.addEventListener("load", function () {
    document.getElementById('code').innerHTML = JSON.stringify(JSON.parse(fire.response), null, 2)
    document.getElementById('original').innerHTML = JSON.stringify(JSON.parse(fire.originalResponse), null, 2)
  })
}
