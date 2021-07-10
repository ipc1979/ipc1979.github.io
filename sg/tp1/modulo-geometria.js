

/*

    Tareas:
    ------

    1) Modificar a función "generarSuperficie" para que tenga en cuenta los parametros filas y columnas al llenar el indexBuffer
       Con esta modificación deberían poder generarse planos de N filas por M columnas

    2) Modificar la funcion "dibujarMalla" para que use la primitiva "triangle_strip"

    3) Crear nuevos tipos funciones constructoras de superficies

        3a) Crear la función constructora "Esfera" que reciba como parámetro el radio

        3b) Crear la función constructora "TuboSenoidal" que reciba como parámetro la amplitud de onda, longitud de onda, radio del tubo y altura.
        (Ver imagenes JPG adjuntas)
        
        
    Entrega:
    -------

    - Agregar una variable global que permita elegir facilmente que tipo de primitiva se desea visualizar [plano,esfera,tubosenoidal]
    
*/

var superficie3D;
var mallaDeTriangulos;

var filas=100;
var columnas=100;

function initSuperficies() {

    superficie3D=new Plano(100,100);    
    mallaDeTriangulosPlano=generarSuperficie(superficie3D,filas,columnas);

    mallaDeTriangulosCubo=generarSuperficieCubo([0.9,0.9,0.3]);

    mallaDeTriangulosMarco=generarSuperficieCubo([0.25,0.25,0.25]);

    mallaDeTriangulosAscensor=generarSuperficieCubo([0.5,0.5,0.5]);

    mallaDeTriangulosBaseEdificio=generarSuperficieCubo([0.9,0.9,0.9]);

    mallaDeTriangulosTrapecio=generarSuperficieTrapecio([0.9,0.9,0.3]);

    superficie3D=new Cilindro(1,1);
    mallaDeTriangulosColumna=generarSuperficie(superficie3D,filas,columnas);

}

function dibujarGeometria(tipo){

    if ( tipo == 'plano' ) {
        mallaDeTriangulos=mallaDeTriangulosPlano;
    } else if ( tipo == 'lozaPerfil' ) {
        superficie3D=new LozaPerfil();
        mallaDeTriangulos=generarSuperficie(superficie3D,filas,columnas);
    } else if ( tipo == 'lozaSuperficieInferior' ) {
        superficie3D=new LozaSuperficie(-1);
        mallaDeTriangulos=generarSuperficie(superficie3D,filas,columnas);
    } else if ( tipo == 'lozaSuperficieSuperior' ) {
        superficie3D=new LozaSuperficie(1);
        mallaDeTriangulos=generarSuperficie(superficie3D,filas,columnas);
    } else if ( tipo == 'cubo' ) {
        mallaDeTriangulos=mallaDeTriangulosCubo;
    } else if ( tipo == 'marco' ) {
        mallaDeTriangulos=mallaDeTriangulosMarco;
    } else if ( tipo == 'ascensor' ) {
        mallaDeTriangulos=mallaDeTriangulosAscensor;
    } else if ( tipo == 'trapecio' ) {
        mallaDeTriangulos=mallaDeTriangulosTrapecio;
    } else if ( tipo == 'baseEdificio' ) {
        mallaDeTriangulos=mallaDeTriangulosBaseEdificio;
    } else {
        mallaDeTriangulos=mallaDeTriangulosColumna;
    } 
    dibujarMalla(mallaDeTriangulos);
}

function Plano(ancho,largo){

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
        return [0.33, 0.75, 0.58];
    }
}

