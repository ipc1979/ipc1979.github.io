
        // atributos del vértice (cada uno se alimenta de un ARRAY_BUFFER distinto)

        attribute vec3 aPosition;   //posicion (x,y,z)
        attribute vec3 aNormal;     //vector normal (x,y,z)
        attribute vec2 aUv;         //coordenadas de texture (x,y)  x e y (en este caso) van de 0 a 1

        // variables Uniform (son globales a todos los vértices y de solo-lectura)

        uniform mat4 uMMatrix;     // matriz de modelado
        uniform mat4 uVMatrix;     // matriz de vista
        uniform mat4 uPMatrix;     // matriz de proyección
        uniform mat3 uNMatrix;     // matriz de normales
                        
        uniform float time;                 // tiempo en segundos
        
        uniform sampler2D uSampler;         // sampler de textura de la tierra

        // variables varying (comunican valores entre el vertex-shader y el fragment-shader)
        // Es importante remarcar que no hay una relacion 1 a 1 entre un programa de vertices y uno de fragmentos
        // ya que por ejemplo 1 triangulo puede generar millones de pixeles (dependiendo de su tamaño en pantalla)
        // por cada vertice se genera un valor de salida en cada varying.
        // Luego cada programa de fragmentos recibe un valor interpolado de cada varying en funcion de la distancia
        // del pixel a cada uno de los 3 vértices. Se realiza un promedio ponderado

        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        varying vec2 vUv;                           
        
        // constantes
        
        const float PI=3.141592653;


        mat3 rotateX(float angle) {
            mat3 rotationMatrix;
            rotationMatrix[0] = vec3(1, 0, 0);
            rotationMatrix[1] = vec3(0,cos(angle), -sin(angle));
            rotationMatrix[2] = vec3(0,sin(angle), cos(angle));
            return rotationMatrix;
        }

        mat3 rotateY(float angle) {
            mat3 rotationMatrix;
            rotationMatrix[0] = vec3(cos(angle), 0, sin(angle));
            rotationMatrix[1] = vec3(0, 1, 0);
            rotationMatrix[2] = vec3(-sin(angle), 0, cos(angle));
            return rotationMatrix;
        }

        mat3 rotateZ(float angle) {
            mat3 rotationMatrix;
            rotationMatrix[0] = vec3(cos(angle), sin(angle), 0);
            rotationMatrix[1] = vec3(-sin(angle), cos(angle), 0);
            rotationMatrix[2] = vec3(0, 0, 1);
            return rotationMatrix;
        }

        mat3 rotateVar() {
            mat3 rotationMatrix;
            rotationMatrix[0] = vec3(1, 0, 0);
            rotationMatrix[1] = vec3(0, 1, 0);
            rotationMatrix[2] = vec3(0, 0, 1);
            return rotationMatrix;
        }

        void main(void) {
                    
            vec3 position = aPosition;		
            vec3 normal = aNormal;	
            vec2 uv = aUv;
                                   	
           vec4 textureColor = texture2D(uSampler, vec2(uv.s, uv.t));         
            
            // **************** EDITAR A PARTIR DE AQUI *******************************

            float angleRadiansX0 = ( 0.5 * PI  );                       
            float angleRadiansY0 = ( 1.0 * PI  );                       
            float angleRadiansX = cos(3.0*time) * -0.1 * PI ;
            float angleRadiansZ = sin(3.0*time) * 0.1 * PI ;
            
            position=rotateZ(angleRadiansZ)*
                rotateX(angleRadiansX)*
                rotateY(angleRadiansY0)*
                rotateX(angleRadiansX0)*
                vec3(2.0*(uv.x-0.5),2.0*(uv.y-0.5),0.0);             

            // ************************************************************************

            vec4 worldPos = uMMatrix*vec4(position, 1.0);
            //vec4 worldPos = vec4(position, 1.0);                        

            gl_Position = uPMatrix*uVMatrix*worldPos;

            vWorldPosition=worldPos.xyz;              
            vNormal=normalize(uNMatrix * aNormal);
            vUv=uv;	
        }