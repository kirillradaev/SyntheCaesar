function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function getUser() {
    const cookie = decodeURIComponent(document.cookie);
    const user = cookie.split(';');
    let username = user[0].split('=')[1];

    return username;
}
  
  setInterval(function() {
    $.ajax({
      type: 'POST',
      url: '/token',
      data: {
        username: getUser(),
        refreshToken: getCookie('refreshJwt')
      },
      success: function(data) {},
      error: function(xhr) {
        window.alert(JSON.stringify(xhr));
        window.location.replace('/index.html');
      }
    });
  }, 10000);