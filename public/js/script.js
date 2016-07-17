$(function(){

  console.log("running script file")

  $('#myModal').on('shown.bs.modal', function(){
    $('#myInput').focus()
  })

  $('[data-toggle="offcanvas"]').click(function(){
    $("#navigation").toggleClass("hidden-xs");
  });

  /* Login starts */
  $('#loginSubmit').click(function(){
    const userName = $('#userName').val();
    const userPassword = $('#userPassword').val();

    toggleSignIn();
    checkLoginStatus();
    // $('#loginButton').hide()
    // $('#logoutButton').show()
    //
    // window.location.href = "/dashboard"

    $('#myModal').modal('toggle');
    return false;


  })

  $('#logoutButton').click(function(){

    toggleSignOut();
    checkLoginStatus();

    // $('#loginButton').show()
    // $('#logoutButton').hide()
    // window.location.href = "/"

  })

  // Confirm signed or signedout
  function checkLoginStatus(){
    const user = firebase.auth().currentUser;

    if (user) {
      $('#loginButton').hide()
      $('#logoutButton').show()
      window.location.href = "/dashboard"
    } else {
      $('#loginButton').show()
      $('#logoutButton').hide()
      window.location.href = "/"
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

  }

  // fire base Logout
  function toggleSignOut(){
    firebase.auth().signOut()
  }
  /* Login ends */


})
