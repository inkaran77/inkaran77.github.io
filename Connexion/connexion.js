var login = new Vue({
  el: '#login',
  data: {
    id:'',
    password:''

  },

methods: {
    soumettre: function (){
        this.$http.get('http://miagetchat.ovh:8080/MiageTchat/webapi/Connexion',{headers: {
            UserId: this.id,
            Password: this.password


        // Ok
        }}).then(response => {
            console.log(response.data.token)
            console.log(response.data.MsgId)

            const MsgId = response.data.MsgId
            const token = response.data.token
            
            localStorage.setItem('my_token', token) // stock le token dans localstorage
            localStorage.setItem('last_msg_id', MsgId) // stock l'id du dernier msg ds localstorage


            Swal.fire({
                title: 'Bonjour ' +this.id,
                text: 'Bon retour parmis nous ',
                type: 'success',
                onClose: () => {
                    // Aller à la page   
                    window.location.href = '../Tchat/tchat.html'
                }
            })

        // Error
        },response  => {
            if(response.status==406){
                console.log("Erreur")

                Swal.fire(
                    'Oups!',
                    'Identifiant ou mot de passe errone',
                    'error'
                  )
            }
        });

    },


    getToken: function(){
        token: localStorage.getItem('my_token') || ''
        status: ''
        //console.log(localStorage.getItem('my_token'))
    }
}

})  


//   methods: {
//       soumettre: function (){
//           this.$http.get('http://miagetchat.ovh:8080/MiageTchat/webapi/Connexion',{
//               UserId: this.id,
//               Password: this.password

//           }),(response) => {

//               if(response.status==200){
//                   alert("Vous êtes inscrit")
//               }

//               else if(response.status==406){
//                   alert("Erreur")
//               }
//           }          
//       }
//   }

// })

