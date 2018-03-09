import React from 'react'
import ReactDOM from 'react-dom'
import estilo from './pdf.scss'
const get = (url)=>{
	return new Promise((resolve, reject)=>{
		const xhr = new XMLHttpRequest()
		xhr.open('GET', url, true)
		xhr.responseType = 'blob'
		xhr.setRequestHeader('x-j_gid_cod_app','e2')
		xhr.onload = function(e) {
		  if (this.status == 200) {
			const blob = new Blob([this.response], {type: 'application/pdf'})
			resolve(window.URL.createObjectURL(blob))
		  }
		  else{
			  reject(this)
		  }
		}
		xhr.send();
	})
}
const post = (url, data)=>{
    return new Promise((resolve, reject)=>{
		const xhr = new XMLHttpRequest()
		xhr.open('POST', url, true)
		xhr.responseType = 'blob'
		xhr.setRequestHeader('x-j_gid_cod_app','e2')
		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
		xhr.onload = function(e) {
		  if (this.status == 200) {
			const blob = new Blob([this.response], {type: 'application/pdf'})
			resolve(window.URL.createObjectURL(blob))
		  }
		  else{
			  reject(this)
		  }
		}
		xhr.send(JSON.stringify(data));
	})
}
const view = url => {
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
				<embed src={url} type="application/pdf" width="500" height="600">
				</embed>
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
const view2 = (url, data) => {
	if (data){
		post(url, data).then(burl=>{
			view(burl)
		})
	}
	else{
		get(url).then(burl=>{
			view(burl)
		})
	}

}
export default {view, view2}
