
function Plano(ancho,largo){

    this.getPosicion=function(u,v){
        var x=(u-0.5)*ancho;
        var y=(v-0.5)*largo;
        return [x,y,0];
    }

    this.getNormal=function(u,v){
        return [0,0,-1];
    }

    // Cambia la posicion en la textura !!!!
    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}

function Piso(ancho,largo){

    this.getPosicion=function(u,v){
        var x=(u-0.5)*ancho;
        var y=(v-0.5)*largo;
        return [x,y,0];
    }

    this.getNormal=function(u,v){
        return [0,0,1];
    }

    // Cambia la posicion en la textura !!!!
    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}

function Cilindro(radio,altura){

    this.getPosicion=function(u,v){
        sin_v = Math.sin(2*Math.PI*v)
        cos_v = Math.cos(2*Math.PI*v)
        var x=sin_v*radio;
        var y=cos_v*radio;        
        return [x,y,altura*u];
    }

    this.getNormal=function(u,v){
        return [Math.sin(2*Math.PI*v),Math.cos(2*Math.PI*v),0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}

function CilindroPluma(radio,altura){

    this.getPosicion=function(u,v){
        sin_v = Math.sin(2*Math.PI*v)
        cos_v = Math.cos(2*Math.PI*v)
        var x=sin_v*radio;
        var y=cos_v*radio;        
        return [x,y,altura*u];
    }

    this.getNormal=function(u,v){
        return [Math.sin(2*Math.PI*v),Math.cos(2*Math.PI*v),0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}

function CilindroPostes(radio,altura){

    this.getPosicion=function(u,v){
        sin_v = Math.sin(2*Math.PI*v)
        cos_v = Math.cos(2*Math.PI*v)
        var x=sin_v*radio;
        var y=cos_v*radio;        
        return [x,y,altura*u];
    }

    this.getNormal=function(u,v){
        return [Math.sin(2*Math.PI*v),Math.cos(2*Math.PI*v),0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}

function CilindroCuerpo(radio,altura){

    this.getPosicion=function(u,v){
        sin_v = Math.sin(2*Math.PI*v)
        cos_v = Math.cos(2*Math.PI*v)
        var x=sin_v*radio;
        var y=cos_v*radio;        
        return [x,y,altura*u];
    }

    this.getNormal=function(u,v){
        return [Math.sin(2*Math.PI*v),Math.cos(2*Math.PI*v),0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}

function CilindroBase(radio,altura){

    this.getPosicion=function(u,v){
        sin_v = Math.sin(2*Math.PI*v)
        cos_v = Math.cos(2*Math.PI*v)
        var x=sin_v*radio;
        var y=cos_v*radio;        
        return [x,y,altura*u];
    }

    this.getNormal=function(u,v){
        console.log(v);
        console.log([Math.sin(2*Math.PI*v),Math.cos(2*Math.PI*v),0]);
        return [Math.sin(2*Math.PI*v),Math.cos(2*Math.PI*v),0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}


function CilindroColumna(radio,altura){

    this.getPosicion=function(u,v){
        sin_v = Math.sin(2*Math.PI*v)
        cos_v = Math.cos(2*Math.PI*v)
        var x=sin_v*radio;
        var y=cos_v*radio;        
        return [x,y,altura*u];
    }

    this.getNormal=function(u,v){
        return [Math.sin(2*Math.PI*v),Math.cos(2*Math.PI*v),0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}

function CilindroColor(radio,altura,color){

    this.getPosicion=function(u,v){
        sin_v = Math.sin(2*Math.PI*v)
        cos_v = Math.cos(2*Math.PI*v)
        var x=sin_v*radio;
        var y=cos_v*radio;        
        return [x,y,altura*u];
    }

    this.getNormal=function(u,v){
        return [Math.sin(2*Math.PI*v),Math.cos(2*Math.PI*v),0];
    }

    this.getCoordenadasTextura=function(u,v){
        return color;
    }
}

function LozaSuperficieSupT1(){

    this.getPosicion=function(u,v){        
        punto = CurvaCuadratica(u,curvaBezier);
        return [v*punto.x,v*punto.y,0];
    }

    this.getNormal=function(u,v){
        return [0,0,1];
    }

    this.getCoordenadasTextura=function(u,v){
        punto = CurvaCuadratica(u,curvaBezier);
        return [v*punto.x,v*punto.y];
    }
}

function LozaSuperficieInfT1(){

    this.getPosicion=function(u,v){        
        punto = CurvaCuadratica(u,curvaBezier);
        return [v*punto.x,v*punto.y,0];
    }

    this.getNormal=function(u,v){
        return [0,0,-1];
    }

    this.getCoordenadasTextura=function(u,v){
        punto = CurvaCuadratica(u,curvaBezier);
        return [v*punto.x,v*punto.y];
    }
}

function LozaSuperficieSupT2(){

    this.getPosicion=function(u,v){        
        punto = CurvaCuadratica(u,curvaBezier);
        return [v*punto.x,v*punto.y,0];
    }

    this.getNormal=function(u,v){
        return [0,0,1];
    }

    this.getCoordenadasTextura=function(u,v){
        punto = CurvaCuadratica(u,curvaBezier);
        return [v*punto.x,v*punto.y];
    }
}

function LozaSuperficieInfT2(){

    this.getPosicion=function(u,v){        
        punto = CurvaCuadratica(u,curvaBezier);
        return [v*punto.x,v*punto.y,0];
    }

    this.getNormal=function(u,v){
        return [0,0,-1];
    }

    this.getCoordenadasTextura=function(u,v){
        punto = CurvaCuadratica(u,curvaBezier);
        return [v*punto.x,v*punto.y];
    }
}



function CurvaExtruida(normal){

    var puntosBezierCuadratica = [
        {x:0 ,y:-3},
        {x:2 ,y:-3},
        {x:2 ,y:-1},
        {x:2 ,y: 0},
        {x:2 ,y: 1},
        {x:2 ,y: 3},
        {x:0 ,y: 3},
        {x:-2,y: 3},
        {x:-2,y: 1},
        {x:-2,y: 0},
        {x:-2,y:-1},
        {x:-2,y:-3},
        {x:0 ,y:-3},
    ];

    var puntosBezierCubica = [
        {x:-1 ,y: 1},
        {x:-1 ,y: 0},
        {x: 1 ,y: 0},
        {x: 1 ,y: 1},
        {x: 1 ,y: 0.25},
        {x:-1 ,y: 0.25},
    ];


    this.getPosicion=function(u,v){        
        //var puntoIni = CurvaCuadraticaBezier(v,puntosBezierCuadratica);
        //var puntoFin = CurvaCuadraticaBezier(v+0.01,puntosBezierCuadratica);
        //var puntoDif = diferenciaPuntos(puntoFin,puntoIni);
        //var norma = Math.sqrt(puntoDif.x*puntoDif.x+puntoDif.y*puntoDif.y);     
        //var alpha = Math.atan2(puntoDif.x/norma, puntoDif.y/norma);
        var punto = CurvaCuadraticaBezier(v,puntosBezierCuadratica);
        var alpha = -Math.atan2(punto.x, punto.y);
        var trayectoria = [punto.x,punto.y,alpha/Math.PI];
        var tobogan = CurvaCubicaBezier(u,puntosBezierCubica);
        var curva = [0,tobogan.x,tobogan.y];
        var curvaGiroAlpha = [
            curva[0]*Math.cos(alpha) - curva[1]*Math.sin(alpha),
            curva[0]*Math.sin(alpha) + curva[1]*Math.cos(alpha),
            curva[2]
        ];
        return [
            trayectoria[0]+curvaGiroAlpha[0],
            trayectoria[1]+curvaGiroAlpha[1],
            trayectoria[2]+curvaGiroAlpha[2]
        ];
    }

    this.getNormal=function(u,v){
        var punto = CurvaCuadraticaBezier(v,puntosBezierCuadratica);
        var alpha = -Math.atan2(punto.x, punto.y);
        punto = CurvaCubicaBezier(u,puntosBezierCubica);
        puntoIni = { x: 0 , y: punto.x , z: punto.y };
        punto = CurvaCubicaBezier(u+0.01,puntosBezierCubica);
        puntoFin = { x: 0 , y: punto.x , z: punto.y };
        punto = { x: 0 , y: puntoFin.y - puntoIni.y, z: puntoFin.z - puntoIni.z };
        beta = -0.5 * Math.PI ;
        var puntoGiroNormal = [
            punto.x,
            punto.y*Math.cos(beta) - punto.z*Math.sin(beta),
            punto.y*Math.sin(beta) + punto.z*Math.cos(beta),
        ];         
        var curvaGiroAlpha = [
            puntoGiroNormal[0]*Math.cos(alpha) - puntoGiroNormal[1]*Math.sin(alpha),
            puntoGiroNormal[0]*Math.sin(alpha) + puntoGiroNormal[1]*Math.cos(alpha),
            puntoGiroNormal[2]
        ];       
        return [curvaGiroAlpha[0],curvaGiroAlpha[1],curvaGiroAlpha[2]];
    }

    this.getCoordenadasTextura=function(u,v){
        return [0.65,0.3,0.15];
    }
}


function LozaPerfilExt(){

    this.getPosicion=function(u,v){
        punto = CurvaCuadratica(u,curvaBezier);
        if ( 0 < v && v < 1 ) return [punto.x,punto.y,1*v];
        else return [0,0,0];
    }

    this.getNormal=function(u,v){
        puntoIni = CurvaCuadratica(u,curvaBezier);
        puntoFin = CurvaCuadratica(u+0.01,curvaBezier);
        punto = diferenciaPuntos(puntoFin,puntoIni);
        vectorNormal = obtenerNormal(
            { x: punto.x, y: punto.y, z: 0 },
            { x: 0, y: 0, z: 1 }
        );
        if ( 0 < v && v < 1 ) return [vectorNormal.x,vectorNormal.y,vectorNormal.z];
        else if ( v == 1 ) return [0,0,1];
        else return [0,0,-1];        
    }

    this.getCoordenadasTextura=function(u,v){
        return [1,0.25,0.5];
    }
}


function LozaPerfil(){

    this.getPosicion=function(u,v){
        punto = CurvaCuadratica(u,curvaBezier);
        return [punto.x,punto.y,0.5*v];
    }

    this.getNormal=function(u,v){
        puntoIni = CurvaCuadratica(u,curvaBezier);
        puntoFin = CurvaCuadratica(u+0.01,curvaBezier);
        punto = diferenciaPuntos(puntoFin,puntoIni);
        vectorNormal = obtenerNormal(
            { x: punto.x, y: punto.y, z: 0 },
            { x: 0, y: 0, z: 1 }
        );
        return [vectorNormal.x,vectorNormal.y,vectorNormal.z];
    }

    this.getCoordenadasTextura=function(u,v){
        return [0.9,0.9,0.9];
    }
}


function generarSuperficieCubo(color){
    
    positionBuffer = [
        // Cara delantera
        -0.5, -0.5, 1, //0
        0.5, -0.5, 1, //1
        0.5, 0.5, 1, //2
        -0.5, 0.5, 1, //3
      
        // Cara trasera
        -0.5, -0.5, 0, //4
        0.5,  -0.5, 0, //5
        0.5,   0.5, 0, //6
        -0.5,  0.5, 0, //7
      
        // Top face
        -0.5,0.5, 0, //8
         0.5,0.5, 0, //9
         0.5,0.5, 1, //10
        -0.5,0.5, 1, //11
      
        // Bottom face
        -0.5, -0.5, 0, //12
        -0.5, -0.5, 1, //13
        0.5, -0.5, 1, //14
        0.5, -0.5, 0, //15
      
        // Right face
        0.5, -0.5, 0, //16
        0.5, 0.5, 0, //17
        0.5, 0.5, 1, //18
        0.5, -0.5, 1, //19
      
        // Left face
        -0.5, -0.5, 0, //20
        -0.5, 0.5, 0, //21
        -0.5, 0.5, 1, //22
        -0.5, -0.5, 1  //23
    ];
    normalBuffer = [
        // Cara delantera
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
      
        // Cara trasera
        0.0,  0.0,  -1.0,
        0.0,  0.0,  -1.0,
        0.0,  0.0,  -1.0,
        0.0,  0.0,  -1.0,
      
        // Top face
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
      
        // Bottom face
        0.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,

        // Right face
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
      
        // Left face
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
    ];
    uvBuffer = [
        // Cara delantera
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Cara trasera
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Top face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Bottom face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Right face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Left face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
    ];

    // Buffer de indices de los triángulos 
    indexBuffer=[
        0,  1,  2,      0,  2,  3,    // enfrente
        4,  5,  6,      4,  6,  7,    // atrás
        8,  9,  10,     8,  10, 11,   // arriba
        12, 13, 14,     12, 14, 15,   // fondo
        16, 17, 18,     16, 18, 19,   // derecha
        20, 21, 22,     20, 22, 23    // izquierda
    ];  

    // Creación e Inicialización de los buffers
    webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionBuffer), gl.STATIC_DRAW);
    webgl_position_buffer.itemSize = 3;
    webgl_position_buffer.numItems = positionBuffer.length / 3;

    webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalBuffer), gl.STATIC_DRAW);
    webgl_normal_buffer.itemSize = 3;
    webgl_normal_buffer.numItems = normalBuffer.length / 3;

    webgl_uvs_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_uvs_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvBuffer), gl.STATIC_DRAW);
    webgl_uvs_buffer.itemSize = 3;
    webgl_uvs_buffer.numItems = uvBuffer.length / 3;

    webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexBuffer), gl.STATIC_DRAW);
    webgl_index_buffer.itemSize = 1;
    webgl_index_buffer.numItems = indexBuffer.length;

    return {
        webgl_position_buffer,
        webgl_normal_buffer,
        webgl_uvs_buffer,
        webgl_index_buffer
    }
}

function generarSuperficieCubov2(color){
    
    positionBuffer = [
        // 1
        -0.5,   -0.5,   1, //0
        0.5,    -0.5,   1, //1
        0.5,    0.5,    1, //2
        -0.5,   0.5,    1, //3
        -0.5,   -0.5,   0, //4
        0.5,    -0.5,   0, //5
        0.5,    0.5,    0, //6
        -0.5,   0.5,    0, //7

        // 2
        -0.5,   -0.5,   1, //8      0  
        0.5,    -0.5,   1, //9      1
        0.5,    0.5,    1, //10     2    
        -0.5,   0.5,    1, //11     3
        -0.5,   -0.5,   0, //12     4
        0.5,    -0.5,   0, //13     5    
        0.5,    0.5,    0, //14     6
        -0.5,   0.5,    0, //15     7

        // 3
        -0.5,   -0.5,   1, //16     0
        0.5,    -0.5,   1, //17     1
        0.5,    0.5,    1, //18     2
        -0.5,   0.5,    1, //19     3
        -0.5,   -0.5,   0, //20     4
        0.5,    -0.5,   0, //21     5
        0.5,    0.5,    0, //22     6
        -0.5,   0.5,    0, //23     7

    ];

    // Buffer de indices de los triángulos 
    indexBuffer=[
        7,  6,  2,    7,  2,  3,     // frente
        4,  5,  1,    4,  1,  0,     // atrás
        14, 13, 9,    14,  9, 10,    // derecha
        15, 12, 8,    15,  8, 11,    // izquierda
        19, 18, 17,   19,  17, 16,   // arriba
        23, 22, 21,   23,  21, 20    // abajo
    ];  

    normalBuffer = [
        // 1
        0.0,  -1.0, 0.0,   //0 a
        0.0,  -1.0, 0.0,   //1 a
        0.0,  1.0,  0.0,   //2 f
        0.0,  1.0,  0.0,   //3 f
        0.0,  -1.0, 0.0,   //4 a
        0.0,  -1.0, 0.0,   //5 a
        0.0,  1.0,  0.0,   //6 f
        0.0,  1.0,  0.0,   //7 f
      
        // 2
        -1.0,  0.0, 0.0,   //0 i
        1.0,  0.0, 0.0,    //1 d
        1.0,  0.0, 0.0,    //2 d
        -1.0,  0.0, 0.0,   //3 i
        -1.0,  0.0, 0.0,   //4 i
        1.0,  0.0, 0.0,    //5 d
        1.0,  0.0, 0.0,    //6 d
        -1.0,  0.0, 0.0,   //7 i

        // 2
        0.0,  0.0, 1.0,    //0 a
        0.0,  0.0, 1.0,    //1 a
        0.0,  0.0, 1.0,    //2 a
        0.0,  0.0, 1.0,    //3 a
        0.0,  0.0, -1.0,   //4 ab
        0.0,  0.0, -1.0,   //5 ab
        0.0,  0.0, -1.0,   //6 ab
        0.0,  0.0, -1.0,   //7 ab
    ];

    uvBuffer = [
        // Cara delantera
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Cara trasera
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Top face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Bottom face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Right face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Left face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
    ];

    // Creación e Inicialización de los buffers
    webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionBuffer), gl.STATIC_DRAW);
    webgl_position_buffer.itemSize = 3;
    webgl_position_buffer.numItems = positionBuffer.length / 3;

    webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalBuffer), gl.STATIC_DRAW);
    webgl_normal_buffer.itemSize = 3;
    webgl_normal_buffer.numItems = normalBuffer.length / 3;

    webgl_uvs_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_uvs_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvBuffer), gl.STATIC_DRAW);
    webgl_uvs_buffer.itemSize = 3;
    webgl_uvs_buffer.numItems = uvBuffer.length / 3;

    webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexBuffer), gl.STATIC_DRAW);
    webgl_index_buffer.itemSize = 1;
    webgl_index_buffer.numItems = indexBuffer.length;

    return {
        webgl_position_buffer,
        webgl_normal_buffer,
        webgl_uvs_buffer,
        webgl_index_buffer
    }
}

