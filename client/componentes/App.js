import React from 'react';
import estilos from'./App.scss';
import {modal} from 'cmp/base/modal'
import {menu} from 'cmp/base/menu'
import pdf from 'cmp/base/pdf'
//import {modal, menu} from 'reactcomponent'
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.handle = this.handle.bind(this)
        this.handleimg = this.handleimg.bind(this)
    }
    handle(e){
        pdf.view2("/api/1.0/sap/commons/transmission/get/iplusget/generica/A125330_17000010000104________552018-03-1512.23.0865715612/00001/00001/001/1." + 
        '?x-j_gid_cod_app=e2&filename=a.pdf').then(m=>console.log(m)).catch(e=>console.log(e))
        /*const diag = <div style={{width: '500px'}}>
            <h1>Se va a enviar el formulario al servidor</h1>
            <div style={{display: 'flex'}}>
                <button onClick={()=>{console.log('hola');this.cerrar()}}>Aceptar</button>
                <button onClick={()=>this.cerrar()}>Cancelar</button>
            </div>
        </div>
       this.cerrar = modal(diag)*/
    }
    handleimg(e){
        menu([
                {t: 'opción 1', cb: () => console.log('opcion1')},
                {t: 'opción 2', cb: () => console.log('opcion2')}
            ], e
        )
    }
    render() {
        return (
        	<div style={{height: '100%', display: 'flex'/*, alignItems: 'stretch'*/}}>
        		<aside style={{width: '30%', marginRight: '5px'}} className={estilos.panel}>
        			sdfasdf
        		</aside>
        		<section style={{width: '70%'}} className={estilos.panel}>
                    <a onClick={this.handle}>Abrir dialogo</a><br/>
                    <a onClick={this.handleimg}>Abrir menú</a><br/>
        		</section>
        	</div>
        );
    }
}