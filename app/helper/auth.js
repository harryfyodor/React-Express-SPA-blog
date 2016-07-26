module.export = {
  login(password, cb) {
    cb = arguments[arguments.length - 1]
    if(localStorage.token) {
      if(cb) cb(true)
      return
    }

    fetch('/login', {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ password: password })
    }).then(res => {
      if(res.ok) {
        console.log(res)
      }
    }, e => {
      alert("POST ERROR");
    })
    /*
    postRequset(password, (res) => {
      if(res.body.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
      } else {
        if (cb) cb(false)
      }
    */
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
  },
  
  loggedIn() {
    return !!localStorage.token
  }
}