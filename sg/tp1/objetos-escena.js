function Tobogan(matrizModeladoTobogan) {
    
    var matrizTobogan = mat4.create();
    mat4.translate(matrizTobogan, matrizModeladoTobogan,[-20,20,0.75]);
    matrizModelado = matrizTobogan ;
    setMatrixUniforms();
    dibujarGeometria("curvaExtruida");

    for ( n = 0 ; n < pisosTobogan ; n++ ) {
        mat4.translate(matrizTobogan, matrizTobogan,[0,0,2]);
        matrizModelado = matrizTobogan ;
        setMatrixUniforms();
        dibujarGeometria("curvaExtruida");
    }

    var matrizToboganColumnas1 = mat4.create();
    mat4.translate(matrizToboganColumnas1, matrizModeladoTobogan,[-20,19.5,0]);
    matrizModelado = matrizToboganColumnas1 ;
    setMatrixUniforms();
    dibujarFormaTextura(new CilindroPostes(0.25,pisosTobogan*2+2),textures[6],0.25,1,10,4);

    var matrizToboganColumnas2 = mat4.create();
    mat4.translate(matrizToboganColumnas2, matrizModeladoTobogan,[-20,20.5,0]);
    matrizModelado = matrizToboganColumnas2 ;
    setMatrixUniforms();
    dibujarFormaTextura(new CilindroPostes(0.25,pisosTobogan*2+2),textures[6],0.25,1,10,4);


}

function Grua(matrizGrua) {

    matrizModeladoGruaBase = mat4.create();
    matrizModeladoGruaBaseScale = mat4.create();
    mat4.translate(matrizModeladoGruaBase, matrizGrua,[10,0,0]);
    matrizModelado = matrizModeladoGruaBase ;
    setMatrixUniforms();
    dibujarFormaTextura(new CilindroBase(5,10),textures[0],2,5,10,4);
        
    matrizModeladoGruaCuerpo = mat4.create();
    matrizModeladoGruaCuerpoScale = mat4.create();
    mat4.translate(matrizModeladoGruaCuerpo, matrizModeladoGruaBase,[0,0,10-expandeGrua]);
    matrizModelado = matrizModeladoGruaCuerpo ;
    setMatrixUniforms();
    dibujarFormaTextura(new CilindroCuerpo(3,10),textures[0],2,5,10,4);
    
    
    matrizModeladoGruaExtension = mat4.create();
    matrizModeladoGruaExpesionScale = mat4.create(); 
    mat4.translate(matrizModeladoGruaExtension, matrizModeladoGruaCuerpo,[0,0,10-expandeGrua]);
    matrizModelado = matrizModeladoGruaExtension ;
    setMatrixUniforms();
    dibujarForma(new CilindroColor(1.5,10,[0.4,0.4,0.4]),100,100);

    matrizModeladoGruaCabina = mat4.create();
    matrizModeladoGruaCabinaEscala = mat4.create(); 
    mat4.translate(matrizModeladoGruaCabina, matrizModeladoGruaCuerpo,[0,0,20-expandeGrua*1]);
    mat4.rotate(matrizModeladoGruaCabina, matrizModeladoGruaCabina,Math.PI*rotarCabina,[0,0,1]); 
    mat4.scale(matrizModeladoGruaCabinaEscala, matrizModeladoGruaCabina,[4,4,3]); 
    matrizModelado = matrizModeladoGruaCabinaEscala;
    setMatrixUniforms();
    dibujarGeometria("cubo");

    matrizModeladoGruaTrapecioDer = mat4.create();
    mat4.translate(matrizModeladoGruaTrapecioDer, matrizModeladoGruaCabina,[0.5,-1,3]);
    mat4.scale(matrizModeladoGruaTrapecioDer, matrizModeladoGruaTrapecioDer,[0.25,1,2]); 
    matrizModelado = matrizModeladoGruaTrapecioDer;
    setMatrixUniforms();
    dibujarGeometria("trapecio");

    matrizModeladoGruaTrapecioIzq = mat4.create();
    mat4.translate(matrizModeladoGruaTrapecioIzq, matrizModeladoGruaCabina,[-0.5,-1,3]);
    mat4.scale(matrizModeladoGruaTrapecioIzq, matrizModeladoGruaTrapecioIzq,[0.25,1,2]); 
    matrizModelado = matrizModeladoGruaTrapecioIzq;
    setMatrixUniforms();
    dibujarGeometria("trapecio");

    matrizModeladoGruaPluma1 = mat4.create();
    matrizModeladoGruaPluma2 = mat4.create();
    mat4.translate(matrizModeladoGruaPluma1, matrizModeladoGruaCabina,[0,0,4.5]);
    mat4.rotate(matrizModeladoGruaPluma1, matrizModeladoGruaPluma1,-0.5*Math.PI+rotarPluma,[1,0,0]); 
    mat4.rotate(matrizModeladoGruaPluma2, matrizModeladoGruaPluma1,-0.25*Math.PI,[0,0,1]); 
    matrizModelado = matrizModeladoGruaPluma2;
    setMatrixUniforms();
    dibujarFormaTextura(new CilindroPluma(0.5,30),textures[0],10,1,10,4);

    matrizModeladoLinga = mat4.create();
    mat4.translate(matrizModeladoLinga, matrizModeladoGruaPluma1,[0,0,29]);
    mat4.rotate(matrizModeladoLinga, matrizModeladoLinga,-0.5*Math.PI-rotarPluma,[1,0,0]); 
    matrizModelado = matrizModeladoLinga;
    setMatrixUniforms();
    dibujarForma(new CilindroColor(0.05,10*largoLinga+10,[0.2,0.2,0.2]),100,100);

    matrizModeladoTabla = mat4.create();
    mat4.translate(matrizModeladoTabla, matrizModeladoLinga,[0,0,10*largoLinga+10]);
    matrizModelado = matrizModeladoTabla;
    setMatrixUniforms();
    dibujarFormaTextura(new Plano(5,5),textures[6],2,2,100,100);


}

