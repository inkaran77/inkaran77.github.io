var online = new Vue({
  el: '#online',
  data: {
    list: null
  },

// Appeler tous les 1sec une fonctionnalite
// created: function(){
//       setInterval(function() {
//         this.getUsersOnline;
//         }, 5000);
//     },

methods: {
    getUsersOnline: function (){
        this.$http.get('http://miagetchat.ovh:8080/MiageTchat/webapi/Utilisateurs/Online',{headers:{
        'Authorization': 'Bearer '+ localStorage.getItem('my_token')

        // Ok
        }}).then(response => {
            this.list=response.data.Users
            tchat.getMessage()

        // Error
        },response  => {
            if(response.status==400){
                console.log("Erreur")

            }
        });

    },

    deconnexion: function(){
         this.$http.get('http://miagetchat.ovh:8080/MiageTchat/webapi/Connexion/off',{headers:{
             'Authorization': 'Bearer '+ localStorage.getItem('my_token')
          }})

        localStorage.setItem('my_token', "") // supprime le token dans localstorage  
        window.location.href = '../Connexion/index.html'
      
        // Swal.fire({
        // title: this.id,
        // text: 'Êtes-vous sûr de vouloir vous déconnecter?',
        // type: 'warning',
        // showCancelButton: true,
        // confirmButtonText:'Oui',
        // cancelButtonText: 'Non',
        // }).then(result =>{

        //     if (result.value){
        //         this.$http.get('http://miagetchat.ovh:8080/MiageTchat/webapi/Connexion/Off',{headers:{
        //             'Authorization': 'Bearer '+ localStorage.getItem('my_token')}})
        //  localStorage.setItem('my_token', "") // supprime le token dans localstorage        
        //  window.location.href = '../Connexion/index.html'
        // }
        // })

    },
},

created: function(){
    this.getUsersOnline()
},

updated(){
  this.getUsersOnline()
},


})  


var tchat = new Vue({
    el: '#tchat',
    data: {
      list_messages: null
    },
  
  methods: {
      getMessage: function (){
          this.$http.get('http://miagetchat.ovh:8080/MiageTchat/webapi/Message',{headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('my_token'),
            'MsgId': localStorage.getItem('last_msg_id'),
  
          // Ok
          }}).then(response => {
              this.list_messages=response.data.Messages,
              console.log(this.list_messages)
  
          // Error
          },response  => {
              if(response.status==400){
                  console.log("Erreur")
  
              }
          });
  
      },
    },  

mounted: function(){
     this.getMessage()
  },


  
updated: function(){
    this.getMessage()
   }  
  
})  




  var message = new Vue({
    el: '#message',
    data: {
        msg:'',
        token: localStorage.getItem('my_token')
    },
  
  methods: {
      postMessage: function (){
          this.$http.post('http://miagetchat.ovh:8080/MiageTchat/webapi/Message',"",{headers: {
            'Authorization': 'Bearer '+ this.token,
            'Message': this.msg,
  
          // Ok
          }}).then(response => {
              tchat.getMessage()
              console.log(this.msg),
              this.msg=''
                
  
          // Error
          },response  => {
              if(response.status==400){
                  console.log("Erreur")
  
              }

              if(response.status==401){
                console.log(this.token)
                console.log(this.msg)
                console.log("Erreur")

            }
          });
  
      },
  },
   
  
  
  })  