        precision mediump float;

        varying vec3 vUv;
        varying vec3 vUv2;
        varying vec4 vCameraPosition;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPosition;

        //attribute vec3 atext;         //coordenadas de texture (x,y)  x e y (en este caso) van de 0 a 1

        uniform vec3 uAmbientColor;         // color de luz ambiente
        uniform vec3 uDirectionalColor;	    // color de luz direccional
        uniform vec3 uLightPosition;        // posición de la luz
        
        uniform bool uUseLighting;          // usar iluminacion si/no
        uniform bool withTexture;          
        uniform bool withReflect;          

        uniform sampler2D uSampler;
        uniform samplerCube cubeTexture;

        void main(void) {
            
            vec3 lightDirection= normalize(uLightPosition - vec3(vWorldPosition));
        
            vec3 worldNormal = normalize(vWorldNormal.xyz);
            vec3 eyeToSurfaceDir = normalize(vWorldPosition - vCameraPosition.xyz);
            vec3 direction = reflect(eyeToSurfaceDir,worldNormal);
            vec4 textureColor = texture2D(uSampler, vec2(vUv2.s, vUv2.t));
            vec4 textureColorReflect = texture2D(uSampler, vec2(direction.x,direction.z));
            //vec4 textureColorCube = textureCube(cubeTexture, direction);

            vec3 colorTexture;

            colorTexture.x=vUv.x;
            colorTexture.y=vUv.y;
            colorTexture.z=vUv.z;

            vec3 color;

            if (withTexture) {
                if (withReflect) {
                    color=(uAmbientColor+0.75*uDirectionalColor*max(dot(worldNormal.xyz,lightDirection), 0.0))*textureColorReflect.xyz;
                } else {
                    color=(uAmbientColor+0.75*uDirectionalColor*max(dot(worldNormal.xyz,lightDirection), 0.0))*textureColor.xyz;
                }
            } else {
                color=(uAmbientColor+0.75*uDirectionalColor*max(dot(worldNormal.xyz,lightDirection), 0.0))*colorTexture.xyz;
            }

            if (uUseLighting)
                gl_FragColor = vec4(color,1.0);
            else
                gl_FragColor = vec4(0.25, 0.25, 0.25, 1);
            
        }