import React from 'react'
import ReactDOM from 'react-dom'
import estilo from './modal.scss'

export const modal = (comp) => {
	const body = document.getElementsByTagName('body')[0]
	const div = document.createElement("div")
	body.appendChild(div)
	div.style.position = 'fixed'
	div.style.top = '0px'
	div.style.height = '100%'
	div.style.width = '100%'
	const cmp = <div>
		<div className={estilo.t} style={{position: 'absolute', top: '0px', width: '100%', height: '100%', backgroundColor: 'white'}}></div>
		<div onClick={cerrar} style={{position: 'absolute', top: '0px', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
			<div className={estilo.popup} onClick={(e)=>e.stopPropagation()}>
				{comp}
			</div>
		</div>
	</div>
	ReactDOM.render(cmp, div)
	const velo = div.firstChild.firstChild
	const popup = div.firstChild.children[1].firstChild
	function cerrar(){
		velo.style.opacity = 0
		popup.style.transform = "scale(0.1)"
		setTimeout(
			()=>{
				ReactDOM.unmountComponentAtNode(div)
				body.removeChild(div)
			}
		,300)
	}
	return cerrar
}

