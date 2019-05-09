<template>
    <div class="homebody">

        <div  class="img-fluid  d-block d-sm-none extrasmall" style="height: 150px;"><p>sss</p></div>
        <div  class="img-fluid  d-none d-sm-block d-md-none small " style="height: 200px;"><p>sss</p></div>
        <div  class="img-fluid  d-none d-md-block d-lg-none medium " style="height: 250px;"><p>sss</p></div>
        <div  class="img-fluid  d-none d-lg-block d-xl-none large " style="height: 250px;"><p>sss</p></div>
        <div  class="img-fluid  d-none d-xl-block extralarge " style="height: 250px;"><p>sss</p></div>

    </div>
</template>
<script>
  

        export default {
            
            name: "homeBody",
         
        }
</script>
<style>
.extrasmall{
    background-image: url('../assets/home.jpg');
    background-repeat: no-repeat;
    background-size:100%;
    background-position: 0px 0px;
    height: auto;
    width: 100%;
}
.small{
    background-image: url('../assets/home.jpg');
    background-repeat: no-repeat;
    background-size:100%;
    background-position: 0px -30px;
    height: auto;
    width: 100%;
}
.medium{
    background-image: url('../assets/home.jpg');
    background-repeat: no-repeat;
    background-size:100%;
    background-position: 0px -55px;
    height: auto;
    width: 100%;
}
.large{
    background-image: url('../assets/home.jpg');
    background-repeat: no-repeat;
    background-size:100%;
    background-position: 0px -75px;
    height: auto;
    width: 100%;
}
.extralarge{
    background-image: url('../assets/home.jpg');
    background-repeat: no-repeat;
    background-size:100%;
    background-position: 0px -85px;
    height: auto;
    width: 100%;
}
</style>