function generarSuperficieCubov3(lado,alto,textura){


    escala = 0.2 ;
    positionBuffer = [
        // 1
        -0.5*lado,   -0.5*lado,   alto, //0
        0.5*lado,    -0.5*lado,   alto, //1
        0.5*lado,    0.5*lado,    alto, //2
        -0.5*lado,   0.5*lado,    alto, //3
        -0.5*lado,   -0.5*lado,   0, //4
        0.5*lado,    -0.5*lado,   0, //5
        0.5*lado,    0.5*lado,    0, //6
        -0.5*lado,   0.5*lado,    0, //7

        // 2
        -0.5*lado,   -0.5*lado,   alto, //8      0  
        0.5*lado,    -0.5*lado,   alto, //9      1
        0.5*lado,    0.5*lado,    alto, //10     2    
        -0.5*lado,   0.5*lado,    alto, //11     3
        -0.5*lado,   -0.5*lado,   0, //12     4
        0.5*lado,    -0.5*lado,   0, //13     5    
        0.5*lado,    0.5*lado,    0, //14     6
        -0.5*lado,   0.5*lado,    0, //15     7

        // 3
        -0.5*lado,   -0.5*lado,   alto, //16     0
        0.5*lado,    -0.5*lado,   alto, //17     1
        0.5*lado,    0.5*lado,    alto, //18     2
        -0.5*lado,   0.5*lado,    alto, //19     3
        -0.5*lado,   -0.5*lado,   0, //20     4
        0.5*lado,    -0.5*lado,   0, //21     5
        0.5*lado,    0.5*lado,    0, //22     6
        -0.5*lado,   0.5*lado,    0, //23     7

    ];

    // Buffer de indices de los triángulos 
    indexBuffer=[
        7,  6,  2,    7,  2,  3,     // frente
        4,  5,  1,    4,  1,  0,     // atrás
        14, 13, 9,    14,  9, 10,    // derecha
        15, 12, 8,    15,  8, 11,    // izquierda
        19, 18, 17,   19,  17, 16,   // arriba
        23, 22, 21,   23,  21, 20    // abajo
    ];  

    normalBuffer = [
        // 1
        0.0,  -1.0, 0.0,   //0 a
        0.0,  -1.0, 0.0,   //1 a
        0.0,  1.0,  0.0,   //2 f
        0.0,  1.0,  0.0,   //3 f
        0.0,  -1.0, 0.0,   //4 a
        0.0,  -1.0, 0.0,   //5 a
        0.0,  1.0,  0.0,   //6 f
        0.0,  1.0,  0.0,   //7 f
      
        // 2
        -1.0,  0.0, 0.0,   //0 i
        1.0,  0.0, 0.0,    //1 d
        1.0,  0.0, 0.0,    //2 d
        -1.0,  0.0, 0.0,   //3 i
        -1.0,  0.0, 0.0,   //4 i
        1.0,  0.0, 0.0,    //5 d
        1.0,  0.0, 0.0,    //6 d
        -1.0,  0.0, 0.0,   //7 i

        // 2
        0.0,  0.0, 1.0,    //0 a
        0.0,  0.0, 1.0,    //1 a
        0.0,  0.0, 1.0,    //2 a
        0.0,  0.0, 1.0,    //3 a
        0.0,  0.0, -1.0,   //4 ab
        0.0,  0.0, -1.0,   //5 ab
        0.0,  0.0, -1.0,   //6 ab
        0.0,  0.0, -1.0,   //7 ab
    ];
    
    textureBuffer = [
        // adelante atras
        escala*lado,escala*alto,//0
        0.0,escala*alto,//1
        escala*lado,escala*alto,//2
        0.0,escala*alto,//3
        escala*lado,0.0,//4
        0.0,0.0,//5
        escala*lado,0.0,//6
        0.0,0.0,//7

        // derecha izquierda
        escala*lado,escala*alto,//0
        0.0,escala*alto,//1
        escala*lado,escala*alto,//2
        0.0,escala*alto,//3
        escala*lado,0.0,//4
        0.0,0.0,//5
        escala*lado,0.0,//6
        0.0,0.0,//7

        // arriba abajo
        0.0,1.0,//16 0
        1.0,1.0,//17 1
        1.0,0.0,//18 2
        0.0,0.0,//19 3
        0.0,1.0,//20 4
        1.0,1.0,//21 5
        1.0,0.0,//22 6
        0.0,0.0,//23 7
    ];

    // Creación e Inicialización de los buffers
    webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionBuffer), gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Creación e Inicialización de los buffers
    webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalBuffer), gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    webgl_texture_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_texture_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureBuffer), gl.STATIC_DRAW);
    webgl_texture_buffer.itemSize = 2;
    webgl_texture_buffer.numItems = textureBuffer.length / 2;
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_texture_buffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttributeText, webgl_texture_buffer.itemSize, gl.FLOAT, false, 0, 0);

    // Creación e Inicialización de los buffers
    webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexBuffer), gl.STATIC_DRAW);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textura);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    
    gl.uniform1i(shaderProgram.withTexture,true);
    gl.uniform1i(shaderProgram.withReflect,false);
    gl.uniform1i(shaderProgram.useLightingUniform,(lighting=="true"));

    gl.drawElements(gl.TRIANGLE_STRIP, indexBuffer.length, gl.UNSIGNED_SHORT, 0);
}



