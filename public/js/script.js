$(function(){

  console.log("running script file")

  $('#myModal').on('shown.bs.modal', function(){
    $('#myInput').focus()
  })

  $('#loginSubmit').click(function(){
    const userName = $('#userName').val();
    const userPassword = $('#userPassword').val();

    toggleSignIn();

    $('#loginButton').hide()
    $('#logoutButton').show()

    $('#myModal').modal('toggle');
    return false;


  })

  $('#logoutButton').click(function(){

    toggleSignOut();

    window.location.href = "/"

  })

  // validate login
  function validateLogin(){

    const user = firebase.auth().currentUser;
    if (user) {
      $('#loginButton').hide()
      $('#logoutButton').show()

      setInterval(function(){
        window.location.href = "/dashboard"
      }, 500)

    } else {
      $('#loginButton').show()
      $('#logoutButton').hide()
      setInterval(function(){
        window.location.href = "/"
      }, 500)
    }

  }

  // fire base SignIn
  function toggleSignIn(){
    if (firebase.auth().currentUser){
      firebase.auth().signOut();
    } else {
      const email = $('#userName').val();
      const password = $('#userPassword').val();

      if(email.length < 2) {
        alert('Please enter an email address.');
        return;
      }
      if(password.length < 2) {
        alert('Please enter a password');
        return;
      }

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){

        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorCode === 'auth/wrong-password') {
          alert('Wrong password');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        console.log("Did NOT Logined")
      });

    }
    console.log("Logined")
    setInterval(function(){
      window.location.href = "/dashboard"
    }, 500)
    // validateToken()
  }

  // fire base Logout
  function toggleSignOut(){
    firebase.auth().signOut()

  }

  function validateToken(){
    const token = firebase.auth().currentUser.getToken(true).then(function(token){
      var uid = token.sub;
      console.log('uid', uid)
    })

    console.log(token)
    //
    // firebase.auth().vertifyIdToken(idToken).then(function(decodedToken){
    //   var uid = decodedToken.sub;
    //   console.log(uid)
    // }).catch(function(error){
    //   console.log("unable to retrieve uid")
    // })


    // firebase.auth().currentUser.getToken(true).then(function(idToken){
    //
    //   console.log(idToken)
    //
    // }).catch(function(error){
    //   console.log("Error in retrieving token")
    // })


  }

})
