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
    } else if ( tipo == 'lozaExt' ) {
        superficie3D=new LozaPerfilExt();
        mallaDeTriangulos=generarSuperficie(superficie3D,filas,columnas);
    } else if ( tipo == 'lozaSuperficieInferior' ) {
        superficie3D=new LozaSuperficie(-1);
        mallaDeTriangulos=generarSuperficie(superficie3D,filas,columnas);
    } else if ( tipo == 'lozaSuperficieSuperior' ) {
        superficie3D=new LozaSuperficie(1);
        mallaDeTriangulos=generarSuperficie(superficie3D,filas,columnas);
    } else if ( tipo == 'curvaExtruida' ) {
        superficie3D=new CurvaExtruida();
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

function dibujarForma(forma,filas,columnas) {

    positionBuffer = [];
    normalBuffer = [];
    uvBuffer = [];

    for (var i=0; i <= filas; i++) {
        for (var j=0; j <= columnas; j++) {

            var u=i/filas;
            var v=j/columnas;

            var pos=forma.getPosicion(u,v);

            positionBuffer.push(pos[0]);
            positionBuffer.push(pos[1]);
            positionBuffer.push(pos[2]);

            var nrm=forma.getNormal(u,v);

            normalBuffer.push(nrm[0]);
            normalBuffer.push(nrm[1]);
            normalBuffer.push(nrm[2]);

            var uvs=forma.getCoordenadasTextura(u,v);

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
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Creación e Inicialización de los buffers
    webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalBuffer), gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    // Creación e Inicialización de los buffers
    webgl_uvs_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_uvs_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvBuffer), gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 3, gl.FLOAT, false, 0, 0);

    // Creación e Inicialización de los buffers
    webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexBuffer), gl.STATIC_DRAW);

    gl.uniform1i(shaderProgram.withTexture,false);
    gl.uniform1i(shaderProgram.useLightingUniform,(lighting=="true"));

    gl.drawElements(gl.TRIANGLE_STRIP, indexBuffer.length, gl.UNSIGNED_SHORT, 0);
    
}



function dibujarFormaTextura(forma,textura,scaleX,scaleY,filas,columnas) {

    positionBuffer = [];
    normalBuffer = [];
    textureBuffer = [];

    for (var i=0; i <= filas; i++) {
        for (var j=0; j <= columnas; j++) {

            var u=i/filas;
            var v=j/columnas;

            var pos=forma.getPosicion(u,v);

            positionBuffer.push(pos[0]);
            positionBuffer.push(pos[1]);
            positionBuffer.push(pos[2]);

            var nrm=forma.getNormal(u,v);

            normalBuffer.push(nrm[0]);
            normalBuffer.push(nrm[1]);
            normalBuffer.push(nrm[2]);

            var uvs=forma.getCoordenadasTextura(u,v);

            textureBuffer.push(scaleX*uvs[0]);
            textureBuffer.push(scaleY*uvs[1]);
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
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Creación e Inicialización de los buffers
    webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalBuffer), gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    // Creación e Inicialización de los buffers
    webgl_uvs_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_uvs_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvBuffer), gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 3, gl.FLOAT, false, 0, 0);

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

function dibujarFormaReflect(forma,textura,scaleX,scaleY,filas,columnas) {


    positionBuffer = [];
    normalBuffer = [];
    textureBuffer = [];

    for (var i=0; i <= filas; i++) {
        for (var j=0; j <= columnas; j++) {

            var u=i/filas;
            var v=j/columnas;

            var pos=forma.getPosicion(u,v);

            positionBuffer.push(pos[0]);
            positionBuffer.push(pos[1]);
            positionBuffer.push(pos[2]);

            var nrm=forma.getNormal(u,v);

            normalBuffer.push(nrm[0]);
            normalBuffer.push(nrm[1]);
            normalBuffer.push(nrm[2]);

            var uvs=forma.getCoordenadasTextura(u,v);

            textureBuffer.push(scaleX*uvs[0]);
            textureBuffer.push(scaleY*uvs[1]);
            //textureBuffer.push(0.1*pos[0]);
            //textureBuffer.push(0.1*pos[1]);

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
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Creación e Inicialización de los buffers
    webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalBuffer), gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    // Creación e Inicialización de los buffers
    //webgl_uvs_buffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, webgl_uvs_buffer);
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvBuffer), gl.STATIC_DRAW);
    //gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 3, gl.FLOAT, false, 0, 0);
/*
    // Create a texture.
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 2048;
    const height = 2048;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;

    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, level, internalFormat, width, height, 0, format, type, null);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, level, internalFormat, format, type, textures[5].image);
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
       

    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, level, internalFormat, width, height, 0, format, type, null);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, level, internalFormat, format, type, textures[6].image);
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
     

    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, level, internalFormat, width, height, 0, format, type, null);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, level, internalFormat, format, type, textures[7].image);
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
     

    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, level, internalFormat, width, height, 0, format, type, null);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, level, internalFormat, format, type, textures[8].image);
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
     

    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, level, internalFormat, width, height, 0, format, type, null);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, level, internalFormat, format, type, textures[9].image);
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
     
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, level, internalFormat, width, height, 0, format, type, null);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, level, internalFormat, format, type, textures[10].image);
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);


    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
*/

    // Textura
    //texture = gl.createTexture();
    //texture.image = new Image();
    //texture.image.src = textures[0];
    
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[0].image);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    //gl.generateMipmap(gl.TEXTURE_2D);
    //gl.bindTexture(gl.TEXTURE_2D, null);samplerUniform

  /*
    webgl_texture_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_texture_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureBuffer), gl.STATIC_DRAW);
    this.webgl_texture_buffer.itemSize = 2;
    this.webgl_texture_buffer.numItems = this.textureBuffer.length / 2;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_buffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttributeText, this.webgl_texture_buffer.itemSize, gl.FLOAT, false, 0, 0);
*/
    // Creación e Inicialización de los buffers
    webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexBuffer), gl.STATIC_DRAW);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textura);
    gl.uniform1i(shaderProgram.samplerCubeUniform, 0);
    
    gl.uniform1i(shaderProgram.withTexture,true);
    gl.uniform1i(shaderProgram.withReflect,true);
    gl.uniform1i(shaderProgram.useLightingUniform,(lighting=="true"));

    gl.drawElements(gl.TRIANGLE_STRIP, indexBuffer.length, gl.UNSIGNED_SHORT, 0);
    
}

