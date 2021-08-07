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
        punto.tramo = 1 ;
        puntosControl.push(punto);
    }
    for ( var n = 0 ; n < ventanasLargo-tramo ; n++ ) {
        punto = sumaPuntos(punto,{x:3,y:0});
        punto.tramo = 2 ;
        puntosControl.push(punto);
    }
    for ( var n = 0 ; n < ventanasAncho-tramo ; n++ ) {
        punto = sumaPuntos(punto,{x:0,y:-3});
        punto.tramo = 3 ;
        puntosControl.push(punto);
    }
    for ( var n = 0 ; n < ventanasLargo-tramo-1; n++ ) {
        punto = sumaPuntos(punto,{x:-3,y:0});
        punto.tramo = 4 ;
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

function obtenerNormalTobogan(vector,angulo) {
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

function CurvaCuadraticaBezier(u,puntos) {
    var punto;
    for ( var n = 0 ; n < (puntos.length-1)/2 ; n++ ) {
        var m1 = 2*n ;
        var m2 = 2*n+1;
        var m3 = 2*n+2;
        if ( (n/((puntos.length-1)*0.5)) <= u && u < (n+1)/((puntos.length-1)*0.5) ) {
            l = 0.5*(puntos.length-1)*(u-(n/((puntos.length-1)*0.5))) ;
            punto = { 
                x: CB0(l)*puntos[m1].x+CB1(l)*puntos[m2].x+CB2(l)*puntos[m3].x,
                y: CB0(l)*puntos[m1].y+CB1(l)*puntos[m2].y+CB2(l)*puntos[m3].y
            };
        } else if ( (n+1)/(0.5*(puntos.length-1)) <= u ) {
            l = 0.5*(puntos.length-1)*(u-(n/(0.5*(puntos.length-1)))) ;
            punto = { 
                x: CB0(l)*puntos[m1].x+CB1(l)*puntos[m2].x+CB2(l)*puntos[m3].x,
                y: CB0(l)*puntos[m1].y+CB1(l)*puntos[m2].y+CB2(l)*puntos[m3].y
            };
        }
        
    } 
    return punto;
}

function CB0(u) {
    return (1-u)*(1-u);
}

function CB1(u) {
    return 2*(1-u)*u;
}

function CB2(u) {
    return u*u;
}


function CurvaCubicaBezier(u,puntos) {
    var punto;
    if ( 0 <= u && u < 0.5 ) {
        l = 2 * u ;
        punto = { 
            x: CBC0(l)*puntos[0].x+CBC1(l)*puntos[1].x+CBC2(l)*puntos[2].x+CBC3(l)*puntos[3].x,
            y: CBC0(l)*puntos[0].y+CBC1(l)*puntos[1].y+CBC2(l)*puntos[2].y+CBC3(l)*puntos[3].y
        };
    } else if ( 0.5 <= u && u <= 1 ) {
        l = 2 * ( u - 0.5 ) ;
        punto = { 
            x: CBC0(l)*puntos[3].x+CBC1(l)*puntos[4].x+CBC2(l)*puntos[5].x+CBC3(l)*puntos[0].x,
            y: CBC0(l)*puntos[3].y+CBC1(l)*puntos[4].y+CBC2(l)*puntos[5].y+CBC3(l)*puntos[0].y
        };
    } else {
        l = 1 ;
        punto = { 
            x: CBC0(l)*puntos[3].x+CBC1(l)*puntos[4].x+CBC2(l)*puntos[5].x+CBC3(l)*puntos[0].x,
            y: CBC0(l)*puntos[3].y+CBC1(l)*puntos[4].y+CBC2(l)*puntos[5].y+CBC3(l)*puntos[0].y
        };
    }
    return punto ;
}

function CBC0(u) {
    return (1-u)*(1-u)*(1-u);
}

function CBC1(u) {
    return 3*(1-u)*(1-u)*u;
}

function CBC2(u) {
    return 3*(1-u)*u*u;
}

function CBC3(u) {
    return u*u*u;
}