function Edificio(matrizEdificio) {
    if ( ventanasAncho != ventanasAnchoTemp || ventanasLargo != ventanasLargoTemp ) {
        puntosControlEdificioTramo1 = obtenerPuntosControl(0); 
        puntosControlEdificioTramo2 = obtenerPuntosControl(2);
        ventanasAnchoTemp = ventanasAncho;
        ventanasLargoTemp = ventanasLargo; 
    }
    var matrizPiso = mat4.create();
    BaseEdificio(matrizEdificio);
    curvaBezier = puntosControlEdificioTramo1;
    mat4.translate(matrizPiso, matrizEdificio,[0,0,3]);
    for (var piso = 0 ; piso < pisosTramo1 ; piso++ ) {
        LozaT1(matrizPiso);
        Columnas(matrizPiso,columnasTramo1);
        Ascensor(matrizPiso);
        var marcos = obtenerPuntosMarcos(0);
        marcos.forEach((punto) => {
            Marco(matrizPiso,punto);
        });              
        mat4.translate(matrizPiso, matrizPiso,[0,0,3]);
    }
    LozaT1(matrizPiso);
    curvaBezier = puntosControlEdificioTramo2;
    for (var piso = 0 ; piso < pisosTramo2 ; piso++ ) {
        LozaT2(matrizPiso);
        Columnas(matrizPiso,columnasTramo2); 
        Ascensor(matrizPiso);
        var marcos = obtenerPuntosMarcos(2); 
        marcos.forEach((punto) => {
            Marco(matrizPiso,punto);
        });              
        mat4.translate(matrizPiso, matrizPiso,[0,0,3]);
    }
    LozaT2(matrizPiso);
    AscensorTecho(matrizPiso);

}

function BaseEdificio(matrizPiso) {
    var matrizModeladoBaseEdificio = mat4.create();
    mat4.scale(matrizModeladoBaseEdificio, matrizPiso,[2,4,3]);
    matrizModelado = matrizModeladoBaseEdificio ;            
    setMatrixUniforms();
    dibujarGeometria("baseEdificio");              
    mat4.translate(matrizModeladoBaseEdificio, matrizPiso,[3, 0, 0]);
    mat4.scale(matrizModeladoBaseEdificio, matrizModeladoBaseEdificio,[4,6,3]);
    matrizModelado = matrizModeladoBaseEdificio ;            
    setMatrixUniforms();
    dibujarGeometria("baseEdificio");            
    mat4.translate(matrizModeladoBaseEdificio, matrizPiso,[-3, 0, 0]);
    mat4.scale(matrizModeladoBaseEdificio, matrizModeladoBaseEdificio,[4,6,3]);
    matrizModelado = matrizModeladoBaseEdificio ;            
    setMatrixUniforms();
    dibujarGeometria("baseEdificio");            
}

