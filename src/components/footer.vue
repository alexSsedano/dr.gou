<template>
<footer id="myFooter" style="height: 100%">
        <div class="container h-100" style="height: 100%">
            <div class="row">
                <div class="col-sm-4">
                    <h5>Pestañas</h5>
                    <ul>
                        <li><a href="Home">Inicio</a></li>
                        <li><a href="Foro">Foro</a></li>
                        <li><a href="Chat">Chat</a></li>
                    </ul>
                </div>
                
                <div class="col-sm-4">
                    <h5>Copyright</h5>
                    <p> © 2019 Alejandro Sedano Sanchez Todos los derechos reservados. </p>

                </div>
                <div class="col-sm-4 info">
                    <h5>Information</h5>
                    <p>En DR.GOU trabajaMOS con el objetivo de ejercer una labor de información, formación y capacitación del estudiantado que facilite la incorporación y la integración del estudiantado en sus centros y en la Universidad en las tres etapas de la vida universitaria. </p>
                </div>
            </div>
        </div>
        <div class="second-bar bcol h-100" >
           <div class="container bcol h-100">
                <h2 class="logo bcol h-100"><a href="Home" style="color: black"> DR.GOU </a></h2>
                <div class="social-icons">
                    <a href="https://twitter.com/Alex_S_Sedano" class="twitter"><i class="fa fa-twitter" style="color: black"></i></a>
                    <a href="https://github.com/alexSsedano" class="facebook"><i class="fab fa-github-square" style="color: black"></i></a>
                    <a href="https://www.instagram.com/alex_s_sedano/?hl=es" class="google"><i class="fab fa-instagram" style="color: black"></i></a>
                </div>
            </div>
        </div>
    </footer>
    
    
</template>
<script>
  

        export default {
            
            name: "foot",
         
        }
</script>
<style>
#myFooter {
    background-color: #3a3f46;
    color: white;
}

#myFooter .row {
    margin-bottom: 60px;
}

#myFooter .info{
    text-align: justify; 
    color: #afb0b1;
}

#myFooter ul {
    list-style-type: none;
    padding-left: 0;
    line-height: 1.7;
}

#myFooter h5 {
    font-size: 18px;
    color: white;
    font-weight: bold;
    margin-top: 30px;
}

#myFooter .logo{
    margin-top: 10px;
}

#myFooter .second-bar .logo a{
    color:white;
    font-size: 28px;
    float: left;
    font-weight: bold;
    line-height: 68px;
    margin: 0;
    padding: 0;
}
.bcol{
    background-color: #33373e !important;
}

#myFooter a {
    color: #d2d1d1;
    text-decoration: none;
}

#myFooter a:hover,
#myFooter a:focus {
    text-decoration: none;
    color: white;
}

#myFooter .second-bar {
    text-align: center;
    background-color: #33373e;
    text-align: center;
}

#myFooter .second-bar a {
    font-size: 22px;
    color: #9fa3a9;
    padding: 10px;
    transition: 0.2s;
    line-height: 68px;
}

#myFooter .second-bar a:hover {
    text-decoration: none;
}

#myFooter .social-icons {
    float:right;
}


#myFooter .facebook:hover {
    color: #0077e2;
}

#myFooter .google:hover {
    color: #ef1a1a;
}

#myFooter .twitter:hover {
    color: #00aced;
}

@media screen and (max-width: 767px) {
    #myFooter {
        text-align: center;
    }

    #myFooter .info{
        text-align: center;
    }
}








</style>