function Cilindro(radio,altura){

    this.getPosicion=function(u,v){
        sin_v = Math.sin(2*Math.PI*v)
        cos_v = Math.cos(2*Math.PI*v)
        var x=sin_v*radio;
        var y=cos_v*radio;
        var z=altura*u;
        return [x,y,z];
    }

    this.getNormal=function(u,v){
        return [Math.sin(2*Math.PI*v),Math.cos(2*Math.PI*v),0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [0.6, 0.6, 0.6];
    }
}

function LozaSuperficie(normal){

    this.getPosicion=function(u,v){        
        punto = CurvaCuadratica(u,curvaBezier);
        return [v*punto.x,v*punto.y,0];
    }

    this.getNormal=function(u,v){
        return [0,0,normal];
    }

    this.getCoordenadasTextura=function(u,v){
        return [0.9,0.9,0.9];
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

function obtenerCoordenadasColumnas(columnas) {
    coordenadas = [];

    for ( var n = 0 ; n < columnas ; n++ ) {
        u=(1/columnas)*n; 
        puntoIni = CurvaCuadratica(u,curvaBezier);
        puntoFin = CurvaCuadratica(u+0.01,curvaBezier);
        punto = diferenciaPuntos(puntoFin,puntoIni);
        vectorNormal = obtenerNormal(
            { x: punto.x, y: punto.y, z: 0 },
            { x: 0, y: 0, z: 1 }
        );
        coordenadas.push({
            x: puntoIni.x-vectorNormal.x,
            y: puntoIni.y-vectorNormal.y
        });    
    }
    return coordenadas;
}

function obtenerPuntosControl(tramo) {
    var ancho = 3*(ventanasAncho-tramo) ;
    var largo = 3*(ventanasLargo-tramo) ;
    var base = 2 ;
    var variacion = 2 ;
    var puntosControl = [];
    var punto = {
        x: -largo/2,
        y: -ancho/2
    }; 
    var puntoRandom = {};
    puntoRandom = sumaPuntos(punto,{x:-Math.random(),y:-Math.random()});
    puntosControl.push(puntoRandom);
    for ( var n = 0 ; n < ventanasAncho-tramo ; n++ ) {
        punto = sumaPuntos(punto,{x:0,y:3});
        puntoRandom = sumaPuntos(punto,{x:-(variacion*Math.random()+base),y:0});
        puntosControl.push(puntoRandom);
    }
    for ( var n = 0 ; n < ventanasLargo-tramo ; n++ ) {
        punto = sumaPuntos(punto,{x:3,y:0});
        puntoRandom = sumaPuntos(punto,{x:0,y:variacion*Math.random()+base});
        puntosControl.push(puntoRandom);
    }
    for ( var n = 0 ; n < ventanasAncho-tramo ; n++ ) {
        punto = sumaPuntos(punto,{x:0,y:-3});
        puntoRandom = sumaPuntos(punto,{x:variacion*Math.random()+base,y:0});
        puntosControl.push(puntoRandom);
    }
    for ( var n = 0 ; n < ventanasLargo-tramo-1; n++ ) {
        punto = sumaPuntos(punto,{x:-3,y:0});
        puntoRandom = sumaPuntos(punto,{x:0,y:-(variacion*Math.random()+base)});
        puntosControl.push(puntoRandom);
    }
    return puntosControl; 
}

function obtenerPuntosMarcos(tramo) {
    var ancho = 3*(ventanasAncho-tramo) ;
    var largo = 3*(ventanasLargo-tramo) ;
    var puntosControl = [];
    var punto = {
        x: -largo/2,
        y: -ancho/2
    };
    puntosControl.push(punto);
    for ( var n = 0 ; n < ventanasAncho-tramo ; n++ ) {
        punto = sumaPuntos(punto,{x:0,y:3});
        puntosControl.push(punto);
    }
    for ( var n = 0 ; n < ventanasLargo-tramo ; n++ ) {
        punto = sumaPuntos(punto,{x:3,y:0});
        puntosControl.push(punto);
    }
    for ( var n = 0 ; n < ventanasAncho-tramo ; n++ ) {
        punto = sumaPuntos(punto,{x:0,y:-3});
        puntosControl.push(punto);
    }
    for ( var n = 0 ; n < ventanasLargo-tramo-1; n++ ) {
        punto = sumaPuntos(punto,{x:-3,y:0});
        puntosControl.push(punto);
    }
    return puntosControl; 
}

function sumaPuntos(punto1,punto2) {
    return {
        x: punto1.x+punto2.x,
        y: punto1.y+punto2.y
    }
}

function obtenerNormal(vector) {
    var angulo = Math.PI/2 ;
    var normal = {
        x: vector.x*Math.cos(angulo)-vector.y*Math.sin(angulo),
        y: vector.x*Math.sin(angulo)+vector.y*Math.cos(angulo),
        z: 0
    };
    var norma = Math.sqrt(normal.x*normal.x+normal.y*normal.y+normal.z*normal.z);
    var normaUnitaria = {
        x: normal.x/norma,
        y: normal.y/norma,
        z: normal.z/norma
    };

    return normaUnitaria;
}

function diferenciaPuntos(punto1,punto2) {
    return {
        x: punto1.x-punto2.x,
        y: punto1.y-punto2.y
    }
}

function CurvaCuadratica(u,puntos) {
    var punto;
    for ( var n = 0 ; n < puntos.length ; n++ ) {
        var m1 = n ;
        var m2 = n+1 <= puntos.length - 1 ? n+1 : n+1-puntos.length ;
        var m3 = n+2 <= puntos.length - 1 ? n+2 : n+2-puntos.length ;
        if ( (n/puntos.length) <= u && u < (n+1)/puntos.length ) {
            l = puntos.length*(u-(n/puntos.length)) ;
            punto = { 
                x: B0(l)*puntos[m1].x+B1(l)*puntos[m2].x+B2(l)*puntos[m3].x,
                y: B0(l)*puntos[m1].y+B1(l)*puntos[m2].y+B2(l)*puntos[m3].y
            };
        } else if ( (n+1)/puntos.length <= u ) {
            l = puntos.length*(u-(n/puntos.length)) ;
            punto = { 
                x: B0(l)*puntos[m1].x+B1(l)*puntos[m2].x+B2(l)*puntos[m3].x,
                y: B0(l)*puntos[m1].y+B1(l)*puntos[m2].y+B2(l)*puntos[m3].y
            };
        }
    } 
    return punto;
}

function B0(u) {
    return 0.5*(1-u)*(1-u);
}

function B1(u) {
    return 0.5+(1-u)*u;
}

function B2(u) {
    return 0.5*u*u;
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

function generarSuperficie(superficie,filas,columnas){
    
    positionBuffer = [];
    normalBuffer = [];
    uvBuffer = [];

    for (var i=0; i <= filas; i++) {
        for (var j=0; j <= columnas; j++) {

            var u=j/columnas;
            var v=i/filas;

            var pos=superficie.getPosicion(u,v);

            positionBuffer.push(pos[0]);
            positionBuffer.push(pos[1]);
            positionBuffer.push(pos[2]);

            var nrm=superficie.getNormal(u,v);

            normalBuffer.push(nrm[0]);
            normalBuffer.push(nrm[1]);
            normalBuffer.push(nrm[2]);

            var uvs=superficie.getCoordenadasTextura(u,v);

            uvBuffer.push(uvs[0]);
            uvBuffer.push(uvs[1]);
            uvBuffer.push(uvs[2]);

        }
    }

    // Buffer de indices de los triángulos
    
    indexBuffer=[];  

    for (f=0; f < filas; f++) {
        for (c=0; c < columnas; c++) {
            indexBuffer.push(f*columnas+c+f);
            indexBuffer.push((f+1)*columnas+c+f+1);
            indexBuffer.push(f*columnas+c+f+1);
            indexBuffer.push(f*columnas+c+f+1);
            indexBuffer.push((f+1)*columnas+c+f+1);
            indexBuffer.push(((f+1)*columnas+c+f+1)+(f*columnas+c+f+1)-(f*columnas+c+f));
        }
    }

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

function dibujarMalla(mallaDeTriangulos){
    
    // Se configuran los buffers que alimentaron el pipeline
    gl.bindBuffer(gl.ARRAY_BUFFER, mallaDeTriangulos.webgl_position_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mallaDeTriangulos.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, mallaDeTriangulos.webgl_uvs_buffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, mallaDeTriangulos.webgl_uvs_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, mallaDeTriangulos.webgl_normal_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, mallaDeTriangulos.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);
       
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mallaDeTriangulos.webgl_index_buffer);


    if (modo!="wireframe"){
        gl.uniform1i(shaderProgram.useLightingUniform,(lighting=="true"));                    
        gl.drawElements(gl.TRIANGLE_STRIP, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
    
    if (modo!="smooth") {
        gl.uniform1i(shaderProgram.useLightingUniform,false);
        gl.drawElements(gl.LINE_STRIP, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
 
}