function Ascensor(matrizPiso) {
    var matrizModeladoAscensor = mat4.create();
    mat4.scale(matrizModeladoAscensor, matrizPiso,[2,2,3]);
    matrizModelado = matrizModeladoAscensor ;            
    setMatrixUniforms();
    dibujarGeometria("ascensor");            
}

function AscensorTecho(matrizPiso) {
    var matrizModeladoAscensor = mat4.create();
    mat4.scale(matrizModeladoAscensor, matrizPiso,[2,2,1]);
    matrizModelado = matrizModeladoAscensor ;            
    setMatrixUniforms();
    dibujarGeometria("ascensor");              
}

function Marco(matrizPiso,punto) {
    var matrizModeladoMarco = mat4.create();
    mat4.translate(matrizModeladoMarco, matrizPiso,[punto.x, punto.y, 0]);
    matrizModelado = matrizModeladoMarco ;
    setMatrixUniforms();
    dibujarForma(new CilindroColor(0.2,3,[0.25,0.25,0.25]),10,4);
    //dibujarFormaTextura(new Plano(3,3),textures[3],0.5,0.5,100,100);
    mat4.rotate(matrizModeladoMarco, matrizModeladoMarco,0.5*Math.PI,[1,0, 0]);
    if ( punto.tramo == 1 || punto.tramo == 3 ) mat4.rotate(matrizModeladoMarco, matrizModeladoMarco,0.5*Math.PI,[0,1, 0]);
    if ( punto.tramo == 1 ) mat4.translate(matrizModeladoMarco, matrizModeladoMarco,[-3,0,0]);
    if ( punto.tramo == 2 ) mat4.translate(matrizModeladoMarco, matrizModeladoMarco,[-3,0,0]);
    mat4.translate(matrizModeladoMarco, matrizModeladoMarco,[1.5,1.5,0]);
    matrizModelado = matrizModeladoMarco ;
    setMatrixUniforms();
    dibujarFormaReflect(new Plano(3,3),textures[5],1,1,10,10);        
}

function LozaT1(matrizPiso) {
    matrizModelado = matrizPiso ;
    setMatrixUniforms();
    dibujarFormaTextura(new LozaSuperficieInfT1(),textures[4],0.5,0.2,100,100);
    dibujarGeometria("lozaPerfil");
    matrizModeladoCurvaSup2 = mat4.create();
    mat4.translate(matrizModeladoCurvaSup2, matrizPiso,[0, 0, 0.5]);
    matrizModelado = matrizModeladoCurvaSup2 ;
    setMatrixUniforms();
    dibujarFormaTextura(new LozaSuperficieSupT1(),textures[4],0.2,0.2,100,100);
}

function LozaT2(matrizPiso) {
    matrizModelado = matrizPiso ;
    setMatrixUniforms();
    dibujarFormaTextura(new LozaSuperficieInfT2(),textures[4],0.5,0.2,100,100);
    dibujarGeometria("lozaPerfil");
    matrizModeladoCurvaSup2 = mat4.create();
    mat4.translate(matrizModeladoCurvaSup2, matrizPiso,[0, 0, 0.5]);
    matrizModelado = matrizModeladoCurvaSup2 ;
    setMatrixUniforms();
    dibujarFormaTextura(new LozaSuperficieSupT2(),textures[4],0.2,0.2,100,100);
}


function Columnas(matrizPiso,columnas) {
    var coordenadas = obtenerCoordenadasColumnas(columnas);
    for ( var n = 0 ; n < coordenadas.length ; n++ ) {
        var matrizModeladoColumna = mat4.create();
        mat4.translate(matrizModeladoColumna, matrizModeladoCurvaSup2,[coordenadas[n].x, coordenadas[n].y, 0]);
        matrizModelado = matrizModeladoColumna ;
        setMatrixUniforms();
        dibujarFormaTextura(new CilindroColumna(0.5,3),textures[3],0.5,0.5,10,20);
    }              
}
