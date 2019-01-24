var register = new Vue({
    el: '#register',
    data: {

      picked: '',
      id:'',
      lastname:'',
      firstname:'',
      date: '',
      email:'',
      password:''

    },

    methods: {
        inscription: function (){
            this.$http.post('http://miagetchat.ovh:8080/MiageTchat/webapi/Inscription',"",{headers:{
                UserId: this.id,
                First_Name: this.firstname,
                Last_Name: this.lastname,
                Birth_Year: this.date,
                Gender: this.picked,
                Email: this.email,
                Password: this.password
    
            // Ok
            }}).then(response => {
                Swal.fire({
                    title: 'Bravo ' +this.id,
                    text: 'Vous êtes inscrit !',
                    type: 'success',
                    onClose: () => {
                        // Aller à la page   
                        window.location.href = '../Connexion/index.html'
                    }
                })
    
            // Error
            },response  => {
                if(response.status==400){
                    console.log("Erreur")
    
                    Swal.fire(
                        'Oups!',
                        'Identifiant deja utilise',
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

    