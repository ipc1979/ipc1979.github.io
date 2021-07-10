        precision mediump float;

        varying vec3 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        

        uniform vec3 uAmbientColor;         // color de luz ambiente
        uniform vec3 uDirectionalColor;	    // color de luz direccional
        uniform vec3 uLightPosition;        // posición de la luz
        
        uniform bool uUseLighting;          // usar iluminacion si/no

        uniform sampler2D uSampler;

        void main(void) {
            
            vec3 lightDirection= normalize(uLightPosition - vec3(vWorldPosition));
            
            vec3 colorTexture;

            colorTexture.x=vUv.x;
            colorTexture.y=vUv.y;
            colorTexture.z=vUv.z;

            vec3 color=(uAmbientColor+uDirectionalColor*max(dot(vNormal,lightDirection), 0.0))*colorTexture.xyz;
        
            if (uUseLighting)
                gl_FragColor = vec4(color,1.0);
            else
                gl_FragColor = vec4(0.9, 0.9, 0.9, 1);
            
        }