function generarSuperficieTrapecio(color){
    
    positionBuffer = [
        // Cara delantera
        -0.5, -0.2, 1, //0
        0.5, -0.2, 1, //1
        0.5, 0.5, 1, //2
        -0.5, 0.5, 1, //3
      
        // Cara trasera
        -0.5, -0.5, 0, //4
        0.5,  -0.5, 0, //5
        0.5,   0.5, 0, //6
        -0.5,  0.5, 0, //7
      
        // Top face
        -0.5,0.5, 0, //8
         0.5,0.5, 0, //9
         0.5,0.5, 1, //10
        -0.5,0.5, 1, //11
      
        // Bottom face
        -0.5, -0.5, 0, //12
        -0.5, -0.2, 1, //13
        0.5, -0.2, 1, //14
        0.5, -0.5, 0, //15
      
        // Right face
        0.5, -0.5, 0, //16
        0.5, 0.5, 0, //17
        0.5, 0.5, 1, //18
        0.5, -0.3, 1, //19
      
        // Left face
        -0.5, -0.5, 0, //20
        -0.5, 0.5, 0, //21
        -0.5, 0.5, 1, //22
        -0.5, -0.2, 1  //23
    ];
    normalBuffer = [
        // Cara delantera
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
      
        // Cara trasera
        0.0,  0.0,  -1.0,
        0.0,  0.0,  -1.0,
        0.0,  0.0,  -1.0,
        0.0,  0.0,  -1.0,
      
        // Top face
        1.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
      
        // Bottom face
        1.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,

        // Right face
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
      
        // Left face
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
    ];
    uvBuffer = [
        // Cara delantera
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Cara trasera
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Top face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Bottom face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Right face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
      
        // Left face
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
        color[0],color[1],color[2],
    ];

    // Buffer de indices de los triángulos 
    indexBuffer=[
        0,  1,  2,      0,  2,  3,    // enfrente
        4,  5,  6,      4,  6,  7,    // atrás
        8,  9,  10,     8,  10, 11,   // arriba
        12, 13, 14,     12, 14, 15,   // fondo
        16, 17, 18,     16, 18, 19,   // derecha
        20, 21, 22,     20, 22, 23    // izquierda
    ];   

    // Creación e Inicialización de los buffers
    webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionBuffer), gl.STATIC_DRAW);
    webgl_position_buffer.itemSize = 3;
    webgl_position_buffer.numItems = positionBuffer.length / 3;

    webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalBuffer), gl.STATIC_DRAW);
    webgl_normal_buffer.itemSize = 3;
    webgl_normal_buffer.numItems = normalBuffer.length / 3;

    webgl_uvs_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_uvs_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvBuffer), gl.STATIC_DRAW);
    webgl_uvs_buffer.itemSize = 3;
    webgl_uvs_buffer.numItems = uvBuffer.length / 3;

    webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexBuffer), gl.STATIC_DRAW);
    webgl_index_buffer.itemSize = 1;
    webgl_index_buffer.numItems = indexBuffer.length;

    return {
        webgl_position_buffer,
        webgl_normal_buffer,
        webgl_uvs_buffer,
        webgl_index_buffer
    }
}



