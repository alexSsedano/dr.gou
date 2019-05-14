<template >
    <div class="chatBody " >
        <div class="anti" >
            <div class="w-100 h-100">
            <div class="row w-100 antim h-100"  >
                <div class="col-sm-2 h-100 cg" >
                    <button type="button " style="margin-top:10px; " class="btn btn-primary btn w-100">Añadir chat</button>
                </div>
                <div class="col-sm-10"></div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    export default {  
        name: "chatBody",
    }
</script>
<style>
.anti{
    height:86vh;
    background-color: white
}
.antim{
    margin: 0%
}
.cg{
    background-image: linear-gradient(rgb(217, 247, 255), rgb(217, 247, 255));
}


</style>
