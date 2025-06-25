const blendModeIds={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8,min:9,max:10},BLEND=0,OFFSET=1,CULLING=2,DEPTH_TEST=3,WINDING=4,DEPTH_MASK=5,_State=class _State2{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<BLEND)}set blend(value){!!(this.data&1<<BLEND)!==value&&(this.data^=1<<BLEND)}get offsets(){return!!(this.data&1<<OFFSET)}set offsets(value){!!(this.data&1<<OFFSET)!==value&&(this.data^=1<<OFFSET)}set cullMode(value){if(value==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=value==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<CULLING)}set culling(value){!!(this.data&1<<CULLING)!==value&&(this.data^=1<<CULLING)}get depthTest(){return!!(this.data&1<<DEPTH_TEST)}set depthTest(value){!!(this.data&1<<DEPTH_TEST)!==value&&(this.data^=1<<DEPTH_TEST)}get depthMask(){return!!(this.data&1<<DEPTH_MASK)}set depthMask(value){!!(this.data&1<<DEPTH_MASK)!==value&&(this.data^=1<<DEPTH_MASK)}get clockwiseFrontFace(){return!!(this.data&1<<WINDING)}set clockwiseFrontFace(value){!!(this.data&1<<WINDING)!==value&&(this.data^=1<<WINDING)}get blendMode(){return this._blendMode}set blendMode(value){this.blend=value!=="none",this._blendMode=value,this._blendModeId=blendModeIds[value]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(value){this.offsets=!!value,this._polygonOffset=value}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const state=new _State2;return state.depthTest=!1,state.blend=!0,state}};_State.default2d=_State.for2d();let State=_State;const localUniformBit={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},localUniformBitGroup2={...localUniformBit,vertex:{...localUniformBit.vertex,header:localUniformBit.vertex.header.replace("group(1)","group(2)")}},localUniformBitGl={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}};class BatchableSprite{constructor(){this.batcherName="default",this.topology="triangle-list",this.attributeSize=4,this.indexSize=6,this.packAsQuad=!0,this.roundPixels=0,this._attributeStart=0,this._batcher=null,this._batch=null}get blendMode(){return this.renderable.groupBlendMode}get color(){return this.renderable.groupColorAlpha}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.bounds=null}destroy(){}}function color32BitToUniform(abgr,out,offset){const alpha=(abgr>>24&255)/255;out[offset++]=(abgr&255)/255*alpha,out[offset++]=(abgr>>8&255)/255*alpha,out[offset++]=(abgr>>16&255)/255*alpha,out[offset++]=alpha}export{BatchableSprite as B,State as S,localUniformBit as a,localUniformBitGl as b,color32BitToUniform as c,localUniformBitGroup2 as l};
