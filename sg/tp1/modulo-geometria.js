var superficie3D;
var mallaDeTriangulos;

var filas=100;
var columnas=100;

function initSuperficies() {

    mallaDeTriangulosPlano=generarSuperficie(new Plano(100,100),filas,columnas);

    mallaDeTriangulosCubo=generarSuperficieCubo([0.9,0.9,0.3]);

    mallaDeTriangulosMarco=generarSuperficieCubo([0.25,0.25,0.25]);

    mallaDeTriangulosAscensor=generarSuperficieCubo([0.5,0.5,0.5]);

    mallaDeTriangulosBaseEdificio=generarSuperficieCubo([0.9,0.9,0.9]);

    mallaDeTriangulosTrapecio=generarSuperficieTrapecio([0.9,0.9,0.3]);

    mallaDeTriangulosColumna=generarSuperficie(new Cilindro(1,1),filas,columnas);

    mallaDeTriangulosCurvaExtruida=generarSuperficie(new CurvaExtruida(),filas,columnas);    

}

function dibujarGeometria(tipo){

    if ( tipo == 'plano' ) {
        mallaDeTriangulos=mallaDeTriangulosPlano;
    } else if ( tipo == 'lozaPerfil' ) {
        superficie3D=new LozaPerfil();
        mallaDeTriangulos=generarSuperficie(superficie3D,1,100);
    } else if ( tipo == 'curvaExtruida' ) {
        mallaDeTriangulos=mallaDeTriangulosCurvaExtruida;
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
    indexBuffer=[]; 

    if ( forma instanceof LozaSuperficieSupT1 ) {
        if ( lozaSuperficieSupT1.positionBuffer.length == 0 ) {
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
            lozaSuperficieSupT1.positionBuffer = positionBuffer;
            lozaSuperficieSupT1.normalBuffer = normalBuffer;
            lozaSuperficieSupT1.textureBuffer = textureBuffer;
            lozaSuperficieSupT1.indexBuffer = indexBuffer;
            console.log('SUPERFICIE_SUP');
        } else {
            positionBuffer = lozaSuperficieSupT1.positionBuffer ;
            normalBuffer = lozaSuperficieSupT1.normalBuffer ;
            textureBuffer = lozaSuperficieSupT1.textureBuffer ;
            indexBuffer = lozaSuperficieSupT1.indexBuffer ;    
        }
    }
    else if ( forma instanceof LozaSuperficieInfT1 ) {
        if ( lozaSuperficieInfT1.positionBuffer.length == 0 ) {
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
            lozaSuperficieInfT1.positionBuffer = positionBuffer;
            lozaSuperficieInfT1.normalBuffer = normalBuffer;
            lozaSuperficieInfT1.textureBuffer = textureBuffer;
            lozaSuperficieInfT1.indexBuffer = indexBuffer;
            console.log('SUPERFICIE_INF');
        } else {
            positionBuffer = lozaSuperficieInfT1.positionBuffer ;
            normalBuffer = lozaSuperficieInfT1.normalBuffer ;
            textureBuffer = lozaSuperficieInfT1.textureBuffer ;
            indexBuffer = lozaSuperficieInfT1.indexBuffer ;    
        }
    }    
    else if ( forma instanceof LozaSuperficieSupT2 ) {
        if ( lozaSuperficieSupT2.positionBuffer.length == 0 ) {
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
            lozaSuperficieSupT2.positionBuffer = positionBuffer;
            lozaSuperficieSupT2.normalBuffer = normalBuffer;
            lozaSuperficieSupT2.textureBuffer = textureBuffer;
            lozaSuperficieSupT2.indexBuffer = indexBuffer;
            console.log('SUPERFICIE_SUP');
        } else {
            positionBuffer = lozaSuperficieSupT2.positionBuffer ;
            normalBuffer = lozaSuperficieSupT2.normalBuffer ;
            textureBuffer = lozaSuperficieSupT2.textureBuffer ;
            indexBuffer = lozaSuperficieSupT2.indexBuffer ;    
        }
    }
    else if ( forma instanceof LozaSuperficieInfT2 ) {
        if ( lozaSuperficieInfT2.positionBuffer.length == 0 ) {
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
            lozaSuperficieInfT2.positionBuffer = positionBuffer;
            lozaSuperficieInfT2.normalBuffer = normalBuffer;
            lozaSuperficieInfT2.textureBuffer = textureBuffer;
            lozaSuperficieInfT2.indexBuffer = indexBuffer;
            console.log('SUPERFICIE_INF');
        } else {
            positionBuffer = lozaSuperficieInfT2.positionBuffer ;
            normalBuffer = lozaSuperficieInfT2.normalBuffer ;
            textureBuffer = lozaSuperficieInfT2.textureBuffer ;
            indexBuffer = lozaSuperficieInfT2.indexBuffer ;    
        }
    }    
    else if ( forma instanceof CilindroColumna ) {
        if ( cilindroColumnaSuperficie.positionBuffer.length == 0 ) {
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
            cilindroColumnaSuperficie.positionBuffer = positionBuffer;
            cilindroColumnaSuperficie.normalBuffer = normalBuffer;
            cilindroColumnaSuperficie.textureBuffer = textureBuffer;
            cilindroColumnaSuperficie.indexBuffer = indexBuffer;
            console.log('COLUMNA_COLUMNA');
        } else {
            positionBuffer = cilindroColumnaSuperficie.positionBuffer ;
            normalBuffer = cilindroColumnaSuperficie.normalBuffer ;
            textureBuffer = cilindroColumnaSuperficie.textureBuffer ;
            indexBuffer = cilindroColumnaSuperficie.indexBuffer ;    
        }
    }
    else if ( forma instanceof CilindroPluma ) {
        if ( cilindroPlumaSuperficie.positionBuffer.length == 0 ) {
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
            cilindroPlumaSuperficie.positionBuffer = positionBuffer;
            cilindroPlumaSuperficie.normalBuffer = normalBuffer;
            cilindroPlumaSuperficie.textureBuffer = textureBuffer;
            cilindroPlumaSuperficie.indexBuffer = indexBuffer;
            console.log('COLUMNA_PLUMA');
        } else {
            positionBuffer = cilindroPlumaSuperficie.positionBuffer ;
            normalBuffer = cilindroPlumaSuperficie.normalBuffer ;
            textureBuffer = cilindroPlumaSuperficie.textureBuffer ;
            indexBuffer = cilindroPlumaSuperficie.indexBuffer ;    
        }
    }    
    else if ( forma instanceof CilindroBase ) {
        if ( cilindroBaseSuperficie.positionBuffer.length == 0 ) {
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
            cilindroBaseSuperficie.positionBuffer = positionBuffer;
            cilindroBaseSuperficie.normalBuffer = normalBuffer;
            cilindroBaseSuperficie.textureBuffer = textureBuffer;
            cilindroBaseSuperficie.indexBuffer = indexBuffer;
            console.log('COLUMNA_BASE');
        } else {
            positionBuffer = cilindroBaseSuperficie.positionBuffer ;
            normalBuffer = cilindroBaseSuperficie.normalBuffer ;
            textureBuffer = cilindroBaseSuperficie.textureBuffer ;
            indexBuffer = cilindroBaseSuperficie.indexBuffer ;    
        }
    }  
    else if ( forma instanceof CilindroCuerpo ) {
        if ( cilindroCuerpoSuperficie.positionBuffer.length == 0 ) {
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
            cilindroCuerpoSuperficie.positionBuffer = positionBuffer;
            cilindroCuerpoSuperficie.normalBuffer = normalBuffer;
            cilindroCuerpoSuperficie.textureBuffer = textureBuffer;
            cilindroCuerpoSuperficie.indexBuffer = indexBuffer;
            console.log('COLUMNA_CUERPO');
        } else {
            positionBuffer = cilindroCuerpoSuperficie.positionBuffer ;
            normalBuffer = cilindroCuerpoSuperficie.normalBuffer ;
            textureBuffer = cilindroCuerpoSuperficie.textureBuffer ;
            indexBuffer = cilindroCuerpoSuperficie.indexBuffer ;    
        }
    }       
    else if ( forma instanceof CilindroPostes ) {
        if ( cilindroPostesSuperficie.positionBuffer.length == 0 ) {
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
            cilindroPostesSuperficie.positionBuffer = positionBuffer;
            cilindroPostesSuperficie.normalBuffer = normalBuffer;
            cilindroPostesSuperficie.textureBuffer = textureBuffer;
            cilindroPostesSuperficie.indexBuffer = indexBuffer;
            console.log('COLUMNA_POSTES');
        } else {
            positionBuffer = cilindroPostesSuperficie.positionBuffer ;
            normalBuffer = cilindroPostesSuperficie.normalBuffer ;
            textureBuffer = cilindroPostesSuperficie.textureBuffer ;
            indexBuffer = cilindroPostesSuperficie.indexBuffer ;    
        }
    }    
    else if ( forma instanceof Cilindro ) {
        if ( cilindroSuperficie.positionBuffer.length == 0 ) {
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
            cilindroSuperficie.positionBuffer = positionBuffer;
            cilindroSuperficie.normalBuffer = normalBuffer;
            cilindroSuperficie.textureBuffer = textureBuffer;
            cilindroSuperficie.indexBuffer = indexBuffer;
            console.log('COLUMNA');
        } else {
            positionBuffer = cilindroSuperficie.positionBuffer ;
            normalBuffer = cilindroSuperficie.normalBuffer ;
            textureBuffer = cilindroSuperficie.textureBuffer ;
            indexBuffer = cilindroSuperficie.indexBuffer ;    
        }
    }    
    else if ( forma instanceof Piso ) {
        if ( pisoSuperficie.positionBuffer.length == 0 ) {
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
            pisoSuperficie.positionBuffer = positionBuffer;
            pisoSuperficie.normalBuffer = normalBuffer;
            pisoSuperficie.textureBuffer = textureBuffer;
            pisoSuperficie.indexBuffer = indexBuffer;
            console.log('PISO');
        } else {
            positionBuffer = pisoSuperficie.positionBuffer ;
            normalBuffer = pisoSuperficie.normalBuffer ;
            textureBuffer = pisoSuperficie.textureBuffer ;
            indexBuffer = pisoSuperficie.indexBuffer ;    
        }
    } 
    else if ( forma instanceof Plano ) {
        if ( planoSuperficie.positionBuffer.length == 0 ) {
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
            planoSuperficie.positionBuffer = positionBuffer;
            planoSuperficie.normalBuffer = normalBuffer;
            planoSuperficie.textureBuffer = textureBuffer;
            planoSuperficie.indexBuffer = indexBuffer;
            console.log('PLANO');
        } else {
            positionBuffer = planoSuperficie.positionBuffer ;
            normalBuffer = planoSuperficie.normalBuffer ;
            textureBuffer = planoSuperficie.textureBuffer ;
            indexBuffer = planoSuperficie.indexBuffer ;    
        }
    }     
    else {
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
        console.log('FALTAAAA');
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
    indexBuffer=[];  

    if ( forma instanceof Plano ) {
        if ( reflectSuperficie.positionBuffer.length == 0 ) {
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
            reflectSuperficie.positionBuffer = positionBuffer;
            reflectSuperficie.normalBuffer = normalBuffer;
            reflectSuperficie.textureBuffer = textureBuffer;
            reflectSuperficie.indexBuffer = indexBuffer;
            console.log('SUPERFICIE_REFLECT');
        } else {
            positionBuffer = reflectSuperficie.positionBuffer ;
            normalBuffer = reflectSuperficie.normalBuffer ;
            textureBuffer = reflectSuperficie.textureBuffer ;
            indexBuffer = reflectSuperficie.indexBuffer ;    
        }
    }
    else {
        
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

